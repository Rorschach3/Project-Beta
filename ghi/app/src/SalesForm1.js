import React, { useEffect, useState } from 'react';

function SalesForm() {
  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [auto, setAuto] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [price, setPrice] = useState('');

  const handleAutomobiles = event => {
    fetchVins();
    setAuto(event.target.value);
  };

  const handleSalesperson = event => {
    setSalesperson(event.target.value);
  };

  const handleCustomer = event => {
    setCustomer(event.target.value);
  };

  const handlePrice = event => {
    setPrice(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = {
      price: price,
      automobile: auto,
      salesperson: salesperson,
      customer: customer
    };

    const postURL = 'http://localhost:8090/api/sales/';
    const fetchOptions = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await fetch(postURL, fetchOptions);
    if (response.ok) {
      setAuto('');
      setSalesperson('');
      setCustomer('');
      setPrice('');
    }
  };

  const fetchVins = async () => {
    const url = 'http://localhost:8090/api/autos/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.automobiles);
    } else {
      console.log('error');
    }
  };

  const fetchSalespeople = async () => {
    const url = 'http://localhost:8090/api/salespeople/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespersons(data.salespersons);
    } else {
      console.log('error');
    }
  };

  const fetchCustomers = async () => {
    const url = 'http://localhost:8090/api/customers/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers);
    } else {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchVins();
    fetchSalespeople();
    fetchCustomers();
  }, []);

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Record A new Sale</h1>
          <form onSubmit={handleSubmit} id="create-sale-form">
            <div className="mb-3">
              <select
                value={auto}
                onChange={handleAutomobiles}
                required
                name="auto"
                id="auto"
                className="form-select"
              >
                <option value="sales">Choose an Automobile Vin</option>
                {automobiles.map(auto => {
                    return (
                      <option value={auto.id} key={auto.id}>
                        {auto.vin}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={salesperson}
                onChange={handleSalesperson}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="sales">Choose A Salesperson</option>
                {salespersons.map(salesperson => {
                  return (
                    <option value={salesperson.id} key={salesperson.id}>
                      {salesperson.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                value={customer}
                onChange={handleCustomer}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="sales">Choose A Customer</option>
                {customers.map(customer => {
                  return (
                    <option value={customer.id} key={customer.id}>
                      {customer.first_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                value={price}
                onChange={handlePrice}
                placeholder="Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
