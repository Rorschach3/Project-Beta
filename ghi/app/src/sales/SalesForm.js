import React, { useEffect, useState } from 'react';


export default function SalesForm({getSales}){
    const [autoVins, setVins] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [price, setPrice] = useState('');
    const [vin, setVin] = useState('');
    const [salesperson, setSalesperson] = useState('');
    const [customer, setCustomer] = useState('');

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
        setCustomer(value)
    }

    const handlePrice = (event) => {
        const value = event.target.value;
        setPrice(value)
    }
        // Fetches Vin data
    const fetchAllData = async () => {
        const autoResponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            setVins(data.autos)
        }
        // Fetches salesperson data
        const salesResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salesResponse.ok) {
            const data = await salesResponse.json();
            setSalespersons(data.salespeople)
        }
        // Fetches customer data
        const customersResponse = await fetch('http://localhost:8090/api/customers/');
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.Customer)
        }
    }

    useEffect (() => {
        fetchAllData();
        return () => {
            setPrice('');
            setVin('');
            setSalesperson('');
            setCustomer('');
        };
    }, []);

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
                setCustomer('');
                setVin('');
            }
        }
    }

    return (
        <>
            <div className='row'>
                <div className='offset-3 col-6'>
                    <div className='shadow p-4 mt-4'>
                        <h1>Record a new sale</h1>
                        <form onSubmit={handleSubmit} id="record-sale-form">
                            <div className='form-floating mb-3'>
                                <select onChange={handleVin} value={vin} id="vin-select" name='vin-select' className='form-select'>
                                    <option value=''>Choose an automobile VIN</option>
                                    {autoVins.filter(auto => (!auto.sold)).map(auto => {
                                        return (
                                            <option key={auto.id} value={auto.vin}>
                                                {auto.vin}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <select onChange={handleSalesperson} value={salesperson} id="salesperson" name='salesperson' className='form-select'>
                                    <option value=''>Choose a sales person</option>
                                    {salespersons.map(sales => {
                                        const fullName = `${sales.first_name} ${sales.last_name}`
                                        return (
                                            <option key={sales.id} value={sales.id}>
                                                {fullName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <select onChange={handleCustomer} value={customer} id="customer" name='customer' className='form-select'>
                                    <option value=''>Choose a customer</option>
                                    {customers.map(customer => {
                                        const fullName = `${customer.first_name} ${customer.last_name}`
                                        return (
                                            <option key={customer.id} value={customer.id}>
                                                {fullName}
                                            </option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input onChange={handlePrice} value={price} placeholder="price" required type="text" name="price" id="price" className="form-control" />
                                <label htmlFor="model">Price</label>
                            </div>
                            <button className="btn btn-secondary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
