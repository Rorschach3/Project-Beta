from django.db import models
from django.urls import reverse
<<<<<<< HEAD

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
    current = 'current'
    finished = 'finished'
    canceled = 'cancelled'

class Appointment(models.Model):
    date_time = models.DateTimeField(null=True)
    reason = models.TextField(max_length=100)
    status = models.CharField(default='current', max_length=100, choices=StatusChoices.choices)
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    is_vip = models.BooleanField(default=False)

    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
    )
=======

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=200)
    employee_id = models.CharField(max_length=50, unique=True)

class Appointment(models.Model):
    class Statuses(models.TextChoices):
        FINISHED = "Finished", "Finished"
        CANCELED = "Canceled", "Canceled"
        CREATED = "Created", "Created"

    status = models.CharField(max_length=40, choices=Statuses.choices, default=Statuses.CREATED)
    vin = models.CharField(max_length=17)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE
    )
    date_time = models.DateTimeField()
    reason = models.CharField(max_length=200)
    customer = models.CharField(max_length=200)
    is_vip = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("appointment", kwargs={"pk": self.pk})
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=100)
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

>>>>>>> refs/remotes/Master/main
