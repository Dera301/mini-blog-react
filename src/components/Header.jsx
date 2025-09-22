import './Header.css'
import { useTheme } from '../theme/ThemeProvider'

function Header({ onNewArticle }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-text">
          <h1>📝 Mon Blog Professionnel</h1>
          <p>Partagez vos idées et réflexions avec le monde</p>
        </div>
        <div className="header-actions">
          <button
            className="theme-toggle-btn"
            aria-label={theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'}
            title={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
            onClick={toggleTheme}
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
          <button className="new-article-btn" onClick={onNewArticle}>
            ✏️ Nouvel Article
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header