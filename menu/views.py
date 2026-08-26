from django.conf import settings
from django.db.models import F
from django_filters import rest_framework as filters
from drf_spectacular.utils import (
    OpenApiParameter,
    OpenApiResponse,
    OpenApiTypes,
    extend_schema,
)
from rest_framework import generics, permissions, viewsets
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.views import APIView

from notifications.services import notify_user, short_id

from .models import MenuItem, Order, OrderItem, UserInfo
from .permissions import IsAdmin
from .serializers import (
    MenuItemSerializer,
    OrderItemSerializer,
    OrderSerializer,
    UserInfoSerializer,
)


class MenuItemPagination(PageNumberPagination):
    page_size = settings.PAGINATION_PAGE_SIZE


class ChefSpecialPagination(PageNumberPagination):
    page_size = settings.CHEF_SPECIAL_PAGINATION_PAGE_SIZE


class MenuItemFilter(filters.FilterSet):
    name = filters.CharFilter(field_name="name", lookup_expr="icontains")

    class Meta:
        model = MenuItem
        fields = ["category", "name"]


class MenuView(generics.ListCreateAPIView):
    serializer_class = MenuItemSerializer
    filter_backends = [filters.DjangoFilterBackend]
    filterset_class = MenuItemFilter

    def get_permissions(self):
        if self.request.method == "POST":
            return [IsAdmin()]
        return [permissions.IsAuthenticatedOrReadOnly()]

    @property
    def paginator(self):
        if not hasattr(self, "_paginator"):
            if self.request.query_params.get("is_chef_special"):
                self._paginator = ChefSpecialPagination()
            else:
                self._paginator = MenuItemPagination()
        return self._paginator

    def get_queryset(self):
        queryset = MenuItem.objects.all()
        if self.request.query_params.get("is_chef_special"):
            queryset = queryset.filter(is_chef_special=True)
        return queryset

    @extend_schema(
        operation_id="list_menu_items",
        description="List menu items, optionally filtered by category/name",
        responses={200: MenuItemSerializer(many=True)},
    )
    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    @extend_schema(
        operation_id="create_menu_item",
        description="Create a new menu item",
        responses={
            201: OpenApiResponse(description="Successfully created new menu item!"),
            400: OpenApiResponse(description="Failed to create new menu item."),
        },
    )
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(updated_by=request.user)
        return Response({"message": "Successfully created new menu item!"}, status=201)


class MenuItemView(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    serializer_class = MenuItemSerializer

    @extend_schema(
        operation_id="retrieve_menu_item_detail",
        description="Retrieve details of a menu item by ID",
        responses={
            200: MenuItemSerializer,
            404: OpenApiResponse(description="No such menu item!"),
        },
    )
    def get(self, request, id):
        try:
            menu_item = MenuItem.objects.get(pk=id)
        except MenuItem.DoesNotExist:
            return Response({"error": "No such menu item!"}, status=404)
        serializer = MenuItemSerializer(menu_item)
        return Response({"menu_item": serializer.data}, status=200)


class OrderViewset(viewsets.ViewSet):
    serializer_class = OrderSerializer

    def get_permissions(self):
        if self.action == "get_by_userid":
            return [IsAdmin()]
        return [permissions.IsAuthenticated()]

    def get(self, request):
        user = request.user
        orders = Order.objects.all() if user.is_admin else Order.objects.filter(user=user)
        orders = orders.order_by("-date_ordered")
        serializer = OrderSerializer(orders, many=True)
        return Response({"orders": serializer.data}, status=200)

    def post(self, request):
        order = Order.objects.create(user=request.user, complete=False)
        serializer = OrderSerializer(order)
        return Response(
            {"message": "Successfully created new order!", "order": serializer.data},
            status=200,
        )

    def put(self, request):
        try:
            order = Order.objects.get(user=request.user, complete=False)
        except Order.DoesNotExist:
            return Response({"error": "No pending order to complete!"}, status=404)
        order.complete = True
        order.save(update_fields=["complete"])
        notify_user(request.user, f"Your order #{short_id(order.id)} has been placed!", kind="order", order=order)
        return Response({"message": "Successfully saved order!"}, status=200)

    @extend_schema(
        parameters=[
            OpenApiParameter(name="user_id", type=OpenApiTypes.INT, location=OpenApiParameter.PATH)
        ]
    )
    def get_by_userid(self, request, user_id):
        orders = Order.objects.filter(user_id=user_id)
        serializer = OrderSerializer(orders, many=True)
        return Response({"orders": serializer.data}, status=200)


class OrderItemView(APIView):
    serializer_class = OrderItemSerializer

    def get(self, request):
        order, _ = Order.objects.get_or_create(user=request.user, complete=False)
        order_items = OrderItem.objects.filter(order=order)
        serializer = OrderItemSerializer(order_items, many=True)
        return Response({"order_items": serializer.data})

    def post(self, request):
        menu_item_id = request.data.get("menu_item_id")
        try:
            menu_item = MenuItem.objects.get(id=menu_item_id)
        except MenuItem.DoesNotExist:
            return Response({"error": "No such menu item!"}, status=404)

        order, _ = Order.objects.get_or_create(user=request.user, complete=False)
        order_item, created = OrderItem.objects.get_or_create(
            order=order, menu_item=menu_item, defaults={"quantity": 1}
        )
        if not created:
            order_item.quantity = F("quantity") + 1
            order_item.save(update_fields=["quantity"])

        return Response({"message": f"Added {menu_item.name} to your order!"}, status=201)

    def put(self, request):
        order_item_id = request.data.get("id")
        quantity = request.data.get("quantity")

        try:
            if quantity:
                order_item = OrderItem.objects.get(id=order_item_id)
                order_item.quantity = quantity
                order_item.save(update_fields=["quantity"])
            else:
                OrderItem.objects.filter(id=order_item_id).delete()
        except OrderItem.DoesNotExist:
            return Response({"message": "There is no such item!"}, status=404)

        return Response({"message": "Update item quantity successfully!"}, status=200)

    def delete(self, request):
        order_item_id = request.data.get("id")
        deleted, _ = OrderItem.objects.filter(id=order_item_id).delete()
        if not deleted:
            return Response({"error": "No such order item!"}, status=404)
        return Response({"message": "Successfully removed order item!"}, status=200)


class UserInfoView(APIView):
    serializer_class = UserInfoSerializer

    def get(self, request):
        user_info = UserInfo.objects.filter(user=request.user).first()
        serializer = UserInfoSerializer(user_info)
        return Response({"user_info": serializer.data}, status=200)

    def post(self, request):
        user_info = UserInfo.objects.filter(user=request.user).first()
        serializer = UserInfoSerializer(instance=user_info, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=200)
