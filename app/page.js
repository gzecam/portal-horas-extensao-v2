'use client';

import { useState } from 'react';

export default function Home() {
  const [ra, setRa] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');

  async function consultar() {
    setErro('');
    setDados(null);

    try {
      const resposta = await fetch(
        process.env.NEXT_PUBLIC_API_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ra })
        }
      );

      const resultado = await resposta.json();

      if (resultado.erro) {
        setErro('RA não localizado.');
        return;
      }

      setDados(resultado);
    } catch {
      setErro('Erro ao consultar os dados.');
    }
  }

  return (
    <main className="container">
      <div className="card">

        <h1>Consulta de Horas de Extensão</h1>

        <h2>
          Curso Superior de Tecnologia em Mecatrônica Industrial
        </h2>

        <p className="campus">
          UniSENAI-SP • Campus São Caetano do Sul - Boa Vista
        </p>

        <input
          type="text"
          placeholder="Digite seu RA"
          value={ra}
          onChange={(e) => setRa(e.target.value)}
        />

        <button onClick={consultar}>
          CONSULTAR HORAS
        </button>

        {erro && (
          <div className="erro">
            {erro}
          </div>
        )}

        {dados && (
          <div className="resultado">
            <h3>{dados.nome}</h3>

            <p>
              <strong>Turma:</strong> {dados.turma}
            </p>

            <p>
              <strong>Horas Totais:</strong> {dados.horasTotais}
            </p>

            <p>
              <strong>Horas Faltantes:</strong> {dados.horasFaltantes}
            </p>
          </div>
        )}

      </div>

      <footer>
        UniSENAI-SP • Campus São Caetano do Sul - Boa Vista
      </footer>
    </main>
  );
}
