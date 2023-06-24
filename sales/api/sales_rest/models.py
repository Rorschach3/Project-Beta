from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, null=True, unique=True,)
    vin = models.CharField(max_length=17, unique=True, null=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return f"VIN:{self.vin}"


class Customer(models.Model):
    first_name = models.CharField(max_length=50, null=True)
    last_name = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=15, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=False)
    last_name = models.CharField(max_length=50, null=True, blank=False)
    employee_id = models.PositiveSmallIntegerField(unique=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Sale(models.Model):
    price = models.PositiveIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
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
        return f"automobile: {self.automobile} | Price: ${self.price}"