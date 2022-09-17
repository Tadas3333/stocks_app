import './FinancialsTableRow.scss'

export default function FinancialsTableRow(props) {
	return (
		<>
            <div className="row">
                <div className="col-5 pe-0">
                    <div className="w-100 financials-table-cell financials-table-label">{props.label}</div>
                </div>
                <div className="col-7 ps-0">
                    <div className="row">
                        <div className="col px-0 text-center">
                            <div className="w-100 financials-table-cell financials-table-secondary-color">{props.col1}</div>
                        </div>
                        <div className="col px-0 text-center">
                            <div className="w-100 financials-table-cell">{props.col2}</div>
                        </div>
                        <div className="col px-0 text-center">
                            <div className="w-100 financials-table-cell financials-table-secondary-color">{props.col3}</div>
                        </div>
                        <div className="col px-0 text-center">
                            <div className="w-100 financials-table-cell">{props.col4}</div>
                        </div>
                        <div className="col px-0 text-center">
                            <div className="w-100 financials-table-cell financials-table-secondary-color">{props.col5}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}