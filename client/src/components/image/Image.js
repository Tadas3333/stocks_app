import {useEffect, useRef} from 'react'
import Util from 'util/Util'

export default function Image(props) {
    const imgClass = useRef("image d-none");

	useEffect(() => {
		try {
			if(!Util.isNull(props.src)) {
				imgClass.current = "image";
			} else {
				imgClass.current = "image d-none";
			}
		} catch(err) {
			console.log(err);
		}
    }, [props.src]);

	return (
		<div style={{width: props.width, 
					height: props.height}}>
			<img src={props.src} 
				alt={props.alt} 
				className={imgClass.current}
				style={{width: "100%", 
						height: "100%", 
						borderRadius: props.borderRadius}}></img>
		</div>
	);
}