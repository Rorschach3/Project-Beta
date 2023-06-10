import React, { useEffect, useState } from 'react'

export default function Salesperson() {
    const [salespersons, setSalespersons] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/');
            if (response.ok) {
                const data = await response.json();
                setSalespersons(data.salesperson);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect( () => {
        fetchData()
    }, [salespersons])

    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Salespeople</h1>
                <table className='table table-striped'>
                  <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salespersons.map((salesperson) =>{
                            return (
                                <tr key={salesperson.id}>
                                    <td>{salesperson.employee_id}</td>
                                    <td>{salesperson.first_name}</td>
                                    <td>{salesperson.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

