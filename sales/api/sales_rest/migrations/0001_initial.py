# Generated by Django 4.0.3 on 2023-06-26 11:56

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AutomobileVO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('import_href', models.CharField(max_length=100, null=True, unique=True)),
                ('vin', models.CharField(max_length=17, null=True, unique=True)),
                ('sold', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('address', models.CharField(max_length=100, null=True)),
                ('phone_number', models.CharField(max_length=15, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Salesperson',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=50, null=True)),
                ('last_name', models.CharField(max_length=50, null=True)),
                ('employee_id', models.PositiveSmallIntegerField(null=True, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.PositiveIntegerField()),
                ('automobile', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.automobilevo')),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.customer')),
                ('salesperson', models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='sales', to='sales_rest.salesperson')),
            ],
        ),
    ]
