# CarCar


CarCar, an application for managing aspects of an automobile dealership—specifically its inventory, service center, and sales.

### Team:

* Daniel Hernandez - Sales
* Kevin C. - Services
## Design



## API Reference

 Inventory

```http
Automobiles
```

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Automobiles |  `GET`   |  `/api/automobiles/`   |
| Create Automobile |  `POST`   |  `/api/automobiles`   |
| Get Automobile | `PUT` | `/api/automobiles/id/`|
| Update VehicleModel |  `PUT`   |  `/api/models/id/` |
| Delete VehicleModel |  `DELETE`   |  `/api/models/id/` |



```http
Manufacturers
```


| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Manufacturers |  `GET`   |  `/api/manufacturers/`   |
| Create Manufacturer |  `POST`   |  `/api/manufacturers`   |
| Get Manufacturer |  `GET`   |  `/api/manufacturers/id/` |
| Update Manufacturer |  `PUT` | `/api/manufacturers/id/` |
| Delete Manufacturer |  `DELETE`   |  `/api/manufacturers/id/` |


```http
VehicleModels
```


| Action         | Request  | Endpoint               |
| :-----------  | :------- | :--------------------- |
| List VehicleModels    |  `GET`   |  `/api/models/`   |
| Create VehicleModel |  `POST`   |  `/api/models`   |
| GET VehicleModel |  `GET`   |  `/api/models/id/` |
| Update VehicleModel |  `PUT`   |  `/api/models/id/` |
| Delete VehicleModel |  `DELETE`   |  `/api/models/id/` |


Automobile Services

```http
Technicians
```

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Technicians |  `GET`   |  `/api/technicians/`   |
| Create Technician |  `POST`   |  `/api/technicians/`   |
| Delete Technician | `DELETE` | `/api/technicians/id/`|


```http
Appointments
```


| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Appointments |  `GET`   |  `/api/appointments/`   |
| Create Appointments |  `POST`   |  `/api/appointments`   |
| Get Appointments |  `GET`   |  `/api/appointments/id/` |
|Set Appointment status to canceled|`PUT`|`/api/appointments/id/cancel`|
|Set Appointment status to finished|`PUT`|`/api/appointments/id/finish`|


Automobile Sales

```http
Salespeople
```

| Action       | Request  |Endpoint  |
| :--------   | :------- | :-------------------------------- |
| List salespeople | `GET` | `/api/salespeople/` |
| Create salespoeple| `POST` |`api/salespeople/` |
| Delete salespeople| `DELETE` | `api/salespeople/id/` |



```http
Customers
```

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List customers |  `GET`   |  `/api/automobiles/`   |
| Create customer |  `POST`   |  `/api/automobiles`   |
| Delete customer |  `DELETE`   |  `/api/automobiles/id/` |



```http
sales
```

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List sales |  `GET`   |  `/api/sales/`   |
| Record new sale |  `POST`   |  `/api/sales/`   |
| Delete sale |  `DELETE`   |  `/api/sales/id/` |



