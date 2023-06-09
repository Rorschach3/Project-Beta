import React from 'react';
import { useEffect, useState} from 'react';

function TechnicianForm() {
    const [firstName, setFirst] = useState("");
    const [lastName, setLast] = useState("");
    const [employeeId, setId] = useState("");


    const handleFirst = event => {
        setFirst(event.target.value);
    }
    const handleLast = event => {
        setLast(event.target.value);
    }
    const handleId = event => {
        setId(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const postURL = 'http://localhost:8080/api/technicians/';
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const TechResponse = await fetch(postURL, fetchOptions);
        if (TechResponse.ok){
            setFirst('');
            setLast('');
            setId('');
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Technician</h1>
                    <form onSubmit={handleSubmit} id="create-technician-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirst} placeholder="First Name" required type="text" name="firstName" id="firstName" className="form-control" />
                            <label htmlFor="firstName">First Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLast} placeholder="Last Name" required type="text" name="lastName" id="lastName" className="form-control" />
                            <label htmlFor="lastName">Last Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={employeeId} onChange={handleId} placeholder="Employee ID" required type="number" name="employeeId" id="employeeId" className="form-control" />
                            <label htmlFor="employeeId">Employee ID</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TechnicianForm;
