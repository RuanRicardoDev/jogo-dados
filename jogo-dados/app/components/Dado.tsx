type DadoProps = {
  valor: number
}

export default function Dado({ valor }: DadoProps) {
  return (
    <img
      src={`/dados/dado${valor}.png`}
      alt={`Dado mostrando ${valor}`}
      width={100}
      height={100}
    />
  )
}