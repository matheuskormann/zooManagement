import React, { useEffect, useState } from "react";
import { getAnimais, createAnimal } from "../services/api";
import maisIcon from "../assets/icons/mais.png";
import FecharIcon from "../assets/icons/cruz.png";

function AnimaisPage({ onVerMais }) {
  const [animais, setAnimais] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    dataNascimento: "",
    especie: "",
    habitat: "",
    paisOrigem: "",
  });
  const [erro, setErro] = useState("");

  const [busca, setBusca] = useState("");

  const carregarAnimais = async () => {
    try {
      setErro("");
      const data = await getAnimais();
      setAnimais(data);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar animais.");
    }
  };

  useEffect(() => {
    carregarAnimais();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const limparFormulario = () => {
    setForm({
      nome: "",
      descricao: "",
      dataNascimento: "",
      especie: "",
      habitat: "",
      paisOrigem: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");

    const payload = { ...form };

    try {
      await createAnimal(payload);
      limparFormulario();
      setMostrarForm(false);
      carregarAnimais();
    } catch (e) {
      console.error(e);
      setErro("Erro ao salvar animal.");
    }
  };

  // 🔍 Filtro único: procura em nome, espécie, habitat e país
  const animaisFiltrados = animais.filter((a) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;

    const nome = (a.nome || "").toLowerCase();
    const especie = (a.especie || "").toLowerCase();
    const habitat = (a.habitat || "").toLowerCase();
    const pais = (a.paisOrigem || "").toLowerCase();

    return (
      nome.includes(termo) ||
      especie.includes(termo) ||
      habitat.includes(termo) ||
      pais.includes(termo)
    );
  });

  return (
    <div className="section">
      <h1>Animais</h1>

      {erro && <p className="error">{erro}</p>}

      <div className="top-actions">
        <button
          className="btn-with-icon"
          onClick={() => setMostrarForm((v) => !v)}
        >
          
          {mostrarForm ? <><img src={FecharIcon} alt="" className="icon" />Fechar formulário</> : <><img src={maisIcon} alt="" className="icon" />Adicionar Animal</>}
        </button>
      </div>


      {mostrarForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Descrição</label>
            <input
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Espécie</label>
            <input
              name="especie"
              value={form.especie}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Habitat</label>
            <input
              name="habitat"
              value={form.habitat}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>País de origem</label>
            <input
              name="paisOrigem"
              value={form.paisOrigem}
              onChange={handleChange}
            />
          </div>

          <div className="form-buttons">
            <button type="submit">Salvar</button>
            <button type="button" onClick={() => setMostrarForm(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* 🔍 Barra de busca única */}
      <div className="filters-bar">
        <input
          type="text"
          placeholder="Buscar por nome, espécie, habitat ou país..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <h3>Lista de Animais</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Espécie</th>
            <th>Habitat</th>
            <th>País</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {animaisFiltrados.map((a) => (
            <tr key={a.id}>
              <td>{a.nome}</td>
              <td>{a.especie}</td>
              <td>{a.habitat}</td>
              <td>{a.paisOrigem}</td>
              <td>
                <button onClick={() => onVerMais(a)}><img src={maisIcon} alt="" className="icon-small" />Ver mais</button>
              </td>
            </tr>
          ))}
          {animaisFiltrados.length === 0 && (
            <tr>
              <td colSpan="5" className="empty">
                Nenhum animal encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnimaisPage;
