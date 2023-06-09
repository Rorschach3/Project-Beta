
import React from "react";
import { useEffect, useState } from 'react';


export default function SalesForm({getSales}) {
    const [autoVins, setVins] = useState([]);
    const [vin, setVin] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomers] = useState('');
    const [price, setPrice] = useState('');

    const handleVin = (event) => {
        const value = event.target.value;
        setVin(value);
    }

    const handleSalesperson = (event) => {
        const value = event.target.value;
        setSalesperson(value)
    }

    const handleCustomer = (event) => {
        const value = event.target.value;
        setCustomers(value)
    }

    const handlePrice = (event) => {
        const value = event.target.value;
        setPrice(value)
    }

    const fetchAllData = async () => {
        const autoResponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            setVins(data.autos)
        }

        const salesResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salesResponse.ok) {
            const data = await salesResponse.json();
            setSalesperson(data.salespeople)
        }

        const customersResponse = await fetch('http://localhost:8090/api/customers/');
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.Customer)
        }
    }

    useEffect (() => {
        fetchAllData()
    }, [])


    const handleSubmit = async(event) => {
        event.preventDefault()
        const data = {}

        data.automobile = vin
        data.salesperson = salesperson
        data.customer = customer
        data.price = price

        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const response  = await fetch('http://localhost:8090/api/sales/', fetchConfig)
        if (response.ok) {
            getSales();

            const data = await response.json();
            const deleteUrl = `http://localhost:8100/api/automobiles/${data.automobile.vin}`
            const fetchDeleteConfig = {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const deleteResponse = await fetch(deleteUrl, fetchDeleteConfig);
            if (deleteResponse.ok) {
                setPrice('');
                setSalesperson('');
                setCustomers('');
                setVin('');
            }

        }
    }

    return (
        <>
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4 form-control">
                        <h1>Add a Sale</h1>
                            <form onSubmit={handleSubmit} id="create-sale-form">
                                <div className="mb-3">
                                    <select value={vin} onChange={handleVin} required name="vin" id="vin" className="form-select">
                                        <option value="">Choose an Automobile VIN</option>
                                        {autoVins.filter(auto => (!auto.sold)).map(auto => {
                                            return (
                                                <option key={auto.id} value={auto.vin}>
                                                    {auto.vin}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select value={salesperson} onChange={handleSalesperson} required name="salesperson" id="salesperson" className="form-select">
                                        <option value="">Choose a Salesperson</option>
                                        {salesperson.map(salesperson => {
                                            return (
                                                <option value={salesperson.id} key={salesperson.id}>
                                                    {salesperson.salesperson}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <select value={customer} onChange={handleCustomer} required name="customer" id="customer" className="form-select">
                                        <option value="">Choose a Customer</option>
                                        {customer.map(customer => {
                                            return (
                                                <option value={customer.id} key={customer.id}>
                                                    {customer.customer}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-floating mb-3">
                                    <input onChange={handlePrice} value={price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                                    <label htmlFor="price">Price</label>
                                </div>
                                <button className="btn btn-success btn-lg">Create</button>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
};