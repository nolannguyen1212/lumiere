from django.shortcuts import render
from django.views.generic import TemplateView
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

class EcoinFrontendView(TemplateView):
    template_name = "index.html"