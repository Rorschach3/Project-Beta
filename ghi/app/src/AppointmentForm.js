import React, { useState, useEffect } from 'react'

export default function AppointmentForm() {
    const [technicians, setTechnicians] = useState([])
    const [dateTime, setDateTime] = useState('')
    const [reason, setReason] = useState('')
    const [vin, setVin] = useState('')
    const [customer, setCustomer] = useState('')
    const [technician, setTechnician] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        async function fetchTechs() {
            try {
                const res = await fetch('http://localhost:8080/api/technicians/')
                if (!res.ok) throw new Error('Failed to load technicians')
                const data = await res.json()
                setTechnicians(data.technicians)
            } catch (err) {
                console.error(err)
                setErrorMessage('Could not load technicians')
            }
        }
        fetchTechs()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        const payload = {
            date_time: dateTime,
            reason,
            vin,
            customer,
            technician,
        }

        try {
            const res = await fetch('http://localhost:8080/api/appointments/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            })
            if (!res.ok) {
                const err = await res.json().catch(() => ({}))
                throw new Error(err.message || 'Failed to create appointment')
            }
            // Clear on success
            setCustomer('')
            setReason('')
            setVin('')
            setDateTime('')
            setTechnician('')
        } catch (err) {
            console.error(err)
            setErrorMessage(err.message)
        }
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Service Appointment</h1>
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}
                    <form onSubmit={handleSubmit} id="create-appointment-form">
                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="customer"
                                className="form-control"
                                placeholder="Customer"
                                required
                                value={customer}
                                onChange={(e) => setCustomer(e.target.value)}
                            />
                            <label htmlFor="customer">Customer</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="text"
                                id="reason"
                                className="form-control"
                                placeholder="Reason"
                                required
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                            <label htmlFor="reason">Reason</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input
                                type="number"
                                id="vin"
                                className="form-control"
                                placeholder="VIN"
                                required
                                value={vin}
                                onChange={(e) => setVin(e.target.value)}
                            />
                            <label htmlFor="vin">VIN</label>
                        </div>



                        <select
                            value={vin}
                            onChange={(e) => setVin(e.target.value)}
                            required
                            name="vin"
                            id="vin"
                            className="form-select"
                        >
                            <option value="">Enter VIN number</option>
                            {vin.map(vinItem => {
                                return (
                                    <option value={vinItem.id} key={vinItem.id}>
                                        {vinItem.name}
                                    </option>
                                );
                            })}
                        </select>




                        <div className="form-floating mb-3">
                            <input
                                type="datetime-local"
                                id="dateTime"
                                className="form-control"
                                placeholder="Date & Time"
                                required
                                value={dateTime}
                                onChange={(e) => setDateTime(e.target.value)}
                            />
                            <label htmlFor="dateTime">Date & Time</label>
                        </div>

                        <div className="mb-3">
                            <select
                                id="technician"
                                className="form-select"
                                required
                                value={technician}
                                onChange={(e) => setTechnician(e.target.value)}
                            >
                                <option value="">Choose a Technician</option>
                                {technicians.map((tech) => (
                                    <option key={tech.id} value={tech.id}>
                                        {tech.first_name} {tech.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
