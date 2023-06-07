import React, { useState } from "react";
export default function CustomerForm({getCustomer}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const handleFirstNameChange = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }
    const handleLastNameChange = (event) => {
        const value = event.target.value;
        setLastName(value);
    }
    const handleAddressChange = (event) => {
        const value = event.target.value;
        setAddress(value);
    }
    const handlePhoneNumberChange = (event) => {
        const value = event.target.value;
        setPhoneNumber(value);
    }
    async function handleSubmit(event) {
        event.preventDefault();
        const data = {};
        data.first_name = firstName;
        data.last_name = lastName;
        data.address = address;
        data.phone_number = phoneNumber;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response = await fetch('http://localhost:8090/api/customers/', fetchConfig)
        if (response.ok) {
            await response.json();
            setFirstName('')
            setLastName('')
            setAddress('')
            setPhoneNumber('')
            getCustomer();
        }
    }
    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Customer</h1>
                        <form onSubmit={handleSubmit} id="create-customer-form">
                            <div className="form-floating mb-3">
                                <input onChange={handleFirstNameChange} value={firstName} required type="text" name="firstname" id="firstname" className="form-control" />
                                <label htmlFor="firstname">First Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleLastNameChange} value={lastName} required type="text" name="lastname" id="lastname" className="form-control" />
                                <label htmlFor="lastname">Last Name</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handleAddressChange} value={address} required type="text" name="address" id="address" className="form-control" />
                                <label htmlFor="address">Address</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePhoneNumberChange} value={phoneNumber} required type="text" name="phonenumber" id="phonenumber" className="form-control" />
                                <label htmlFor="phonenumber">Phone Number</label>
                            </div>
                            <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
