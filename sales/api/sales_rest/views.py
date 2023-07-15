from django.shortcuts import render
from .models import AutomobileVO, Sale, Salesperson, Customer
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods


# Create your views here.
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "import_href", "id"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number",
        "id"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "customer",
        "salesperson",
        "automobile",
        "id",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salesperson},
            encoder=SalespersonEncoder,
            safe=False,
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            salespeople = Salesperson.objects.create(**content)
            return JsonResponse(
                {"salespeople": salespeople},
                encoder=SalespersonEncoder,
                safe=False,
            )
        except ValueError as e:
            return JsonResponse(
                {"message": "Invalid JSON data in the request body: " + str(e)},
                status=400,
            )
        except KeyError as e:
            return JsonResponse(
                {"message": "Missing required fields in the request body: " + str(e)},
                status=400,
            )
        except Exception as e:
            return JsonResponse(
                {"message": "An error occurred: " + str(e)},
                status=500,
            )


@require_http_methods(["DELETE"])
def api_customer(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
            safe=False,
        )
    else:  # POST request
        content = json.loads(request.body)
        try:
            customers = Customer.objects.create(**content)
            return JsonResponse(
                    customers,
                    encoder=CustomerEncoder,
                    safe=False,
                )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"Message": "Invalid Customer Details"},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_delete_sale(request, id):
    if request.method == "DELETE":
        count, _ = Sale.objects.filter(id=id).delete()
        return JsonResponse({"delete": count > 0})


@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SalesEncoder
        )
    else:  # POST Request
        content = json.loads(request.body)

        salesperson = Salesperson.objects.get(id=content["salesperson"])
        content["salesperson"] = salesperson

        customer = Customer.objects.get(id=content["customer"])
        content["customer"] = customer
        try:
            automobile = AutomobileVO.objects.get(vin=content["automobile"])
            automobile.sold = True
            automobile.save()
            content["automobile"] = automobile
        except AutomobileVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid Auto Vin"},
                status=400,
            )
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False,
        )


@require_http_methods(["GET"])
def api_autos(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVOEncoder,
        )
