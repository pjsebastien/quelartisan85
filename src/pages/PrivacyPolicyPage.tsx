import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Eye, Lock, UserCheck, Mail, Phone, FileText, AlertCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Hammer } from 'lucide-react';

const PrivacyPolicyPage = () => {
  // SEO Meta Tags
  useEffect(() => {
    document.title = 'Politique de confidentialité - Quel Artisan 85';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        'Découvrez notre politique de confidentialité. Chez Quel Artisan 85, nous respectons votre vie privée et protégeons vos données personnelles selon le RGPD.'
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
          <span className="text-gray-900 font-medium">Politique de confidentialité</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl border border-blue-100 p-8 mb-8">
          <div className="text-center">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Politique de confidentialité
            </h1>
            
            <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Chez Quel Artisan 85, nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles.
            </p>
            
            <div className="flex items-center justify-center text-sm text-gray-500">
              <AlertCircle className="h-4 w-4 mr-2" />
              <span>Dernière mise à jour : Janvier 2025</span>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-green-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">1. Collecte des données</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous collectons uniquement les données nécessaires pour vous mettre en relation avec nos artisans partenaires :
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Données d'identification :</strong> nom, prénom, adresse email, numéro de téléphone</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Données de localisation :</strong> adresse, code postal, ville</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Données de projet :</strong> type de travaux, description du projet, budget estimé</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <UserCheck className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">2. Utilisation des données</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Vos données personnelles sont utilisées exclusivement pour :
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Vous mettre en relation avec des artisans qualifiés correspondant à votre demande</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Transmettre votre demande de devis aux artisans sélectionnés</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Assurer le suivi de votre demande et améliorer notre service</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Vous envoyer des informations relatives à votre demande</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Lock className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">3. Protection et sécurité</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour protéger vos données :
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Chiffrement des données lors de leur transmission</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Accès limité aux données par des personnes autorisées uniquement</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Sauvegarde sécurisée et régulière des données</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span>Surveillance continue de nos systèmes de sécurité</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">4. Vos droits</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Droit de rectification :</strong> corriger vos données inexactes</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Droit à l'effacement :</strong> demander la suppression de vos données</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données</span>
                </li>
              </ul>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 mt-6 border border-orange-200">
                <p className="text-orange-800 font-medium">
                  Pour exercer vos droits, contactez-nous à : 
                  <a href="mailto:contact@margouillapp.re" className="font-bold hover:underline ml-1">
                    contact@margouillapp.re
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Section 5 */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-gray-500 to-gray-600 w-12 h-12 rounded-xl flex items-center justify-center mr-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">5. Contact</h2>
            </div>
            
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles :
              </p>
              
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-semibold text-gray-900">Email :</span>
                  <a href="mailto:contact@margouillapp.re" className="text-blue-600 hover:underline ml-2 font-medium">
                    contact@margouillapp.re
                  </a>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-600 mr-3" />
                  <span className="font-semibold text-gray-900">Service :</span>
                  <span className="text-gray-700 ml-2">Quel Artisan 85 - Protection des données</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-2xl mt-12">
          <h2 className="text-2xl font-bold mb-4">
            Vos données sont protégées
          </h2>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Faites-nous confiance pour vos projets en toute sérénité
          </p>
          <Link 
            to="/devis"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-105"
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

export default PrivacyPolicyPage;