import React, { useEffect, useState } from "react";
import { getCuidados, updateAnimal, deleteAnimal } from "../services/api";
import editIcon from "../assets/icons/editar-arquivo.png";
import deleteIcon from "../assets/icons/lixo.png";
import voltarIcon from "../assets/icons/seta-pequena-esquerda.png";

function AnimalDetalhePage({ animalInicial, voltar }) {
  const [animal, setAnimal] = useState(animalInicial);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nome: animalInicial.nome || "",
    descricao: animalInicial.descricao || "",
    dataNascimento: animalInicial.dataNascimento
      ? animalInicial.dataNascimento.substring(0, 10)
      : "",
    especie: animalInicial.especie || "",
    habitat: animalInicial.habitat || "",
    paisOrigem: animalInicial.paisOrigem || "",
  });
  const [cuidados, setCuidados] = useState([]);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const carregarCuidados = async () => {
      try {
        const todos = await getCuidados();
        const filtrados = todos.filter((c) => c.animalId === animalInicial.id);
        setCuidados(filtrados);
      } catch (e) {
        console.error("Erro ao carregar cuidados do animal.", e);
      }
    };

    carregarCuidados();
  }, [animalInicial.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSalvarEdicao = async (e) => {
    e.preventDefault();
    setErro("");

    const payload = {
      nome: form.nome,
      descricao: form.descricao,
      dataNascimento: form.dataNascimento,
      especie: form.especie,
      habitat: form.habitat,
      paisOrigem: form.paisOrigem,
    };

    try {
      await updateAnimal(animal.id, payload);
      setAnimal((prev) => ({ ...prev, ...payload }));
      setEditando(false);
    } catch (e) {
      console.error(e);
      setErro("Erro ao atualizar animal.");
    }
  };

  const handleExcluir = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este animal?")) return;
    try {
      await deleteAnimal(animal.id);
      voltar();
    } catch (e) {
      console.error(e);
      setErro("Erro ao excluir animal.");
    }
  };

  return (
    <div className="section">
      <button className="btn-voltar" onClick={voltar}>
        <img src={voltarIcon} alt="" className="icon-large" />
      </button>

      <h1>Detalhes do Animal</h1>

      {erro && <p className="error">{erro}</p>}

      {!editando ? (
        <>
          <div className="animal-detalhe">
            <div>
              <h2>{animal.nome}</h2>
              <p>
                <strong>Espécie:</strong> {animal.especie || "-"}
              </p>
              <p>
                <strong>Habitat:</strong> {animal.habitat || "-"}
              </p>
              <p>
                <strong>País de origem:</strong> {animal.paisOrigem || "-"}
              </p>
              <p>
                <strong>Data de nascimento:</strong>{" "}
                {animal.dataNascimento
                  ? animal.dataNascimento.substring(0, 10)
                  : "-"}
              </p>
            </div>
            <div>
              <p>
                <strong>Descrição:</strong>{" "}
                {animal.descricao || "Sem descrição cadastrada."}
              </p>
            </div>
          </div>

          <div className="animal-detalhe-actions">
            <button onClick={() => setEditando(true)}><img src={editIcon} alt="" className="icon-small" />Editar animal</button>
            <button onClick={handleExcluir}><img src={deleteIcon} alt="" className="icon-small" />Excluir animal</button>
          </div>
        </>
      ) : (
        <form className="form" onSubmit={handleSalvarEdicao}>
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
            <button type="button" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <h3>Cuidados deste animal</h3>
      {cuidados.length === 0 ? (
        <p className="empty">Nenhum cuidado cadastrado para este animal.</p>
      ) : (
        <div className="card-grid">
          {cuidados.map((c) => (
            <div className="card" key={c.id}>
              <h4>{c.nome}</h4>
              <p className="card-subtitle">
                Frequência: <strong>{c.frequencia || "-"}</strong>
              </p>
              <p className="card-text">
                {c.descricao || "Sem observações cadastradas."}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AnimalDetalhePage;
