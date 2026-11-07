import { Link, useSearchParams } from 'react-router'
import JuegoCard from './JuegoCard.jsx'

function CatalogoJuegos({ juegos, favoritos, onToggleFavorito }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const categoriaSeleccionada = searchParams.get('categoria') || 'Todas'
  const categorias = ['Todas', 'Estrategia', 'Acción', 'Deportes']
  const juegosVisibles = categoriaSeleccionada === 'Todas'
    ? juegos
    : juegos.filter((juego) => juego.category === categoriaSeleccionada)

  return (
    <div className="content-wrap route-content">
      <section className="content-section catalog-section" aria-labelledby="catalogo-titulo">
        <span className="eyebrow">DESCUBRE TU PRÓXIMA PARTIDA</span>
        <div className="section-title">
          <h2 id="catalogo-titulo">Catálogo de juegos</h2>
          <Link className="text-link" to="/favoritos">Ver favoritos ({favoritos.length}) →</Link>
        </div>
        <p className="section-intro">
          {juegosVisibles.length} videojuegos en {categoriaSeleccionada === 'Todas' ? 'el catálogo' : categoriaSeleccionada}. Explora los títulos y guarda los que quieras volver a encontrar.
        </p>
        <div className="catalog-filters" role="group" aria-label="Filtrar juegos por categoría">
          {categorias.map((categoria) => (
            <button
              className={`catalog-filter${categoriaSeleccionada === categoria ? ' is-active' : ''}`}
              key={categoria}
              type="button"
              aria-pressed={categoriaSeleccionada === categoria}
              onClick={() => setSearchParams(categoria === 'Todas' ? {} : { categoria })}
            >
              {categoria}
            </button>
          ))}
        </div>
        <div className="game-grid">
          {juegosVisibles.map((juego) => (
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
