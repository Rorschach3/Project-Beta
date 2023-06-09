import React from 'react'

function AutomobileList(props) {
	return (
		<>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>VIN</th>
						<th>Color</th>
						<th>Year</th>
						<th>Model</th>
						<th>Manufacturer</th>
					</tr>
				</thead>
				<tbody>
					{props.automobiles?.map((automobile) => {
						return (
							<tr key={automobile.id}>
								<td>{automobile.color}</td>
								<td>{automobile.year}</td>
								<td>{automobile.model.name}</td>
								<td>{automobile.model.manufacturer.name}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

export default AutomobileList
