from django.shortcuts import render
from .models import AutomobileVO, Sale, Salesperson, Customer
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


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone",
    ]


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "id",
        "sales_person",
        "automobile",
        "price",
        "customer",
    ]
    encoders = {
        "sales_person": SalespersonEncoder(),
        "customer": CustomerEncoder(),
        "automobile": AutomobileVOEncoder(),
    }


@require_http_methods(["GET", "DELETE"])
def api_salesperson(request, id):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=id)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
    else:  # DELETE Request
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse(
            {"delete": count > 0}
        )


@require_http_methods(["GET", "POST"])
def api_salespersons(request):
    if request.method == "GET":
        sales_person = Salesperson.objects.all()
        return JsonResponse(
            {"sales_person": sales_person},
            encoder=SalespersonEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = Salesperson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales person id"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_customer(request, id):
    if request.method == "GET":
        customers = Customer.objects.get(id=id)
        return JsonResponse(
            customers,
            encoder=CustomerEncoder,
            safe=False,
        )
    else:
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:  # POST Request
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid customer id"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_sale(request, id):
    if request.method == "GET":
        sale = Sale.objects.get(id=id)
        return JsonResponse(
            sale,
            encoder=SalesEncoder,
            safe=False
        )
    else:
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
    else:
        try:
            content = json.loads(request.body)
            sales = content["sales"]
            sales = Sale.objects.get(id=id)
            content["sales"] = sales
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid sales id"},
                status=400,
            )

# @require_http_methods(["GET", "POST"])
# def api_sales(request, sales_person_id=None):
#     if request.method == "GET":
#         if sales_person_id is not None:
#             sales = Sale.objects.filter(sales_person=sales_person_id)
#         else:
#             sales = Sale.objects.all()
#         return JsonResponse(
#             {"sales": sales},
#             encoder=SalesEncoder,
#         )
#     else:
#         content = json.loads(request.body)
#         try:
#             sales_person_id = content["sales_person"]
#             sales_person = SalesPerson.objects.get(id=sales_person_id)
#             content["sales_person"] = sales_person
#         except SalesPerson.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid sales person id"},
#                 status=400,
#             )
#         try:
#             customer_id = content["customer"]
#             customer = Customer.objects.get(id=customer_id)
#             content["customer"] = customer
#         except Customer.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid customer id"},
#                 status=400,
#             )
#         try:
#             automobile_vin = content["automobile"]
#             automobile = AutomobileVO.objects.get(vin=automobile_vin)
#             content["automobile"] = automobile
#         except AutomobileVO.DoesNotExist:
#             return JsonResponse(
#                 {"message": "Invalid VIN"},
#                 status=400,
#             )
#         sales = Sale.objects.create(**content)
#         return JsonResponse(
#             sales,
#             encoder=SalesEncoder,
#             safe=False,
#         )


# @require_http_methods(["GET"])
# def api_AutomobileVO(request, id):
#     automobiles = AutomobileVO.objects.all()
#     return JsonResponse(
#         {"autos": automobiles},
#         encoder=AutomobileVOEncoder
#     )