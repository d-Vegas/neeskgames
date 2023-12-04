import './index.css';
import rabbit from '../../assets/img/A_rabbit_wearin_0.png';
import { Modal, Toast } from 'bootstrap';
import { useEffect, useRef, useState } from 'react';
import axios, { formToJSON } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function () {
	const [games, setGames] = useState([]);
	const [modal, setModal] = useState(null);

	const [cookies, setCookie, removeCookie] = useCookies(['cookie']);

	const navigate = useNavigate();

	//Execulta os comandos na montagem da pagina, podia ser onload().
	useEffect(() => {
		if (!cookies?.user?.id) logout(); //caso tente acessar esta rota sem estar logado sera redirecionado.

		getGames(); //consulta os jogos;

		setModal(new Modal(document.getElementById('modal'))); //Inicializa o modal.
	}, []);

	function getGames() {
		axios.get('/game')
			.then(({ data }) => {
				setGames(data);
			})
			.catch(() => {
			});
	}

	//Constroi os cards dos jogos e é reponsavel por redesenhar quando o 'setGames()' for usado.
	function Cards({ value }) {
		return (
			value.map(game => (
				<div role="button" className='col-12 col-sm-6 col-md-4 col-xl-2' key={game.id} onClick={() => setUpdate(game)}>
					<div className='card card-game rounded-3 overflow-hidden'>
						<div className='card-body d-flex p-0'>
							<span className="m-auto text-white display-3 text-truncate" >
								{game.name}
							</span>
						</div>
					</div>
				</div>
			))
		)
	}

	//Constroi o botão de inserir.
	function AddCard() {
		return (
			<div role="button" className='col-12 col-sm-6 col-md-4 col-xl-2' onClick={() => setInsert()}>
				<div className="card card-game rounded-3 overflow-hidden">
					<div className='card-body d-flex p-0'>
						<div className='m-auto'>
							<span className='display-1 text-white'>+</span>
						</div>
					</div>
				</div>
			</div>
		)

	}

	function logout() {
		removeCookie('user');
		navigate('/login');
	}

	//Altera o header do modal para 'Inserir'.
	function setInsert() {
		document.querySelector('#modal .modal-header .modal-title').innerHTML = 'Adicionar Jogo';
		clearForm();
		modal.show();
		if (deleteButton) {
			deleteButton.style.display = 'none';
		}
	}

	//Altera o header do modal para 'Atualizar'.
	function setUpdate(game) {
		document.querySelector('#modal .modal-header .modal-title').innerHTML = 'Atualizar Jogo';
		setForm(game);
		modal.show();
		if (deleteButton) {
			deleteButton.style.display = 'block';
		}
	}

	//Limpa form.
	function clearForm() {
		const form = document.getElementById('form');
		form.querySelector('[name="id"]').value = null;
		form.querySelector('[name="name"]').value = '';
		form.querySelector('[name="type"]').value = '';
		form.querySelector('[name="recommend"]').checked = false;
		form.querySelector('[name="tested"]').checked = false;
		form.querySelector('[name="rate"]').value = 0;

		setFormLabels();
	}

	//Altera os valores do form.		
	function setForm(game) {
		const form = document.getElementById('form');
		form.querySelector('[name="id"]').value = game.id;
		form.querySelector('[name="name"]').value = game.name;
		form.querySelector('[name="type"]').value = game.type;
		form.querySelector('[name="recommend"]').checked = game.recommend;
		form.querySelector('[name="tested"]').checked = game.tested;
		form.querySelector('[name="rate"]').value = game.rate;

		setFormLabels();
	}

	//Atualiza as 'labels' durante o onChange, update e clear. 
	function setFormLabels() {
		const form = document.getElementById('form');
		const recommend = form.querySelector('[name="recommend"]');
		const tested = form.querySelector('[name="tested"]');
		const rate = form.querySelector('[name="rate"]');

		recommend.parentNode.parentNode.nextSibling.value = recommend.checked ? 'Recomendo' : 'Não recomendo';
		tested.parentNode.parentNode.nextSibling.value = tested.checked ? 'Zerado' : 'Não zerado';
		rate.nextSibling.value = rate.value;
	}

	function insert(formData) {
		axios.put('/game', formData)
			.then(({ data }) => {
				//Usa spread('...') no 'games' dentro do 'setGames()'.
				//'setgames()' faz com que a variavel reativa force o redesenhar.
				setGames([...games, data.data]);
				modal.hide();
			})
			.catch(({ error }) => {
				console.error(error);
			});
	}

	function update(formJson) {
		axios.post('/game/' + formJson.id, formJson)
			.then(({ data }) => {
				//Usa o 'setGames()' para forçar reatividade e redesenhar em tela.
				let newArr = games.filter(e => e.id != data.data.id);
				newArr.push(data.data);
				setGames(newArr);
				modal.hide();
			})
			.catch(({ error }) => {
				console.error(error);
			});
	}

	function remove() {
		const form = formToJSON(document.getElementById('form'));
		axios.delete('/game/' + form.id)
			.then(response => {
				let newArr = games.filter(e => e.id != form.id);
				setGames(newArr);
				modal.hide();
			})
			.catch(error => {
				console.error(error);
			});
	}

	function submit(form) {

		//Se não houver um id sera um insert;
		const isInsert = !form.querySelector('[name="id"]').value;

		if (isInsert) {
			const formData = new FormData(form); //Converte o form em formData metodo PUT é preferivel FormData.
			insert(formData);
		} else {
			const formJson = formToJSON(form); //Função do axios.
			update(formJson);
		}
	}

	return (
		<section>
			<div className="container-fluid vh-100">
				<div className="row h-100">
					<div className="col-2 sidebar d-flex flex-column p-2">
						<div className="header d-flex">
							<img className='img-fluid rounded me-2' src={rabbit} alt="logo" width={50} />
							<div className='m-auto'>NeskGames</div>
						</div>
						<div className="body d-flex h-100 pt-3">
							<div className='d-flex h-100 w-100 flex-column justify-content-between'>
								<div>
									<a className='text-decoration-none text-black' href="">
										Jogos
									</a>
								</div>
								<div className='text-center'>
									<a className='text-decoration-none text-black' href="" onClick={() => logout()}>
										Sair
									</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col content p-3 overflow-auto vh-100">
						<div className="row g-2">
							<AddCard />
							<Cards value={games} />
						</div>
					</div>
				</div>
			</div>


			<div id="modal" className="modal" tabIndex="-1">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<span className="modal-title h5"></span>
							<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<form id="form" onSubmit={(e) => { e.preventDefault(); submit(e.target); }}>
							<div className="modal-body">
								<div className='container-fluid'>
									<input name="id" type='number' hidden />
									<div className='row g-2'>
										<div className="col-12">
											<div className="input-group mb-3">
												<span className="input-group-text">Jogo</span>
												<input name="name" type="text" className="form-control" onChange={(e) => { }} required />
											</div>
										</div>
										<div className="col-12">
											<div className="input-group mb-3">
												<span className="input-group-text" id="inputGroup-sizing-default">Plataforma</span>
												<input name="type" type="text" className="form-control" onChange={(e) => { }} required />
											</div>

										</div>
										<div className='col-6'>
											<div className="input-group mb-3">
												<div className="input-group-text">
													<div className="form-check form-switch mb-0">
														<input name="recommend" className="form-check-input" type="checkbox" role="switch" onChange={(e) => { setFormLabels() }} />
													</div>
												</div>
												<input type="text" className="form-control pe-none bg-body-tertiary" readOnly tabIndex={-1} />
											</div>
										</div>

										<div className='col-6'>
											<div className="input-group mb-3">
												<div className="input-group-text">
													<div className="form-check form-switch mb-0">
														<input name="tested" className="form-check-input" type="checkbox" role="switch" onChange={(e) => { setFormLabels() }} />
													</div>
												</div>
												<input type="text" className="form-control pe-none bg-body-tertiary" readOnly tabIndex={-1} />
											</div>
										</div>

										<div className='col-12'>
											<div>Nota para o Jogo</div>
											<input className="me-1" name="rate" type="range" min="0" max="10" step="1" onChange={(e) => { setFormLabels() }} />
											<output htmlFor="slider">0</output>
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
								<button id="deleteButton" type="button" className="btn btn-danger" onClick={remove}>Deletar Jogo</button>
								<button className="btn btn-primary">Salvar Cadastrar</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section >
	);
}