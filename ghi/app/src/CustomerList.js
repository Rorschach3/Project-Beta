import React from 'react'

export default function CustomerList ({customers}) {



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
                        {customers && customers.map((customers) => {
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
