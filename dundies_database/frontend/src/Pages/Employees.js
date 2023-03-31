import {useEffect, useState} from 'react';
import axios from 'axios'
import DynamicTable from "../Components/DynamicTable";
import EmployeeInsertForm from '../Forms/EmployeeInsertForm';
import EmployeeUpdateForm from '../Forms/EmployeeUpdateForm';

const Employees = (props) => {
    const BASE_URL = props.url;
    const [records, setRecords] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [insertEmployee, setInsertEmployee] = useState({name: "", address: "", email: "", phone_number: "", role_name: ""});
    const [updateEmployee, setUpdateEmployee] = useState({name: "", address: "", email: "", phone_number: "", role_name: ""});
    const [roleNames, setRoleNames] = useState([]);
    const [employeeNames, setEmployeeNames] = useState([]);

    // get employees from database
    const selectData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/employees');
            setRecords(response.data);
        }
        catch(error) {
            console.log('error')
        }
    }

    // get role names from Roles to display as drop down menu
    const selectRoleNames = async () => {
        try {
            const response = await axios.get(BASE_URL + '/get-role-name');
            setRoleNames(response.data);
        }
        catch(error) {
            console.log('error')
        }
    }

    // get employee names from Employees to display as drop down menu
    const selectEmployeeNames = async () => {
        try {
            const response = await axios.get(BASE_URL + '/employee-names');
            setEmployeeNames(response.data);
        }
        catch (error) {
            console.log('error')
        }
}

    // get selected employee data from database
    const getEmployeeData = async (name) => {
        try {
            const response = await axios.get(BASE_URL + '/employee-data', { params: { name } });
            return response.data;
        } catch (error) {
            console.log('error');
        }
    };

    // insert employee into database
    const insertRow = (event) => {
        axios.post(BASE_URL + '/insert-employee', insertEmployee);
    }

    // update employee in database
    const updateRow = (event) => {
        axios.put(BASE_URL + '/update-employee', updateEmployee);
    }

    // delete employee from database
    const deleteRow = (event, index) => {
        axios.delete(BASE_URL + '/delete-employee', {data: {
            index: index
          }}).then(() => {
            setRefreshPage(!refreshPage);
        });
    }

     // populate update form with employee data when employee name is selected
    const populateUpdateForm = async (name) => {
        const employeeData = await getEmployeeData(name);
        setUpdateEmployee(employeeData);
    };

    // get necessary info from database when page is loaded, refresh page when data is changed
    useEffect(() => {
        selectRoleNames();
        selectEmployeeNames();
        selectData();
    }, [refreshPage]);

    const attributes = ["Employee ID", "Name", "Address", "Email", "Phone Number", "Role"];
    return (
        <>  
            <div className="text-center	mb-2">
                <h1 className="text-3xl">Employees</h1>
            </div>
            <DynamicTable tableName={"Employees:"} attributes={attributes} rows={records} deleteHandler={deleteRow} entity_id={"employee_id"}/>       
          
            <EmployeeInsertForm roleNameData={roleNames} label={"Insert Employee:"} formData={insertEmployee} setFormData={setInsertEmployee} submitHandler={insertRow} />

            <EmployeeUpdateForm nameData={employeeNames} roleNameData={roleNames} label={"Update Employee:"} formData={updateEmployee} setFormData={setUpdateEmployee} submitHandler={updateRow} selectHandler={populateUpdateForm} />
        </>
    )
}

export default Employees;
