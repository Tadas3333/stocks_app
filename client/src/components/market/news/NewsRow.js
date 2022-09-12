import {useEffect, useRef} from 'react'
import './NewsRow.scss';

export default function NewsRow(props) {
    const imgClass = useRef("news-row-image d-none");

    useEffect(() => {
        if(props.image) {
            imgClass.current = "news-row-image";
        } else {
            imgClass.current = "news-row-image d-none";
        }
    }, [props.image]);

	return (
        <div className="col-6 mb-3">
            <div className="news-row pb-3">
                <div className="row">
                    <div className="col-9">
                        <div className="news-row-details">
                            {props.time} by {props.source}
                        </div>
                        <div className="news-row-title">
                            {props.title}
                        </div>
                    </div>
                    <div className="col-3">
                        <img src={props.image} alt="News" className={imgClass.current}></img>
                    </div>
                </div>
            </div>
        </div>
	);
}