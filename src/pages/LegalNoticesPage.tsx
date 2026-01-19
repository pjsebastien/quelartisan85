import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Building, Mail, Globe, Server, Shield, FileText, User, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Hammer } from 'lucide-react';

const LegalNoticesPage = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Mentions légales - Quel Artisan 85';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Mentions légales de Quel Artisan 85. Informations sur l\'éditeur, l\'hébergeur et les conditions d\'utilisation de notre service de mise en relation d\'artisans en Vendée.'
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Mentions légales</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-gray-500 to-gray-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Building className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Mentions légales
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Informations légales concernant le site Quel Artisan 85 et son utilisation.
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 - Éditeur */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <User className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Éditeur du site</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-semibold text-blue-900">Nom du site :</span>
                    <span className="text-blue-800 ml-2">Quel Artisan 85</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-semibold text-blue-900">URL :</span>
                    <span className="text-blue-800 ml-2">https://quelartisan85.fr</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-semibold text-blue-900">Contact :</span>
                    <a href="mailto:contact@margouillapp.re" className="text-blue-600 hover:underline ml-2 font-medium">
                      contact@margouillapp.re
                    </a>
                  </div>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-semibold text-blue-900">Activité :</span>
                    <span className="text-blue-800 ml-2">Service de mise en relation avec des artisans en Vendée</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2 - Hébergeur */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Server className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Hébergeur</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Server className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-semibold text-green-900">Hébergeur :</span>
                    <span className="text-green-800 ml-2">Netlify, Inc.</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-semibold text-green-900">Adresse :</span>
                    <span className="text-green-800 ml-2">2325 3rd Street, Suite 296, San Francisco, CA 94107, USA</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-semibold text-green-900">Site web :</span>
                    <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline ml-2 font-medium">
                      www.netlify.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3 - Propriété intellectuelle */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Propriété intellectuelle</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Tous les éléments de ce site (textes, images, sons, etc.) sont protégés par le droit d'auteur</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>La reproduction, même partielle, est interdite sans autorisation préalable</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Les marques citées sont la propriété de leurs détenteurs respectifs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 - Responsabilité */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Limitation de responsabilité</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Quel Artisan 85 est un service de mise en relation entre particuliers et artisans. À ce titre :
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Nous ne sommes pas responsables de la qualité des travaux réalisés par les artisans</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Les contrats sont conclus directement entre vous et l'artisan</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Nous nous efforçons de vérifier les qualifications de nos partenaires</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Notre responsabilité se limite à la mise en relation</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 5 - Données personnelles */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Données personnelles</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Le traitement de vos données personnelles est détaillé dans notre politique de confidentialité.
              </p>
              
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-indigo-900 font-semibold mb-2">Consultez notre politique de confidentialité</p>
                    <p className="text-indigo-700 text-sm">Pour en savoir plus sur la protection de vos données</p>
                  </div>
                  <Link 
                    to="/politique-confidentialite"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Voir la politique
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6 - Contact */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">6. Contact</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour toute question concernant ces mentions légales ou notre service :
              </p>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-semibold text-gray-900">Email :</span>
                  <a href="mailto:contact@margouillapp.re" className="text-blue-600 hover:underline ml-2 font-medium">
                    contact@margouillapp.re
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 text-white text-center shadow-2xl mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Prêt à démarrer vos travaux ?
          </h2>
          <p className="text-orange-100 mb-6 leading-relaxed">
            Trouvez rapidement un artisan qualifié en Vendée
          </p>
          <Link 
            to="/devis"
            className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="h-5 w-5 mr-3" />
            Demander mon devis gratuit
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LegalNoticesPage;