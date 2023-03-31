import {useEffect, useState} from 'react';
import axios from 'axios'
import DynamicTable from "../Components/DynamicTable";
import RoleInsertForm from '../Forms/RolesInsertForm';
import RoleUpdateForm from '../Forms/RolesUpdateForm';

const Roles = (props) => {
    const BASE_URL = props.url;
    const [records, setRecords] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [insertRole, setInsertRole] = useState({role_name: "", base_salary: ""});
    const [updateRole, setUpdateRole] = useState({role_id: "", role_name: "", base_salary: ""});
    const [roleNames, setRoleNames] = useState([]);

    // get roles from database
    const selectData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/roles');
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

    // get selected role data from database
    const getRoleData = async (role_name) => {
        try {
            const response = await axios.get(BASE_URL + '/role-data', { params: { role_name } });
            return response.data;
        } catch (error) {
            console.log('error');
        }
    };

    // insert role into database
    const insertRow = (event) => {
        axios.post(BASE_URL + '/insert-role', insertRole);
    }

    // update role in database
    const updateRow = (event) => {
        axios.put(BASE_URL + '/update-role', updateRole);
    }

    // delete role from database
    const deleteRow = (event, index) => {
        axios.delete(BASE_URL + '/delete-role', {data: {
            index: index
          }}).then(() => {
            setRefreshPage(!refreshPage);
        });
    }

     // populate update form with selected role data
     const populateUpdateForm = async (role_name) => {
        const roleData = await getRoleData(role_name);
        setUpdateRole(roleData);
    };

    // get necessary info from database when page is loaded, refresh page when data is changed
    useEffect(() => {
        selectRoleNames();
        selectData();
    }, [refreshPage]);

    const attributes = ["Role ID", "Role Name", "Base Salary"];
    return (
        <>  
            <div className="text-center mb-2">
                <h1 className="text-3xl">Roles</h1>
            </div>
            <DynamicTable tableName={"Roles:"} attributes={attributes} rows={records} deleteHandler={deleteRow} entity_id={"role_id"}/>       
          
            <RoleInsertForm label={"Insert Role:"} formData={insertRole} setFormData={setInsertRole} submitHandler={insertRow} />

            <RoleUpdateForm roleNameData={roleNames} label={"Update Role:"} formData={updateRole} setFormData={setUpdateRole} submitHandler={updateRow}  selectHandler={populateUpdateForm}/>
        </>
    )
}

export default Roles;
