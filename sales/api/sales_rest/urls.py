from django.urls import path
from .views import (api_salespersons,
                    api_delete_salesperson,
                    api_customer,
                    api_customers,
                    api_sales,
                    api_delete_sale,
                    api_autos)

urlpatterns = [
    path("salespeople/", api_salespersons, name="api_salespersons"),
    path("salespeople/<int:id>/", api_delete_salesperson, name="api_delete_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_delete_sale, name="api_delete_sale"),
    path("autos/", api_autos, name="api_autos"),
]
