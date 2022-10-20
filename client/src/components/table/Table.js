import Util from 'util/Util';

export default function Table(props) {
	return (
		<table className="table font-size-14">
            <thead>
                <tr className="table-light">
                    {Util.nvl(props.headerColumns, []).map(
                        (headerColumn, index) => 
                            <th key={index}>{headerColumn}</th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {Util.nvl(props.rows, []).map(
                    (row, index) => 
                        <tr key={index}>
                            {Util.nvl(row.columns, []).map(
                                (column, index) => 
                                    <td key={index}>
                                        {column.content}
                                    </td>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </table>
	);
}