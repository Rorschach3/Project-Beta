# CarCar

CarCar, an application for managing aspects of an automobile dealership—specifically its inventory, service center, and sales.

### Team:

##### * [Jorge Laderos De Santiago](https://gitlab.com/landerosjorge) - Services microservice

##### * [Daniel Hernandez](https://gitlab.com/Rorschach3)- Sales microservice

## Install and Run Locally

1. Fork the repository using this link
   `https://gitlab.com/landerosjorge/project-beta`
2. Then clone the project

```bash
  git clone https://gitlab.com/landerosjorge/project-beta.git
```

3. Change directories into to the project directory

```bash
  cd project-beta
```

4. Create database using Docker command

```bash
  docker volume create beta-data
```

5. Build the Docker containers.
   Wait until this process is completely finished before running the next command.

```bash
 docker-compose build
```

6. Start up Docker containers

```bash
 docker-compose up
```

7. Open project using your favorite code editor VS Code

```bash
code .
```

## Diagram

![CarCar Landing Page](images/CarCarLandingPage.png)

## Design

### Sales

The Sales functionality needs to keep track of automobile sales that come from the inventory. A person cannot sell a car that is not listed in the inventory, nor can a person sell a car that has already been sold.

### Service

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### Inventory

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## API Reference

### Inventory

***Automobiles***

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Automobiles |  `GET`   |  `8100/api/automobiles/`   |
| Create Automobile |  `POST`   |  `8100/api/automobiles`   |
| Get Automobile    | `PUT`   | `8100/api/automobiles/vin/`|
| Update Automobile |  `PUT`   |  `8100/api/automobiles/vin/` |
| Delete Automobile |  `DELETE` |  `8100/api/automobiles/vin/` |

**Return Response:**

```http
Color, Year, VIN, Vehicle Model ID
```

---

***Manufacturers***

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Manufacturers |  `GET`   |  `8100/api/manufacturers/`   |
| Create Manufacturer |  `POST`   |  `8100/api/manufacturers`   |
| Get Manufacturer |  `GET`   |  `8100/api/manufacturers/id/` |
| Update Manufacturer |  `PUT` | `8100/api/manufacturers/id/` |
| Delete Manufacturer |  `DELETE`   |  `8100/api/manufacturers/id/` |

**Return Response:**

```http
href, ID, Name
```

---

***Vehicle Models***

| Action         | Request  | Endpoint               |
| :-----------  | :------- | :--------------------- |
| List VehicleModels    |  `GET`   |  `8100/api/models/`   |
| Create VehicleModel |  `POST`   |  `8100/api/models`   |
| GET VehicleModel |  `GET`   |  `8100/api/models/id/` |
| Update VehicleModel |  `PUT`   |  `8100/api/models/id/` |
| Delete VehicleModel |  `DELETE`   |  `8100/api/models/id/` |

**Return Response:**

```http
Automobile VIN, Salersperson, Customer, Price
```

---

### Automobile Services

***Technicians***

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Technicians |  `GET`   |  `/api/technicians/`   |
| Create Technician |  `POST`   |  `/api/technicians/`   |
| Delete Technician | `DELETE` | `/api/technicians/id/`|

**Return Response:**

```http
First Name, Last Name, Employee ID
```

---

***Appointments***

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List Appointments |  `GET`   |  `/api/appointments/`   |
| Create Appointments |  `POST`   |  `/api/appointments`   |
| Delete an appointment |  `DELETE`   |  `/api/appointments/id/` |
|Set Appointment status to canceled|`PUT`|`/api/appointments/id/cancel`|
|Set Appointment status to finished|`PUT`|`/api/appointments/id/finish`|

**Return Response:**

```http
Date/Time, Reason, Status, VIN, Customer, Technician
```

---

### Automobile Sales

***Salespeople***

| Action       | Request  |Endpoint  |
| :--------   | :------- | :-------------------------------- |
| List salespeople | `GET` | `8090/api/salespeople/` |
| Create salespeople| `POST` |`809api/salespeople/` |
| Delete salespeople| `DELETE` | `8090/api/salespeople/id/` |

![List Salespeople](images/List Salespeople.png)
![Create Salespeople](images/Create Salesperson.png)
![Delete Salespeople](images/Delete Salesperson.png)

**Return Response:**

```http
"Firstname", "LastName", "Employee ID"
```

---

***Automobile***

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List customers |  `GET`   |  `8090/api/automobiles/`   |
| Create customer |  `POST`   |  `8090/api/automobiles`   |
| Delete customer |  `DELETE`   |  `8090/api/automobiles/id/` |

![List Customers](images/List Customers.png)
![Create Customer](images/Create Customer.png)
![Delete Customer](images/Delete Customer.png)

**Return Response:**

```http
VIN, Sold
```

---

***Sales***

| Action         | Request  | Endpoint               |
| :-----------     | :------- | :--------------------- |
| List sales |  `GET`   |  `8090/api/sales/`   |
| Record new sale |  `POST`   |  `8090/api/sales/`   |
| Delete sale |  `DELETE`   |  `8090/api/sales/id/` |

![Show Sale](images/Record New Sale.png)
![Create Sales](images/Create Sales.png)
![Delete Sale](images/Delete Salepng)

**Return Response:**

```http
Automobile VIN, Salesperson, Customer, Price
```

---
