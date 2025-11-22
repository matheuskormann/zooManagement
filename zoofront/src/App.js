import React, { useState } from "react";
import "./App.css";
import logo from "./assets/logoZooSemFundo.png";

import HomePage from "./pages/HomePage";
import AnimaisPage from "./pages/AnimaisPage";
import CuidadosPage from "./pages/CuidadosPage";
import AnimalDetalhePage from "./pages/AnimalDetalhePage";

function App() {
  const [pagina, setPagina] = useState("home"); // home | animais | cuidados | animalDetalhe
  const [animalSelecionado, setAnimalSelecionado] = useState(null);

  const [animalSuccessMessage, setAnimalSuccessMessage] = useState("");

  const irParaHome = () => {
    setPagina("home");
    setAnimalSelecionado(null);
  };

  const irParaAnimais = () => {
  setPagina("animais");
  setAnimalSelecionado(null);
  setAnimalSuccessMessage("");
};


  const irParaCuidados = () => {
    setPagina("cuidados");
    setAnimalSelecionado(null);
  };

  const handleVerMaisAnimal = (animal) => {
    setAnimalSelecionado(animal);
    setPagina("animalDetalhe");
  };

  const handleAnimalDeleted = (nomeAnimal) => {
  setPagina("animais");
  setAnimalSelecionado(null);
  setAnimalSuccessMessage(`O animal "${nomeAnimal}" foi excluído com sucesso.`);
};



let conteudo;
if (pagina === "home") {
  conteudo = <HomePage />;
} else if (pagina === "animais") {
  conteudo = (
    <AnimaisPage
      onVerMais={handleVerMaisAnimal}
      successMessage={animalSuccessMessage}
      setSuccessMessage={setAnimalSuccessMessage}
    />
  );
} else if (pagina === "cuidados") {
  conteudo = <CuidadosPage />;
} else if (pagina === "animalDetalhe" && animalSelecionado) {
  conteudo = (
    <AnimalDetalhePage
      animalInicial={animalSelecionado}
      voltar={() => {
        setPagina("animais");
        setAnimalSelecionado(null);
      }}
      onDeleted={handleAnimalDeleted}
    />
  );
} else {
  conteudo = <HomePage />;
}


  return (
    <div>
      <header className="navbar">

        <div className="navbar-brand"><img src={logo} alt="Logo do Zoo" className="navbar-logo" />Zoo Manager</div>
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
