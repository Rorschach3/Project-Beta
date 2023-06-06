from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, null=True, unique=True)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return self.employee_id

    def get_api_url(self):
        return reverse("api_list_technician", kwargs={"pk": self.pk})

class StatusChoices(models.TextChoices):
    finished = 'finished'
    canceled = 'cancelled'

class Appointment(models.Model):
    date_time = models.DateField(null=True)
    reason = models.TextField(max_length=100)
    status = models.CharField(default=False, max_length=100, choices=StatusChoices.choices)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
