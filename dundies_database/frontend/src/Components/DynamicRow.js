import Button from './Button'

const DynamicRow = ({index, data, deleteHandler, editHandler}) => {
    return (
        <tr>
            {Object.keys(data).map(item => {
                return <td className="p-7">{data[item]}</td>
            })}
            <td className="bg-white"><button className="text-blue-700 rounded p-2 font-bold border-4 ml-2 border-blue-700" onClick={(event) => deleteHandler(event, index)}>Delete</button></td>
        </tr>
    )
}

export default DynamicRow;