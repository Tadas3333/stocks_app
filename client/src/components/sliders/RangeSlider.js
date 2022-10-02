import './RangeSlider.scss';

export default function RangeSlider() {
	return (
		<>
        <div className="d-flex align-items-center">
            <div className="pe-2">
                129.04
            </div>
            <div className="range-slider">
                <div className="range-slider-point"
                     style={{left: '35%'}}>
                </div>
            </div>
            {/*
            <input type="range" 
                className="form-range range-slider"
                min="129.04" 
                max="182.94"
                defaultValue="138.20"
                disabled />*/}
            <div className="ps-2">
                182.94
            </div>
        </div>
		</>
	);
}