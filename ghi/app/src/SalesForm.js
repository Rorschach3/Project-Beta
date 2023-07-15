import React, { useEffect, useState } from 'react';

export default function SalesForm({ createSales }) {
  const [autos, setAutos] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [price, setPrice] = useState('');
  const [vin, setVin] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');

  const handleVin = event => {
    fetchVins();
    setVin(event.target.value);
}
const handleSalesperson = event => {
    setSalesperson(event.target.value);
}
const handleCustomer = event => {
    setCustomer(event.target.value);
}
const handlePrice = event => {
    setPrice(event.target.value);
}


const handleSubmit = async event => {
    event.preventDefault();
    const data = {};
    data.price = price;
    data.automobile = vin;
    data.salesperson = salesperson;
    data.customer = customer;

    const postURL = 'http://localhost:8090/api/sales/';
    const fetchOptions = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json",
        },
    };

    const response = await fetch(postURL, fetchOptions);
    if (response.ok){
        setVin('');
        setSalesperson('');
        setCustomer('');
        setPrice('');
    }
}

const fetchVins = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        setAutos(data.autos)
    } else {
        console.log("error")
    }
}

const fetchSalespeople = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        setSalespeople(data.salespeople)
    } else {
        console.log("error")
    }
}

const fetchCustomers = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);
    if (response.ok){
        const data = await response.json();
        setCustomers(data.customers)
    } else {
        console.log("error")
    }
}

useEffect(() => {
    fetchVins();
    fetchSalespeople()
    fetchCustomers()
}, []);


  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Record a New Sale</h1>
            <form onSubmit={handleSubmit} id="create-new-sale">
              <div className="form-floating mb-3">
                <select
                  onChange={handleVin}
                  value={vin || ''}
                  id="vin"
                  name="vin"
                  className="form-select"
                >
                  <option value="">Choose an automobile VIN...</option>
                    {autos.map(auto => {
                    return (
                      <option key={auto.id} value={auto.vin}>
                        {auto.vin}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  onChange={handleSalesperson}
                  value={salesperson || ''}
                  id="salesperson"
                  name="salesperson"
                  className="form-select"
                >
                  <option value="">Choose a salesperson</option>
                  {salespeople.map(salesperson => {
                    const fullName = `${salesperson.first_name} ${salesperson.last_name}`;
                    return (
                      <option key={salesperson.id} value={salesperson.id}>
                        {fullName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <select
                  onChange={handleCustomer}
                  value={customer || ''}
                  required
                  id="customer"
                  name="customer"
                  className="form-select"
                >
                  <option value="">Choose a customer...</option>
                  {customers.map(customer => {
                    return (
                      <option value={customer.id} key={customer.id}>
                        {customer.first_name} {customer.last_name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePrice}
                  value={price}
                  placeholder="price"
                  required
                  type="text"
                  id="price"
                  name="price"
                  className="form-control"
                />
                <label htmlFor="model">Price</label>
              </div>
              <button className="btn btn-success btn-lg">Create</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
