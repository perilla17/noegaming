import { Link } from 'react-router'
import JuegoCard from './JuegoCard.jsx'

function Favoritos({ juegos, favoritos, onToggleFavorito }) {
  const juegosFavoritos = juegos.filter((juego) => favoritos.includes(juego.id))

  return (
    <div className="content-wrap route-content">
      <section className="content-section favorites-section" aria-labelledby="favoritos-titulo">
        <span className="eyebrow">TU LISTA PERSONAL</span>
        <div className="section-title">
          <h2 id="favoritos-titulo">Mis favoritos</h2>
          <span className="favorites-count">{juegosFavoritos.length} {juegosFavoritos.length === 1 ? 'juego' : 'juegos'}</span>
        </div>
        {juegosFavoritos.length > 0 ? (
          <>
            <p className="section-intro">Los juegos que guardaste para tenerlos a mano.</p>
            <div className="game-grid">
              {juegosFavoritos.map((juego) => (
                <JuegoCard
                  key={juego.id}
                  juego={juego}
                  esFavorito
                  onToggleFavorito={onToggleFavorito}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="empty-favorites">
            <span className="empty-favorites-icon" aria-hidden="true">♡</span>
            <h3>Aún no tienes juegos favoritos</h3>
            <p>Explora el catálogo y toca el corazón de los juegos que quieras guardar.</p>
            <Link className="button" to="/catalogo">Explorar catálogo <span aria-hidden="true">→</span></Link>
          </div>
        )}
      </section>
    </div>
  )
}

export default Favoritos
