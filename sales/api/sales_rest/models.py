from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True, null=True)
    sold = models.BooleanField(default=False)
    import_href = models.CharField(max_length=100, null=True, blank=False)

    def __str__(self):
        return f"VIN:{self.vin} Sold:{self.sold}"


class Customer(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=False)
    last_name = models.CharField(max_length=50, null=True, blank=False)
    address = models.CharField(max_length=100, null=True, blank=False)
    phone_number = models.CharField(max_length=20, null=True, blank=False)

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Salesperson(models.Model):
    first_name = models.CharField(max_length=50, null=True, blank=False)
    last_name = models.CharField(max_length=50, null=True, blank=False)
    employee_id = models.PositiveSmallIntegerField(
        null=True,
        blank=False,
        unique=True
        )

    def __str__(self):
        return f"{self.last_name}, {self.first_name}"


class Sale(models.Model):
    price = models.PositiveIntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="AutomobileVO",
        on_delete=models.CASCADE,
        null=True
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.CASCADE,
        null=True,
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salesperson",
        on_delete=models.CASCADE,
        null=True
    )

    def __str__(self):
        return f"automobile: {self.automobile} customer: {self.customer} salesperson: {self.salesperson} | Price: ${self.price}"