# Generated by Django 4.0.3 on 2023-06-09 00:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0008_alter_sale_automobile_alter_sale_customer_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='AutombileVO', to='sales_rest.automobilevo'),
        ),
    ]
