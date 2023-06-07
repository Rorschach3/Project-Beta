from django.shortcuts import render
from .models import AutomobileVO, Sale, Salesperson, Customer
import json
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

# Create your views here.


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = ["vin", "sold", "import_href"]


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "first_name",
        "last_name",
        "address",
        "phone_number"
    ]


class SalespersonEncoder(ModelEncoder):
    model = Salesperson
    properties = [
        "first_name",
        "last_name",
        "employee_id"
    ]


# class SalesEncoder(ModelEncoder):
#     model = Sale
#     properties = [
#         "salesperson",
#         "automobile",
#         "price",
#         "customer",
#     ]
#     encoders = {
#         "salesperson": SalespersonEncoder(),
#         "customer": CustomerEncoder(),
#         "automobile": AutomobileVOEncoder(),
#     }


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = [
        "price",
        "customer",
        "salesperson",
        "automobile",
    ]
    encoders = {
        "salesperson": SalespersonEncoder(),
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
        salesperson = Salesperson.objects.all()
        return JsonResponse(
            {"salesperson": salesperson},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
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
    else:  # POST Request
        try:
            content = json.loads(request.body)
            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SalesEncoder,
                safe=False,
            )
        except Sale.DoesNotExist:
            return JsonResponse(
                {"message": "Error!"},
                status=400,
            )

# class SalesEncoder(ModelEncoder):
#     model = Sale
#     properties = [
#         "price",
#         "customer",
#         "salesperson",
#         "automobile",
#     ]
#     encoders = {
#         "salesperson": SalespersonEncoder(),
#         "customer": CustomerEncoder(),
#         "automobile": AutomobileVOEncoder(),
#     }


# class SalesEncoder(ModelEncoder):
#     model = Sale

#     properties = [
#         "price",
#         "customer",
#         "salesperson",
#         "automobile",
#     ]

    # encoders = {
    #     "salesperson": SalespersonEncoder(),
    #     "customer": CustomerEncoder(),
    #     "automobile": AutomobileVOEncoder(),
    # }

    # def default(self, obj):
    #     if isinstance(obj, Sale):
    #         return {
    #             "price": obj.price,
    #             "customer": {
    #                 "first_name": obj.customer.first_name,
    #                 "last_name": obj.customer.last_name,
    #             },
    #             "salesperson": {
    #                 "first_name": obj.salesperson.first_name,
    #                 "last_name": obj.salesperson.last_name,
    #             },
    #             "automobile": {
    #                 "vin": obj.automobile.vin,
    #             },
    #         }
    #     return super().default(obj)



# @require_http_methods(["GET", "DELETE"])
# def api_sale(request, id):
#     if request.method == "GET":
#         sale = Sale.objects.get(id=id)
#         return JsonResponse(
#             sale,
#             encoder=SalesEncoder(),
#             safe=False
#         )
#     else:
#         count, _ = Sale.objects.filter(id=id).delete()
#         return JsonResponse({"delete": count > 0})