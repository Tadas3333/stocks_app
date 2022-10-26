import MainNavigation from 'layouts/navigation/MainNavigation'
import Footer from 'layouts/footer/Footer'

export default function MainLayout(props) {
	return (
		<>
			<MainNavigation />
            {props.body}
			<Footer />
		</>
	);
}