'use client';
import {useState} from 'react';
export default function Home(){
const [ra,setRa]=useState('');
const [dados,setDados]=useState(null);
const [erro,setErro]=useState('');
async function consultar(){
setErro(''); setDados(null);
try{
const r=await fetch(process.env.NEXT_PUBLIC_API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ra})});
const j=await r.json();
if(j.erro){setErro(j.erro);return;}
setDados(j);
}catch(e){setErro('Erro ao consultar dados');}
}
return <div className='card'><h1>Portal de Horas de Extensão</h1><input placeholder='Digite o RA' value={ra} onChange={e=>setRa(e.target.value)}/><button onClick={consultar}>Consultar</button>{erro&&<p>{erro}</p>}{dados&&<div><h3>Resultado</h3><p><b>Nome:</b> {dados.nome}</p><p><b>Turma:</b> {dados.turma}</p><p><b>Horas Totais:</b> {dados.horasTotais}</p><p><b>Horas Faltantes:</b> {dados.horasFaltantes}</p></div>}</div>
}
