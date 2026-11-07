import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, Route, Routes, useLocation } from 'react-router'
import CatalogoJuegos from './CatalogoJuegos.jsx'
import Favoritos from './Favoritos.jsx'
import JuegoCard from './JuegoCard.jsx'
import codImage from './assets/games/cod.jpeg'
import forzaImage from './assets/games/Forza.jpeg'
import minecraftImage from './assets/games/minecraft.jpg'
import zeldaImage from './assets/games/Zelda.jpeg'
import ps5Image from './assets/games/ps5-pro.jpg'
import redDeadImage from './assets/games/red-dead-redemption-2.jpg'
import gtaImage from './assets/games/gta-vi.jpg'
import gamerPattern from './assets/games/gamer-pattern.jpg'
import blackBullsEmblem from './assets/games/black-bulls-emblem.png'
import blackCloverImage from './assets/games/black-clover.jpg'
import nierAutomataImage from './assets/games/nier-automata.jpg'
import marvelSpidermanImage from './assets/games/marvel-spiderman.jpg'
import discordLogo from './assets/social/discord.png'
import youtubeLogo from './assets/social/youtube.png'
import instagramLogo from './assets/social/instagram.png'
import './App.css'

const categories = [
  { name: 'Acción', icon: '⚔', color: 'action' },
  { name: 'Aventura', icon: '▲', color: 'adventure' },
  { name: 'Deportes', icon: '◉', color: 'sports' },
  { name: 'Estrategia', icon: '♞', color: 'strategy' },
]

const games = [
  { id: 'forza-horizon-6', name: 'Forza Horizon 6', genre: 'Carreras', description: 'Corre sin límites en un mundo abierto lleno de velocidad.', art: 'forza', image: forzaImage },
  { id: 'the-legend-of-zelda', name: 'The Legend of Zelda', genre: 'Aventura', description: 'Explora tierras misteriosas y vive una aventura épica.', art: 'zelda', image: zeldaImage },
  { id: 'call-of-duty-black-ops-6', name: 'Call of Duty: Black Ops 6', genre: 'Shooter', description: 'Forma tu escuadrón y lánzate a una intensa misión.', art: 'warzone', image: codImage },
  { id: 'minecraft', name: 'Minecraft', genre: 'Sandbox', description: 'Construye, explora y crea tu propio mundo.', art: 'minecraft', image: minecraftImage },
]

const catalogGames = [
  ...games,
  { id: 'red-dead-redemption-2', name: 'Red Dead Redemption II', genre: 'Acción y aventura', description: 'Recorre el Viejo Oeste y acompaña a Arthur Morgan en una historia de forajidos.', art: 'neon', image: redDeadImage },
  { id: 'grand-theft-auto-vi', name: 'Grand Theft Auto VI', genre: 'Mundo abierto', description: 'Explora Vice City y sus alrededores en una nueva aventura criminal.', art: 'wilds', image: gtaImage },
]

const news = [
  { label: 'LANZAMIENTO', title: 'PlayStation 5 Pro', date: '10 oct. 2025', text: 'Una nueva generación de rendimiento para tus juegos favoritos.', art: 'console', image: ps5Image },
  { label: 'AVENTURA', title: 'Red Dead Redemption II', date: '8 oct. 2025', text: 'Explora el salvaje oeste en una aventura inolvidable.', art: 'neon', image: redDeadImage },
  { label: 'PRÓXIMAMENTE', title: 'Grand Theft Auto VI', date: '5 oct. 2025', text: 'Una nueva historia te espera en las calles de Vice City.', art: 'wilds', image: gtaImage },
]

const shopGames = [
  { name: 'Black Clover', subtitle: 'Quartet Knights', platform: 'PlayStation 4', genre: 'Acción y aventura', theme: 'clover', image: blackCloverImage },
  { name: 'Marvel’s Spider-Man 2', subtitle: 'La aventura continúa', platform: 'PlayStation 5', genre: 'Acción', theme: 'spider', image: marvelSpidermanImage },
  { name: 'NieR:Automata', subtitle: 'YoRHa Edition', platform: 'PlayStation 4', genre: 'RPG de acción', theme: 'nier', image: nierAutomataImage },
]

const navItems = [
  { label: 'Inicio', to: '/' },
  { label: 'Categorías', to: '/#categorias', section: '#categorias' },
  { label: 'Juegos', to: '/catalogo' },
  { label: 'Favoritos', to: '/favoritos' },
  { label: 'Tienda', to: '/#tienda', section: '#tienda' },
  { label: 'Novedades', to: '/#novedades', section: '#novedades' },
]

function Header({ cantidadFavoritos }) {
  const location = useLocation()
  const [activeHref, setActiveHref] = useState('/')
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)
  const selectedHref = location.pathname === '/' ? activeHref : location.pathname

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current
      const activeLink = nav?.querySelector(`[data-nav="${selectedHref}"]`)
      if (!nav || !activeLink) return
      const navBounds = nav.getBoundingClientRect()
      const linkBounds = activeLink.getBoundingClientRect()
      setIndicator({ left: linkBounds.left - navBounds.left, width: linkBounds.width })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [selectedHref])

  useEffect(() => {
    if (location.pathname !== '/') return undefined
    const sectionLinks = [
      { selector: '#inicio', target: '/' },
      ...navItems.filter(({ section }) => section).map(({ section }) => ({ selector: section, target: section })),
    ]
    const sections = sectionLinks.map(({ selector }) => document.querySelector(selector)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visibleSections[0]) {
        const active = sectionLinks.find(({ selector }) => selector === `#${visibleSections[0].target.id}`)
        if (active) setActiveHref(active.target)
      }
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [location.pathname, location.hash])

  return (
    <header className="site-header" id="encabezado">
      <Link className="brand" to="/" aria-label="Noegaming, inicio"><span className="brand-mark"><img src={blackBullsEmblem} alt="" /></span><span>NOE<span className="brand-accent">GAMING</span></span></Link>
      <nav className="main-nav" aria-label="Navegación principal" ref={navRef}>
        {navItems.map(({ label, to, section }) => {
          const target = section || to
          const isActive = selectedHref === target
          return <Link key={to} to={to} data-nav={target} className={isActive ? 'active' : ''} aria-current={isActive ? 'page' : undefined} onClick={() => setActiveHref(target)}>
            {label}{label === 'Favoritos' && cantidadFavoritos > 0 && <span className="nav-favorites-count">{cantidadFavoritos}</span>}
          </Link>
        })}
        <span className="nav-indicator" aria-hidden="true" style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }} />
      </nav>
      <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="Buscar juegos..." aria-label="Buscar juegos" /></label>
      <Link className="profile-link" to="/#comunidad" aria-label="Ir a la comunidad">♙</Link>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="hero-copy">
        <div className="eyebrow">BIENVENIDO A NOEGAMING</div>
        <h1>Descubre nuevos<br />mundos, juega <span>sin límites.</span></h1>
        <p>Explora juegos increíbles, encuentra tu próxima aventura y conecta con una comunidad que comparte tu pasión.</p>
        <a className="button" href="#juegos">Explorar juegos <span aria-hidden="true">→</span></a>
      </div>
      <div className="hero-landscape">
        <img className="hero-pattern-full" src={gamerPattern} alt="" />
      </div>
    </section>
  )
}

function SectionTitle({ overline, title, link, href }) {
  return <div className="section-title"><div><span className="eyebrow">{overline}</span><h2>{title}</h2></div>{link && <a href={href} className="text-link">{link} <span aria-hidden="true">→</span></a>}</div>
}

function Categories() {
  return (
    <section className="content-section" id="categorias">
      <SectionTitle overline="ELIGE TU ESTILO" title="Categorías" />
      <p className="section-intro">Encuentra el tipo de juego que más te gusta.</p>
      <div className="category-grid">
        {categories.map((category) => <a className={`category-card ${category.color}`} href="#juegos" key={category.name}><span>{category.icon}</span><strong>{category.name}</strong></a>)}
      </div>
    </section>
  )
}

function Games({ favoritos, onToggleFavorito }) {
  return (
    <section className="content-section games-section" id="juegos">
      <SectionTitle overline="PARA TU PRÓXIMA PARTIDA" title="Juegos destacados" link="Ver todos" href="#juegos" />
      <p className="section-intro">Los favoritos de la comunidad, listos para descubrir.</p>
      <div className="game-grid">
        {games.map((game) => <JuegoCard key={game.id} juego={game} esFavorito={favoritos.includes(game.id)} onToggleFavorito={onToggleFavorito} />)}
      </div>
    </section>
  )
}

function News() {
  return (
    <section className="content-section news-section" id="novedades">
      <SectionTitle overline="SIEMPRE HAY ALGO NUEVO" title="Novedades" link="Ver todas" href="#novedades" />
      <p className="section-intro">Lanzamientos, noticias y recomendaciones para ti.</p>
      <div className="news-grid">
        {news.map((item) => <article className="news-card" key={item.title}>
          <Link className={`news-art ${item.art}`} to="/#comunidad" aria-label={`Leer: ${item.title}`}><img src={item.image} alt={item.title} /><span>{item.label}</span></Link>
          <div className="news-info"><h3>{item.title}</h3><time>{item.date}</time><p>{item.text}</p></div>
        </article>)}
      </div>
    </section>
  )
}

function Shop() {
  return (
    <section className="content-section shop-section" id="tienda">
      <SectionTitle overline="ELIGE TU PRÓXIMA AVENTURA" title="Compra tu próximo juego" />
      <p className="section-intro">Explora nuestra selección y consulta las opciones para cada título.</p>
      <div className="shop-grid">
        {shopGames.map((game) => <article className="shop-card" key={game.name}>
          <div className={`shop-art has-image ${game.theme}`}>
            <img src={game.image} alt={`Imagen de ${game.name}`} />
            <span className="shop-platform">{game.platform}</span>
          </div>
          <div className="shop-info">
            <div><span className="shop-genre">{game.genre}</span><h3>{game.name}</h3><p>{game.platform}</p></div>
          <Link className="shop-button" to="/#comunidad" aria-label={`Consultar ${game.name}`}><span className="shop-button-default">Consultar</span><span className="shop-button-hover" aria-hidden="true">Comprar ahora</span><span aria-hidden="true">→</span></Link>
          </div>
        </article>)}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="comunidad">
      <div className="footer-brand"><Link className="brand" to="/"><span className="brand-mark"><img src={blackBullsEmblem} alt="" /></span><span>NOE<span className="brand-accent">GAMING</span></span></Link><p>Juega. Explora. Disfruta.</p></div>
      <div className="footer-links"><strong>Explora</strong><Link to="/">Inicio</Link><Link to="/#categorias">Categorías</Link><Link to="/catalogo">Juegos</Link><Link to="/favoritos">Favoritos</Link><Link to="/#tienda">Tienda</Link><Link to="/#novedades">Novedades</Link></div>
      <div className="footer-social"><strong>Síguenos</strong><div><a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><img className="social-icon" src={instagramLogo} alt="" /></a><a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer"><img className="social-icon" src={youtubeLogo} alt="" /></a><a href="https://discord.com" aria-label="Discord" target="_blank" rel="noreferrer"><img className="social-icon" src={discordLogo} alt="" /></a></div></div>
      <small>© 2026 Noegaming.<br />Todos los derechos reservados.</small>
    </footer>
  )
}

function Inicio({ favoritos, onToggleFavorito }) {
  return <><Hero /><div className="content-wrap"><Categories /><Games favoritos={favoritos} onToggleFavorito={onToggleFavorito} /><Shop /><News /></div></>
}

function App() {
  const location = useLocation()
  const [favoritos, setFavoritos] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('noegaming-favoritos') || '[]')
      return Array.isArray(guardados) ? guardados : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('noegaming-favoritos', JSON.stringify(favoritos))
  }, [favoritos])

  useEffect(() => {
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1))
      requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [location.pathname, location.hash])

  const cambiarFavorito = (id) => {
    setFavoritos((actuales) => actuales.includes(id)
      ? actuales.filter((favorito) => favorito !== id)
      : [...actuales, id])
  }

  return <div className="page-shell">
    <Header cantidadFavoritos={favoritos.length} />
    <main>
      <Routes>
        <Route path="/" element={<Inicio favoritos={favoritos} onToggleFavorito={cambiarFavorito} />} />
        <Route path="/catalogo" element={<CatalogoJuegos juegos={catalogGames} favoritos={favoritos} onToggleFavorito={cambiarFavorito} />} />
        <Route path="/favoritos" element={<Favoritos juegos={catalogGames} favoritos={favoritos} onToggleFavorito={cambiarFavorito} />} />
        <Route path="*" element={<div className="content-wrap route-content"><section className="content-section"><h2>Página no encontrada</h2><Link className="text-link" to="/">Volver al inicio →</Link></section></div>} />
      </Routes>
    </main>
    <Footer />
  </div>
}

export default App








