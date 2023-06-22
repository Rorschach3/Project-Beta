import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import AutoForm from './AutomobileForm';
import AutosList from './AutomobilesList';
import ManufacturerList from './ManufacturerList';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import ModelsList from './ModelsList';
import TechnicianForm from './TechnicianForm';
import TechnicianList from './TechnicianList';
import AppointmentForm from './AppointmentForm';
import AppointmentList from './AppointmentList';
import CustomerList from './CustomerList';
import CustomerForm from './CustomerForm';
import Salespeople from './Salespeople';
import SalespersonForm from './SalespersonForm';
import SalesList from './SalesList';
import SalesForm from './SalesForm';
import ServiceHistory from './ServiceHistory';

function App(props) {
  return (

    <BrowserRouter>
    <Nav />
    <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="inventory/automobiles" element={<AutosList />} />
          <Route path="inventory/automobiles/new" element={<AutoForm />} />
          <Route path="inventory/manufacturers" element={<ManufacturerList manufacturers={props.manufacturers} />} />
          <Route path="inventory/manufacturers/new" element={<ManufacturerForm />} />
          <Route path="inventory/models" element={<ModelsList />} />
          <Route path="inventory/models/new" element={<ModelForm />} />
          <Route path="service/technician/new" element={<TechnicianForm />} />
          <Route path="service/technician" element={<TechnicianList />} />
          <Route path="service/appointment/new" element={<AppointmentForm />} />
          <Route path="service/appointment" element={<AppointmentList />} />
          <Route path="service/history" element={<ServiceHistory />} />
          <Route path="sales/customer" element={<CustomerList/>} />
          <Route path="sales/customer/new" element={<CustomerForm />} />
          <Route path="sales/salespeople" element={<Salespeople/>} />
          <Route path="sales/salesperson/new" element={<SalespersonForm />} />
          <Route path="sales/sales" element={<SalesList/>} />
          <Route path="sales/sales/new" element={<SalesForm />} />
        </Routes>
        </div>
    </BrowserRouter>
  );
}

  export default App;
