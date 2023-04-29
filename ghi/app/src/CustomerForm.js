import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function CustomerForm() {
	const [first_name, setFirstName] = useState('')
	const [last_name, setLastName] = useState('')
	const [address, setAddress] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')
	const navigate = useNavigate()

	const handleChangeFirstName = (event) => {
		const value = event.target.value
		setFirstName(value)
	}

	const handleChangeLastName = (event) => {
		const value = event.target.value
		setLastName(value)
	}

	const handleChangeAddress = (event) => {
		const value = event.target.value
		setAddress(value)
	}

	const handleChangePhoneNumber = (event) => {
		const value = event.target.value
		setPhoneNumber(value)
	}

	const handleSubmit = async (event) => {
		event.preventDefault()

		const data = {}

		data.first_name = first_name
		data.last_name = last_name
		data.address = address
		data.phone_number = phoneNumber

		const customerUrl = 'http://localhost:8090/api/customers/'

		const fetchConfig = {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const customerResponse = await fetch(customerUrl, fetchConfig)

		if (customerResponse.ok) {
			const addCustomer = await customerResponse.json()

			setFirstName('')
			setLastName('')
			setAddress('')
			setPhoneNumber('')
			navigate('/')
		}
	}

	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4 rounded-3">
					<div className="d-flex mb-3 align-items-center justify-content-center">
						<h1>Add a Customer</h1>
					</div>
					<form onSubmit={handleSubmit} className="row g-3">
						<div className="col-12 form-floating">
							<input
								value={first_name}
								onChange={handleChangeFirstName}
								placeholder="FirstName"
								required
								type="text"
								name="first_name"
								id="first_name"
								className="form-control"
							/>
							<label className="mx-2" htmlFor="first_name">
								First Name
							</label>
						</div>
						<div className="col-12 form-floating">
							<input
								value={last_name}
								onChange={handleChangeLastName}
								placeholder="Last Name"
								required
								type="text"
								name="last_name"
								id="last_name"
								className="form-control"
							/>
							<label className="mx-2" htmlFor="last_name">
								Last Name
							</label>
						</div>
						<div className="col-md-12 form-floating">
							<input
								value={address}
								onChange={handleChangeAddress}
								placeholder="Address"
								type="text"
								name="address"
								id="address"
								className="form-control"
							/>
							<label className="mx-2" htmlFor="address">
								Address
							</label>
						</div>
						<div className="col-12 form-floating">
							<input
								value={phoneNumber}
								onChange={handleChangePhoneNumber}
								placeholder="Phone Number"
								required
								type="tel"
								name="phone_number"
								id="phone_number"
								className="form-control"
							/>
							<label className="mx-2" htmlFor="phone_number">
								Phone Number{' '}
							</label>
						</div>

						<div className="d-grid col-md-6 mx-auto">
							<button className="btn btn-outline-primary">
								Add Customer
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default CustomerForm