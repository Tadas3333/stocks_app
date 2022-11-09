import Util from 'util/Util'

export default function DefaultTickerImage(props) {
	return (
        <div className="d-flex align-items-center background-grey border-radius-7"
                style={
                    {
                        width: Util.nvl(props.width, "auto"),
                        height: Util.nvl(props.height, "auto"),
                    }
                }>
            <span className="text-center w-100 font-size-12 font-weight-700">
                {props.tickerSymbol}
            </span>
        </div>
	);
}