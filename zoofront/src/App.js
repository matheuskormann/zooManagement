import React, { useState } from "react";
import "./App.css";

import HomePage from "./pages/HomePage";
import AnimaisPage from "./pages/AnimaisPage";
import CuidadosPage from "./pages/CuidadosPage";
import AnimalDetalhePage from "./pages/AnimalDetalhePage";

function App() {
  const [pagina, setPagina] = useState("home"); // home | animais | cuidados | animalDetalhe
  const [animalSelecionado, setAnimalSelecionado] = useState(null);

  const irParaHome = () => {
    setPagina("home");
    setAnimalSelecionado(null);
  };

  const irParaAnimais = () => {
    setPagina("animais");
    setAnimalSelecionado(null);
  };

  const irParaCuidados = () => {
    setPagina("cuidados");
    setAnimalSelecionado(null);
  };

  const handleVerMaisAnimal = (animal) => {
    setAnimalSelecionado(animal);
    setPagina("animalDetalhe");
  };

  let conteudo;
  if (pagina === "home") {
    conteudo = <HomePage />;
  } else if (pagina === "animais") {
    conteudo = <AnimaisPage onVerMais={handleVerMaisAnimal} />;
  } else if (pagina === "cuidados") {
    conteudo = <CuidadosPage />;
  } else if (pagina === "animalDetalhe" && animalSelecionado) {
    conteudo = (
      <AnimalDetalhePage
        animalInicial={animalSelecionado}
        voltar={() => setPagina("animais")}
      />
    );
  } else {
    conteudo = <HomePage />;
  }

  return (
    <div>
      <header className="navbar">
        <div className="navbar-brand">Zoo Manager</div>
        <nav className="navbar-links">
          <button
            className={pagina === "home" ? "nav-active" : ""}
            onClick={irParaHome}
          >
            Início
          </button>
          <button
            className={pagina === "animais" ? "nav-active" : ""}
            onClick={irParaAnimais}
          >
            Animais
          </button>
          <button
            className={pagina === "cuidados" ? "nav-active" : ""}
            onClick={irParaCuidados}
          >
            Cuidados
          </button>
        </nav>
      </header>

      <main className="main-container">{conteudo}</main>
    </div>
  );
}

export default App;
