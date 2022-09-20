import MainRoute from 'routes/MainRoute';

import "assets/styles/Main.scss"
import "assets/styles/Colors.scss"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
	return (
		<div className="app-body">
			<MainRoute />
		</div>
	);
}