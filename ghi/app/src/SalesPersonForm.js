import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SalespersonCreateForm = () => {
	const [salesPerson, setSalesPerson] = useState('')
	const [employeeid, setEmployeeid] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()
	const handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			name: salesPerson,
			employee_id: employeeid,
		}
		const postSalesPerson = 'http://localhost:8090/api/salespersons/'
		const fetchConfig = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: { 'Content-Type': 'application/json' },
		}
		const response = await fetch(postSalesPerson, fetchConfig)
		if (response.ok) {
		} else {
			const error = await response.json()
			setErrorMessage(error.detail)
		}
		// setSalesPerson('');
		// setEmployeeid('');
		navigate(`/sales/`)
	}
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a Sales Person</h1>
					<form onSubmit={handleSubmit} id="create-sales-person-form">
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setSalesPerson(e.target.value)
								}}
								onFocus={() => {
									setErrorMessage('')
								}}
								value={salesPerson}
								placeholder="Name"
								required
								type="text"
								name="salesperson"
								id="salesperson"
								className="form-control"
							/>
							<label htmlFor="salesperson">Name</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setEmployeeid(e.target.value)
								}}
								onFocus={() => {
									setErrorMessage('')
								}}
								value={employeeid}
								placeholder="id"
								required
								type="id"
								name="employeeid"
								id="employee_id"
								className="form-control"
							/>
							<label htmlFor="employee_id">Employee id</label>
						</div>
						<div
							className={`alert alert-danger mb-4 ms-2 ${
								errorMessage ? '' : 'd-none'
							}`}
							id="error-message">
							{errorMessage}
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SalespersonCreateForm
