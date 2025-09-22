import { useState, useMemo, useEffect } from 'react'
import Header from './components/Header'
import Navigation from './components/Navigation'
import SearchBar from './components/SearchBar'
import ArticleList from './components/ArticleList'
import Article from './components/Article'
import CreateArticle from './components/CreateArticle'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [selectedArticle, setSelectedArticle] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [articles, setArticles] = useState([])

  // Charger les articles depuis le localStorage au démarrage
  useEffect(() => {
    const savedArticles = localStorage.getItem('blogArticles')
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles))
    } else {
      // Articles par défaut si aucun n'est sauvegardé
      const defaultArticles = [
        {
          id: 1,
          title: "Bienvenue sur mon blog professionnel",
          content: "Ceci est mon premier article de blog. Je partagerai ici mes réflexions sur le développement web, React, et bien plus encore. J'espère que vous trouverez du contenu intéressant et utile dans ces pages virtuelles. N'hésitez pas à créer vos propres articles !",
          date: "2024-01-15",
          category: "Général",
          readTime: "3 min"
        },
        {
          id: 2,
          title: "Pourquoi j'aime React en 2024",
          content: "React offre une manière élégante de créer des interfaces utilisateur. Les composants réutilisables et l'écosystème riche en font un choix excellent pour le développement moderne. Les hooks ont révolutionné la façon dont nous écrivons les composants fonctionnels.",
          date: "2024-01-10",
          category: "Technologie",
          readTime: "5 min"
        }
      ]
      setArticles(defaultArticles)
      localStorage.setItem('blogArticles', JSON.stringify(defaultArticles))
    }
  }, [])

  // Sauvegarder les articles dans le localStorage à chaque modification
  useEffect(() => {
    if (articles.length > 0) {
      localStorage.setItem('blogArticles', JSON.stringify(articles))
    }
  }, [articles])

  // Extraire les catégories uniques
  const categories = useMemo(() => {
    return [...new Set(articles.map(article => article.category))]
  }, [articles])

  // Filtrer les articles basé sur la catégorie et la recherche
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesCategory = !activeCategory || article.category === activeCategory
      const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           article.content.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [articles, activeCategory, searchTerm])

  const handleArticleCreated = (newArticle) => {
    setArticles(prevArticles => [newArticle, ...prevArticles])
    setShowCreateModal(false)
    setSearchTerm('')
    setActiveCategory(null)
  }

  const handleDeleteArticle = (articleId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      setArticles(prevArticles => prevArticles.filter(article => article.id !== articleId))
      setSelectedArticle(null)
    }
  }

  return (
    <div className="app">
      <Header onNewArticle={() => setShowCreateModal(true)} />
      
      {!selectedArticle ? (
        <>
          <SearchBar 
            searchTerm={searchTerm} 
            onSearchChange={setSearchTerm} 
          />
          <Navigation 
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <ArticleList 
            articles={filteredArticles}
            onArticleClick={setSelectedArticle}
          />
        </>
      ) : (
        <Article 
          article={selectedArticle} 
          onBack={() => setSelectedArticle(null)}
          onDelete={handleDeleteArticle}
        />
      )}
      
      <Footer />

      {showCreateModal && (
        <CreateArticle 
          onArticleCreated={handleArticleCreated}
          onCancel={() => setShowCreateModal(false)}
        />
      )}
    </div>
  )
}

export default App