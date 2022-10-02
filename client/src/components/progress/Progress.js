import './Progress.scss';

export default function Progress() {
	return (
		<>
        <div className="progress-line">
            <div className="progress-line-middle"></div>
            <div className="progress-line-inner ps-2" 
                 style={{width: '70%'}}>
            </div>
        </div>
		</>
	);
}