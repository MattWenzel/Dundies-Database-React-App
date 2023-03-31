const Index = () => {
    return (
        <div>
            <div className="text-center mb-2">
                <h1 className="text-3xl">Index</h1>
            </div>
            <div className="flex-1 flex justify-center ml-auto w-full text-white">
            
            <table className="border-separate">
                <tr className="uppercase bg-gray-700">
                    <th className="p-7">Pages:</th>
                    <th className="p-7">Description:</th>
                </tr>
                <tbody className='bg-gray-500'>
                    <tr>
                        <td className="p-7">Employees: </td>
                        <td className="p-7">A table for viewing, creating, updating, and deleting employees.</td>
                    </tr>
                    <tr>
                        <td className="p-7">Customers: </td>
                        <td className="p-7">A table for viewing, creating, updating, and deleting customers.</td>
                    </tr>
                    <tr>
                        <td className="p-7">Roles: </td>
                        <td className="p-7">A table for viewing, creating, updating, and deleting roles.</td>
                    </tr>
                    <tr>
                        <td className="p-7">Products: </td>
                        <td className="p-7">A table for viewing, creating, updating, and deleting products.</td>
                    </tr>
                    <tr>
                        <td className="p-7">Orders: </td>
                        <td className="p-7">A table for viewing, creating, updating, and deleting orders.</td>
                    </tr>
                    <tr>
                        <td className="p-7">Products Ordered: </td>
                        <td className="p-7"> A table for viewing, creating, updating, and deleting prdoucts ordered.</td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default Index;