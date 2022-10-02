import Util from "util/Util"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTurnDown } from '@fortawesome/free-solid-svg-icons'
import RangeSlider from "components/sliders/RangeSlider"
import Progress from "components/progress/Progress"
import './LiveTickerRangesData.scss'

export default function LiveTickerRangesData(props) {
	return (
        <div className="row">
            <div className="col-4 font-size-12 align-self-center">
                <div className="row">
                    <div className="col-6 pe-0">
                        Volume: 45.44M
                    </div>
                    <div className="col-6 position-relative ps-0">
                        <div className="live-ticker-data-volume-icon">
                            <FontAwesomeIcon icon={faArrowTurnDown} transform="flip-h"/>
                        </div>
                        <span className="ps-2">Avg Volume: 34.81M</span>
                    </div>
                </div>
                <div className="mt-1"><Progress /></div>
            </div>
            <div className="col-4 text-center font-size-12 align-self-center">
                Day Range:<br/>
                <RangeSlider />
            </div>
            <div className="col-4 text-center font-size-12 align-self-center">
                52 Week Range:<br/>
                <RangeSlider />
            </div>
        </div>
    );
}		 