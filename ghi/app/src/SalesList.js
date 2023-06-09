

export default function SalesList({sales}) {


    return (
        <>
            <div className='container overflow-hidden'>
                <h1>Sales</h1>
                <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Salesperson Employee ID</th>
                            <th>Salesperson Name</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((sales) =>{
                            const fullSalesName = `${sales.salesperson.first_name} ${sales.salesperson.last_name}`
                            const fullCustomerName = `${sales.customer.first_name} ${sales.customer.last_name}`
                            console.log(`${sales.customer.first_name} ${sales.customer.last_name}`)
                            return (
                                <tr key={sales.id}>
                                    <td>{sales.salesperson.employee_id}</td>
                                    <td>{fullSalesName}</td>
                                    <td>{fullCustomerName}</td>
                                    <td>{sales.automobile.vin}</td>
                                    <td>${sales.price}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
