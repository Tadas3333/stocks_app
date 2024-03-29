import Util from 'util/Util';
import './Table.scss';

export default function Table(props) {

    const scrollableTable = {
        overflowY: 'auto',
        overflowX: 'hidden',
        height: props.height
      };

	return (
        <div style={(!Util.isNull(props.height) ? scrollableTable : {})}>
            <table className="table-comp font-size-14">
                <thead className="sticky-top">
                    <tr>
                        {Util.nvl(props.headerColumns, []).map(
                            (headerColumn, index) => 
                                <th key={index}>{headerColumn.content}</th>
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
        </div>
	);
}