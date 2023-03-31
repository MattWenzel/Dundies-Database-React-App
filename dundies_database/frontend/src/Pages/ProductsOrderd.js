import { useEffect, useState } from 'react';
import axios from 'axios'
import DynamicTable from "../Components/DynamicTable";
import ProductsOrderdInsertForm from '../Forms/ProductsOrderdInsertForm';
import ProductsOrderedUpdateForm from '../Forms/ProductsOrderedUpdateForm';

const ProductsOrderd = (props) => {
    const BASE_URL = props.url;
    const [records, setRecords] = useState([]);
    const [refreshPage, setRefreshPage] = useState(false);
    const [insertProductsOrdered, setInsertProductsOrdered] = useState({ order_id: "", product_name: "", quantity: "", cost_per_unit: "" });
    const [updateProductsOrdered, setUpdateProductsOrdered] = useState({ product_order_id: "", order_id: "", product_name: "", quantity: "", cost_per_unit: "" });
    const [orderIDs, setOrderIDs] = useState([]);
    const [productNames, setProductNames] = useState([]);
    const [productOrderIDs, setProductOrderIDs] = useState([]);


    // get product orders from database
    const selectData = async () => {
        try {
            const response = await axios.get(BASE_URL + '/products-ordered');
            setRecords(response.data);
        }
        catch (error) {
            console.log('error')
        }
    }
    // get order IDs from Orders to display as drop down menu
    const selectOrderIDs = async () => {
        try {
            const response = await axios.get(BASE_URL + '/get-order-id');
            setOrderIDs(response.data);
        }
        catch (error) {
            console.log('error')
        }
    }
    // get product order IDs to display as drop down menu
    const selectProductOrderIDs = async () => {
        try {
            const response = await axios.get(BASE_URL + '/get-product-order-id');
            setProductOrderIDs(response.data);
        }
        catch (error) {
            console.log('error')
        }
    }

    // get order IDs from Products to display as drop down menu
    const selectProductNames = async () => {
        try {
            const response = await axios.get(BASE_URL + '/get-product-names');
            setProductNames(response.data);
        }
        catch (error) {
            console.log('error')
        }
    }

    // get selected product order data from database
    const getProductOrderData = async (product_order_id) => {
        try {
            const response = await axios.get(BASE_URL + '/product-order-data', { params: { product_order_id } });
            return response.data;
        } catch (error) {
            console.log('error');
        }
    };

    // insert new product order into database
    const insertRow = (event) => {
        axios.post(BASE_URL + '/insert-products-ordered', insertProductsOrdered);
    }

    // update product order in database
    const updateRow = (event) => {
        console.log("Working")
        axios.put(BASE_URL + '/update-products-ordered', updateProductsOrdered);
    }


    // delete product order from database
    const deleteRow = (event, index) => {
        axios.delete(BASE_URL + '/delete-products-ordered', {
            data: {
                index: index
            }
        }).then(() => {
            setRefreshPage(!refreshPage);
        });
    }

    // populate update form with selected product order data
    const populateUpdateForm = async (product_order_id) => {
        const productOrderData = await getProductOrderData(product_order_id);
        setUpdateProductsOrdered(productOrderData);
    };

    // get necessary info from database when page is loaded, refresh page when data is changed
    useEffect(() => {
        selectOrderIDs();
        selectData();
        selectProductNames()
        selectProductOrderIDs();
    }, [refreshPage]);

    const attributes = ["Product Order ID", "Order ID", "Product Name", "Quantity", "Cost Per Unit"];
    return (
        <>
            <div className="text-center mb-2">
                <h1 className="text-3xl">Products Ordered</h1>
            </div>
            <DynamicTable tableName={"Products Ordered:"} attributes={attributes} rows={records} deleteHandler={deleteRow} entity_id={"product_order_id"} />

            <ProductsOrderdInsertForm orderIdData={orderIDs} productNamesData={productNames} label={"Insert Product Order:"} formData={insertProductsOrdered} setFormData={setInsertProductsOrdered} submitHandler={insertRow} />

            <ProductsOrderedUpdateForm productOrderData={productOrderIDs} orderIdData={orderIDs} productNamesData={productNames} label={"Update Product Order:"} formData={updateProductsOrdered} setFormData={setUpdateProductsOrdered} submitHandler={updateRow} selectHandler={populateUpdateForm} />
        </>
    )
}

export default ProductsOrderd;