import React, { useEffect, useState } from 'react';


function SalesForm() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {};
    data.automobile = auto;
    data.salesperson = salesperson;
    data.customer = customer;
    data.price = price;
    const saleUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
      }
      const response = await fetch(saleUrl, fetchConfig);
      if (response.ok) {
        const newSale = await response.json();
        const carData = {};
        carData.sold = true;
        const carVin = newSale["automobile"].vin;
        const carUrl = `http://localhost:8090/api/cars/${carVin}/`
        const carFetchConfig = {
            method: "put",
            body: JSON.stringify(carData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const automobileVIN =newSale["automobile"].vin;
        const automobileUrl = `http://localhost:8100/api/automobiles/${automobileVIN}/`
        const automobileFetchConfig = {
            method: "put",
            body: JSON.stringify(carData),
            headers: {
                'Content-Type': 'application/json',
            },
        }
        const automobileResponse = await fetch(automobileUrl, automobileFetchConfig);
        const carResponse = await fetch(carUrl, carFetchConfig);
        if (carResponse.ok && automobileResponse.ok) {
            const updateCars = cars.filter(object => object.vin !== carVin)
            setCars(updateCars)
            setCar("");
            setSalesperson("");
            setCustomer("");
            setPrice("");
        }
        else if (carResponse.ok) {
            const updateCars = cars.filter(object => object.vin !== carVin)
            setCars(updateCars)
            setCar("");
            setSalesperson("");
            setCustomer("");
            setPrice("");
            console.error(automobileResponse)
        }
        else if (automobileResponse.ok) {
            console.error(carResponse)
        }
        else {
            console.error(carResponse)
            console.error(automobileResponse)
        }


    }
    else {
        console.error(response)
      }
  }
  const [cars, setCars] = useState([])
  const [salespeople, setSalespeople] = useState([])
  const [customers, setCustomers] = useState([])
  const [auto, setCar] = useState([])
  const [salesperson, setSalesperson] = useState("")
  const [customer, setCustomer] = useState("")
  const [price, setPrice] = useState("")

  const fetchCarData = async () => {
      const response = await fetch("http://localhost:8100/api/automobiles/")
      if (response.ok) {
          const data = await response.json()
          setCars(data.autos)
      }
      else {
          console.error(response)
      }
  }

  const fetchSalespeopleData = async () => {
      const response = await fetch("http://localhost:8090/api/salespeople/")
      if (response.ok) {
          const data = await response.json()
          setSalespeople(data.salespeople)
      }
      else {
          console.error(response)
      }
  }

  const fetchCustomersData = async () => {
      const response = await fetch("http://localhost:8090/api/customers/")
      if (response.ok) {
          const data = await response.json()
          setCustomers(data.customers)
      }
      else {
          console.error(response)
      }
  }


  const handleCar = (event) => {
    const value = event.target.value;
    setCar(value)
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

  useEffect(() => {
    fetchCarData();
    fetchSalespeopleData();
    fetchCustomersData();
  }, [])

  return (
    <div className="row">
        <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Record a New Sale</h1>
                <form onSubmit={handleSubmit}  id="create-new-sale">
                    <div className="form-floating mb-3">
                        <label htmlFor="vin">Automobile VIN</label>
                        <select  value={auto} onChange={handleCar} required id="vin" name="vin" className="form-select">
                            <option value="">Choose an automobile VIN...</option>
                            {cars?.map(auto => {
                                return (
                                    <option value={auto.vin} key={auto.id }>
                                        {auto.vin}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="salesperson">Salesperson</label>
                        <select  value={salesperson} onChange={handleSalesperson} required id="salesperson" name="salesperson" className="form-select">
                            <option value="">Choose a salesperson...</option>
                            {salespeople?.map(person => {
                                return (
                                    <option value={person.id} key={person.id }>
                                        {person.first_name} {person.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <label htmlFor="customer">Customer</label>
                        <select value={customer} onChange={handleCustomer} required id="customer" name="customer" className="form-select">
                            <option value="">Choose a customer...</option>
                            {customers?.map(cust => {
                                return (
                                    <option value={cust.id} key={cust.id }>
                                        {cust.first_name} {cust.last_name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="form-floating mb-3">
                        <input value={price} onChange={handlePrice} placeholder="Price" required type="number" id="price" name="price" className="form-control"/>
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-success btn-lg">Create</button>
                </form>
            </div>
        </div>
    </div>
  )
  }

  export default SalesForm
















    //fetches the data for the API ased on the URL
//   const fetchSalespeople = async () => {
//     const getSalespersonUrl = 'http://localhost:8090/api/salesperson/';
//     const response = await fetch(getSalespersonUrl);
//     if (response.ok) {
//       const data = await response.json();
//       setSalespeople(data.salesperson);
//     }
//   };

//     //fetches the data for the API ased on the URL
//   const fetchCustomers = async () => {
//     const getCustomerUrl = 'http://localhost:8090/api/customers/';
//     const response = await fetch(getCustomerUrl);
//     if (response.ok) {
//       const data = await response.json();
//       setCustomer(data.customers);
//     }
//   };

// // Uses the fetchAllData function to fetch all 3 data calls.
//   useEffect(() => {
//     fetchAllData();
//     }, [price]);


//     //uses the Promise.all() function to make three calls to the API at once
//     const fetchAllData = async () => {
//       await Promise.all([fetchAutomobiles(), fetchSalespeople(), fetchCustomers()]);
//       };

//     const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = {
//     automobile: selectedAuto,
//     salesperson: selectedSalesperson,
//     customer: selectedCustomer,
//     price: price,
//     };

//     const fetchConfig = {
//       method: 'post',
//       body: JSON.stringify(data),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     };

//     const response = await fetch('http://localhost:8090/api/sales/', fetchConfig);
//     if (response.ok) {
//       getSales();

//       const responseData = await response.json();
//       const deleteUrl = `http://localhost:8100/api/automobiles/${responseData.automobile.vin}`;
//       const fetchDeleteConfig = {
//         method: 'delete',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       };
//       const deleteResponse = await fetch(deleteUrl, fetchDeleteConfig);
//       if (deleteResponse.ok) {
//         setPrice('');
//         setSalespeople([]);
//         setCustomer([]);
//         setAutomobiles([]);
//       }
//     }
//   };
//   const getSales = () => {
    
//     return (
//       <>
//           <div className='row'>
//               <div className='offset-3 col-6'>
//                   <div className='shadow p-4 mt-4'>
//                       <h1>Record a new sale</h1>
//                       <form onSubmit={handleSubmit} id="record-sale-form">


//           <div className='form-floating mb-3'>
//               <select onChange={handleVin} value={vin} id="vin" name='vin' className='form-select'>
//                   <option value=''>Choose an automobile VIN</option>
//                   {autoVins.filter(auto => (!auto.sold)).map(auto => {
//                       return (
//                           <option key={auto.id} value={auto.vin}>
//                               {auto.vin}
//                           </option>
//                       )
//                   })}
//               </select>
//           </div>


//             <div className='form-floating mb-3'>
//                 <select onChange={handleSalesPerson} value={salesPerson} id="salesperson" name='salesperson' className='form-select'>
//                     <option value=''>Choose a sales person</option>
//                     {salesPersons.map(sales => {
//                         const fullName = `${sales.first_name} ${sales.last_name}`
//                         return (
//                             <option key={sales.id} value={sales.id}>
//                                 {fullName}
//                             </option>
//                         )
//                     })}
//                 </select>
//             </div>


//             <div className='form-floating mb-3'>
//                 <select onChange={handleCustomer} value={customer} id="customer" name='customer' className='form-select'>
//                     <option value=''>Choose a customer</option>
//                     {customers.map(customer => {
//                         const fullName = `${customer.first_name} ${customer.last_name}`
//                         return (
//                             <option key={customer.id} value={customer.id}>
//                                 {fullName}
//                             </option>
//                         )
//                     })}
//                 </select>
//               </div>
//             </div>


//             <div className="col-md-6">
//               <div className="form-floating mb-3">
//                 <input onChange={handlePrice}
//                   value={price} placeholder="price" required type="text" name="price" id="price" className="form-control"/>
//                 <label htmlFor="price">Price</label>
//                 <div className={`alert alert-primary mb-4 ms-2 ${errorMessage ? '' : 'd-none'}`} id="error-message"></div>
//                 <button className="btn btn-success">Create</button>
//           </div>
//         </form>
//     </div>


//               </div>
//           </div>
//       </>
//   )
// }