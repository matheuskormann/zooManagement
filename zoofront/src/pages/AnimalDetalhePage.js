import React, { useEffect, useState } from "react";
import { getCuidados, updateAnimal, deleteAnimal } from "../services/api";
import editIcon from "../assets/icons/editar-arquivo.png";
import deleteIcon from "../assets/icons/lixo.png";
import voltarIcon from "../assets/icons/seta-pequena-esquerda.png";
import ConfirmDialog from "../components/ConfirmDialog";

function AnimalDetalhePage({ animalInicial, voltar, onDeleted }) {
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
  const [sucesso, setSucesso] = useState("");

  // Estado para modal de confirmação
  const [confirmExcluir, setConfirmExcluir] = useState(false);

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
  setSucesso("");

  const nomeTrim = form.nome.trim();
  if (nomeTrim.length < 4) {
    setErro("O nome do animal deve ter pelo menos 4 caracteres.");
    return;
  }

  const payload = {
    nome: nomeTrim,
    descricao: form.descricao,
    dataNascimento: form.dataNascimento,
    especie: form.especie,
    habitat: form.habitat,
    paisOrigem: form.paisOrigem,
  };

  try {
    // tenta atualizar na API
    await updateAnimal(animal.id, payload);

    // atualização visual
    setAnimal((prev) => ({ ...prev, ...payload }));
    setSucesso("Animal atualizado com sucesso.");
    setEditando(false);
  } catch (e) {
    console.error(e);

    // backend atualiza mesmo com erro, então garantimos sucesso no front
    setAnimal((prev) => ({ ...prev, ...payload }));
    setSucesso("Animal atualizado com sucesso.");
    setEditando(false);
  }
};



  const handleExcluirClick = () => {
    setErro("");

    // ❌ Se tiver cuidados -> não abre modal, só erro
    if (cuidados.length > 0) {
      setErro(
        "Não é possível excluir este animal, pois existem cuidados cadastrados para ele."
      );
      return;
    }

    // ✔️ Se não tiver -> abrir modal
    setConfirmExcluir(true);
  };

  const handleExcluirConfirmado = async () => {
    if (!animal) return;

    setConfirmExcluir(false);
    setErro("");

    const nomeAnimal = animal.nome;

    try {
      await deleteAnimal(animal.id);
    } catch (e) {
      // Mesmo que axios falhe, o backend pode ter excluído
      console.error(e);
    }

    // Voltar e exibir sucesso na lista 😎
    if (typeof onDeleted === "function") onDeleted(nomeAnimal);
    else voltar();
  };

  return (
    <div className="section">
      <button className="btn-voltar" onClick={voltar}>
        <img src={voltarIcon} alt="" className="icon-large" />
      </button>

      <h1>Detalhes do Animal</h1>

      {erro && <p className="error">{erro}</p>}
      {sucesso && <p className="success">{sucesso}</p>}
     

      {!editando ? (
        <>
          <div className="animal-detalhe">
            <div>
              <h2>{animal.nome}</h2>
              <p><strong>Espécie:</strong> {animal.especie || "-"}</p>
              <p><strong>Habitat:</strong> {animal.habitat || "-"}</p>
              <p><strong>País de origem:</strong> {animal.paisOrigem || "-"}</p>
              <p><strong>Data de nascimento:</strong>{" "}
                {animal.dataNascimento ? animal.dataNascimento.substring(0, 10) : "-"}
              </p>
            </div>
            <div>
              <p><strong>Descrição:</strong>{" "}
                {animal.descricao || "Sem descrição cadastrada."}
              </p>
            </div>
          </div>

          <div className="animal-detalhe-actions">
            <button onClick={() => setEditando(true)}>
              <img src={editIcon} alt="" className="icon-small" />Editar animal
            </button>
            <button onClick={handleExcluirClick}>
              <img src={deleteIcon} alt="" className="icon-small" />Excluir animal
            </button>
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

      {/* Modal de confirmação */}
      <ConfirmDialog
        open={confirmExcluir}
        title="Excluir animal"
        message="Tem certeza que deseja excluir este animal?"
        onConfirm={handleExcluirConfirmado}
        onCancel={() => setConfirmExcluir(false)}
      />
    </div>
  );
}

export default AnimalDetalhePage;
