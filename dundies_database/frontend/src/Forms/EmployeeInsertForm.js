import Button from '../Components/Button';

const EmployeeInsertForm = (props) => {
    const formData = props.formData;
    const setFormData = props.setFormData;
    return (
        <>
            <form className="flex flex-col justify-center items-center mt-10">
                <label className="font-bold">{props.label}</label>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="block">Name</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.name} onChange={(e) => {
                            setFormData({ ...formData, name: e.target.value });
                        }}></input>
                    </div>
                    <div>
                        <div className="block">Address</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.address} onChange={(e) => {
                            setFormData({ ...formData, address: e.target.value });
                        }}></input>
                    </div>
                    <div>
                        <div className="block">Email</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.email} onChange={(e) => {
                            setFormData({ ...formData, email: e.target.value });
                        }}></input>
                    </div>
                    <div>
                        <div className="block">Phone Number</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.phone_number} onChange={(e) => {
                            setFormData({ ...formData, phone_number: e.target.value });
                        }}></input>
                    </div>
                    <div>
                        <div className="block">Role</div>
                        <select className="border-4 rounded py-2 px-3" value={formData.role_name} onChange={(e) => {
                            setFormData({ ...formData, role_name: e.target.value })
                        }}>
                            <option value="" disabled selected>-- Select Role --</option>
                            {props.roleNameData.map(option => <option value={option.role_name}>{option.role_name}</option>)}
                        </select>
                    </div>
                </div>
                <Button submitHandler={props.submitHandler} />
            </form>

        </>

    );
}
export default EmployeeInsertForm;
