import './MainNavigation.scss';

export default function MainNavigation() {
	return (
		<>
		<nav className="navigation">
			<nav className="navbar navbar-expand-lg navigation-inner">
				<div className="container">
					<span className="navbar-brand text-white">Navbar</span>

					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item active">
								<span className="nav-link active text-white">Home</span>
							</li>
							<li className="nav-item">
								<span className="nav-link text-white">Market</span>
							</li>
						</ul>
						<div className="d-flex flex-row-reverse search-container">
							<form className="form-inline my-2 my-lg-0 search-form">
								<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
							</form>
						</div>
					</div>
				</div>
			</nav>
		</nav>
		<div className="under-navigation"></div>
		</>
	);
}