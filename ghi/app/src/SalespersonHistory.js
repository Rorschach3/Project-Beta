import { useEffect, useState} from 'react';

function SalespersonHistory () {
    const [sales, setSales] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState("");

    const handleSalesperson = event => {
        fetchData();
        setSalesperson(event.target.value);
    }

    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSales(data.sales)
        }
    }

    const fetchSalespeople = async () => {
        const url = 'http://localhost:8090/api/salespeople/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            setSalespersons(data.salespersons)
        }
    }

    useEffect(() => {
        fetchData();
        fetchSalespeople();
    }, []);

    return (
        <div>
            <h1>Saleperson History</h1>
            <form onChange={handleSalesperson}>
            <div className="mb-3">
                <select value={salesperson} onChange={handleSalesperson} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose A Salesperson</option>
                    {salespersons.map(salesperson => {
                        return (
                            <option value={salesperson.id} key={salesperson.id}>
                                {salesperson.first_name}
                            </option>
                        );
                    })}
                </select>
            </div>
            </form>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th className='fs-3'>Salesperson</th>
                        <th className='fs-3'>Customer</th>
                        <th className='fs-3'>VIN</th>
                        <th className='fs-3'>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.filter(sale => {
                        return sale.salesperson.id === salesperson
                    }).map(sale => {
                        return (
                            <tr className='fw-normal' key={sale.id}>
                                <td className='fs-3'>{ sale.salesperson.first_name }</td>
                                <td className='fs-3'>{ sale.customer.first_name }</td>
                                <td className='fs-3'>{ sale.automobile.vin }</td>
                                <td className='fs-3'>{ sale.price }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )

}

export default SalespersonHistory;
