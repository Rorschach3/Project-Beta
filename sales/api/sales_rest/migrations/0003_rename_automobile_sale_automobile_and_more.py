# Generated by Django 4.0.3 on 2023-06-06 22:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0002_automobilevo_sold_alter_customer_address_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='sale',
            old_name='automobile',
            new_name='Automobile',
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='import_href',
            field=models.CharField(max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name='automobilevo',
            name='vin',
            field=models.CharField(max_length=17),
        ),
        migrations.AlterField(
            model_name='sale',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='customer', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='salesperson',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='salesperson', to='sales_rest.salesperson'),
        ),
    ]
