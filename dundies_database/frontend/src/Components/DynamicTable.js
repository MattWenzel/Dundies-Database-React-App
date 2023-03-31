import DynamicRow from './DynamicRow';

const DynamicTable = ({ tableName, attributes, rows, deleteHandler, entity_id }) => {
    return (
        <div className="flex-1 flex justify-center ml-auto w-full text-white">
            <h2 className="text-2xl">{tableName}</h2>
            <table className="border-separate">
                <thead>
                    <tr className='uppercase bg-gray-700' >
                        {attributes.map(attrbute => {
                            return <th className="p-7">{attrbute}</th>
                        })}
                    </tr>
                </thead>
                <tbody className='bg-gray-500'>
                    {rows.map(row => {
                        return <DynamicRow index={row[entity_id]} data={row} deleteHandler={deleteHandler} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DynamicTable;