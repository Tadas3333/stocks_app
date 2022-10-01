import Util from "util/Util"
import RangeSlider from "components/sliders/RangeSlider"
import './LiveTickerRangesData.scss'

export default function LiveTickerRangesData(props) {
	return (
        <div className="row">
            <div className="col-4">
                <RangeSlider />
            </div>
            <div className="col-4">
                <RangeSlider />
            </div>
            <div className="col-4">
                <RangeSlider />
            </div>
        </div>
    );
}		 