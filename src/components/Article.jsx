import './Article.css'

function Article({ article, onBack, onDelete, onEdit }) {
  // Vérification de sécurité cruciale
  if (!article) {
    return (
      <div className="article-detail">
        <div className="article-actions">
          <button className="back-button" onClick={onBack}>
            ← Retour aux articles
          </button>
        </div>
        <div className="error-message">
          <h2>Article non trouvé</h2>
          <p>L'article que vous essayez de consulter n'existe pas ou a été supprimé.</p>
        </div>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      onDelete(article.id)
    }
  }

  return (
    <div className="article-detail">
      <div className="article-actions">
        <button className="back-button" onClick={onBack}>
          ← Retour aux articles
        </button>
        <div className="action-buttons">
          <button
            className="edit-btn"
            onClick={() => onEdit(article)}
            title="Modifier l'article"
          >
            ✏️ Modifier
          </button>
          <button 
            className="delete-btn" 
            onClick={handleDelete}
            title="Supprimer l'article"
          >
            🗑️ Supprimer
          </button>
        </div>
      </div>
      
      <article>
        <div className="article-header">
          <span className="article-category">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span>📅 {article.date}</span> • 
            <span>⏱️ {article.readTime}</span> • 
            <span>👁️ {Math.ceil(article.content.length / 1000)}k vues</span>
          </div>
        </div>
        
        <div className="article-content">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        <div className="article-footer">
          <div className="tags">
            <span>🏷️ {article.category}</span>
            <span>💻 Développement</span>
            <span>🚀 React</span>
          </div>
        </div>
      </article>
    </div>
  )
}

export default Article