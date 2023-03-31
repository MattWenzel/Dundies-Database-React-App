import { useEffect, useState } from 'react';
import axios from 'axios';
import DynamicTable from '../Components/DynamicTable';
import ProductInsertForm from '../Forms/ProductInsertForm';
import ProductUpdateForm from '../Forms/ProductUpdateForm';

const Products = (props) => {
    const BASE_URL = props.url;
    const [records, setRecords] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [insertProduct, setInsertProduct] = useState({ name: '', quantity: '', cost_per_unit: '' });
    const [updateProduct, setUpdateProduct] = useState({ id: '', name: '', quantity: '', cost_per_unit: '' });
    const [productNames, setProductNames] = useState([]);

    // get products from database
    const selectData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/products');
            setRecords(response.data);
        } catch (error) {
            console.log('error');
        }
    };

    // get product names from Products to display as drop down menu
    const selectProductNames = async () => {
        try {
            const response = await axios.get(BASE_URL + '/get-product-names');
            setProductNames(response.data);
        }
        catch (error) {
            console.log('error')
        }
    }

    // get selected product data from database
    const getProductData = async (name) => {
        try {
            const response = await axios.get(BASE_URL + '/product-data', { params: { name } });
            return response.data;
        } catch (error) {
            console.log('error');
        }
    };

    // insert new product into database
    const insertRow = (event) => {
        axios.post(BASE_URL + '/insert-product', insertProduct);
    };

    // update product in database
    const updateRow = (event) => {
        axios.put(BASE_URL + '/update-product', updateProduct);
    };

    // delete product from database
    const deleteRow = (event, index) => {
        axios
            .delete(BASE_URL + '/delete-product', {
                data: {
                    index: index,
                },
            })
            .then(() => {
                setRefreshPage(!refreshPage);
            });
    };

    // populate update form with selected product data
    const populateUpdateForm = async (name) => {
        const productData = await getProductData(name);
        setUpdateProduct(productData);
    };

    // get necessary info from database when page is loaded, refresh page when data is changed
    useEffect(() => {
        selectData();
        selectProductNames();
    }, [refreshPage]);

    const attributes = ['Product ID', 'Name', 'Quantity', 'Cost per Unit'];
    return (
        <>
            <div className="text-center mb-2">
                <h1 className="text-3xl">Products</h1>
            </div>
            <DynamicTable tableName={'Products:'} attributes={attributes} rows={records} deleteHandler={deleteRow} entity_id={'product_id'} />

            <ProductInsertForm label={'Insert Product:'} formData={insertProduct} setFormData={setInsertProduct} submitHandler={insertRow} />

            <ProductUpdateForm nameData={productNames} label={'Update Product:'} formData={updateProduct} setFormData={setUpdateProduct} submitHandler={updateRow} selectHandler={populateUpdateForm} />
        </>
    );
};

export default Products;
