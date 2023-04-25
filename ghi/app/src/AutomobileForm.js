import React, { useState } from 'react'


function AutomobileForm(props) {
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {};
        data.color = color;

        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        };

        const response = await fetch(url, fetchConfig);
        if (response.ok) {
            setColor('');
        }
    }
    const [color, setColor] = useState('');
        const handlColorChange = (event) => {
            const value = event.target.value;
            setColor(value)
        }
	return (
		<div className="row">
			<div className="offset-3 col-6">
				<div className="shadow p-4 mt-4">
					<h1>Create an automobile</h1>
					<form onSubmit={handleSubmit} id="create-automobile-form">
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setColor(e.target.value)
								}}
								onFocus={() => {
									setErrorMessage('')
								}}
								value={color}
								placeholder="Color"
								required
								type="text"
								name="color"
								id="color"
								className="form-control"
							/>
							<label htmlFor="color">Color</label>
						</div>
						<div className="form-floating mb-3">
							<input
								onChange={(e) => {
									setYear(e.target.value)
								}}
								onFocus={() => {
									setErrorMessage('')
								}}
								value={year}
								placeholder="Year"
								required
								type="number"
								name="year"
								id="year"
								className="form-control"
							/>
							<label htmlFor="year">Year</label>
						</div>
						<button className="btn btn-primary">Create</button>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AutomobileForm
