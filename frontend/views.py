from django.shortcuts import render
from django.views.generic import TemplateView

class EcoinFrontendView(TemplateView):
    template_name = "index.html"