function JuegoCard({ juego, esFavorito, onToggleFavorito }) {
  const textoBoton = esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'

  return (
    <article className={`game-card${esFavorito ? ' is-favorite-card' : ''}`}>
      <div className={`game-art ${juego.art}`}>
        <img src={juego.image} alt={`Portada de ${juego.name}`} />
        <span className="game-genre">{juego.genre}</span>
      </div>

      <div className="game-info">
        <h3>{juego.name}</h3>
        <p>{juego.description}</p>
      </div>

      <button
        className={`favorite-button${esFavorito ? ' is-favorite' : ''}`}
        type="button"
        onClick={() => onToggleFavorito(juego.id)}
        aria-pressed={esFavorito}
        aria-label={`${textoBoton}: ${juego.name}`}
      >
        <span aria-hidden="true">{esFavorito ? '♥' : '♡'}</span>
        {textoBoton}
      </button>
    </article>
  )
}

export default JuegoCard
