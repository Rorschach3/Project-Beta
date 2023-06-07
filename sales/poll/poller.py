import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO


def get_data():
    response = requests.get("http://project-beta-inventory-api-1:8000/api/automobiles")
    content = json.loads(response.content)
    for car in content['autos']:
        print(car)
        AutomobileVO.objects.create(
            import_href=car['import_href'],
            defaults={
                "color": car['color'],
                "year": car['year'],
                "vin": car["vin"],
            }
        )


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            get_data()
            pass
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(6)


if __name__ == "__main__":
    poll()
