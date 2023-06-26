from django.db import models
from django.urls import reverse


class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100, null=True, unique=True)
    vin = models.CharField(max_length=17)
    sold = models.BooleanField()

    def __str__(self):
        return f"vin: {self.vin}"


class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def get_api_url(self):
        return reverse("api_list_technician", kwargs={"pk": self.pk})


class StatusChoices(models.TextChoices):
    current = 'current'
    finished = 'finished'
    canceled = 'cancelled'


class Appointment(models.Model):
    date_time = models.DateTimeField(null=True)
    reason = models.TextField(max_length=100)
    status = models.CharField(
        default='current',
        max_length=100,
        choices=StatusChoices.choices
    )
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    is_vip = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.customer}:{self.date_time}"