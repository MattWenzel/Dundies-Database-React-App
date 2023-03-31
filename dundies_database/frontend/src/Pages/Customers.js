import { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicTable from '../Components/DynamicTable';
import CustomerInsertForm from '../Forms/CustomerInsertForm';
import CustomerUpdateForm from '../Forms/CustomerUpdateForm';

const Customers = (props) => {
    const BASE_URL = props.url;
    const [records, setRecords] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [insertCustomer, setInsertCustomer] = useState({ name: '', address: '', email: '', phone_number: '', employee_name: '' });
    const [updateCustomer, setUpdateCustomer] = useState({ name: '', address: '', email: '', phone_number: '', employee_name: '' });
    const [employeeNames, setEmployeeNames] = useState([]);
    const [customerNames, setCustomerNames] = useState([]);

    // get customers from database
    const selectData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/customers');
            setRecords(response.data);
        } catch (error) {
            console.log('error');
        }
    };

    // get employee names from Employees to display as drop down menu
    const selectEmployeeNames = async () => {
        try {
            const response = await axios.get(BASE_URL + '/employee-names');
            setEmployeeNames(response.data);
        } catch (error) {
            console.log('error');
        }
    };

    // get customer names from Customers to display as drop down menu
    const selectCustomerNames = async () => {
        try {
            const response = await axios.get(BASE_URL + '/customer-names');
            setCustomerNames(response.data);
        }
        catch (error) {
            console.log('error')
        }
    }

    // get selected customer data from database
    const getCustomerData = async (name) => {
        try {
            const response = await axios.get(BASE_URL + '/customer-data', {
                params: { name: name },
            });
            return response.data;
        } catch (error) {
            console.log('error');
        }
    };

    // insert customer into database
    const insertRow = (event) => {
        axios.post(BASE_URL + '/insert-customer', insertCustomer);
    };


    // update customer in database
    const updateRow = (event) => {
        axios.put(BASE_URL + '/update-customer', updateCustomer);
    };


    // delete customer from database
    const deleteRow = (event, index) => {
        axios
            .delete(BASE_URL + '/delete-customer', {
                data: {
                    index: index,
                },
            })
            .then(() => {
                setRefreshPage(!refreshPage);
            });
    };

     // populate update form with customer data when customer name is selected
     const populateUpdateForm = async (name) => {
        const customerData = await getCustomerData(name);
        setUpdateCustomer(customerData);
    };

     // get necessary info from database when page is loaded, refresh page when data is changed
     useEffect(() => {
        selectEmployeeNames();
        selectData();
        selectCustomerNames();
    }, [refreshPage]);

    const attributes = ['Customer ID', 'Name', 'Address', 'Email', 'Phone Number', 'Employee Contact'];
    return (
        <>
            <div className="text-center mb-2">
                <h1 className="text-3xl">Customers</h1>
            </div>
            <DynamicTable tableName={'Customers:'} attributes={attributes} rows={records} deleteHandler={deleteRow} entity_id={'customer_id'} />

            <CustomerInsertForm employeeNameData={employeeNames} label={'Insert Customer:'} formData={insertCustomer} setFormData={setInsertCustomer} submitHandler={insertRow} />

            <CustomerUpdateForm nameData={customerNames} employeeNameData={employeeNames} label={'Update Customer:'} formData={updateCustomer} setFormData={setUpdateCustomer} submitHandler={updateRow} selectHandler={populateUpdateForm} />
        </>
    );
};

export default Customers;
