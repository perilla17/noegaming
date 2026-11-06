import { Link } from 'react-router'
import JuegoCard from './JuegoCard.jsx'

function CatalogoJuegos({ juegos, favoritos, onToggleFavorito }) {
  return (
    <div className="content-wrap route-content">
      <section className="content-section catalog-section" aria-labelledby="catalogo-titulo">
        <span className="eyebrow">DESCUBRE TU PRÓXIMA PARTIDA</span>
        <div className="section-title">
          <h2 id="catalogo-titulo">Catálogo de juegos</h2>
          <Link className="text-link" to="/favoritos">Ver favoritos ({favoritos.length}) →</Link>
        </div>
        <p className="section-intro">Explora los títulos disponibles y guarda los que quieras volver a encontrar.</p>
        <div className="game-grid">
          {juegos.map((juego) => (
            <JuegoCard
              key={juego.id}
              juego={juego}
              esFavorito={favoritos.includes(juego.id)}
              onToggleFavorito={onToggleFavorito}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default CatalogoJuegos
