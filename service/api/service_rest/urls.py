from django.urls import path
from .views import api_list_technicians, api_show_technician, api_list_appointments

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>/", api_show_technician, name="api_show_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
]
