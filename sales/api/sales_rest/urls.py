# sales_rest/urls.py

from django.urls import path
from .views import (
    api_customers,
    api_customer,
    api_sales,
    api_delete_sale,
    api_autos,
    api_salespeople,
    api_delete_salespeople,
)

urlpatterns = [
    # GET all salespeople / POST a new one
    path("salespeople/", api_salespeople, name="api_salespeople"),

    # DELETE one salesperson by id
    path(
        "salespeople/<int:id>/",
        api_delete_salespeople,
        name="api_delete_salespeople",
    ),

    # Customers
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),

    # Sales
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_delete_sale, name="api_delete_sale"),

    # Automobiles
    path("autos/", api_autos, name="api_autos"),
]
