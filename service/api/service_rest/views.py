from django.shortcuts import render
<<<<<<< HEAD
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
        "id",
        "is_vip",
        "date_time",
        "reason",
        "status",
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
        technician = Technician.objects.get(id=content["technician"])
        content["technician"] = technician
        try:
            vin_new = content["vin"]
            AutomobileVO.objects.get(vin=vin_new)
            content["is_vip"] = True
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Technician ID"},
                status=400
            )
        except AutomobileVO.DoesNotExist:
            content["is_vip"] = False
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["DELETE"])
def api_list_appointment(request, id):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})

@require_http_methods({"PUT"})
def api__cancel_appointment(request, id):
    content = json.loads(request.body)
    Appointment.objects.filter(id=id).update(**content)
    appointment = Appointment.objects.get(id=id)
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
    )

@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    content = json.loads(request.body)
    Appointment.objects.filter(id=id).update(**content)
    appointment = Appointment.objects.get(id=id)
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
    )
=======
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

>>>>>>> refs/remotes/Master/main
