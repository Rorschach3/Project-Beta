import React, { useState, useEffect } from 'react'

export default function Salespeople() {
    const [salespeople, setSalespeople] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let cancelled = false

        async function fetchSalespeople() {
            try {
                const res = await fetch('http://localhost:8090/api/salespeople/')
                if (!cancelled && res.ok) {
                    const data = await res.json()
                    setSalespeople(data.salespeople)
                }
            } catch (err) {
                console.error('Failed to load salespeople', err)
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        fetchSalespeople()
        return () => {
            cancelled = true
        }
    }, [])

    if (loading) {
        return <div className="container mt-5">Loading salespeople…</div>
    }

    if (salespeople.length === 0) {
        return <div className="container mt-5">No salespeople found.</div>
    }

    return (
        <div className="container mt-5">
            <div className="card shadow rounded-2xl">
                <div className="card-body">
                    <h1 className="h3 mb-4">Salespeople</h1>
                    <div className="table-responsive">
                        <table className="table table-striped mb-0">
                            <thead className="thead-light">
                                <tr>
                                    <th>Employee ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {salespeople.map((sp) => (
                                    <tr key={sp.id}>
                                        <td>{sp.employee_id}</td>
                                        <td>{sp.first_name}</td>
                                        <td>{sp.last_name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}
