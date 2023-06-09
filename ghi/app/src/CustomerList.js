import React, { useEffect, useState } from 'react'

export default function Customer() {
    const [customers, setCustomers]  = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http//localhost:8090/api/customers/');
            if (response.ok) {
                const data = await response.json();
                setCustomers(data.customers);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect( () => {
        fetchData()
    }, [customers])

    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Customers</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
        
                        {customers.map((customers) => {
                            return (
                                <tr key={customers.id}>
                                    <td>{customers.first_name}</td>
                                    <td>{customers.last_name}</td>
                                    <td>{customers.phone_number}</td>
                                    <td>{customers.address}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
