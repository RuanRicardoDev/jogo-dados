"use client"

import { useState } from "react"
import Dado from "./Dado"

export default function JogoDados() {
  const [rodada, setRodada] = useState(1)

  const [dadosJogador1, setDadosJogador1] = useState([1, 1])
  const [dadosJogador2, setDadosJogador2] = useState([1, 1])

  const [jogador1Jogou, setJogador1Jogou] = useState(false)
  const [jogador2Jogou, setJogador2Jogou] = useState(false)

  const [resultado, setResultado] = useState("")

  const [pontosJogador1, setPontosJogador1] = useState(0)
  const [pontosJogador2, setPontosJogador2] = useState(0)

  const [fimDeJogo, setFimDeJogo] = useState(false)

  function sortearDado() {
    return Math.floor(Math.random() * 6) + 1
  }

  function jogarJogador1() {
    const dado1 = sortearDado()
    const dado2 = sortearDado()

    setDadosJogador1([dado1, dado2])
    setJogador1Jogou(true)

    if (jogador2Jogou) {
      verificarResultado([dado1, dado2], dadosJogador2)
    }
  }

  function jogarJogador2() {
    const dado1 = sortearDado()
    const dado2 = sortearDado()

    setDadosJogador2([dado1, dado2])
    setJogador2Jogou(true)

    if (jogador1Jogou) {
      verificarResultado(dadosJogador1, [dado1, dado2])
    }
  }

  function verificarResultado(
    dados1: number[],
    dados2: number[]
  ) {
    const soma1 = dados1[0] + dados1[1]
    const soma2 = dados2[0] + dados2[1]

    if (soma1 > soma2) {
      setResultado("Jogador 1 venceu")
      setPontosJogador1(pontosJogador1 + 1)
    } else if (soma2 > soma1) {
      setResultado("Jogador 2 venceu")
      setPontosJogador2(pontosJogador2 + 1)
    } else {
      setResultado("Empate")
    }
  }

  function proximaRodada() {
    if (rodada === 5) {
      setFimDeJogo(true)
      return
    }

    setRodada(rodada + 1)
    setJogador1Jogou(false)
    setJogador2Jogou(false)
    setResultado("")
    setDadosJogador1([1, 1])
    setDadosJogador2([1, 1])
  }

  function jogarNovamente() {
    setRodada(1)
    setDadosJogador1([1, 1])
    setDadosJogador2([1, 1])
    setJogador1Jogou(false)
    setJogador2Jogou(false)
    setResultado("")
    setPontosJogador1(0)
    setPontosJogador2(0)
    setFimDeJogo(false)
  }

  if (fimDeJogo) {
    return (
      <main>
        <div className="final">
          <h1>Fim de jogo!</h1>

          {pontosJogador1 > pontosJogador2 && (
            <h2>Jogador 1 venceu a partida!</h2>
          )}

          {pontosJogador2 > pontosJogador1 && (
            <h2>Jogador 2 venceu a partida!</h2>
          )}

          {pontosJogador1 === pontosJogador2 && (
            <h2>Empate geral!</h2>
          )}

          <p>Jogador 1: {pontosJogador1} pontos</p>
          <p>Jogador 2: {pontosJogador2} pontos</p>

          <button onClick={jogarNovamente}>
            Jogar Novamente
          </button>
        </div>
      </main>
    )
  }

  return (
    <main>
      <h1>🎲 JOGO DE DADOS 🎲</h1>

      <div className="rodada">
        Rodada {rodada} de 5
      </div>

      <div className="jogadores">

        <section className="jogador">
          <h2>JOGADOR 1</h2>

          <div className="dados">
            <Dado valor={dadosJogador1[0]} />
            <Dado valor={dadosJogador1[1]} />
          </div>

          <p className="soma">
            Soma: {dadosJogador1[0] + dadosJogador1[1]}
          </p>

          <button
            onClick={jogarJogador1}
            disabled={jogador1Jogou}
          >
            Jogar Dados
          </button>
        </section>

        <section className="jogador">
          <h2>JOGADOR 2</h2>

          <div className="dados">
            <Dado valor={dadosJogador2[0]} />
            <Dado valor={dadosJogador2[1]} />
          </div>

          <p className="soma">
            Soma: {dadosJogador2[0] + dadosJogador2[1]}
          </p>

          <button
            onClick={jogarJogador2}
            disabled={jogador2Jogou || !jogador1Jogou}
          >
            Jogar Dados
          </button>
        </section>

      </div>

      {resultado !== "" && (
        <div className="resultado">
          {resultado}
        </div>
      )}

      {resultado !== "" && (
        <button onClick={proximaRodada}>
          {rodada === 5
            ? "Finalizar Partida"
            : "Próxima Rodada"}
        </button>
      )}

      <div className="placar">
        Placar: Jogador 1: {pontosJogador1} | Jogador 2: {pontosJogador2}
      </div>
    </main>
  )
}