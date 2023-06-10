import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SalesForm = () => {
  const navigate = useNavigate();
  const [automobile, setAutomobile] = useState('');
  const [automobiles, setAutomobiles] = useState([]);
  const [salespersons, setSalesperson] = useState('');
  const [salespeople, setSalespeople] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerNames, setCustomerNames] = useState([]);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const loadAutomobileNames = async () => {
    const getAutomobilesUrl = 'http://localhost:8090/api/automobiles/';
    const response = await fetch(getAutomobilesUrl);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    }
  };
  async function loadSalespersons() {
        const getSalespersonUrl = 'http://localhost:8090/api/salespersons/';
        const response = await fetch(getSalespersonUrl);
        if (response.ok) {
            const data = await response.json();
            setSalespeople(data.salesperson);
        }
    }
  const loadCustomerNames = async () => {
    const getCustomerNamesUrl = 'http://localhost:8090/api/customers/';
    const response = await fetch(getCustomerNamesUrl);
    if (response.ok) {
      const data = await response.json();
      setCustomerNames(data.customer);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postSalesRecordUrl = 'http://localhost:8090/api/sales/';
    const data = {
      automobile: automobile,
      sales_person: salespeople,
      customer: customerName,
      price: purchasePrice,
    }
    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    }
    const response = await fetch(postSalesRecordUrl, fetchConfig);
    if (response.ok) {
      const deleteAutomobileUrl = `http://localhost:8100/api/automobiles/${automobile}/`
      const fetchConfig = {
        method: 'DELETE'
      }
    const response = await fetch(deleteAutomobileUrl, fetchConfig);
      if (response.ok) {
        const data = await response.json();
      }
      


      navigate(`/sales/`);
    }

    else {
      const error = await response.json();
      setErrorMessage(error.detal);
    }
    setAutomobile('');
    setAutomobiles([]);
    setSalesperson('');
    setSalespeople([]);
    setCustomerName('');
    setCustomerNames([]);
    setPurchasePrice('');
  }

  useEffect(() => {
    loadAutomobileNames();
    loadSalesperson();
    loadCustomerNames();
  }, []);
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Sales Record</h1>
          <form onSubmit={handleSubmit} id="create-sales-record-form">
            <div className="form-floating mb-3">
            <select
                onChange={(e) => setAutomobile(e.target.value)}
                value={automobile}
                required
                name="automobile"
                id="automobile"
                className="form-select"
              >
                <option value="automobile">Choose an automobile</option>
                {automobiles.map((a) => (
                  <option key={a.vin} value={a.vin}>
                    {a.vin}
                  </option>
                ))}
              </select> 
             </div>
             <div className="mb-3">
              <select
                onChange={(e) => setSalesperson(e.target.value)}
                value={salespeople}
                required
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="salesperson">Choose a salesperson</option>
                {salespersons.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={(e) => setCustomerName(e.target.value)}
                value={customerName}
                required
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="customer">Choose a customer</option>
                {customerNames.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={(e) => {
                  setPurchasePrice(e.target.value);
                }}
                value={purchasePrice}
                placeholder="Sales Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Sales price</label>
            </div> 
            <div
              className={`alert alert-primary mb-4 ms-2 ${
                errorMessage ? '' : 'd-none'
              }`}
              id="error-message"
            >
              {errorMessage}
            </div>
            <button className="btn btn-success">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm