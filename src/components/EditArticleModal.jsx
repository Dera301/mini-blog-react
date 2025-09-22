import { useState, useEffect } from 'react'
import './EditArticleModal.css'

function EditArticleModal({ article, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'Général',
    readTime: '3 min'
  })

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        content: article.content,
        category: article.category,
        readTime: article.readTime || '3 min'
      })
    }
  }, [article])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return
    
    onSave({
      ...article,
      ...formData,
      date: new Date().toISOString().split('T')[0]
    })
  }

  const categories = ['Général', 'Technologie', 'Personnel', 'Développement', 'Design', 'Lifestyle']
  const readTimes = ['1 min', '3 min', '5 min', '10 min']

  return (
    <div className="edit-modal-overlay">
      <div className="edit-modal">
        <div className="modal-header">
          <h2>✏️ Modifier l'article</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Titre de l'article *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titre de votre article..."
              required
              maxLength={100}
            />
            <div className="char-count">{formData.title.length}/100</div>
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
                {readTimes.map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Contenu de l'article *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Contenu de votre article..."
              rows={8}
              required
              minLength={50}
            />
            <div className="char-count">{formData.content.length} caractères</div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onCancel}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              💾 Sauvegarder les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ASSUREZ-VOUS QUE CETTE LIGNE EST PRÉSENTE !
export default EditArticleModal