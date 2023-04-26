from django.db import models
from django.urls import reverse


# Create your models here.
class AutomobileVO(models.Model):
    href = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, unique=True)
    year = models.PositiveSmallIntegerField()
    color = models.CharField(max_length=50)

    def __str__(self):
        return self.vin


class SalesPerson(models.Model):
    name = models.CharField(max_length=200)
    employee_number = models.PositiveSmallIntegerField(unique=True)

    def get_api_url(self):
        return reverse("api_sales_person", kwargs={"pk": self.pk})

    def __str__(self):
        return self.name


class Customer(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)

    def __str__(self):
        return self.name


class Sale(models.Model):
    price = models.IntegerField()

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.PROTECT,
    )

    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.PROTECT,
    )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales",
        on_delete=models.PROTECT,
    )

    def get_api_url(self):
        return reverse("api_sales", kwargs={"pk": self.pk})

    def __str__(self):
        return f"{self.sales_person} {self.automobile} ${self.price}"
