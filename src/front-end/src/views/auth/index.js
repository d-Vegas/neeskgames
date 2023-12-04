import './index.css';
import rabbit from '../../assets/img/A_rabbit_wearin_0.png';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export default function () {

  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['cookie']);

  const [form, setForm] = useState({
    username: '',
    password: ''
  });

  function submit() {
    axios.post('/auth', form)
      .then(({ data }) => {
        setCookie('user', data.user, { maxAge: 3600 }); //Registra o cookie com os dados do user.
        navigate('/'); //Redireciona para o dash.
      })
      .catch(({ message }) => {
        console.log(message);
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
            <div className="m-auto">
              <div className="mb-4 text-center">
                <h2>Bem-Vindo</h2>
                <p>Estamos felizes de vê-lo novamente.</p>
              </div>
              <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <div className="input-group mb-3">
                  <span className="input-group-text" id=""><i className="bi bi-person-circle fs-5"></i></span>
                  <input type="text" className="form-control" placeholder="Username" onChange={(e) => { form.username = e.target.value }} required/>
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text" id=""><i className="bi bi-lock fs-5"></i></span>
                  <input type="password" className="form-control" placeholder="Senha" onChange={(e) => { form.password = e.target.value }} required/>
                </div>
                <div className="input-group mb-3">
                  <button className="btn btn-lg btn-primary w-100 fs-6">Login</button>
                </div>
              </form>
              <div className="text-center">
                <div>Você não tem uma conta?</div>
                <div>
                  <a href="/cadastro">Cadastre-se aqui</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
