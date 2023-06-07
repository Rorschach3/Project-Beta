from django.shortcuts import render
from django.http import JsonResponse
from common.json import ModelEncoder
from .models import Appointment, Technician, AutomobileVO
from django.views.decorators.http import require_http_methods
import json

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold"
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "vin",
        "customer",
        "technician",
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician Details"},
                status=400,
            )

@require_http_methods(["DELETE"])
def api_show_technician(request, id):
    if request.method == "DELETE":
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
            safe=False
            )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician name"},
                status=400
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )
