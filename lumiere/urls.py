from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.http import HttpResponse
from django.urls import include, path, re_path
from django.views import View
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/users/", include("authen.urls")),
    path("api/", include("menu.urls")),
    path("api/", include("notifications.urls")),
    path("api/payment/", include("payment.urls")),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/schema/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


class FrontendAppView(View):
    def get(self, request, *args, **kwargs):
        index_file = settings.FRONTEND_BUILD_DIR / "index.html"
        if not index_file.exists():
            return HttpResponse(
                "Frontend build not found. Run `npm run build` in client/.",
                status=501,
            )
        return HttpResponse(index_file.read_text(encoding="utf-8"))


urlpatterns += [
    re_path(r"^(?!admin/|api/|static/|media/).*$", FrontendAppView.as_view(), name="frontend"),
]
