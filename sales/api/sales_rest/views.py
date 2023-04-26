from django.shortcuts import render
from .models import AutomobileVO, Sale, SalesPerson, Customer
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "href",
        "id",
        "vin",
        "year",
        "color",
    ]


class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "id",
        "name",
        "employee_number"
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "name",
        "address",
        "phone"
    ]


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sales_person(request, id):
    try:
        sales_person = SalesPerson.objects.get(id=id)
    except SalesPerson.DoesNotExist:
        return JsonResponse({"message": "Sales Person not found"}, status=404)

    if request.method == "GET":
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    elif request.method == "PUT":
        sales_person = SalesPerson.objects.get(id=id)
        return JsonResponse(
            sales_person,
            encoder=SalesPersonEncoder,
            safe=False,
        )
    else:  # DELETE Request
        count, _ = SalesPerson.objects.filter(id=id).delete()
        return JsonResponse(
            {"delete": count > 0}
        )


@require_http_methods(["GET", "PUT", "DELETE"])
def api_customer(request, id):
    pass


@require_http_methods(["GET", "PUT", "DELETE"])
def api_sales(request, id):
    pass

@require_http_methods(["GET"])
def api_AutomobileVO(request, id):
    automobiles = AutomobileVO.objects.all()
    return JsonResponse(
        {"autos": automobiles},
        encoder=AutomobileVOEncoder
    )