import React from "react";
import { useState } from 'react';

export default function CustomerForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');


    const handleFirstName = (event) => {
        const value = event.target.value;
        setFirstName(value);
    }

    const handleLastName = (event) => {
        const value = event.target.value;
        setLastName(value);
    }

    const handleAddress = (event) => {
        const value = event.target.value;
        setAddress(value);
    }

    const handlePhoneNumber = (event) => {
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

            setFirstName('');
            setLastName('');
            setAddress('');
            setPhoneNumber('');
        }
    }

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4 form-control">
                    <header className="flex justify-between items-center mb-4">
                        <h1 className="text-2x1">Add a Customer</h1>
                        </header>
                            <form onSubmit={handleSubmit} id="create-customer-form">
                                <div className="form-floating mb-3">
                                    <input onChange={handleFirstName} value={firstName} required type="text" name="firstname" id="firstname" className="bordder-slate-300 rounded px-2 py-1 outline-none focus-within:border-slate-100 form-control" />
                                    <label htmlFor="firstname">First Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleLastName} value={lastName} required type="text" name="lastname" id="lastname" className="form-control" />
                                    <label htmlFor="lastname">Last Name</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handleAddress} value={address} required type="text" name="address" id="address" className="form-control" />
                                    <label htmlFor="address">Address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handlePhoneNumber} value={phoneNumber} required type="text" name="phonenumber" id="phonenumber" className="form-control" />
                                    <label htmlFor="phonenumber">Phone Number</label>
                                </div>
                                <button className="btn btn-success btn-lg">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    };
