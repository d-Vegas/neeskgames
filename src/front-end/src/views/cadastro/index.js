import './index.css';
import rabbit from '../../assets/img/A_rabbit_wearin_0.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function () {

	const navigate = useNavigate();

	function submit(form) {
		let formData = new FormData(form);

		axios.put('/user', formData)
			.then(() => {
				navigate('/login'); //Redireciona para o dash.
			})
			.catch(({ error }) => {
				console.error(error);
			});
	}

	return (
		<div className="container d-flex justify-content-center align-items-center min-vh-100">
			<div className="row border rounded-5 bg-white shadow box-area justify-content-between p-4">
				<div className="col-md-auto rounded-4 p-0">
					<div className="featured-image">
						<img src={rabbit} className="img-fluid rounded-5" style={{ height: '400px' }} />
					</div>
				</div>

				<div className="col-md-6">
					<div className="row h-100 w-100">
						<div className="m-auto text-center">
							<div className='mb-4 h3'>Cadastre-se</div>
							<form onSubmit={(e) => { e.preventDefault(); submit(e.target); }}>
								<div className="input-group mb-3">
									<span className="input-group-text" id=""><i className="bi bi-person-fill fs-5"></i></span>
									<input name="username" type="text" className="form-control" placeholder="username" required />
								</div>
								<div className="input-group mb-3">
									<span className="input-group-text" id=""><i className="bi bi-person-circle fs-5"></i></span>
									<input name="email" type="text" className="form-control" placeholder="Email" required />
								</div>
								<div className="input-group mb-3">
									<span className="input-group-text" id=""><i className="bi bi-lock fs-5"></i></span>
									<input name="password" type="password" className="form-control" placeholder="Senha" required />
								</div>
								<div className="input-group mb-3">
									<button className="btn btn-lg btn-primary w-100 fs-6">Cadastrar</button>
								</div>
							</form>
						</div>
					<div className="text-center">
						<div>Lembrou do seu login?</div>
						<div>
							<a href="/login">Faça login</a>
						</div>
					</div>
					</div>
				</div>
			</div>
		</div>
	)
}
