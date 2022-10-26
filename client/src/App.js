import MainLayout from 'layouts/main/MainLayout';
import MainRoutes from 'routes/MainRoutes';

import "assets/styles/Main.scss"
import "assets/styles/Colors.scss"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App() {
	return (
		<div className="app-body">
			<MainLayout body={<MainRoutes />}/>
		</div>
	);
}