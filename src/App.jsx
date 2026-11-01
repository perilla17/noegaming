import { useEffect, useLayoutEffect, useRef, useState } from 'react'
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
  { name: 'Forza Horizon 6', genre: 'Carreras', description: 'Corre sin límites en un mundo abierto lleno de velocidad.', art: 'forza', image: forzaImage },
  { name: 'The Legend of Zelda', genre: 'Aventura', description: 'Explora tierras misteriosas y vive una aventura épica.', art: 'zelda', image: zeldaImage },
  { name: 'Call of Duty: Black Ops 6', genre: 'Shooter', description: 'Forma tu escuadrón y lánzate a una intensa misión.', art: 'warzone', image: codImage },
  { name: 'Minecraft', genre: 'Sandbox', description: 'Construye, explora y crea tu propio mundo.', art: 'minecraft', image: minecraftImage },
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
  { label: 'Inicio', href: '#inicio' },
  { label: 'Categorías', href: '#categorias' },
  { label: 'Juegos', href: '#juegos' },
  { label: 'Tienda', href: '#tienda' },
  { label: 'Novedades', href: '#novedades' },
]

function Header() {
  const [activeHref, setActiveHref] = useState('#inicio')
  const [indicator, setIndicator] = useState({ left: 0, width: 0 })
  const navRef = useRef(null)

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const nav = navRef.current
      const activeLink = nav?.querySelector(`[href="${activeHref}"]`)
      if (!nav || !activeLink) return
      const navBounds = nav.getBoundingClientRect()
      const linkBounds = activeLink.getBoundingClientRect()
      setIndicator({ left: linkBounds.left - navBounds.left, width: linkBounds.width })
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeHref])

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.querySelector(href))
      .filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      if (visibleSections[0]) setActiveHref(`#${visibleSections[0].target.id}`)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className="site-header" id="encabezado">
      <a className="brand" href="#inicio" aria-label="Noegaming, inicio"><span className="brand-mark"><img src={blackBullsEmblem} alt="" /></span><span>NOE<span className="brand-accent">GAMING</span></span></a>
      <nav className="main-nav" aria-label="Navegación principal" ref={navRef}>
        {navItems.map(({ label, href }) => <a key={href} href={href} className={activeHref === href ? 'active' : ''} aria-current={activeHref === href ? 'location' : undefined} onClick={() => setActiveHref(href)}>{label}</a>)}
        <span className="nav-indicator" aria-hidden="true" style={{ transform: `translateX(${indicator.left}px)`, width: `${indicator.width}px` }} />
      </nav>
      <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="Buscar juegos..." aria-label="Buscar juegos" /></label>
      <a className="profile-link" href="#comunidad" aria-label="Ir a la comunidad">♙</a>
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

function Games() {
  return (
    <section className="content-section games-section" id="juegos">
      <SectionTitle overline="PARA TU PRÓXIMA PARTIDA" title="Juegos destacados" link="Ver todos" href="#juegos" />
      <p className="section-intro">Los favoritos de la comunidad, listos para descubrir.</p>
      <div className="game-grid">
        {games.map((game) => <article className="game-card" key={game.name}>
          <a className={`game-art ${game.art}`} href="#comunidad" aria-label={`Descubrir ${game.name}`}>
            {game.art === 'minecraft' && <img className="game-art-backdrop" src={game.image} alt="" aria-hidden="true" />}
            <img className={game.art === 'minecraft' ? 'game-art-main' : undefined} src={game.image} alt={game.name} />
            <span className="game-genre">{game.genre}</span>
          </a>
          <div className="game-info"><h3>{game.name}</h3><p>{game.description}</p></div>
        </article>)}
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
          <a className={`news-art ${item.art}`} href="#comunidad" aria-label={`Leer: ${item.title}`}><img src={item.image} alt={item.title} /><span>{item.label}</span></a>
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
            <a className="shop-button" href="#comunidad" aria-label={`Consultar ${game.name}`}><span className="shop-button-default">Consultar</span><span className="shop-button-hover" aria-hidden="true">Comprar ahora</span><span aria-hidden="true">→</span></a>
          </div>
        </article>)}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer" id="comunidad">
      <div className="footer-brand"><a className="brand" href="#inicio"><span className="brand-mark"><img src={blackBullsEmblem} alt="" /></span><span>NOE<span className="brand-accent">GAMING</span></span></a><p>Juega. Explora. Disfruta.</p></div>
      <div className="footer-links"><strong>Explora</strong><a href="#inicio">Inicio</a><a href="#categorias">Categorías</a><a href="#juegos">Juegos</a><a href="#tienda">Tienda</a><a href="#novedades">Novedades</a></div>
      <div className="footer-social"><strong>Síguenos</strong><div><a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noreferrer"><img className="social-icon" src={instagramLogo} alt="" /></a><a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noreferrer"><img className="social-icon" src={youtubeLogo} alt="" /></a><a href="https://discord.com" aria-label="Discord" target="_blank" rel="noreferrer"><img className="social-icon" src={discordLogo} alt="" /></a></div></div>
      <small>© 2026 Noegaming.<br />Todos los derechos reservados.</small>
    </footer>
  )
}

function App() {
  return <div className="page-shell"><Header /><main><Hero /><div className="content-wrap"><Categories /><Games /><Shop /><News /></div></main><Footer /></div>
}

export default App








