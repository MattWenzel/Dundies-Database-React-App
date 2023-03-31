import { Link } from 'react-router-dom'

const Navigation = () => {
    return (
        <nav className="text-blue-500 flex-1 flex justify-center ml-auto">
            <Link className="hover:text-blue-800 p-5" to="/">Index</Link>
            <Link className="hover:text-blue-800 p-5" to="/employees">Employees</Link>
            <Link className="hover:text-blue-800 p-5" to="/customers">Customers</Link>
            <Link className="hover:text-blue-800 p-5" to="/roles">Roles</Link>
            <Link className="hover:text-blue-800 p-5" to="/products">Products</Link>
            <Link className="hover:text-blue-800 p-5" to="/orders">Orders</Link>
            <Link className="hover:text-blue-800 p-5" to="/products-ordered">Products Ordered</Link>
        </nav>
    )
}

export default Navigation;