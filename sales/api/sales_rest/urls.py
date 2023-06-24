from django.urls import path
from .views import (api_salespersons,
                    api_salesperson,
                    api_customer,
                    api_customers,
                    api_sales,
                    api_sale,)

urlpatterns = [
    path("salespeople/", api_salespersons, name="api_salespersons"),
    path("salespeople/<int:id>/", api_salesperson, name="api_salesperson"),
    path("customers/", api_customers, name="api_customers"),
    path("customers/<int:id>/", api_customer, name="api_customer"),
    path("sales/", api_sales, name="api_sales"),
    path("<int:automobile_vo_id>/sales/", api_sales, name="api_sales"),
    path("sales/<int:id>/", api_sale, name="api_sale"),
]
