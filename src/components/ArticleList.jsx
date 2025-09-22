import './ArticleList.css'

function ArticleList({ articles, onArticleClick }) {
  if (articles.length === 0) {
    return (
      <div className="article-list">
        <div className="no-articles">
          <p>📭 Aucun article trouvé</p>
          <p>Essayez de modifier votre recherche ou filtre</p>
        </div>
      </div>
    )
  }

  return (
    <div className="article-list">
      <h2>📰 Derniers articles ({articles.length})</h2>
      <div className="articles-grid">
        {articles.map(article => (
          <div 
            key={article.id} 
            className="article-card"
            onClick={() => onArticleClick(article)}
          >
            <span className="category-badge">{article.category}</span>
            <h3>{article.title}</h3>
            <div className="article-meta">
              <span>{article.date}</span> • 
              <span>{article.readTime}</span>
            </div>
            <p className="article-preview">
              {article.content.substring(0, 120)}...
            </p>
            <div className="read-more">Lire la suite →</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ArticleList