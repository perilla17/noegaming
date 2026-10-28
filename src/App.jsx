import codImage from './assets/games/cod.jpeg'
import forzaImage from './assets/games/Forza.jpeg'
import minecraftImage from './assets/games/minecraft.jpg'
import zeldaImage from './assets/games/Zelda.jpeg'
import ps5Image from './assets/games/ps5-pro.jpg'
import redDeadImage from './assets/games/red-dead-redemption-2.jpg'
import gtaImage from './assets/games/gta-vi.jpg'
import gamerPattern from './assets/games/gamer-pattern.jpg'
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

function Header() {
  return (
    <header className="site-header" id="inicio">
      <a className="brand" href="#inicio" aria-label="Noegaming, inicio"><span className="brand-mark">✣</span><span>NOE<span className="brand-accent">GAMING</span></span></a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a className="active" href="#inicio">Inicio</a><a href="#categorias">Categorías</a><a href="#juegos">Juegos</a><a href="#novedades">Novedades</a>
      </nav>
      <label className="search-box"><span aria-hidden="true">⌕</span><input type="search" placeholder="Buscar juegos..." aria-label="Buscar juegos" /></label>
      <a className="profile-link" href="#comunidad" aria-label="Ir a la comunidad">♙</a>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">BIENVENIDO A NOEGAMING</div>
        <h1>Descubre nuevos<br />mundos, juega <span>sin límites.</span></h1>
        <p>Explora juegos increíbles, encuentra tu próxima aventura y conecta con una comunidad que comparte tu pasión.</p>
        <a className="button" href="#juegos">Explorar juegos <span aria-hidden="true">→</span></a>
      </div>
      <div className="hero-landscape">
        <img src={gamerPattern} alt="" />
        <span className="landscape-label">JUEGA · EXPLORA · DISFRUTA</span>
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
            <img src={game.image} alt={game.name} />
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

function Footer() {
  return (
    <footer className="site-footer" id="comunidad">
      <div className="footer-brand"><a className="brand" href="#inicio"><span className="brand-mark">✣</span><span>NOE<span className="brand-accent">GAMING</span></span></a><p>Juega. Explora. Disfruta.</p></div>
      <div className="footer-links"><strong>Explora</strong><a href="#inicio">Inicio</a><a href="#categorias">Categorías</a><a href="#juegos">Juegos</a><a href="#novedades">Novedades</a></div>
      <div className="footer-social"><strong>Síguenos</strong><div><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://youtube.com" aria-label="YouTube">▶</a><a href="https://discord.com" aria-label="Discord">◉</a></div></div>
      <small>© 2026 Noegaming.<br />Todos los derechos reservados.</small>
    </footer>
  )
}

function App() {
  return <div className="page-shell"><Header /><main><Hero /><div className="content-wrap"><Categories /><Games /><News /></div></main><Footer /></div>
}

export default App


