import './RangeSlider.scss';

export default function RangeSlider() {
	return (
		<>
        <div className="font-size-14 text-center">
        52 Week Range
        </div>
        <div className="d-flex align-items-center">
            <div className="pe-2 font-weight-600 font-size-14">
                129.04
            </div>
            <input type="range" 
                className="form-range range-slider"
                min="129.04" 
                max="182.94"
                defaultValue="138.20"
                disabled />
            <div className="ps-2 font-weight-600 font-size-14">
                182.94
            </div>
        </div>
		</>
	);
}