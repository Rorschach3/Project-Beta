import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
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
                                {cars.map(car => {
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
export default SalesForm
=======
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function SalesForm() {
	const [price, setPrice] = useState('')
	const [automobile, setAutomobile] = useState('')
	const [automobiles, setAutomobiles] = useState([])
	const [customer, setCustomer] = useState('')
	const [customers, setCustomers] = useState([])
	const [salesperson, setSalesperson] = useState('')
	const [salespersons, setSalespersons] = useState([])
	const navigate = useNavigate()

	const handleChangePrice = (event) => {
		const value = event.target.value
		setPrice(value)
	}

	const handleChangeAutomobile = (event) => {
		const value = event.target.value
		setAutomobile(value)
	}

	const handleChangeSalesperson = (event) => {
		const value = event.target.value
		setSalesperson(value)
	}

	const handleChangeCustomer = (event) => {
		const value = event.target.value
		setCustomer(value)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const data = {}

		data.price = price
		data.automobile = automobile
		data.salesperson = salesperson
		data.customer = customer

		const saleUrl = 'http://localhost:8090/api/sales/'

		const fetchConfig = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const saleResponse = await fetch(saleUrl, fetchConfig)

		if (saleResponse.ok) {
			const addSales = await saleResponse.json()

			setPrice('')
			setAutomobile('')
			setSalesperson('')
			setCustomer('')

			navigate('/sales')
		}
	}

	const fetchData = async () => {
		const automobileUrl = 'http://localhost:8100/api/automobiles/'
		const automobileResponse = await fetch(automobileUrl)

		if (automobileResponse.ok) {
			const data = await automobileResponse.json()
			setAutomobiles(data.autos)
		}

		const salespersonUrl = 'http://localhost:8090/api/salespeople/'
		const salespeopleResponse = await fetch(salespersonUrl)

		if (salespeopleResponse.ok) {
			const data = await salespeopleResponse.json()
			setSalespersons(data.salesperson)
		}

		const customerUrl = 'http://localhost:8090/api/customers/'
		const customerResponse = await fetch(customerUrl)

		if (customerResponse.ok) {
			const data = await customerResponse.json()
			setCustomers(data.customers)
		}
	}

	useEffect(() => {
		fetchData()
	}, []);

	return (
		<div className="row">
			<div className="offset-1 col-10">
				<div className="shadow p-4 mt-4 rounded-3">
					<div className="d-flex mb-3 align-items-center justify-content-center">
						<h1>Record a sale</h1>
					</div>
					<form onSubmit={handleSubmit} className="row g-3">
						<div className="col-12 form-floating">
							<input
								value={price}
								onChange={handleChangePrice}
								placeholder="Price"
								required
								type="text"
								id="price"
								className="form-control"
							/>
							<label className="mx-2" htmlFor="price">
								Price
							</label>
						</div>
						<div className="col-md-12 form-floating">
							<input
								onChange={handleChangeAutomobile}
								value={automobile}
                                name="automobile"
								id="automobile"
								className="form-select">
								<option value="">Choose an Automobile</option>
                        {automobiles.map((auto) => (
                        <option key={auto.vin} value={auto.vin}>
                        {auto.year} {auto.model.manufacturer.name} {auto.model.name} - {auto.color}
                        </option>
                        ))}
                        </input>
                        </div>
                        <div className="col-md-12 form-floating">
                        <select
                                    onChange={handleChangeSalesperson}
                                    value={salesperson}
                                    name="salesperson"
                                    id="salesperson"
                                    className="form-select"
                                >
                        <option value="">Choose a Salesperson</option>
                        {salespersons.map((person) => (
                        <option key={person.employee_id} value={person.employee_id}>
                        {person.first_name} {person.last_name} - Employee ID:({person.employee_id})
                        </option>
                        ))}
                        </select>
                        </div>
                        <div className="col-md-6">
                        <div className="form-floating">
                        <select
                                    onChange={handleChangeCustomer}
                                    value={customer}
                                    name="customer"
                                    id="customer"
                                    className="form-select"
                                    >
                        <option value="">Choose a Customer</option>
                        {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                        {customer.first_name} {customer.last_name}
                        </option>
                        ))}
                        </select>
                        </div>
                        </div>
                        
="automobile"
id="automobile"
className="form-select"{>}
</form>
<option value="">Choose an Automobile</option>
{automobiles.map((auto) => (
<option key={auto.vin} value={auto.vin}>
{auto.year} {auto.model.manufacturer.name} {auto.model.name} - {auto.color}
</option>
))}



</select>

</div>
<div className="col-md-12 form-floating">
<select
            onChange={handleChangeSalesperson}
            value={salesperson}
            name="salesperson"
            id="salesperson"
            className="form-select">
<option value="">Choose a Salesperson</option>
{salespersons.map((person) => (
<option key={person.employee_id} value={person.employee_id}>
{person.first_name} {person.last_name} - Employee ID:({person.employee_id})
</option>
))}
</select>
</div>
<div className="col-md-6">
<div className="form-floating">
<select
                onChange={handleChangeCustomer} value={customer} name="customer" id="customer" className="form-select"> 
                <option value="">Choose a Customer</option>
{customers.map((customer) => (
<option key={customer.id} value={customer.id}>
{customer.first_name} {customer.last_name}
</option>
))}
</select>
</div>
</div>
        <div className="d-grid col-md-6 mx-auto">
            <button className="btn btn-outline-primary">Record Sale</button>
        </div>
        </div>
    )
}




export default SalesForm
>>>>>>> refs/remotes/Master/main
