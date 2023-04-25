from django.db import models

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
# Create your models here.
