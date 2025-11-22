import React, { useEffect, useState } from "react";
import { getAnimais, getCuidados } from "../services/api";

function HomePage() {
  const [animais, setAnimais] = useState([]);
  const [cuidados, setCuidados] = useState([]);
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setErro("");
        setCarregando(true);

        const [animaisResp, cuidadosResp] = await Promise.all([
          getAnimais(),
          getCuidados(),
        ]);

        setAnimais(animaisResp);
        setCuidados(cuidadosResp);
      } catch (e) {
        console.error(e);
        setErro("Erro ao carregar estatísticas.");
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  const totalAnimais = animais.length;
  const totalCuidados = cuidados.length;

  // quantidade de animais por espécie
  const especiesCount = animais.reduce((acc, a) => {
    const key = a.especie && a.especie.trim() ? a.especie : "Não informado";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  // quantidade de animais por habitat
  const habitatsCount = animais.reduce((acc, a) => {
    const key = a.habitat && a.habitat.trim() ? a.habitat : "Não informado";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="section">
      <h1>Painel do Zoológico</h1>
      
      {erro && <p className="error">{erro}</p>}

      {carregando ? (
        <p>Carregando estatísticas...</p>
      ) : (
        <>
          {/* Cards principais */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Total de animais</h3>
              <p className="stat-number">{totalAnimais}</p>
            </div>

            <div className="stat-card">
              <h3>Total de cuidados</h3>
              <p className="stat-number">{totalCuidados}</p>
            </div>

            <div className="stat-card">
              <h3>Espécies diferentes</h3>
              <p className="stat-number">{Object.keys(especiesCount).length}</p>
            </div>

            <div className="stat-card">
              <h3>Habitats diferentes</h3>
              <p className="stat-number">{Object.keys(habitatsCount).length}</p>
            </div>
          </div>

          {/* Detalhamento por espécie e habitat */}
          <div className="stats-detail">
            <div className="stats-box">
              <h3>Animais por espécie</h3>
              {Object.keys(especiesCount).length === 0 ? (
                <p className="empty">Nenhum animal cadastrado.</p>
              ) : (
                <ul>
                  {Object.entries(especiesCount).map(([especie, qtd]) => (
                    <li key={especie}>
                      <strong>{especie}:</strong> {qtd}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="stats-box">
              <h3>Animais por habitat</h3>
              {Object.keys(habitatsCount).length === 0 ? (
                <p className="empty">Nenhum animal cadastrado.</p>
              ) : (
                <ul>
                  {Object.entries(habitatsCount).map(([habitat, qtd]) => (
                    <li key={habitat}>
                      <strong>{habitat}:</strong> {qtd}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
  