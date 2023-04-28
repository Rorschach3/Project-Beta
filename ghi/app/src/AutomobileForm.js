import React, { useState } from 'react'

function AutomobileForm(props) {
	const handleSubmit = async (event) => {
		event.preventDefault()
		const data = {
			color: color,
		}

		const url = 'http://localhost:8100/api/automobiles/'
		const fetchConfig = {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			},
		}

		const response = await fetch(url, fetchConfig)
		if (response.ok) {
			setColor('')
		}
	}

	const [color, setColor] = useState('')

	const handleColorChange = (event) => {
		const value = event.target.value
		setColor(value)
	}
	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="color">Color</label>
				<input
					type="text"
					id="color"
					value={color}
					onChange={handleColorChange}
				/>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}



export default AutomobileForm
