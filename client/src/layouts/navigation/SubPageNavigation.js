import { NavLink} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SubPageNavigation.scss';

export default function SubPageNavigation(props) {
	return (
		<>
        <div className="sub-page-navigation">
            {
                props.links.map((link, index) =>
                    <NavLink to={link.to} key={index}>
                        <FontAwesomeIcon icon={link.icon}/><span className="ps-2">{link.text}</span>
                    </NavLink>
                )
            }
        </div>
		</>
	);
}