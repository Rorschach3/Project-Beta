import React, { useState } from "react"

export default function SalesPersonForm(){
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [employeeId, setEmployeeId] = useState('');


    const handleFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleEmployeeId = (event) => {
        const value = event.target.value;
        setEmployeeId(value)
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {};

        data.first_name = firstName;
        data.last_name = lastName;
        data.employee_id = employeeId;

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch('http://localhost:8090/api/salespeople/', fetchConfig);
        if (response.ok) {
            await response.json();

            setEmployeeId('');
            setFirstName('');
            setLastName('');
        }
    }

    return (
        <>
            <div className="row">
            <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create A New Salesperson</h1>
                        <form onSubmit={handleSubmit} id="create-employee-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFirstName} value={firstName} required type="text" name="firstname" id="firstname" className="form-control" />
                                <label htmlFor="firstname">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleLastName} value={lastName} required type="text" name="lastname" id="lastname" className="form-control" />
                                <label htmlFor="lastname">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleEmployeeId} value={employeeId} required type="text" name="employeeId" id="employeeId" className="-cformontrol" />
                                <label htmlFor="employeeId">Employee Id</label>
                            </div>
                            <button className="btn btn-secondary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

