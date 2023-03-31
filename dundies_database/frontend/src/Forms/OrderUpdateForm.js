import Button from '../Components/Button';

const OrderUpdateForm = (props) => {
    const formData = props.formData;
    const setFormData = props.setFormData;
    return (
        <>
            <form className="flex flex-col justify-center items-center mt-10">
                <label className="font-bold">{props.label}</label>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <div className="block">Order ID</div>
                        <select
                            className="border-4 rounded py-2 px-3" value={formData.order_id} onChange={(e) => {
                                setFormData({ ...formData, order_id: e.target.value });
                                props.selectHandler(e.target.value);
                            }}>
                            <option value="" disabled selected>-- Select Order ID --</option>
                            {props.orderIdData.map(option => <option value={option.order_id}>{option.order_id}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className="block">Customer Name</div>
                        <select className="border-4 rounded py-2 px-3" value={formData.customer_name} onChange={(e) => {
                            setFormData({ ...formData, customer_name: e.target.value })
                        }}>
                            <option value="" disabled selected>-- Select Customer Name --</option>
                            {props.customerNameData.map(option => <option value={option.name}>{option.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <div className="block">Total Cost</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.total_cost} onChange={(e) => {
                            setFormData({ ...formData, total_cost: e.target.value });
                        }}></input>
                    </div>
                    <div>
                        <div className="block">Date</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.date} onChange={(e) => {
                            setFormData({ ...formData, date: e.target.value });
                        }} type="text" placeholder="YYYY-MM-DD" required />
                    </div>
                    <div>
                        <div className="block">Employee</div>
                        <select className="border-4 rounded py-2 px-3" value={formData.employee_name} onChange={(e) => {
                            setFormData({ ...formData, employee_name: e.target.value })
                        }}>
                            <option value="" disabled selected>-- Select Employee --</option>
                            {props.employeeNameData.map(option => <option value={option.name} key={option.name}>{option.name}</option>)}
                        </select>
                    </div>
                </div>
                <Button submitHandler={props.submitHandler} />
            </form>

        </>

    );
}

export default OrderUpdateForm;
