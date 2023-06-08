# Generated by Django 4.0.3 on 2023-06-06 22:02

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='sold',
            field=models.BooleanField(default=False, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='address',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='sale',
            name='automobile',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.customer'),
        ),
        migrations.AlterField(
            model_name='sale',
            name='salesperson',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]