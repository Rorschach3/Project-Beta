import React, { useEffect, useState } from 'react'

export default function SalesPeopleList() {
    const [salesPerson, setSalesPerson] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/')
            if (response.ok) {
                const data = await response.json();
                setSalesPerson(data.salespeople);
            }
        } catch (e) {
            console.error(e)
        }
    }
    useEffect( () => {
        fetchData()
    }, [salesPerson])

    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Sales People</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Employee ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {salesPerson.map((salespeople) =>{
                            return (
                                <tr key={salespeople.id}>
                                    <td>{salespeople.employee_id}</td>
                                    <td>{salespeople.first_name}</td>
                                    <td>{salespeople.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

