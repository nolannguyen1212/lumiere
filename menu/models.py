import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _

from authen.models import User


class GenderType(models.TextChoices):
    MALE = "M", _("Male")
    FEMALE = "FM", _("Female")
    NONE = "N", _("None")


class MenuItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=200, null=True)
    price = models.DecimalField(max_digits=20, decimal_places=2)
    image = models.ImageField(null=True, blank=True)
    image_upload_url = models.CharField(max_length=255, null=True, blank=True)
    is_chef_special = models.BooleanField(default=False)
    category = models.CharField(max_length=50, default="")
    available = models.BooleanField(default=True)
    description = models.TextField(default="")
    updated_by = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["name"], name="name_index_idx")]
        ordering = ["created_at"]

    def __str__(self) -> str:
        return self.name

    @property
    def image_url(self):
        try:
            return self.image.url
        except ValueError:
            return ""


class Order(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False, null=True, blank=False)

    def __str__(self) -> str:
        return str(self.id)

    @property
    def get_cart_total(self):
        return sum(item.get_total for item in self.orderitem_set.all())

    @property
    def get_cart_items(self):
        return sum(item.quantity for item in self.orderitem_set.all())

    @property
    def formatted_date_ordered(self):
        return self.date_ordered.strftime("%Y-%m-%d %H:%M:%S") if self.date_ordered else None


class OrderItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    menu_item = models.ForeignKey(MenuItem, on_delete=models.SET_NULL, blank=True, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, blank=True, null=True)
    quantity = models.IntegerField(default=0, null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["date_added"]

    @property
    def get_total(self):
        return self.menu_item.price * self.quantity


class UserInfo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, blank=True, null=True)
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    date_of_birth = models.CharField(max_length=50, default=None, null=True, blank=True)
    gender = models.CharField(max_length=50, choices=GenderType.choices)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=50)
