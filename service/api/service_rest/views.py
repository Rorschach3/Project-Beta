from django.shortcuts import render
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
    ]
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id",
    ]

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "technician",
        "status", 
        "date_time",
        "reason",
        "customer",
        "is_vip",
        "id",
        "vin", 
    ]

    encoders={"technician": TechnicianEncoder()}
    
    def get_extra_data(self, obj):
        if obj.status == "Finished":
            return {"status": Appointment.Statuses.FINISHED}
        elif obj.status == "Canceled":
            return {"status": Appointment.Statuses.CANCELED}
        else:
            return {"status": Appointment.Statuses.CREATED}


@require_http_methods(["GET", "POST"])
def technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(
                first_name=content["first_name"],
                last_name=content["last_name"],
                employee_id=content["employee_id"],
            )
            return JsonResponse(
                {"technician": technician},
                encoder=TechnicianListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Error!!"}
            )
            response.status_code = 400
            return response


@require_http_methods(["DELETE"])
def technician(request, pk):
    try:
        technician = Technician.objects.get(id=pk)
        count, _ = technician.delete()
        response = JsonResponse(
            {"deleted": count > 0}
        )
        return response
    except Technician.DoesNotExist:
        response = JsonResponse(
            {"message": "Error"}
        )
        response.status_code = 404
        return response

