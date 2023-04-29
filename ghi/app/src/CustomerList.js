import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'

function CustomerList(props) {
	const [customers, setCustomers] = useState([])

	const fetchData = async () => {
		const url = 'http://localhost:8090/api/customers/'
		const response = await fetch(url)
		if (response.ok) {
			const data = await response.json()
			setCustomers(data.customers)
		}
	}
	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div>
			<br />
			<div className="d-grid gap-5 d-sm-flex justify-content-sm-center">
				<Link
					to="/customers/new"
					className="btn btn-primary btn-lg px-4 gap-3">
					Click here to create a Customer
				</Link>
			</div>
			<br />
			<table className="table table-striped">
				<thead>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Address</th>
						<th>Phone Number</th>
					</tr>
				</thead>
				<tbody>
					{customers.map((customers) => {
						return (
							<tr key={customers.id}>
								<td>{customers.first_name}</td>
								<td>{customers.last_name}</td>
								<td>{customers.address}</td>
								<td>{customers.phone_number}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</div>
	)
}
export default CustomerList


