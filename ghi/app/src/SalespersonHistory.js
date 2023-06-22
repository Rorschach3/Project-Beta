import { useEffect, useState} from 'react';

// We create three states
function SalespersonHistory () {
    const [sales, setSales] = useState([]);
    const [salespersons, setSalespersons] = useState([]);
    const [salesperson, setSalesperson] = useState("");
    // const [selectedSalesperson, setSelectedSalesperson] = useState(null);

    const handleSalesperson = event => {
        const selectedId = event.target.value;
        setSalesperson(selectedId);
    };


    const fetchData = async () => {
        const url = 'http://localhost:8090/api/sales/';
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            const filteredSales = data.sales.filter(
                (sale) => sale.salesperson.id === parseInt(salesperson)
            );
            setSales(filteredSales);
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
        <div className='container overflow-hidden'>
            <header>Saleperson History</header>
            <form onChange={handleSalesperson}>
            <div className="mb-3">
                <select value={salesperson} onChange={handleSalesperson} required name="salesperson" id="salesperson" className="form-select">
                    <option value="">Choose A Salesperson</option>
                    {salespersons.map(person => {
                        return (
                            <option value={person.id} key={person.id}>
                                {person.first_name}
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
                    {sales.map(sale => {
                        return (
                            <tr className='fw-normal' key={sale.id}>
                                <td className='fs-3'>{sale.salesperson.employee_id}</td>
                                <td className='fs-3'>{sale.customer.first_name}</td>
                                <td className='fs-3'>{sale.automobile.vin}</td>
                                <td className='fs-3'>{sale.price}</td>
                            </tr>
                        );
                    })}
                    </tbody>
            </table>
        </div>
    )

}

export default SalespersonHistory;
