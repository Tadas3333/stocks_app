import './DataCol.scss';

export default function DataCol(props) {
    var layout = "col-6 mt-2";
    if(props.layout) {
        layout = props.layout;
    }

	return (
        <div className={layout}>
            <span className="data-col-label color-grey">{props.label}</span><br/>
            <span className="data-col-data">{props.data}</span>
        </div>
	);
}