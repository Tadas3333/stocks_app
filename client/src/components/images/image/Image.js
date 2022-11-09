import {useState} from 'react'
import Util from 'util/Util'

export default function Image(props) {
	const [imageSource, setImageSource] = useState(props.src);

	const handleError = () => {
	  if(!Util.isNull(props.replaceInvalidWith)) {
		// Set alternative react component if source is invalid
		setImageSource(props.replaceInvalidWith);
	  }
	  else {
	    setImageSource(null);
	  }
	}

	return (
		<>
		{
			(!Util.isNull(imageSource) && typeof imageSource !== "string")
			?
				(
					// Show alternative react component
					imageSource
				)
			:
				(
					(!Util.isNull(imageSource))
					?
						<img src={props.src} 
							alt={Util.nvl(props.alt, "")} 
							style={{
								width: Util.nvl(props.width, "auto"),
								height: Util.nvl(props.height, "auto"),
								maxWidth: Util.nvl(props.maxWidth, "none"),
								maxHeight: Util.nvl(props.maxHeight, "none")
							}}
							className={!Util.isNull(props.classes) ? props.classes : ""}
							onError={handleError}
						/>
					:
					//Show no image because no source exists and no alternative component is provided
					<></>
				)
		}
		</>
	);
}