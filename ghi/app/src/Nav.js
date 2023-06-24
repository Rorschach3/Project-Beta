import { Link, NavLink } from 'react-router-dom'

function Nav() {
<<<<<<< HEAD
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarInventoryDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Inventory
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarInventoryDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="inventory/automobiles">Automobiles List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="inventory/automobiles/new">Create A Automobile</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="inventory/manufacturers">Manufacturer List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="inventory/manufacturers/new">Create A Manufacturer</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="inventory/models">Models List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="inventory/models/new">Create A Model</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarSalesDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Sales
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarSalesDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/sales">Sales List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/sales/new">Sales Form</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/customer">Customer List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/customer/new">Customer Form</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/salespeople">Salespeople List</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="sales/salesperson/new">Salesperson Form</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current='page' to="sales/history">Salesperson History</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Service
              </a>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
                <li><NavLink className="dropdown-item" aria-current="page" to="service/technician/new">Add A Technician</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="service/technician">List all Technicians</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="service/appointment/new">Create A Service Appointment</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="service/appointment">List all service appointments</NavLink></li>
                <li><NavLink className="dropdown-item" aria-current="page" to="service/history">Service History</NavLink></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
=======
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-success">
			<div className="container-fluid">
				<NavLink className="navbar-brand" to="/">
					CarCar
				</NavLink>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div
					className="collapse navbar-collapse"
					id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<NavLink className="nav-link" to="/manufacturers">
								Manufacturers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink
								className="nav-link"
								to="/manufacturers/new">
								Create Manufacturer
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/automobiles">
								Automobiles
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/automobiles/new">
								Create Automobile
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/models">
								Models
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/models/new">
								Create Models
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/technicians">
								Technicians
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to="/technicians/new">
								Create Technician
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="Nav-link" to="/customers/new">
								Add a customer
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="Nav-link" to="/customers">
								List Customers
							</NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="Nav-link" to="/salespersons/new">
								Add a salesperson
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="Nav-link" to="/salespersons">
								List Salespersons
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="Nav-link" to="/sales/new">
								Add a sale
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="Nav-link" to="/sales">
								List Sales
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="Nav-link" to="/salespersons/history">	
								Salesperson History
							</NavLink>
						</li>

						<li className="nav-item">
							<NavLink className="Nav-link" to="/salespersons/total">
								Salesperson Total
							</NavLink>
						</li>

					</ul>
				</div>
			</div>
		</nav>
	)
>>>>>>> refs/remotes/Master/main
}

export default Nav
