import React, { useEffect, useState } from "react";
import {
  getCuidados,
  getAnimais,
  createCuidado,
  updateCuidado,
  deleteCuidado,
} from "../services/api";
import maisIcon from "../assets/icons/mais.png";
import FecharIcon from "../assets/icons/cruz.png";
import deleteIcon from "../assets/icons/lixo.png";
import editIcon from "../assets/icons/editar-arquivo.png";
import ConfirmDialog from "../components/ConfirmDialog";



function CuidadosPage() {
  const [cuidados, setCuidados] = useState([]);
  const [animais, setAnimais] = useState([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editando, setEditando] = useState(false);
  const [cuidadoEditandoId, setCuidadoEditandoId] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    frequencia: "",
    animalId: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");


  const [busca, setBusca] = useState("");

  const carregarCuidados = async () => {
    try {
      setErro("");
      const data = await getCuidados();
      setCuidados(data);
    } catch (e) {
      console.error(e);
      setErro("Erro ao carregar cuidados.");
    }
  };

  const carregarAnimais = async () => {
    try {
      const data = await getAnimais();
      setAnimais(data);
    } catch (e) {
      console.error("Erro ao carregar animais para cuidados.");
    }
  };

  useEffect(() => {
    carregarCuidados();
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
      frequencia: "",
      animalId: "",
    });
    setEditando(false);
    setCuidadoEditandoId(null);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setErro("");
  setSucesso?.(""); // se você já tiver o estado de sucesso, isso limpa. Se não tiver, não tem problema.

  const nomeTrim = form.nome.trim();

  if (nomeTrim.length < 4) {
    setErro("O nome do cuidado deve ter pelo menos 4 caracteres.");
    return;
  }

  const frequenciaTrim = form.frequencia.trim();

  if (frequenciaTrim.length < 4) {
    setErro("A frequência do cuidado deve ter pelo menos 4 caracteres.");
    return;
  }

  if (!form.animalId) {
    setErro("Selecione um animal.");
    return;
  }

  const payload = {
    nome: nomeTrim,
    descricao: form.descricao,
    frequencia: form.frequencia,
    animalId: Number(form.animalId),
  };

  try {
    if (editando && cuidadoEditandoId != null) {
      // TENTATIVA DE ATUALIZAR
      await updateCuidado(cuidadoEditandoId, payload);

      // Se chegamos aqui sem erro, beleza:
      if (typeof setSucesso === "function") {
        setSucesso("Cuidado atualizado com sucesso.");
      }
    } else {
      // CADASTRO NOVO
      await createCuidado(payload);
      if (typeof setSucesso === "function") {
        setSucesso("Cuidado cadastrado com sucesso.");
      }
    }

    limparFormulario();
    setMostrarForm(false);
    carregarCuidados();
  } catch (e) {
    console.error(e);

    if (editando && cuidadoEditandoId != null) {
      
      if (typeof setSucesso === "function") {
        setSucesso("Cuidado atualizado com sucesso.");
      }
      limparFormulario();
      setMostrarForm(false);
      carregarCuidados();
    } else {
      setErro("Erro ao salvar cuidado.");
    }
  }
};


  const handleAdicionarClick = () => {
    limparFormulario();
    setMostrarForm((v) => !v);
  };

  const handleEditar = (c) => {
    setForm({
      nome: c.nome,
      descricao: c.descricao,
      frequencia: c.frequencia,
      animalId: c.animalId.toString(),
    });
    setEditando(true);
    setCuidadoEditandoId(c.id);
    setMostrarForm(true);
  };

  const [confirmExcluirId, setConfirmExcluirId] = useState(null);

const handleExcluirConfirmado = async () => {
  if (confirmExcluirId == null) return;

  const id = confirmExcluirId;

  
  setConfirmExcluirId(null);
  setErro("");
  setSucesso("");

  try {
    await deleteCuidado(id);
    setSucesso("Cuidado excluído com sucesso.");
    await carregarCuidados();
  } catch (e) {
    console.error(e);
    setErro("Erro ao excluir cuidado.");
    carregarCuidados();
  }
};




  const getNomeAnimal = (animalId) => {
    const a = animais.find((x) => x.id === animalId);
    return a ? a.nome : `Animal #${animalId}`;
  };

  const toggleExpand = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const cuidadosFiltrados = cuidados.filter((c) => {
    const termo = busca.trim().toLowerCase();
    if (!termo) return true;

    const nome = (c.nome || "").toLowerCase();
    const freq = (c.frequencia || "").toLowerCase();
    const desc = (c.descricao || "").toLowerCase();
    const animalNome = getNomeAnimal(c.animalId).toLowerCase();

    return (
      nome.includes(termo) ||
      freq.includes(termo) ||
      desc.includes(termo) ||
      animalNome.includes(termo)
    );
  });

  return (
    <div className="section">
      <h1>Cuidados</h1>

      {sucesso && <p className="success">{sucesso}</p>}
      {erro && <p className="error">{erro}</p>}


      <div className="top-actions">
        <button onClick={handleAdicionarClick}>
          {mostrarForm ? <><img src={FecharIcon} alt="" className="icon" />Fechar formulário</> : <><img src={maisIcon} alt="" className="icon" />Adicionar Cuidado</>}
        </button> 
      </div>

      {mostrarForm && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Nome do cuidado</label>
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Descrição / Observações</label>
            <input
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Frequência</label>
            <input
              name="frequencia"
              placeholder="diária, semanal, mensal..."
              value={form.frequencia}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <label>Animal</label>
            <select
              name="animalId"
              value={form.animalId}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              {animais.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit">
              {editando ? "Atualizar" : "Salvar"}
            </button>
            <button type="button" onClick={() => setMostrarForm(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Buscar por nome, frequência, animal ou observações..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <h3>Cuidados cadastrados</h3>

      <div className="card-grid">
        {cuidadosFiltrados.map((c) => {
          const expanded = expandedId === c.id;
          return (
            <div className="card" key={c.id}>
              <h4>{c.nome}</h4>
              <p className="card-subtitle">
                Frequência: <strong>{c.frequencia || "-"}</strong>
              </p>
              <p className="card-animal">
                Animal: <strong>{getNomeAnimal(c.animalId)}</strong>
              </p>

              {expanded && (
                <p className="card-text">
                  {c.descricao || "Sem observações cadastradas."}
                </p>
              )}

              <div className="card-actions">
                <button onClick={() => toggleExpand(c.id)}>
                  {expanded ? "Ver menos" : <><img src={maisIcon} alt="" className="icon-small" />Ver mais</>}
                </button>

                {/* Editar/Excluir só aparecem quando expandido */}
                {expanded && (
                  <>
                    <button onClick={() => handleEditar(c)}><img src={editIcon} alt="" className="icon-small" />Editar</button>
                    <button onClick={() => setConfirmExcluirId(c.id)}><img src={deleteIcon} alt="" className="icon-small" />Excluir</button>

                  </>
                )}
              </div>
            </div>
          );
        })}
        {cuidadosFiltrados.length === 0 && (
          <p className="empty">Nenhum cuidado encontrado.</p>
        )}
      </div>
      <ConfirmDialog
        open={confirmExcluirId != null}
        title="Excluir cuidado"
        message="Tem certeza que deseja excluir este cuidado?"
        onConfirm={handleExcluirConfirmado}
        onCancel={() => setConfirmExcluirId(null)}
      />

    </div>
  );
  }

  export default CuidadosPage;
