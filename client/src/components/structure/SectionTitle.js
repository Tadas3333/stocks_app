import './SectionTitle.scss'

export default function SectionTitle(props) {
	return (
        <div className="row">
            <div className="col">
                <div className="section-title pb-2">{props.title}</div>
            </div>
        </div> 
	);
}