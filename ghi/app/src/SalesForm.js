import React, { useEffect, useState } from 'react';

export default function NewSaleForm({ getSales }) {
  const [automobiles, setAutomobile] = useState([]);
  const [salespeople, setSalespeople] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [price, setPrice] = useState('');
  const [auto, setAuto] = useState('');
  const [salesperson, setSalesperson] = useState('');
  const [customer, setCustomer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleAutomobiles = async () => {
    const getAutomobilesUrl = 'http://localhost:8090/api/automobiles/';
    const response = await fetch(getAutomobilesUrl);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };

  const handlesalesperson = async () => {
    const getSalesPersonUrl = 'http://localhost:8090/api/sales-persons/';
    const response = await fetch(getSalesPersonUrl);
    if (response.ok) {
      const data = await response.json();
      setSalesPersons(data.sales_person);
    }
  };


  const handleCustomer = async () => {
    const getCustomerNamesUrl = 'http://localhost:8090/api/customers/';
    const response = await fetch(getCustomerNamesUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomerNames(data.customer);
    }
  };


  const handleSales = async () => {
    const getSalesNamesUrl = 'http://localhost:8090/api/sales/';
    const response = await fetch(getSaleNamesUrl);
    if (response.ok) {
      const data = await response.json();
      setSalesNames(data.Sales);
    }
  };




  const handlePrice = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleAutomobile = (event) => {
    const value = event.target.value;
    setAutomobile(value);
  };




  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    // Fetch automobiles
    const automobilesResponse = await fetch('http://localhost:8100/api/automobiles/');
    if (automobilesResponse.ok) {
      const automobile_data = await automobilesResponse.json();
      setAutomobile(automobile_data);
    }

    // Fetch salespeople
    const salespeopleResponse = await fetch('http://localhost:8090/api/salespeople/');
    if (salespeopleResponse.ok) {
      const salesperson_data = await salespeopleResponse.json();
      setSalesperson(salesperson_data);
    }

    // Fetch customers
    const customersResponse = await fetch('http://localhost:8090/api/customers/');
    if (customersResponse.ok) {
      const customer_data = await customersResponse.json();
      setCustomers(customer_data);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      automobile: auto,
      salesperson: salesperson,
      customer: customer,
      price: price,
    };

    const fetchConfig = {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('http://localhost:8090/api/sales/', fetchConfig);
    if (response.ok) {
      getSales();

      const responseData = await response.json();
      const deleteUrl = `http://localhost:8100/api/automobiles/${responseData.automobile.vin}`;
      const fetchDeleteConfig = {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const deleteResponse = await fetch(deleteUrl, fetchDeleteConfig);
      if (deleteResponse.ok) {
        setPrice('');
        setSalesperson('');
        setCustomer('');
        setAuto('');
      }
    }
  };

return (
<div className="row">
  <div className="offset-1 col-10">
    <div className="shadow p-4 mt-4 rounded-3">
      <div className="d-flex mb-3 align-items-center justify-content-center">
        <h1>Record a sale</h1>
        </div>
        <form onSubmit={handleSubmit} id='SalesForm' className="shadow p-4 mt-4 rounded-3"></form>
  </div>
</div>


        <div className='col-md-6'>
          <div className='col-md-12 form-floating'>
            <select onChange={handleAutomobile} value={auto} placeholder='automobile' name='automobile' id='automobile' className='form-select'>
              <option value=''>Choose an Automobile</option>
                {automobiles.map((auto) => {
                  return (
                  <option key={auto.vin} value={auto.vin}>
                    {auto.year} {auto.model.manufacturer.name} {auto.model.name} - {auto.color}
                    </option>
                    );
                    })}
                    </select>
                    </div>


                          <div className='col-md-6'>
                        <div className='form-floating'>
                    <select onChange={handleSalesperson} value={salesperson} placeholder='salesperson' name='salesperson' id='salesperson' className='form-select'>
                      <option value=''>Choose a Salesperson</option>
                      {salespeople.map((person) => {
                        return (
                        <option key={person.employee_id} value={person.employee_id}>
                          {person.first_name} {person.last_name} - Employee ID:({person.employee_id})
                          </option>
                          );
                          })}
                          </select>
                          
                          </div>


  
                          <div className='col-md-6'>
                          <div className='form-floating'>
                        <select onChange={handleChangeAutomobile} value={automobile} placeholder="automobile" name="automobile" id="automobile" className="form-select" />
                          </div>
                                <option value="">Choose an Automobile</option>
                                {automobiles.map(auto => {
                                     return (
                                        <option key={auto.vin} value={auto.vin}>
                                            {auto.year} {auto.model.manufacturer.name} {auto.model.name} - {auto.color}
                                        </option>
                                    )
                                })}
                              </div>


                          <div className='col-md-6'>
                            <div className='form-floating'>
                              <select onChange={handleCustomer} value={customer} placeholder='customer' name='customer' id='customer' className='form-select'>
                                <option value=''>Choose a Customer</option>
                                {customers.map((id) => {
                                  return (
                                  <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}
                                  </option>
                                  );
                                  })}
                                  </select>
                                  </div>
                                  </div>

                                  <div className="form-floating mb-3">
              <input onChange={(e) => {
                setPurchasePrice(e.target.value);}}
                value={purchasePrice}
                placeholder="Sales Price"
                requiredtype="number"
                name="price"
                id="price"
                className="form-control"
                />
                <label htmlFor="price">Sales price</label>
                <div className='form-floating'>
                  <input onChange={handlePrice} value={price} placeholder='price' required type='text' name='price' id='price' className='form-control' />
                <label htmlFor="price">Price</label>
                <div
              className={`alert alert-primary mb-4 ms-2 ${
                errorMessage ? '' : 'd-none'}`}id="error-message">
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>

export default SalesForm
