import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, User, ArrowRight, FileText, Lightbulb, TrendingUp, DollarSign } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogListingPage = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Blog - Conseils d\'experts artisans en Vendée - Quel Artisan 85';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Découvrez nos conseils d\'experts pour vos travaux en Vendée. Guides pratiques, astuces et recommandations d\'artisans qualifiés pour réussir tous vos projets.'
      );
    }
  }, []);

  const articles = [
    {
      slug: 'signification-reve-renovation-maison',
      title: 'Rêver de maison en travaux : signification et interprétation',
      excerpt: 'Découvrez la signification psychologique de rêver de maison en travaux. Interprétation complète, symbolisme et conseils pour transformer vos rêves en projets réels.',
      category: 'Psychologie & Habitat',
      categoryColor: 'bg-indigo-500',
      date: '20 janvier 2025',
      readingTime: '8 min',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Lightbulb
    },
    {
      slug: 'cout-renovation-appartement-haussmannien',
      title: 'Coût de la rénovation d\'un appartement haussmannien',
      excerpt: 'Guide complet des coûts pour rénover un appartement haussmannien. Budget détaillé, prix par m², aides disponibles et conseils d\'experts pour votre projet.',
      category: 'Budget & Rénovation',
      categoryColor: 'bg-emerald-500',
      date: '22 janvier 2025',
      readingTime: '12 min',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: DollarSign
    },
    {
      slug: 'annulation-devis-signe-sans-acompte',
      title: 'Annulation d\'un devis signé sans acompte : vos droits',
      excerpt: 'Découvrez vos droits pour annuler un devis signé sans acompte. Procédures légales, délais de rétractation et conseils d\'experts pour protéger vos intérêts.',
      category: 'Juridique & Droits',
      categoryColor: 'bg-red-500',
      date: '21 janvier 2025',
      readingTime: '9 min',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: FileText
    },
    {
      slug: 'renovation-piscine-silico-marbreux',
      title: 'Rénovation d\'une piscine silico-marbreux : guide complet',
      excerpt: 'Découvrez comment rénover une piscine silico-marbreux. Techniques, coûts, étapes et conseils d\'experts pour redonner vie à votre bassin en Vendée.',
      category: 'Piscine & Rénovation',
      categoryColor: 'bg-cyan-500',
      date: '20 janvier 2025',
      readingTime: '10 min',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp
    },
    {
      slug: 'devis-signe-sans-date-travaux',
      title: 'Devis signé sans date de travaux : que faire ?',
      excerpt: 'Devis signé sans date de début ou fin ? Découvrez vos droits, les recours possibles et comment protéger vos intérêts. Conseils juridiques d\'experts.',
      category: 'Juridique & Droits',
      categoryColor: 'bg-amber-500',
      date: '19 janvier 2025',
      readingTime: '8 min',
      image: 'https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: FileText
    },
    {
      slug: 'rever-ancienne-maison',
      title: 'Rêver de son ancienne maison : signification psychologique',
      excerpt: 'Découvrez pourquoi vous rêvez de votre ancienne maison. Signification psychologique, nostalgie, messages de l\'inconscient et conseils d\'interprétation.',
      category: 'Psychologie & Habitat',
      categoryColor: 'bg-violet-500',
      date: '18 janvier 2025',
      readingTime: '7 min',
      image: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Lightbulb
    },
    {
      slug: 'rever-acheter-maison',
      title: 'Rêver d\'acheter une maison : signification et aspirations',
      excerpt: 'Découvrez la signification de rêver d\'acheter une maison. Interprétation psychologique, désirs profonds et conseils pour concrétiser vos projets immobiliers.',
      category: 'Psychologie & Immobilier',
      categoryColor: 'bg-teal-500',
      date: '17 janvier 2025',
      readingTime: '8 min',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp
    },
    {
      slug: 'rever-intrusion-maison',
      title: 'Rêver d\'une intrusion dans sa maison : signification',
      excerpt: 'Découvrez pourquoi vous rêvez d\'intrusion chez vous. Signification psychologique, anxiétés et conseils pour renforcer votre sentiment de sécurité.',
      category: 'Psychologie & Sécurité',
      categoryColor: 'bg-rose-500',
      date: '16 janvier 2025',
      readingTime: '7 min',
      image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Lightbulb
    },
    {
      slug: 'rever-grande-maison',
      title: 'Rêver d\'une grande maison : signification et aspirations',
      excerpt: 'Découvrez pourquoi vous rêvez d\'une grande maison. Signification psychologique, ambitions, désirs d\'espace et conseils pour réaliser vos projets immobiliers.',
      category: 'Psychologie & Habitat',
      categoryColor: 'bg-sky-500',
      date: '15 janvier 2025',
      readingTime: '8 min',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp
    },
    {
      slug: 'clim-couloir-refroidir-chambres',
      title: 'Clim dans le couloir pour refroidir les chambres',
      excerpt: 'Climatisation dans le couloir pour refroidir les chambres : est-ce efficace ? Découvrez les meilleures solutions de climatisation multi-zones en Vendée.',
      category: 'Climatisation & Confort',
      categoryColor: 'bg-blue-500',
      date: '14 janvier 2025',
      readingTime: '9 min',
      image: 'https://images.pexels.com/photos/5490235/pexels-photo-5490235.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp
    },
    {
      slug: 'choisir-son-artisan',
      title: 'Comment bien choisir son artisan en Vendée ?',
      excerpt: 'Découvrez nos 10 conseils essentiels pour sélectionner l\'artisan idéal pour vos travaux. De la vérification des assurances aux devis comparatifs, tous nos secrets pour faire le bon choix.',
      category: 'Guide pratique',
      categoryColor: 'bg-blue-500',
      date: '15 janvier 2025',
      readingTime: '5 min',
      image: 'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Lightbulb
    },
    {
      slug: 'renovation-energetique-vendee',
      title: 'Rénovation énergétique en Vendée : aides et conseils',
      excerpt: 'Tout savoir sur les aides disponibles en Vendée pour vos travaux de rénovation énergétique. MaPrimeRénov\', éco-PTZ, CEE : maximisez vos économies !',
      category: 'Rénovation',
      categoryColor: 'bg-green-500',
      date: '12 janvier 2025',
      readingTime: '8 min',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: TrendingUp
    },
    {
      slug: 'travaux-hiver-vendee',
      title: 'Quels travaux réaliser en hiver en Vendée ?',
      excerpt: 'L\'hiver est la période idéale pour certains travaux ! Découvrez quels projets privilégier pendant la saison froide et comment bien les planifier.',
      category: 'Saisonnier',
      categoryColor: 'bg-purple-500',
      date: '8 janvier 2025',
      readingTime: '6 min',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Calendar
    },
    {
      slug: 'budget-travaux-2025',
      title: 'Budget travaux 2025 : prix et tendances en Vendée',
      excerpt: 'Découvrez les tarifs moyens des artisans en Vendée pour 2025. Plomberie, électricité, maçonnerie : tous les prix pour bien budgéter vos projets.',
      category: 'Budget',
      categoryColor: 'bg-orange-500',
      date: '5 janvier 2025',
      readingTime: '10 min',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: DollarSign
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Blog</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl border border-orange-100 p-12 mb-12 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Blog <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Conseils</span>
            </h1>
            
            <p className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Découvrez nos guides pratiques et conseils d'experts pour réussir tous vos projets de travaux en Vendée
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-8 py-4 rounded-full shadow-lg border border-green-200">
                <Lightbulb className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">Conseils d'experts</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-8 py-4 rounded-full shadow-lg border border-blue-200">
                <FileText className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">Guides pratiques</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-8 py-4 rounded-full shadow-lg border border-purple-200">
                <TrendingUp className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">Tendances 2025</span>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {articles.map((article, index) => {
            const IconComponent = article.icon;
            return (
              <article key={article.slug} className="group bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`${article.categoryColor} text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg`}>
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg">
                      <IconComponent className="h-6 w-6 text-gray-700" />
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors leading-tight">
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{article.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        <span>{article.readingTime} de lecture</span>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/blog/${article.slug}`}
                    className="inline-flex items-center text-orange-600 hover:text-orange-700 font-bold group-hover:translate-x-2 transition-all duration-300"
                  >
                    Lire l'article
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">
            Restez informé de nos derniers conseils
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Recevez nos guides pratiques et conseils d'experts directement dans votre boîte mail
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Votre adresse email"
                className="flex-1 px-6 py-4 rounded-2xl text-gray-900 font-medium focus:ring-4 focus:ring-blue-300 focus:outline-none"
              />
              <button className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                S'abonner
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              Pas de spam, désinscription en un clic
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center shadow-2xl mt-12">
          <h2 className="text-3xl font-bold mb-4">
            Prêt à démarrer vos travaux ?
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Mettez en pratique nos conseils avec des artisans qualifiés en Vendée
          </p>
          <Link 
            to="/devis"
            className="inline-flex items-center px-12 py-5 bg-white text-orange-600 font-bold text-xl rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-50"
          >
            <FileText className="h-6 w-6 mr-3" />
            Demander mes devis gratuits
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListingPage;