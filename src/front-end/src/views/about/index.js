import './index.css';
import rabbit from '../../assets/img/A_rabbit_wearin_0.png';
import games from '../../assets/img/games.png';
import xbox from '../../assets/img/xbox.png';
import epic from '../../assets/img/epic.png';
import psn from '../../assets/img/psn.png';
import steam from '../../assets/img/steam.png';

import axios from 'axios';

export default function () {


	return (
		<section>
			<header>
				<nav className="navbar px-3">
					<img src={rabbit} class="bd-placeholder-img rounded-circle" width="60" height="60" alt="Logo" />
					<ul className="nav">
						<li className="nav-item mx-2 text-white"><a href="./login" className="dropdown-item">Login</a></li>
						<li className="nav-item mx-2 text-white"><a href="./cadastro" className="dropdown-item">Cadastre-se</a></li>
					</ul>
				</nav>
			</header>
			<div className="container p-5">
				<div className="row">
					<div className="col-md-6 mt-5 letreiro">
						<h2>Bem-Vindo ao <span>NeskGames</span></h2>
						<p className="text-white mb-5">Salve seus jogos favoritos na nossa biblioteca, venha fazer parte da nossa comunidade!</p>
						<a href="./cadastro" className="my-5">Cadastre-se</a>
					</div>
					<div className="col-md-6 mt-5">
						<img src={games} alt="Game" className="img-fluid" />
					</div>
				</div>
			</div>
			<div className="d-flex justify-content-center pb-3">
				<ul className="nav mb-3 thumb">
					<li className="nav-item mx-3"><img src={xbox} alt="Xbox" width="40" height="40"/></li>
					<li className="nav-item mx-3"><img src={steam} alt="Steam" width="40" height="40"/></li>
					<li className="nav-item mx-3"><img src={epic} alt="Epic Games" width="40" height="40"/></li>
					<li className="nav-item mx-3"><img src={psn} alt="PSN" width="40" height="40"/></li>
				</ul>
			</div>
		</section>
	)
}
