# Generated by Django 4.0.3 on 2023-06-09 22:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0012_alter_sale_automobile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='AutomobileVO', to='sales_rest.automobilevo'),
        ),
    ]
