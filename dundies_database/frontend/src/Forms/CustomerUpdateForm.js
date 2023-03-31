import Button from '../Components/Button';

const CustomerUpdateForm = (props) => {
    const formData = props.formData;
    const setFormData = props.setFormData;
    return (
        <>
            <form className="flex flex-col justify-center items-center mt-10">
                <label className="font-bold">{props.label}</label>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="block">Name</div>
                        <select
                            className="border-4 rounded py-2 px-3" value={formData.name} onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                props.selectHandler(e.target.value);
                            }}>
                            <option value="" disabled selected>-- Select Name --</option>
                            {props.nameData.map(option => <option value={option.name}>{option.name}</option>)}
                        </select>
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
                        <div className="block">Employee</div>
                        <select className="border-4 rounded py-2 px-3" value={formData.employee_name} onChange={(e) => {
                            setFormData({ ...formData, employee_name: e.target.value })
                        }}>
                            <option value="" disabled defaultValue>-- Select Employee --</option>
                            <option value="null">-- No Employee --</option>
                            {props.employeeNameData.map(option => <option value={option.name} key={option.name}>{option.name}</option>)}
                        </select>
                    </div>
                </div>
                <div onClick={() => { }}>
                    <Button submitHandler={props.submitHandler} />
                </div>
            </form>

        </>

    );
}

export default CustomerUpdateForm;
