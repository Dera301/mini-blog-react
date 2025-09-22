import './Navigation.css'

function Navigation({ categories, activeCategory, onCategoryChange }) {
  return (
    <nav className="navigation">
      <button 
        className={!activeCategory ? 'nav-btn active' : 'nav-btn'}
        onClick={() => onCategoryChange(null)}
      >
        Tous
      </button>
      {categories.map(category => (
        <button
          key={category}
          className={activeCategory === category ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  )
}

export default Navigation