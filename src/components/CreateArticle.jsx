import { useState } from 'react'
import './CreateArticle.css'

function CreateArticle({ onArticleCreated, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Technologie',
    readTime: '3 min'
  })

  const categories = ['Technologie', 'Personnel', 'Général', 'Développement', 'Design', 'Lifestyle']

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    const newArticle = {
      id: Date.now(), // ID unique
      title: formData.title,
      content: formData.content,
      category: formData.category,
      readTime: formData.readTime,
      date: new Date().toISOString().split('T')[0]
    }

    onArticleCreated(newArticle)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="create-article-overlay">
      <div className="create-article-modal">
        <div className="modal-header">
          <h2>✏️ Rédiger un nouvel article</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="article-form">
          <div className="form-group">
            <label>Titre de l'article *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Donnez un titre accrocheur..."
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Catégorie</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Temps de lecture</label>
              <select name="readTime" value={formData.readTime} onChange={handleChange}>
                <option value="1 min">1 min</option>
                <option value="3 min">3 min</option>
                <option value="5 min">5 min</option>
                <option value="10 min">10 min+</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Contenu de l'article *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Partagez vos idées et réflexions..."
              rows="8"
              required
            />
            <div className="char-count">{formData.content.length} caractères</div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              📤 Publier l'article
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateArticle