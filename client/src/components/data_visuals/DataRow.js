import './DataRow.scss';

export default function DataRow(props) {
    var layout = "col-6";

    if(props.layout) {
        layout = props.layout;
    }

	return (
        <div className={layout}>
            <div className="row data-row g-1">
                <div className="col-6 data-row-label">{props.label}</div>
                <div className="col-6 data-row-data">{props.data}</div>
            </div>
        </div>
	);
}