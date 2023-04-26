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
    response = requests.get("inventory-api:8000/api/automobiles/")  # Filler URL
    content = json.loads(response.content)
    for i in content['autos']:
        AutomobileVO.objects.updates_or_create(
            href=i['href'],
            defaults={
                "color": i['color'],
                "year": i['year'],
                "vin": i["vin"],
            }
        )


def poll():
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            get_data()
            pass
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
