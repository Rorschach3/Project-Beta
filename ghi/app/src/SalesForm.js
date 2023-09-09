import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



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
            setAuto([]);
            setSalespeople([]);
            setCustomer([]);
            setPrice("");
        }
        else if (carResponse.ok) {
            const updateCars = cars.filter(object => object.vin !== carVin)
            setCars(updateCars)
            setAuto([]);
            setSalesperson([]);
            setCustomer([]);
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
    const [salesperson, setSalesperson] = useState([])
    const [customers, setCustomers] = useState([])
    const [auto, setAuto] = useState([])
    const [salespeople, setSalespeople] = useState([])
    const [customer, setCustomer] = useState([])
    const [price, setPrice] = useState("")


    // fetches data from the backend, response ok, data is set to the state
    const fetchAllData = async () => {
        const autoResponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            setAuto(data.auto)
        }

        const salesResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salesResponse.ok) {
            const data = await salesResponse.json();
            setSalespeople(data.salespeople)
        }

        const customersResponse = await fetch('http://localhost:8090/api/customers/');
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomer(data.Customer)
        }
    }


    const handleCar = (event) => {
        const value = event.target.value;
        setCars(value)
    }

    const handleSalesperson = (event) => {
        const value = event.target.value;
        setSalespeople(value)
    }

    const handleCustomer = (event) => {
        const value = event.target.value;
        setCustomers(value)
    }

    const handlePrice = (event) => {
        const value = event.target.value;
        setPrice(value)
    }

    useEffect(() => {
        fetchAllData()
    }, [price])

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a New Sale</h1>
                    <form onSubmit={handleSubmit}id="create-new-sale">
                        <div className="form-floating mb-3">
                            <select onChange={handleCar} value={cars || ''} required id="vin" name="vin" className="form-select">
                                <option value="">Choose an automobile VIN...</option>
                                {cars.filter(auto => car.sold === false).map(car => {
                                    return (
                                        <option value={car.vin} key={car.id }>
                                            {car.vin}
                                        </option>
                                    );
                                })}
                            </select>
                            <div className='form-floating mb-3'>
                                    <select onChange={handleSalesperson} value={salesperson || ''} id="salesperson" name='salesperson' className='form-select'>
                                        <option value=''>Choose a salesperson</option>
                                        {salesperson.map(person => {
                                            return (
                                                <option key={person.id} value={person.id}>
                                                    {person.first_name} {person.last_name}
                                                </option>
                                            )
                                        })}
                                    </select>
                                </div>
                        <div className="form-floating mb-3">
                            <select value={customers} onChange={handleCustomer} required id="customer" name="customer" className="form-select">
                                <option value="">Choose a customer...</option>
                                {customers.map(cust => {
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
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default SalesForm