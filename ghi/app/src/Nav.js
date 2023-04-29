import { Link, NavLink } from 'react-router-dom'

function Nav() {
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
}

export default Nav
