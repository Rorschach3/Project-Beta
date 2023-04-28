from django.urls import path
from .views import technicians, technician

urlpatterns = [
    path("technicians/", technicians, name="technicians"),
    path("technicians/<int:pk>", technician, name="technician")
]