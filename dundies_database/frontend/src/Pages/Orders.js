import { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicTable from '../Components/DynamicTable';
import OrderInsertForm from '../Forms/OrderInsertForm';
import OrderUpdateForm from '../Forms/OrderUpdateForm';

const Orders = (props) => {
    const BASE_URL = props.url;
    const [records, setRecords] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [insertOrder, setInsertOrder] = useState({ customer_name: '', employee_name: '', total_cost: '', date: '' });
    const [updateOrder, setUpdateOrder] = useState({ order_id: '', customer_name: '', employee_name: '', total_cost: '', date: '' });
    const [employeeNames, setEmployeeNames] = useState([]);
    const [customerNames, setCustomerNames] = useState([]);
    const [orderIds, setOrderIds] = useState([]);

    // get orders from database
    const selectData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/orders');
            setRecords(response.data);
        } catch (error) {
            console.log('error');
        }
    };

    // get order_id from Orders to display as drop down menu
    const selectOrderIDs = async () => {
        try {
            const response = await axios.get(BASE_URL + '/get-order-id');
            setOrderIds(response.data);
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

    // get selected order data from database
    const getOrderData = async (order_id) => {
        try {
            const response = await axios.get(BASE_URL + '/order-data', { params: { order_id } });
            return response.data;
        } catch (error) {
            console.log('error');
        }
    };

    // insert a new order in the database
    const insertRow = (event) => {
        axios.post(BASE_URL + '/insert-order', insertOrder);
    };

    // update an order in the database
    const updateRow = (event) => {
        axios.put(BASE_URL + '/update-order', updateOrder);
    };

    // delete an order from the database
    const deleteRow = (event, index) => {
        axios
            .delete(BASE_URL + '/delete-order', {
                data: {
                    index: index,
                },
            })
            .then(() => {
                setRefreshPage(!refreshPage);
            });
    };

    // populate the update form with the selected order's data
    const populateUpdateForm = async (order_id) => {
        const orderData = await getOrderData(order_id);
        setUpdateOrder(orderData);
    };

     // get necessary info from database when page is loaded, refresh page when data is changed
     useEffect(() => {
        selectData();
        selectOrderIDs();
        selectEmployeeNames();
        selectCustomerNames();
    }, [refreshPage]);

    const attributes = ['Order ID', 'Customer Name', 'Employee Name', 'Total Cost', 'Date'];
    return (
        <>
            <div className="text-center mb-2">
                <h1 className="text-3xl">Orders</h1>
            </div>
            <DynamicTable tableName={'Orders:'} attributes={attributes} rows={records} deleteHandler={deleteRow} entity_id={'order_id'} />

            <OrderInsertForm customerNameData={customerNames} employeeNameData={employeeNames} label={'Insert Order:'} formData={insertOrder} setFormData={setInsertOrder} submitHandler={insertRow} />

            <OrderUpdateForm orderIdData={orderIds} customerNameData={customerNames} employeeNameData={employeeNames} label={'Update Order:'} formData={updateOrder} setFormData={setUpdateOrder} submitHandler={updateRow}  selectHandler={populateUpdateForm} />
        </>
    );
};

export default Orders;
