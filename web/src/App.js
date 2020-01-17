import React, { useEffect, useState } from 'react';
import api from './services/api';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';
//Componente: E um bloco isolado de html css js o qual nao interfere no restante da aplicacao

//Propriedade:  Informacoes que um compnente pai passa para o compnente filho

//Estado: E uma informacao mantida pelo componente
//(Lembrar da imutabilidade - nunca altera uma informacao, pega a antiga e cria uma nova a partir do valor antigo)

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';


function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, []);

  async function handleAddDev(data) {

    const response = await api.post('/devs', data);

    const devExists = devs.find(
      dev => dev.github_username === data.github_username
    );

    if (devExists) {
      console.log("Usuário já cadastrado");
      return;
    }

    setDevs([...devs, response.data]);

  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />

      </aside>

      <main>
        <ul>

          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}

        </ul>
      </main>
    </div >
  );
}

export default App;
