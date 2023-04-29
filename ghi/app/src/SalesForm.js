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
