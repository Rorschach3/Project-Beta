import React from 'react';
import { useEffect, useState} from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);
    const [dateTime, setDate] = useState("");
    const [reason, setReason] = useState("");
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [technician, setTechnician] = useState("");

    const handleDate = event => {
        setDate(event.target.value);
    }
    const handleReason = event => {
        setReason(event.target.value);
    }
    const handleVin = event => {
        setVin(event.target.value);
    }
    const handleCustomer = event => {
        setCustomer(event.target.value);
    }
    const handleTechnician = event => {
        setTechnician(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        const data = {};
        data.date_time = dateTime;
        data.reason = reason;
        data.vin = vin;
        data.customer = customer;
        data.technician = technician;

        const postURL = 'http://localhost:8080/api/appointments/';
        const fetchOptions = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type" : "application/json",
            },
        };

        const appointmentResponse = await fetch(postURL, fetchOptions);
        if (appointmentResponse.ok){
            setDate('');
            setReason('');
            setVin('');
            setCustomer('');
            setTechnician('');
        }
    }

    const fetchTechs = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const techResponse = await fetch(url);
        if (techResponse.ok){
            const modelData = await techResponse.json();
            setTechnicians(modelData.technicians)
        } else {
            console.log("error")
        }
    }

    useEffect(() => {
        fetchTechs();
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a service appointment</h1>
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input value={dateTime} onChange={handleDate} placeholder="Date Time" required type="datetime-local" name="dateTime" id="dateTime" className="form-control" />
                            <label htmlFor="dateTime">Date & Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={reason} onChange={handleReason} placeholder="Reason" required type="text" name="reason" id="reason" className="form-control" />
                            <label htmlFor="reasoon">Reason</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVin} placeholder="Vin" required type="number" name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">Vin</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={customer} onChange={handleCustomer} placeholder="Customer" required type="text" name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="mb-3">
                            <select value={technician} onChange={handleTechnician} required name="technician" id="technician" className="form-select">
                                <option value="">Choose a Technician</option>
                                {technicians.map(technician => {
                                    return (
                                        <option value={technician.id} key={technician.id}>
                                            {technician.first_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AppointmentForm;
