<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesForm = () => {
  const navigate = useNavigate();
  const [automobile, setAutomobile] = useState('');
  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalesperson] = useState('');
  const [salespeople, setSalespeople] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerNames, setCustomerNames] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadAutomobileNames = async () => {
    const getAutomobilesUrl = 'http://localhost:8090/api/automobiles/';
    const response = await fetch(getAutomobilesUrl);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };
  async function loadSalespersons() {
        const getSalespersonUrl = 'http://localhost:8090/api/salespersons/';
        const response = await fetch(getSalespersonUrl);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salesperson);
        }
    }
  const loadCustomerNames = async () => {
    const getCustomerNamesUrl = 'http://localhost:8090/api/customers/';
    const response = await fetch(getCustomerNamesUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomerNames(data.customer);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postSalesRecordUrl = 'http://localhost:8090/api/sales/';
    const data = {
      automobile: automobile,
      sales_person: salespeople,
      customer: customerName,
      price: purchasePrice,
    }
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(postSalesRecordUrl, fetchConfig);
    if (response.ok) {
      const deleteAutomobileUrl = `http://localhost:8100/api/automobiles/${automobile}/`
      const fetchConfig = {
        method: 'DELETE'
      }
    const response = await fetch(deleteAutomobileUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
      }
      


      navigate(`/sales/`);
    }

    else {
      const error = await response.json();
      setErrorMessage(error.detal);
    }
    setAutomobile('');
    setAutomobiles([]);
    setSalesperson('');
    setSalespeople([]);
    setCustomerName('');
    setCustomerNames([]);
    setPurchasePrice('');
  }

  useEffect(() => {
    loadAutomobileNames();
    loadSalesperson();
    loadCustomerNames();
  }, []);
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Sales Record</h1>
          <form onSubmit={handleSubmit} id="create-sales-record-form">
            <div className="form-floating mb-3">
            <select
                onChange={(e) => setAutomobile(e.target.value)}
                value={automobile}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="automobile">Choose an automobile</option>
                {automobiles.map((a) => (
                  <option key={a.vin} value={a.vin}>
                    {a.vin}
                  </option>
                ))}
              </select> 
             </div>
             <div className="mb-3">
              <select
                onChange={(e) => setSalesperson(e.target.value)}
                value={salespeople}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="salesperson">Choose a salesperson</option>
                {salespersons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="customer">Choose a customer</option>
                {customerNames.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => {
                  setPurchasePrice(e.target.value);
                }}
                value={purchasePrice}
                placeholder="Sales Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Sales price</label>
            </div> 
            <div
              className={`alert alert-primary mb-4 ms-2 ${
                errorMessage ? '' : 'd-none'
              }`}
              id="error-message"
            >
              {errorMessage}
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

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
