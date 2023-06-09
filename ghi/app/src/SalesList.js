import React, { useEffect, useState } from 'react'

export default function SalesList() {
    const [sales, setSales] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales')
            if (response.ok) {
                const data = await response.json();
                setSales(data.sales);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect( () => {
        fetchData()
    }, [sales])


    return (
        <>
        const fullSalesName = `${sales.salesperson.first_name} ${sales.salesperson.last_name}`
        const fullCustomerName = `${sales.customer.first_name} ${sales.customer.last_name}`
            <div className='container overflow-hidden'>
                <h1>Sales</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer Name</th>
                            <th>VIN</th>
                            <th>Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sales) =>{
                            console.log(`${sales.customer.first_name} ${sales.customer.last_name}`)
                            return (
                                <tr key={sales.id}>
                                    <td>{sales.salesperson.employee_id}</td>
                                    <td>{sales.salesperson.fullName}</td>
                                    <td>{sales.customer.fullName}</td>
                                    <td>{sales.autos.vin}</td>
                                    <td>{sales.sale.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
