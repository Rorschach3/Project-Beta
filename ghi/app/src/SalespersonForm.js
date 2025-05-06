import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SalespersonCreateForm = () => {
	const [salesPerson, setSalesPerson] = useState('')
	const [employeeId, setEmployeeId] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setErrorMessage('') // clear any prior error

		const firstName = salesPerson.trim().split(' ')[0] || salesPerson
		const lastName = salesPerson.trim().split(' ')[1] || ''

		const data = {
			first_name: firstName,
			last_name: lastName,
			employee_id: Number(employeeId),
		}

		try {
			const response = await fetch('http://localhost:8090/api/salespeople/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (response.ok) {
				// success: reset and navigate
				// setSalesPerson('')
				// setEmployeeId('')
				navigate('/sales/salespeople')
			} else {
				const errPayload = await response.json().catch(() => ({}))
				setErrorMessage(errPayload.message || errPayload.detail || 'Unknown error')
			}
		} catch (networkError) {
			console.error('Network error:', networkError)
			setErrorMessage('Network error—please try again.')
		}
	}

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Add a Sales Person</h1>
					<form onSubmit={handleSubmit} id="create-sales-person-form">
						<div className="form-floating mb-3">
							<input
								type="text"
								id="salesperson"
								name="salesperson"
								className="form-control"
								placeholder="Jane Doe"
								required
								value={salesPerson}
								onChange={(e) => setSalesPerson(e.target.value)}
							/>
							<label htmlFor="salesperson">Name</label>
						</div>

						<div className="form-floating mb-3">
							<input
								type="number"
								id="employee_id"
								name="employeeid"
								className="form-control"
								placeholder="123"
								required
								value={employeeId}
								onChange={(e) => setEmployeeId(e.target.value)}
							/>
							<label htmlFor="employee_id">Employee ID</label>
						</div>

						{errorMessage && (
							<div
								className="alert alert-danger mb-4 ms-2"
								id="error-message"
							>
								{errorMessage}
							</div>
						)}

						<button type="submit" className="btn btn-primary">
							Create
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default SalespersonCreateForm
