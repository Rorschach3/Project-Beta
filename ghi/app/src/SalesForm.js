import React, { useEffect, useState } from 'react';


export default function NewSaleForm({getSales}){
    const [automobiles, setVins] = useState([]);
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

    const fetchAllData = async () => {
        const autoResponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoResponse.ok) {
            const data = await autoResponse.json();
            setVins(data.automobile)
        }

        const salesResponse = await fetch('http://localhost:8090/api/salespeople/');
        if (salesResponse.ok) {
            const data = await salesResponse.json();
            setSalespersons(data.salespeople)
        }

        const customersResponse = await fetch('http://localhost:8090/api/customers/');
        if (customersResponse.ok) {
            const data = await customersResponse.json();
            setCustomers(data.Customer)
        }
    }

    useEffect (() => {
        fetchAllData()
    }, [price])

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
                            <div className="form-floating mb-3">
                                <input value={price} onChange={handlePrice} placeholder="Price" require type="text" name="price" id="price" className="form-control" />
                                <label htmlFor="price">Price</label>
                            </div>

                            <div className='mb-3'>
                                <select value={vin} onChange={handleVin} required name="Vin" id="Vin" className="form-select" />
                                    <option value="">Choose a VIN</option>
                                    {automobiles.map(vin => {
                                        return (
                                            <option value={vin.id} key={vin.id}>
                                                {vin.vin}
                                            </option>
                                        );
                                    })};
                            </div>

                        <div className='mb-3'>
                            <select value={salesperson} onChange={handleSalesperson} required name="salesperson" id="salesperson" className="form-select" />
                                <option value="">Choose a Salesperson</option>
                                {salespersons.map(salesperson => {
                                    return (
                                        <option value={salesperson.id} key={salesperson.id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    );
                                })}
                        </div>


                        <div className='mb-3'>
                            <select value={customer} onChange={handleCustomer} required name="customer" id="customer" className="form-select">
                                <option value="">Choose a Customer</option>
                                {customers.map(customer => {
                                    return (
                                        <option value={customer.id} key={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-secondary">Submit</button>

                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
