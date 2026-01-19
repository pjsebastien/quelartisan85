import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, FileText } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';

const BlogPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Articles metadata
  const articles: Record<string, { title: string; description: string }> = {
    'cout-renovation-appartement-haussmannien': {
      title: 'Coût de la rénovation d\'un appartement haussmannien : guide complet 2025',
      description: 'Découvrez le coût réel de la rénovation d\'un appartement haussmannien. Budget détaillé, prix par m², aides disponibles et conseils d\'experts pour votre projet.'
    },
    'annulation-devis-signe-sans-acompte': {
      title: 'Annulation d\'un devis signé sans acompte : droits et procédures complètes',
      description: 'Découvrez vos droits pour annuler un devis signé sans acompte. Procédures légales, délais de rétractation et conseils d\'experts pour protéger vos intérêts.'
    },
    'renovation-piscine-silico-marbreux': {
      title: 'Rénovation d\'une piscine silico-marbreux : guide complet et prix 2025',
      description: 'Découvrez comment rénover une piscine silico-marbreux. Techniques, coûts, étapes et conseils d\'experts pour redonner vie à votre bassin en Vendée.'
    },
    'devis-signe-sans-date-travaux': {
      title: 'Devis signé sans date de début ou fin de travaux : que faire ? Guide juridique',
      description: 'Devis signé sans date de travaux ? Découvrez vos droits, les recours possibles et comment protéger vos intérêts. Conseils juridiques d\'experts.'
    },
    'rever-ancienne-maison': {
      title: 'Rêver de son ancienne maison : signification psychologique et interprétation',
      description: 'Découvrez pourquoi vous rêvez de votre ancienne maison. Signification psychologique, nostalgie, messages de l\'inconscient et conseils d\'interprétation.'
    },
    'rever-acheter-maison': {
      title: 'Rêver d\'acheter une maison : signification et interprétation complète',
      description: 'Découvrez la signification de rêver d\'acheter une maison. Interprétation psychologique, désirs profonds et conseils pour concrétiser vos projets immobiliers.'
    },
    'rever-intrusion-maison': {
      title: 'Rêver d\'une intrusion dans sa maison : signification et protection psychologique',
      description: 'Découvrez pourquoi vous rêvez d\'intrusion chez vous. Signification psychologique, anxiétés et conseils pour renforcer votre sentiment de sécurité.'
    },
    'rever-grande-maison': {
      title: 'Rêver d\'une grande maison : signification et aspirations profondes',
      description: 'Découvrez pourquoi vous rêvez d\'une grande maison. Signification psychologique, ambitions, désirs d\'espace et conseils pour réaliser vos projets immobiliers.'
    },
    'clim-couloir-refroidir-chambres': {
      title: 'Clim dans le couloir pour refroidir les chambres : efficacité et solutions 2025',
      description: 'Climatisation dans le couloir pour refroidir les chambres : est-ce efficace ? Découvrez les meilleures solutions de climatisation multi-zones en Vendée.'
    },
    'choisir-son-artisan': {
      title: 'Comment bien choisir son artisan en Vendée ? - Guide complet',
      description: 'Guide complet pour choisir le bon artisan en Vendée. 10 conseils d\'experts, vérifications essentielles et pièges à éviter pour réussir vos travaux.'
    },
    'renovation-energetique-vendee': {
      title: 'Rénovation énergétique en Vendée : aides et conseils 2025',
      description: 'Guide complet des aides à la rénovation énergétique en Vendée 2025. MaPrimeRénov\', éco-PTZ, CEE : maximisez vos économies avec nos conseils d\'experts.'
    },
    'travaux-hiver-vendee': {
      title: 'Quels travaux réaliser en hiver en Vendée ? Guide 2025',
      description: 'Découvrez quels travaux privilégier en hiver en Vendée. Conseils d\'experts, planning optimal et avantages de la saison froide pour vos projets.'
    },
    'budget-travaux-2025': {
      title: 'Budget travaux 2025 : prix et tendances en Vendée',
      description: 'Découvrez les tarifs moyens des artisans en Vendée pour 2025. Plomberie, électricité, maçonnerie : tous les prix pour bien budgéter vos projets.'
    },
    'signification-reve-renovation-maison': {
      title: 'Rêver de maison en travaux : signification et interprétation complète',
      description: 'Découvrez la signification de rêver de maison en travaux. Interprétation psychologique, symbolisme et conseils pour transformer vos rêves en réalité.'
    }
  };

  const currentArticle = slug ? articles[slug] : null;

  useEffect(() => {
    if (!slug || !currentArticle) {
      setError(true);
      setLoading(false);
      return;
    }

    // Set SEO meta tags
    document.title = currentArticle.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentArticle.description);
    }

    // Load HTML content
    const loadContent = async () => {
      try {
        const response = await fetch(`/blog/${slug}.html`);
        if (!response.ok) {
          throw new Error('Article not found');
        }
        const html = await response.text();
        
        // Extract content from the HTML (everything inside .blog-content)
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const blogContent = doc.querySelector('.blog-content');
        
        if (blogContent) {
          setContent(blogContent.innerHTML);
        } else {
          throw new Error('Content not found');
        }
      } catch (err) {
        console.error('Error loading article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [slug, currentArticle]);

  if (!slug || !currentArticle) {
    return <Navigate to="/blog" replace />;
  }

  if (error) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link 
            to="/blog"
            className="inline-flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
            Retour au blog
          </Link>
        </div>

        {loading ? (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Chargement de l'article...</p>
          </div>
        ) : (
          <ClientOnly>
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Article Content */}
              <div className="p-8 lg:p-12">
                <style jsx>{`
                  .blog-content h1 {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                  }
                  .blog-content h2 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    color: #111827;
                    margin-bottom: 1.5rem;
                    margin-top: 3rem;
                    line-height: 1.2;
                  }
                  .blog-content h2:first-of-type {
                    margin-top: 2rem;
                  }
                  .blog-content h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #ea580c;
                    margin-bottom: 1rem;
                    margin-top: 2rem;
                    line-height: 1.3;
                  }
                  .blog-content p {
                    color: #374151;
                    line-height: 1.7;
                    margin-bottom: 1.5rem;
                    font-size: 1rem;
                  }
                  .blog-content p.lead {
                    font-size: 1.25rem;
                    color: #4b5563;
                    font-weight: 500;
                    margin-bottom: 2rem;
                    line-height: 1.6;
                  }
                  .blog-content ul, .blog-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                  }
                  .blog-content li {
                    color: #374151;
                    line-height: 1.6;
                    margin-bottom: 0.5rem;
                  }
                  .blog-content strong {
                    font-weight: 600;
                    color: #111827;
                  }
                  .blog-content .breadcrumb {
                    margin-bottom: 2rem;
                    font-size: 0.875rem;
                    color: #6b7280;
                  }
                  .blog-content .breadcrumb a {
                    color: #3b82f6;
                    text-decoration: none;
                  }
                  .blog-content .breadcrumb a:hover {
                    text-decoration: underline;
                  }
                  .blog-content .article-header {
                    margin-bottom: 3rem;
                  }
                  .blog-content .article-category {
                    display: inline-block;
                    background: linear-gradient(to right, #f97316, #dc2626);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 9999px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                  }
                  .blog-content .article-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin-bottom: 2rem;
                  }
                  .blog-content .article-featured-image {
                    width: 100%;
                    height: 300px;
                    object-fit: cover;
                    border-radius: 1rem;
                    margin-bottom: 2rem;
                  }
                  .blog-content .article-conclusion {
                    background: linear-gradient(to right, #dbeafe, #e0e7ff);
                    border: 1px solid #bfdbfe;
                    border-radius: 1rem;
                    padding: 2rem;
                    margin: 3rem 0;
                  }
                  .blog-content .article-conclusion h3 {
                    color: #1e40af;
                    margin-top: 0;
                  }
                  .blog-content .article-cta {
                    background: linear-gradient(to right, #fed7aa, #fecaca);
                    border: 1px solid #fdba74;
                    border-radius: 1rem;
                    padding: 2rem;
                    text-align: center;
                    margin: 3rem 0;
                  }
                  .blog-content .article-cta h3 {
                    color: #c2410c;
                    margin-top: 0;
                    margin-bottom: 1rem;
                  }
                  .blog-content .cta-button {
                    display: inline-flex;
                    align-items: center;
                    background: linear-gradient(to right, #f97316, #dc2626);
                    color: white;
                    padding: 1rem 2rem;
                    border-radius: 1rem;
                    text-decoration: none;
                    font-weight: 600;
                    margin-top: 1rem;
                    transition: all 0.3s ease;
                  }
                  .blog-content .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                  }
                  .blog-content .price-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1.5rem 0;
                    background: white;
                    border-radius: 0.5rem;
                    overflow: hidden;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
                  }
                  .blog-content .price-table td {
                    padding: 1rem;
                    border-bottom: 1px solid #e5e7eb;
                  }
                  .blog-content .price-table td:first-child {
                    background: #f9fafb;
                    font-weight: 500;
                    color: #374151;
                  }
                  .blog-content .price-table td:last-child {
                    font-weight: 600;
                    color: #059669;
                    text-align: right;
                  }
                  .blog-content .articles-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                    margin: 2rem 0;
                  }
                  .blog-content .article-card {
                    background: white;
                    border-radius: 1rem;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    transition: all 0.3s ease;
                  }
                  .blog-content .article-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
                  }
                  .blog-content .article-image img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                  }
                  .blog-content .article-content {
                    padding: 0rem;
                  }
                  .blog-content .article-content h2 {
                    font-size: 1.25rem;
                    margin: 0.5rem 0 1rem 0;
                  }
                  .blog-content .article-content h2 a {
                    color: #111827;
                    text-decoration: none;
                  }
                  .blog-content .article-content h2 a:hover {
                    color: #ea580c;
                  }
                  .blog-content .article-meta {
                    display: flex;
                    gap: 1rem;
                    font-size: 0.875rem;
                    color: #6b7280;
                    margin-top: 1rem;
                  }
                `}</style>
                <div 
                  className="blog-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </ClientOnly>
        )}

        {/* Related Articles CTA */}
        <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white text-center shadow-2xl">
          <h3 className="text-2xl font-bold mb-4">
            Découvrez nos autres conseils
          </h3>
          <p className="text-orange-100 mb-6 leading-relaxed">
            Explorez tous nos guides pratiques pour réussir vos travaux en Vendée
          </p>
          <Link 
            to="/blog"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="h-5 w-5 mr-3" />
            Voir tous les articles
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;