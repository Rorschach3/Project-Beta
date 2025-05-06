import React, { useEffect, useState } from 'react'

export default function SalesList() {

    const [sales, setSales] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/')
            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])


    return (
        <>
            {/* const fullSalesName = `${sales.salesperson.first_name} ${sales.salesperson.last_name}`
            const fullCustomerName = `${sales.customer.first_name} ${sales.customer.last_name}` */}

            <div className='container overflow-hidden'>
                <h1>Sales</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Salesman First</th>
                            <th>Salesman Last</th>
                            <th>Cust. First</th>
                            <th>Cust. Last</th>
                            <th>VIN</th>
                            <th>Price</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>

                        {sales.map((sale) => {
                            return (
                                <tr key={sale.id}>
                                    <td>{sale.salesperson.first_name}</td>
                                    <td>{sale.salesperson.last_name}</td>
                                    <td>{sale.customer.first_name}</td>
                                    <td>{sale.customer.last_name}</td>
                                    <td>{sale.automobile.vin}</td>
                                    <td>{sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
