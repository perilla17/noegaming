function JuegoCard({ juego, esFavorito, onToggleFavorito }) {
  return (
    <article className="game-card">
      <div className={`game-art ${juego.art}`}>
        <img src={juego.image} alt={`Portada de ${juego.name}`} />
        <span className="game-genre">{juego.genre}</span>
        <button
          className={`favorite-toggle${esFavorito ? ' is-favorite' : ''}`}
          type="button"
          onClick={() => onToggleFavorito(juego.id)}
          aria-label={esFavorito ? `Quitar ${juego.name} de favoritos` : `Añadir ${juego.name} a favoritos`}
          aria-pressed={esFavorito}
          title={esFavorito ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          {esFavorito ? '♥' : '♡'}
        </button>
      </div>
      <div className="game-info">
        <h3>{juego.name}</h3>
        <p>{juego.description}</p>
      </div>
    </article>
  )
}

export default JuegoCard
