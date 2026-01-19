import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  Award, 
  Heart, 
  CheckCircle, 
  Users, 
  Star, 
  FileText,
  Clock,
  MapPin,
  Handshake,
  Target,
  TrendingUp,
  Phone
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CharterPage = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Notre charte - Quel Artisan 85 - Engagement qualité et confiance';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Découvrez notre charte qualité et nos valeurs. Chez Quel Artisan 85, nous sélectionnons uniquement des artisans fiables et qualifiés en Vendée pour vous garantir des prestations d\'excellence.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Notre charte</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-2xl border border-orange-100 p-12 mb-12 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
          
          <div className="relative">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Shield className="h-10 w-10 text-white" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Notre <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">charte</span>
            </h1>
            
            <p className="text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              Chez Quel Artisan 85, nous nous engageons à vous mettre en relation uniquement avec des 
              <span className="font-bold text-orange-600"> artisans de confiance et fiables</span> en Vendée.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-8 py-4 rounded-full shadow-lg border border-green-200">
                <CheckCircle className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">100% artisans vérifiés</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-8 py-4 rounded-full shadow-lg border border-blue-200">
                <Star className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">Qualité garantie</span>
              </div>
              <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-8 py-4 rounded-full shadow-lg border border-purple-200">
                <Heart className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">Service humain</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 mb-12">
          <div className="text-center mb-10">
            <Target className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi nous faisons cela ?</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre mission</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Nous avons créé Quel Artisan 85 parce que nous croyons que <strong>chaque projet mérite un artisan de qualité</strong>. 
                Trop souvent, les particuliers peinent à trouver des professionnels fiables, transparents et compétents.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Notre rôle est de <strong>simplifier cette recherche</strong> en vous mettant directement en contact avec des artisans 
                que nous avons personnellement sélectionnés et vérifiés selon nos critères stricts de qualité.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Nous ne sommes pas juste un annuaire : nous sommes <strong>vos partenaires de confiance</strong> pour tous vos projets en Vendée.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-8 border border-orange-200">
              <h4 className="text-xl font-bold text-orange-900 mb-6">Nos engagements</h4>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800 font-medium">Sélection rigoureuse de chaque artisan partenaire</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800 font-medium">Vérification des assurances et certifications</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800 font-medium">Suivi de la satisfaction client</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-orange-800 font-medium">Service gratuit et sans engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Nos valeurs fondamentales</h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Quatre piliers guident notre action quotidienne pour vous offrir le meilleur service possible
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sélection rigoureuse */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Sélection rigoureuse</h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous ne travaillons qu'avec des artisans qui répondent à nos critères stricts : expérience prouvée, 
                assurances à jour, références clients vérifiées et respect des normes professionnelles.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-blue-700 bg-blue-50 px-4 py-2 rounded-xl">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">Vérification des qualifications</span>
                </div>
                <div className="flex items-center text-blue-700 bg-blue-50 px-4 py-2 rounded-xl">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">Contrôle des assurances</span>
                </div>
                <div className="flex items-center text-blue-700 bg-blue-50 px-4 py-2 rounded-xl">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">Analyse des références</span>
                </div>
              </div>
            </div>

            {/* Transparence */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparence totale</h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Pas de frais cachés, pas de commissions sur les devis. Notre service est 100% gratuit pour vous. 
                Nous croyons en la transparence comme base d'une relation de confiance durable.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-green-700 bg-green-50 px-4 py-2 rounded-xl">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">Service 100% gratuit</span>
                </div>
                <div className="flex items-center text-green-700 bg-green-50 px-4 py-2 rounded-xl">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">Aucune commission cachée</span>
                </div>
                <div className="flex items-center text-green-700 bg-green-50 px-4 py-2 rounded-xl">
                  <CheckCircle className="h-5 w-5 mr-3" />
                  <span className="font-medium">Processus clair et simple</span>
                </div>
              </div>
            </div>

            {/* Qualité */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Excellence & Qualité</h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous privilégions la qualité à la quantité. Chaque artisan de notre réseau s'engage à respecter 
                les plus hauts standards de qualité et à utiliser des matériaux de première qualité.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-purple-700 bg-purple-50 px-4 py-2 rounded-xl">
                  <Star className="h-5 w-5 mr-3" />
                  <span className="font-medium">Matériaux de qualité</span>
                </div>
                <div className="flex items-center text-purple-700 bg-purple-50 px-4 py-2 rounded-xl">
                  <Star className="h-5 w-5 mr-3" />
                  <span className="font-medium">Respect des délais</span>
                </div>
                <div className="flex items-center text-purple-700 bg-purple-50 px-4 py-2 rounded-xl">
                  <Star className="h-5 w-5 mr-3" />
                  <span className="font-medium">Garanties étendues</span>
                </div>
              </div>
            </div>

            {/* Engagement local */}
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Engagement local</h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Nous soutenons l'économie locale vendéenne en privilégiant les artisans de proximité. 
                Cela garantit une meilleure réactivité et une parfaite connaissance des spécificités locales.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-orange-700 bg-orange-50 px-4 py-2 rounded-xl">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span className="font-medium">Artisans vendéens</span>
                </div>
                <div className="flex items-center text-orange-700 bg-orange-50 px-4 py-2 rounded-xl">
                  <Clock className="h-5 w-5 mr-3" />
                  <span className="font-medium">Intervention rapide</span>
                </div>
                <div className="flex items-center text-orange-700 bg-orange-50 px-4 py-2 rounded-xl">
                  <Users className="h-5 w-5 mr-3" />
                  <span className="font-medium">Économie de proximité</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 mb-12">
          <div className="text-center mb-10">
            <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre processus de sélection</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Découvrez comment nous sélectionnons nos artisans partenaires pour vous garantir la meilleure expérience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Étape 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="h-8 w-8 text-white" />
              </div>
              <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Candidature</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                L'artisan soumet sa candidature avec tous ses documents professionnels
              </p>
            </div>

            {/* Étape 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Vérification</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Contrôle approfondi des qualifications, assurances et références clients
              </p>
            </div>

            {/* Étape 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <div className="bg-purple-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Entretien</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Entretien personnalisé pour évaluer le professionnalisme et les valeurs
              </p>
            </div>

            {/* Étape 4 */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Handshake className="h-8 w-8 text-white" />
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Partenariat</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Intégration au réseau avec engagement sur notre charte qualité
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <div className="bg-white/20 backdrop-blur-sm w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <FileText className="h-10 w-10 text-white" />
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Prêt à faire confiance à nos artisans ?
            </h2>
            
            <p className="text-xl text-orange-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Rejoignez les milliers de clients satisfaits qui ont fait confiance à Quel Artisan 85 
              pour leurs travaux en Vendée. Obtenez votre devis gratuit en 2 minutes !
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">Artisans vérifiés</span>
              </div>
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-semibold">Service gratuit</span>
              </div>
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">Réponse rapide</span>
              </div>
            </div>
            
            <Link 
              to="/devis"
              className="inline-flex items-center px-12 py-5 bg-white text-orange-600 font-bold text-xl rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-50"
            >
              <FileText className="h-6 w-6 mr-3" />
              Demander mon devis gratuit
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CharterPage;