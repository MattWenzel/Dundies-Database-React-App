import Button from '../Components/Button';

const ProductUpdateForm = (props) => {
    const formData = props.formData;
    const setFormData = props.setFormData;
    return (
        <>
            <form className="flex flex-col justify-center items-center mt-10">
                <label className="font-bold">{props.label}</label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="block">Product Name</div>
                        <select
                            className="border-4 rounded py-2 px-3" value={formData.name} onChange={(e) => {
                                setFormData({ ...formData, name: e.target.value });
                                props.selectHandler(e.target.value);
                            }}>
                            <option value="" disabled>-- Select Product --</option>
                            {props.nameData.map(option => (
                                <option value={option.name}>{option.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <div className="block">Quantity</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.quantity} onChange={(e) => {
                            setFormData({ ...formData, quantity: e.target.value });
                        }}></input>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className="block">Cost per Unit</div>
                        <input className="border-4 rounded py-2 px-3" value={formData.cost_per_unit} onChange={(e) => {
                            setFormData({ ...formData, cost_per_unit: e.target.value });
                        }}></input>
                    </div>
                </div>
                <Button submitHandler={props.submitHandler} />
            </form>
        </>
    );
}
export default ProductUpdateForm;
