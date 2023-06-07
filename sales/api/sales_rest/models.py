from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=100, unique=True, null=True)

    def __str__(self):
        return f"VIN:{self.vin}"


class Customer(models.Model):
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=20, null=True)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    employee_id = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Sale(models.Model):
    price = models.PositiveIntegerField()
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
        null=True
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT,
        null=True,
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.PROTECT,
        null=True
    )

    def __str__(self):
        return f"customer: {self.customer} salesperson: {self.salesperson} | Price: ${self.price}"