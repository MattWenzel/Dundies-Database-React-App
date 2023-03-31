import Button from '../Components/Button';

const RoleInsertForm = (props) => {
    const formData = props.formData;
    const setFormData = props.setFormData;
    return (
        <>
            <form className="flex flex-col justify-center items-center mt-10">
                <label className="font-bold">{props.label}</label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="block">Role Name</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.role_name} onChange={(e) => {
                            setFormData({ ...formData, role_name: e.target.value });
                        }}></input>
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
export default RoleInsertForm;
