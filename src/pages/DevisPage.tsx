import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Clock, Shield, Star, Users, Award, Search, FileText, MessageSquare, ThumbsUp } from 'lucide-react';
import DevisForm from '../components/DevisForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';

const DevisPage = () => {
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';

  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Demande de devis gratuit - Artisans en Vendée (85) - Quel Artisan 85';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Demandez votre devis gratuit d\'artisans en Vendée. Service rapide, artisans vérifiés, devis personnalisés. Trouvez le professionnel idéal pour vos travaux en Vendée (85).'
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
          <span className="text-gray-900 font-medium">Demande de devis</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl border border-orange-100 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Demande de devis gratuit
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Trouvez votre artisan idéal pour vos projets en Vendée grâce à notre réseau de professionnels qualifiés
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-6 py-3 rounded-full shadow-md border border-green-200">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">100% gratuit</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-6 py-3 rounded-full shadow-md border border-blue-200">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">Réponse rapide</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-6 py-3 rounded-full shadow-md border border-purple-200">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-semibold">Sans engagement</span>
            </div>
          </div>

          {/* Partnership Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl p-6 border border-blue-200 shadow-lg text-center">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-blue-900 mb-2">Partenaire du réseau Quel Artisan ?</h3>
            <p className="text-blue-800 font-medium">
              Le 1er site français spécialiste de la recherche de professionnels autour de chez vous !
            </p>
          </div>
        </div>

        {/* How it works Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comment ça marche ?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comment trouver votre artisan idéal pour vos projets en Vendée ?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Search className="h-10 w-10 text-white" />
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sélectionnez la catégorie</h3>
              <p className="text-gray-600 leading-relaxed">
                Explorez notre liste exhaustive de catégories d'artisans en Vendée et trouvez celle qui correspond parfaitement à votre projet.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <FileText className="h-10 w-10 text-white" />
              </div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Complétez le formulaire</h3>
              <p className="text-gray-600 leading-relaxed">
                Détaillez-nous les spécificités de votre projet afin que nos artisans vendéens puissent vous soumettre des devis sur mesure.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <MessageSquare className="h-10 w-10 text-white" />
              </div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recevez des devis gratuits</h3>
              <p className="text-gray-600 leading-relaxed">
                Rapidement, accédez à des propositions sans engagement de la part de professionnels compétents de la Vendée.
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center group">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <ThumbsUp className="h-10 w-10 text-white" />
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-4 text-lg font-bold">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Choisissez l'artisan idéal</h3>
              <p className="text-gray-600 leading-relaxed">
                Évaluez les différentes offres, lisez les retours d'expérience des clients précédents et choisissez l'artisan vendéen qui répond le mieux à vos critères.
              </p>
            </div>
          </div>
        </div>

        {/* Formulaire de devis généraliste */}
        <ClientOnly>
          <DevisForm isHomepage={false} className="mb-8" initialSearchQuery={searchQuery} />
        </ClientOnly>

        {/* Advantages Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="bg-gradient-to-r from-green-500 to-green-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Artisans vérifiés</h3>
            <p className="text-gray-600 leading-relaxed">
              Tous nos artisans partenaires sont rigoureusement sélectionnés et vérifiés pour vous garantir un service de qualité.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Réseau local</h3>
            <p className="text-gray-600 leading-relaxed">
              Un réseau d'artisans locaux en Vendée pour une intervention rapide et un service de proximité personnalisé.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 text-center">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Star className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Service gratuit</h3>
            <p className="text-gray-600 leading-relaxed">
              Notre service de mise en relation est entièrement gratuit et sans engagement de votre part.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à démarrer vos travaux en Vendée ?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Remplissez notre formulaire et recevez jusqu'à 3 devis gratuits d'artisans qualifiés
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">100% gratuit et sans engagement</span>
              </div>
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">Réponse sous 24h</span>
              </div>
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-semibold">Artisans certifiés</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DevisPage;