# Generated by Django 4.0.3 on 2023-06-06 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('service_rest', '0002_alter_appointment_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('finished', 'Finished'), ('cancelled', 'Canceled')], default=False, max_length=100),
        ),
    ]
