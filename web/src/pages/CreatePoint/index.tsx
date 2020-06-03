import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';

import './styles.css';

import logo from '../../assets/logo.svg';

const CreatePoint: React.FC = () => {
  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />

        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input id="name" type="text" name="name" />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input id="email" type="email" name="email" />
            </div>

            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input id="whatsapp" type="text" name="whatsapp" />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={[-5.839974, -35.2115434]} zoom={15}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={[-5.839974, -35.2115434]} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select name="uf" id="uf">
                <option value="0">Selecione uma UF</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select name="city" id="city">
                <option value="0">Selecione uma cidade</option>
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Itens de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </legend>

          <ul className="items-grid">
            <li>
              <img
                src="http://localhost:3333/uploads/baterias.svg"
                alt="Baterias"
              />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/baterias.svg"
                alt="Baterias"
              />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/baterias.svg"
                alt="Baterias"
              />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/baterias.svg"
                alt="Baterias"
              />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/baterias.svg"
                alt="Baterias"
              />
              <span>Óleo de Cozinha</span>
            </li>
            <li>
              <img
                src="http://localhost:3333/uploads/baterias.svg"
                alt="Baterias"
              />
              <span>Óleo de Cozinha</span>
            </li>
          </ul>
        </fieldset>

        <button type="submit">Cadastrar ponto de coleta</button>
      </form>
    </div>
  );
};

export default CreatePoint;
