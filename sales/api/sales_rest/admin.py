from django.contrib import admin
from .models import Sale, Salesperson, Customer, AutomobileVO

# Register your models here.


@admin.register(AutomobileVO)
class AutomobileAdmin(admin.ModelAdmin):
    pass


@admin.register(Salesperson)
class salesPersonAdmin(admin.ModelAdmin):
    pass


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    pass


@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    pass