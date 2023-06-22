import React, { useEffect, useState } from 'react';


function SalesForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
        automobile: auto,
        salespeople: salespeople,
        customer: customer,
        price: price,
    };
        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
      }
      const response = await fetch(saleUrl, fetchConfig);
      if (response.ok) {
        const newSale = await response.json();
        const carData = {};
        carData.sold = true;
        const carVin = newSale["automobile"].vin;
        const carUrl = `http://localhost:8090/api/cars/${carVin}/`
        const carFetchConfig = {
            method: "put",
            body: JSON.stringify(carData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const automobileVIN =newSale["automobile"].vin;
        const automobileUrl = `http://localhost:8100/api/automobiles/${automobileVIN}/`
        const automobileFetchConfig = {
            method: "put",
            body: JSON.stringify(carData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);
        const carResponse = await fetch(carUrl, carFetchConfig);
        if (carResponse.ok && automobileResponse.ok) {
            const updateCars = cars.filter(object => object.vin !== carVin)
            setCars(updateCars)
            setCar("");
            setSalespeople("");
            setCustomer("");
            setPrice("");
        }
        else if (carResponse.ok) {
            const updateCars = cars.filter(object => object.vin !== carVin)
            setCars(updateCars)
            setCar("");
            setSalespersons("");
            setCustomer("");
            setPrice("");
            console.error(automobileResponse)
        }
        else if (automobileResponse.ok) {
            console.error(carResponse)
        }
        else {
            console.error(carResponse)
            console.error(automobileResponse)
        }


    }
    else {
        console.error(response)
      }
  }
  const [cars, setCars] = useState([])
  const [salespersons, setSalespersons] = useState([])
  const [customers, setCustomers] = useState([])
  const [auto, setCar] = useState([])
  const [salespeople, setSalespeople] = useState("")
  const [customer, setCustomer] = useState("")
  const [price, setPrice] = useState("")

  const fetchCarData = async () => {
      const response = await fetch("http://localhost:8100/api/automobiles/")
      if (response.ok) {
          const data = await response.json()
          setCars(data.autos)
      }
      else {
          console.error(response)
      }
  }

  const fetchSalespeopleData = async () => {
      const response = await fetch("http://localhost:8090/api/salespeople/")
      if (response.ok) {
          const data = await response.json()
          setSalespersons(data.salespersons)
      }
      else {
          console.error(response)
      }
  }

  const fetchCustomersData = async () => {
      const response = await fetch("http://localhost:8090/api/customers/")
      if (response.ok) {
          const data = await response.json()
          setCustomers(data.customers)
      }
      else {
          console.error(response)
      }
  }


  const handleCar = (event) => {
    const value = event.target.value;
    setCar(value)
  }

  const handleSalesperson = (event) => {
    const value = event.target.value;
    setSalespersons(value)
  }

  const handleCustomer = (event) => {
    const value = event.target.value;
    setCustomer(value)
  }

  const handlePrice = (event) => {
    const value = event.target.value;
    setPrice(value)
  }

  useEffect(() => {
    fetchCarData();
    fetchSalespeopleData();
    fetchCustomersData();
  }, [])

  return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Record a New Sale</h1>
                <form onSubmit={handleSubmit}  id="create-new-sale">
                    <div className="form-floating mb-3">
                        <select  value={auto} onChange={handleCar} required id="vin" name="vin" className="form-select">
                            <option value="">Choose an automobile VIN...</option>
                            {cars?.map(car => {
                                return (
                                    <option value={car.vin} key={car.id }>
                                        {car.vin}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select  value={salespeople} onChange={handleSalesperson} required id="salesperson" name="salesperson" className="form-select">
                            <option value="">Choose a salesperson...</option>
                            {salespersons?.map(person => {
                                return (
                                    <option value={person.employee_id} key={person.id }>
                                        {person.first_name} {person.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <select value={customer} onChange={handleCustomer} required id="customer" name="customer" className="form-select">
                            <option value="">Choose a customer...</option>
                            {customers?.map(cust => {
                                return (
                                    <option value={cust.id} key={cust.id }>
                                        {cust.first_name} {cust.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={price} onChange={handlePrice} placeholder="Price" required type="number" id="price" name="price" className="form-control"/>
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-success btn-lg">Create</button>
                </form>
            </div>
        </div>
    </div>
  )
  }

  export default SalesForm