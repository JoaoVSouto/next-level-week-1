import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';
import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { OptionTypeBase, ValueType } from 'react-select';

import api from '../../services/api';

import sanitizeWhatsapp from '../../utils/sanitizeWhatsapp';

import Dropzone from '../../components/Dropzone';
import TextInput from '../../components/TextInput';
import Select from '../../components/Select';
import InputMask from '../../components/InputMask';

import useBodyClass from '../../hooks/useBodyClass';

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
  id: number;
  image: string;
  title: string;
  image_url: string;
}

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

interface SelectOption extends OptionTypeBase {
  value: string;
  label: string;
}

interface CustomErrors {
  dropzone?: string | null;
  map?: string | null;
  items?: string | null;
}

interface FormData {
  city: string;
  email: string;
  name: string;
  uf: string;
  whatsapp: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<SelectOption[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [selectedUf, setSelectedUf] = useState<SelectOption | null>(null);
  const [selectedCity, setSelectedCity] = useState<SelectOption | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [selectedFile, setSelectedFile] = useState<File>();

  const [showSuccess, setShowSuccess] = useState(false);

  const [customErrors, setCustomErrors] = useState<CustomErrors>({});

  const history = useHistory();

  const setBodyClass = useBodyClass();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const {
        coords: { latitude, longitude },
      } = position;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const res = await api.get('items');
      setItems(res.data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await axios.get<IBGEUFResponse[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
      );
      const ufInitials = res.data.map(uf => ({
        value: uf.sigla,
        label: uf.sigla,
      }));
      setUfs(ufInitials);
    })();
  }, []);

  useEffect(() => {
    if (!selectedUf?.value) return;

    (async () => {
      const res = await axios.get<IBGECityResponse[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf.value}/municipios`
      );
      const citiesNames = res.data.map(city => ({
        value: city.nome,
        label: city.nome,
      }));
      setCities(citiesNames);
    })();
  }, [selectedUf]);

  const handleSelectUf = (selectedOption: ValueType<OptionTypeBase>) => {
    const { label, value } = selectedOption as SelectOption;
    setSelectedUf({ label, value });
  };

  const handleSelectCity = (selectedOption: ValueType<OptionTypeBase>) => {
    const { label, value } = selectedOption as SelectOption;
    setSelectedCity({ label, value });
  };

  const handleMapClick = (e: LeafletMouseEvent) => {
    setSelectedPosition([e.latlng.lat, e.latlng.lng]);
  };

  const handleSelectItem = (itemId: number) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
      return;
    }

    setSelectedItems([...selectedItems, itemId]);
  };

  const handleSubmit: SubmitHandler<FormData> = async data => {
    let shouldAbortSubmit = false;

    if (!selectedFile) {
      setCustomErrors(state => ({
        ...state,
        dropzone: 'Nenhuma imagem selecionada',
      }));
      shouldAbortSubmit = true;
    } else {
      setCustomErrors(state => ({
        ...state,
        dropzone: null,
      }));
    }

    if (selectedPosition.every(coordinate => !coordinate)) {
      setCustomErrors(state => ({
        ...state,
        map: 'Nenhum lugar selecionado',
      }));
      shouldAbortSubmit = true;
    } else {
      setCustomErrors(state => ({
        ...state,
        map: null,
      }));
    }

    if (!selectedItems.length) {
      setCustomErrors(state => ({
        ...state,
        items: 'Nenhum item selecionado',
      }));
      shouldAbortSubmit = true;
    } else {
      setCustomErrors(state => ({
        ...state,
        items: null,
      }));
    }

    if (shouldAbortSubmit) {
      return;
    }

    const { name, city, email, uf, whatsapp: rawWhatsapp } = data;
    const whatsapp = sanitizeWhatsapp(rawWhatsapp);
    const [latitude, longitude] = selectedPosition;

    const payload = new FormData();

    payload.append('name', name);
    payload.append('city', city);
    payload.append('email', email);
    payload.append('uf', uf);
    payload.append('whatsapp', whatsapp);
    payload.append('latitude', String(latitude));
    payload.append('longitude', String(longitude));
    payload.append('items', selectedItems.join(','));

    if (selectedFile) {
      payload.append('image', selectedFile);
    }

    await api.post('points', payload);

    window.scroll({
      top: 0,
    });

    setShowSuccess(true);
    setBodyClass('overflow-hidden');

    setTimeout(() => {
      setShowSuccess(false);
      setBodyClass('');
      history.push('/');
    }, 2000);
  };

  return (
    <>
      <div id="page-create-point">
        <header>
          <img src={logo} alt="Ecoleta" />

          <Link to="/">
            <FiArrowLeft />
            Voltar para home
          </Link>
        </header>

        <Form onSubmit={handleSubmit}>
          <h1>
            Cadastro do <br /> ponto de coleta
          </h1>

          <Dropzone
            onFileUpload={setSelectedFile}
            error={customErrors.dropzone}
          />

          <fieldset>
            <legend>
              <h2>Dados</h2>
            </legend>

            <div className="field">
              <TextInput name="name" label="Nome da entidade" type="text" />
            </div>

            <div className="field-group">
              <div className="field">
                <TextInput name="email" label="E-mail" type="email" />
              </div>

              <div className="field">
                <InputMask
                  name="whatsapp"
                  label="Whatsapp"
                  type="text"
                  mask="+55 (99) 99999-9999"
                  alwaysShowMask
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Endereço</h2>
              <span>Selecione o endereço no mapa</span>
            </legend>

            <Map
              center={initialPosition}
              className={customErrors.map ? 'error' : ''}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <Marker position={selectedPosition} />
            </Map>

            {customErrors.map && (
              <span>
                <FiAlertTriangle color="#e57373" size={20} />
                {customErrors.map}
              </span>
            )}

            <div className="field-group">
              <div className="field">
                <Select
                  name="uf"
                  label="Estado (UF)"
                  placeholder="Selecione uma UF"
                  onChange={handleSelectUf}
                  value={selectedUf}
                  options={ufs}
                  noOptionsMessage={() => 'Nenhuma UF encontrada'}
                />
              </div>
              <div className="field">
                <Select
                  name="city"
                  label="Cidade"
                  placeholder="Selecione uma cidade"
                  onChange={handleSelectCity}
                  value={selectedCity}
                  options={cities}
                  noOptionsMessage={() => 'Nenhuma cidade encontrada'}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <h2>Itens de coleta</h2>
              <span>Selecione um ou mais itens abaixo</span>
            </legend>

            <div className={`items-grid ${customErrors.items ? 'error' : ''}`}>
              {items.map(item => (
                <button
                  type="button"
                  key={String(item.id)}
                  onClick={() => handleSelectItem(item.id)}
                  className={selectedItems.includes(item.id) ? 'selected' : ''}
                >
                  <img src={item.image_url} alt={item.title} />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            {customErrors.items && (
              <span>
                <FiAlertTriangle color="#e57373" size={20} />
                {customErrors.items}
              </span>
            )}
          </fieldset>

          <button type="submit">Cadastrar ponto de coleta</button>
        </Form>
      </div>

      <div className={`success-info ${showSuccess ? 'show-success' : ''}`}>
        <FiCheckCircle color="#34cb79" size={64} />
        <p>Cadastro concluído!</p>
      </div>
    </>
  );
};

export default CreatePoint;
