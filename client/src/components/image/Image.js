import {useState} from 'react'
import Util from 'util/Util'

export default function Image(props) {
	const [imageSource, setImageSource] = useState(props.src);

	const handleError = () => 
	  setImageSource("");

	return (
		<div style={{width: props.width, 
					height: props.height}}>
			<img src={props.src} 
				alt={props.alt} 
				className={(Util.isNull(imageSource)) ? "d-none" : ""}
				onError={handleError}
				style={{width: "100%", 
						height: "100%", 
						borderRadius: props.borderRadius}}></img>
		</div>
	);
}