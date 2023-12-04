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
			<header className='row'>
				<a href="#">
					<img id="img" src={rabbit} className="logo" alt="Logo" />
					<ul className="navlist">
						<li className="nav"><a href="./index.html">Login</a></li>
						<li className="nav"><a href="./cadastro.html">Cadastre-se</a></li>
					</ul>
				</a>
			</header>
			<div className="test">
				<div className="textBox">
					<h2>
						Bem-Vindo ao <span>NeskGames</span>
					</h2>
					<p>Salve seus jogos favoritos na nossa biblioteca, venha fazer parte da nossa comunidade!</p>
					<a href="./cadastro">Cadastre-se</a>
				</div>
				<div className="imgBox">
					<img src={games} alt="Game" />
				</div>
			</div>
			<ul className="thumb">
				<li><img src={xbox} className="icon" alt="Xbox" /></li>
				<li><img src={steam} className="icon_2" alt="Steam" /></li>
				<li><img src={epic} className="icon" alt="Epic Games" /></li>
				<li><img src={psn} className="icon" alt="PSN" /></li>
			</ul>
		</section>
	)
}
