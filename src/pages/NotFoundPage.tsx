import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, Hammer, Wrench, Search, ArrowRight, RotateCcw, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const NotFoundPage = () => {
  const [toolRotation, setToolRotation] = useState(0);

  // Rotate tools animation
  useEffect(() => {
    const interval = setInterval(() => {
      setToolRotation(prev => prev + 45);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Page introuvable - Quel Artisan 85';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Oups ! Cette page semble avoir été rénovée par nos artisans. Retournez à l\'accueil ou demandez un devis gratuit pour vos travaux en Vendée.'
      );
    }
  }, []);

  const funMessages = [
    "Oups ! Cette page a été démontée par nos artisans ! 🔧",
    "Page en cours de rénovation... Revenez plus tard ! 🏗️",
    "Nos artisans ont perdu cette page dans leurs outils ! 🔨",
    "Cette page fait une pause café avec nos artisans ! ☕",
    "Page temporairement en panne... Nos électriciens s'en occupent ! ⚡"
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % funMessages.length);
    }, 3000);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Animated Tools */}
          <div className="relative mb-12">
            <div className="flex justify-center items-center space-x-8 mb-8">
              <div 
                className="bg-gradient-to-r from-orange-500 to-red-500 p-6 rounded-full shadow-2xl transform transition-transform duration-1000"
                style={{ transform: `rotate(${toolRotation}deg)` }}
              >
                <Hammer className="h-12 w-12 text-white" />
              </div>
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 rounded-full shadow-2xl transform transition-transform duration-1000"
                style={{ transform: `rotate(${-toolRotation}deg)` }}
              >
                <Wrench className="h-12 w-12 text-white" />
              </div>
              <div 
                className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 rounded-full shadow-2xl transform transition-transform duration-1000"
                style={{ transform: `rotate(${toolRotation}deg)` }}
              >
                <Zap className="h-12 w-12 text-white" />
              </div>
            </div>

            {/* Big 404 */}
            <div className="relative">
              <h1 className="text-9xl md:text-[12rem] font-black text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text leading-none mb-4 animate-pulse">
                404
              </h1>
              <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-orange-200 opacity-20 leading-none animate-bounce" style={{ animationDelay: '0.5s' }}>
                404
              </div>
            </div>
          </div>

          {/* Fun Message */}
          <div className="bg-white rounded-3xl shadow-2xl border border-orange-100 p-8 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 transition-all duration-500">
                {funMessages[currentMessage]}
              </h2>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                Ne vous inquiétez pas ! Même nos meilleurs artisans perdent parfois leurs outils. 
                Cette page semble avoir été <span className="font-bold text-orange-600">rénovée</span> ou 
                <span className="font-bold text-red-600"> déplacée</span> par notre équipe !
              </p>

              {/* Funny suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
                  <div className="bg-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <RotateCcw className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-blue-900 mb-2">Peut-être que...</h3>
                  <p className="text-blue-700 text-sm">Nos plombiers ont débranché cette page par accident ?</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                  <div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Hammer className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-green-900 mb-2">Ou alors...</h3>
                  <p className="text-green-700 text-sm">Nos menuisiers l'ont démontée pour la rénover ?</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
                  <div className="bg-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-purple-900 mb-2">Sûrement que...</h3>
                  <p className="text-purple-700 text-sm">Nos électriciens ont coupé le courant de cette page ?</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link 
              to="/"
              className="group bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:from-orange-600 hover:to-red-600 flex items-center"
            >
              <Home className="h-6 w-6 mr-3 group-hover:animate-bounce" />
              Retour à l'accueil
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link 
              to="/devis"
              className="group bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-indigo-700 flex items-center"
            >
              <FileText className="h-6 w-6 mr-3 group-hover:animate-pulse" />
              Demander un devis
              <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Fun Stats */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Pendant que vous êtes là... 📊
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-orange-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Artisans qui ne perdent (presque) jamais leurs outils</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-black text-blue-600 mb-2">2000+</div>
                <div className="text-gray-600 font-medium">Clients qui ont trouvé ce qu'ils cherchaient</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-black text-green-600 mb-2">5000+</div>
                <div className="text-gray-600 font-medium">Devis qui ne se sont pas perdus en route</div>
              </div>
            </div>
          </div>

          {/* Encouraging message */}
          <div className="mt-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-4">
              Pas de panique ! 🛠️
            </h3>
            <p className="text-xl text-orange-100 leading-relaxed">
              Nos artisans sont experts pour <span className="font-bold">réparer</span> et <span className="font-bold">construire</span>. 
              Même si cette page s'est égarée, nous sommes là pour vous aider avec vos vrais projets !
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFoundPage;