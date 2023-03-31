import Button from '../Components/Button';

const RoleUpdateForm = (props) => {
    const formData = props.formData;
    const setFormData = props.setFormData;
    return (
        <>
            <form className="flex flex-col justify-center items-center mt-10">
                <label className="font-bold">{props.label}</label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="block">Role Name</div>
                        <select
                            className="border-4 rounded py-2 px-3" value={formData.role_name} onChange={(e) => {
                                setFormData({ ...formData, role_name: e.target.value });
                                props.selectHandler(e.target.value);
                            }}>
                            <option value="" disabled>-- Select Role --</option>
                            {props.roleNameData.map(option => <option value={option.role_name}>{option.role_name}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className="block">Base Salary</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.base_salary} onChange={(e) => {
                            setFormData({ ...formData, base_salary: e.target.value });
                        }}></input>
                    </div>
                </div>
                <Button submitHandler={props.submitHandler} />
            </form>
        </>
    );
}
export default RoleUpdateForm;
