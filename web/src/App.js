import React, { useState, useEffect } from "react";

import api from "./services/api";

import DevForm from "./components/DevForm";
import DevItem from "./components/DevItem";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const reponse = await api.get("/devs");

      setDevs(reponse.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const reponse = await api.post("/devs", data);

    setDevs([...devs, reponse.data]);
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
    </div>
  );
}

export default App;
