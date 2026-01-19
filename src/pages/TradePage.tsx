import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, MapPin, CheckCircle, Clock, Shield, FileText } from 'lucide-react';
import metiers from '../data/metiers.json';
import villes from '../data/villes.json';
import DevisForm from '../components/DevisForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';
import { interpolateText, getNestedProperty, formatPrice } from '../utils/textUtils';
import { generateSEOTextVendee, validateSEOTextVendee } from '../utils/seoTextGeneratorVendee';

const TradePage = () => {
  const { tradeSlug } = useParams();
  
  const metier = metiers.find(m => m.slug === tradeSlug);
  
  if (!metier) {
    return <Navigate to="/" replace />;
  }

  // Generate SEO text for Vendée
  const seoTextVendee = generateSEOTextVendee(metier);
  const seoValidationVendee = validateSEOTextVendee(seoTextVendee);
  
  // Log SEO text validation for debugging
  console.log('SEO Text Vendée Validation:', seoValidationVendee);

  // SEO Meta Tags
  useEffect(() => {
    // Debug the metier object to see its structure
    console.log('Metier object:', metier);
    console.log('Metier.nom:', metier.nom, 'Type:', typeof metier.nom);
    
    document.title = `${metier.nom} en Vendée (85) - Devis gratuit en 2 min !`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 
        `Trouvez un ${metier.nom.toLowerCase()} qualifié en Vendée. Devis gratuits et rapides pour vos travaux de ${metier.nom.toLowerCase()}. Artisans certifiés dans toute la Vendée (85).`
      );
    }
  }, [metier]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{metier.nom} en Vendée</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl border border-orange-100 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-12 translate-y-12"></div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Devis gratuit d'artisans fiables dans le domaine {metier.nom.toLowerCase()} en Vendée
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Devis gratuits et rapides pour vos travaux de {metier.nom.toLowerCase()}. Artisans fiables et certifiés dans toute la Vendée (85).
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-6 py-3 rounded-full shadow-md border border-green-200">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Devis 100% gratuit</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-6 py-3 rounded-full shadow-md border border-blue-200">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">Réponse rapide</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-6 py-3 rounded-full shadow-md border border-purple-200">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-semibold">Artisans certifiés</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">Prix indicatif</h4>
              <p className="text-blue-800 font-bold text-xl">{formatPrice(metier.prix)}</p>
              <p className="text-blue-600 font-medium">
                {interpolateText(metier.unite_prix || 'par intervention', { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
              <h4 className="font-bold text-green-900 mb-3 text-lg">Services</h4>
              <p className="text-green-800 font-semibold">{metier.services.length} types de services</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
              <h4 className="font-bold text-purple-900 mb-3 text-lg">Matériaux</h4>
              <p className="text-purple-800 font-semibold text-sm">{metier.materiaux_utilises.slice(0, 2).join(', ')}</p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200 shadow-lg">
              <h4 className="font-bold text-orange-900 mb-3 text-lg">Normes</h4>
              <p className="text-orange-800 font-semibold text-sm">{metier.normes.slice(0, 2).join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Formulaire de devis */}
        <ClientOnly>
          <DevisForm isHomepage={false} className="mb-8" />
        </ClientOnly>

        {/* Button for other services */}
        <div className="text-center mb-8">
          <Link 
            to="/devis"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-2xl hover:shadow-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="h-5 w-5 mr-3" />
            Demandez un devis pour un autre type de service
          </Link>
        </div>

        {/* Additional Metier Information */}
        {(getNestedProperty(metier, 'description_longue') ||
          getNestedProperty(metier, 'description_courte') ||
          getNestedProperty(metier, 'conseils') || 
          getNestedProperty(metier, 'informations_complementaires') ||
          getNestedProperty(metier, 'garanties') ||
          getNestedProperty(metier, 'certifications') ||
          getNestedProperty(metier, 'avantages') ||
          getNestedProperty(metier, 'inconvenients') ||
          getNestedProperty(metier, 'aides_disponibles') ||
          getNestedProperty(metier, 'faq')) && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Tout savoir sur les services de {metier.nom.toLowerCase()} en Vendée
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description longue */}
              {(getNestedProperty(metier, 'description_longue') || getNestedProperty(metier, 'description_courte')) && (
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Description détaillée</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {interpolateText(
                        metier.description_longue || metier.description_courte,
                        { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' }
                      )}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Avantages */}
              {getNestedProperty(metier, 'avantages') && Array.isArray(metier.avantages) && metier.avantages.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Avantages</h3>
                  <ul className="space-y-3">
                    {metier.avantages.map((avantage: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{interpolateText(avantage, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Inconvénients */}
              {getNestedProperty(metier, 'inconvenients') && Array.isArray(metier.inconvenients) && metier.inconvenients.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Points d'attention</h3>
                  <ul className="space-y-3">
                    {metier.inconvenients.map((inconvenient: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span>{interpolateText(inconvenient, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Conseils */}
              {getNestedProperty(metier, 'conseils') && Array.isArray(metier.conseils) && metier.conseils.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Conseils d'experts</h3>
                  <ul className="space-y-3">
                    {metier.conseils.map((conseil: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{interpolateText(conseil, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Informations complémentaires */}
              {getNestedProperty(metier, 'informations_complementaires') && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Informations importantes</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                    <p className="text-blue-800 leading-relaxed">
                      {interpolateText(metier.informations_complementaires, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Aides disponibles */}
              {getNestedProperty(metier, 'aides_disponibles') && Array.isArray(metier.aides_disponibles) && metier.aides_disponibles.length > 0 && (
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Aides et subventions disponibles</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metier.aides_disponibles.map((aide: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">€</span>
                          </div>
                          <span className="text-green-800 text-sm font-medium">
                            {interpolateText(aide, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Garanties */}
              {getNestedProperty(metier, 'garanties') && Array.isArray(metier.garanties) && metier.garanties.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Garanties offertes</h3>
                  <ul className="space-y-3">
                    {metier.garanties.map((garantie: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <Shield className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{interpolateText(garantie, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Certifications */}
              {getNestedProperty(metier, 'certifications') && Array.isArray(metier.certifications) && metier.certifications.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Certifications requises</h3>
                  <div className="space-y-3">
                    {metier.certifications.map((certification: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800 px-4 py-3 rounded-xl border border-purple-200">
                        <span className="font-medium">{interpolateText(certification, { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* FAQ Section */}
        {getNestedProperty(metier, 'faq') && Array.isArray(metier.faq) && metier.faq.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Questions fréquentes sur {metier.nom.toLowerCase()} en Vendée
            </h2>
            <div className="space-y-6">
              {metier.faq.map((faqItem: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {interpolateText(faqItem.question || faqItem.q || '', { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {interpolateText(faqItem.reponse || faqItem.response || faqItem.answer || faqItem.r || faqItem.a || '', { metier, ville: { nom: 'Vendée' }, code_postal: '85000', departement: 'Vendée' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content Section for Vendée */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <div className="seo-content">
            <style jsx>{`
              .seo-content h2 {
                font-size: 1.875rem;
                font-weight: 700;
                color: #111827;
                margin-bottom: 1.5rem;
                margin-top: 2rem;
                line-height: 1.2;
              }
              .seo-content h2:first-child {
                margin-top: 0;
              }
              .seo-content h3 {
                font-size: 1.25rem;
                font-weight: 600;
                color: #ea580c;
                margin-bottom: 1rem;
                margin-top: 1.5rem;
                line-height: 1.3;
              }
              .seo-content p {
                color: #374151;
                line-height: 1.7;
                margin-bottom: 1rem;
                font-size: 1rem;
              }
              .seo-content p:last-child {
                margin-bottom: 0;
              }
            `}</style>
            <div dangerouslySetInnerHTML={{ __html: seoTextVendee }} />
          </div>
          
          {/* SEO Debug Info (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-sm font-bold text-gray-700 mb-2">SEO Debug Info (Vendée):</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Word count: {seoValidationVendee.wordCount}</p>
                <p>Has H2: {seoValidationVendee.hasH2 ? '✅' : '❌'}</p>
                <p>Has H3: {seoValidationVendee.hasH3 ? '✅' : '❌'}</p>
                <p>Paragraphs: {seoValidationVendee.paragraphCount}</p>
                <p>Valid: {seoValidationVendee.isValid ? '✅' : '❌'}</p>
                {seoValidationVendee.issues.length > 0 && (
                  <p className="text-red-600">Issues: {seoValidationVendee.issues.join(', ')}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Cities List */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MapPin className="h-7 w-7 mr-3 text-orange-600" />
            Choisissez votre ville en Vendée pour un devis personnalisé
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {villes.map((ville) => (
              <Link
                key={ville.id}
                to={`/${tradeSlug}/${ville.slug}`}
                className="group flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-orange-50 hover:to-red-50 rounded-2xl border border-gray-200 hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {ville.nom}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">{ville.code_postal}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        {/* Detailed Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
              Services proposés
            </h3>
            <ul className="space-y-2">
              {metier.services.map((service, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-4 flex-shrink-0" />
                  {service}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-blue-600" />
              Avantages de nos artisans
            </h3>
            <ul className="space-y-2">
              {metier.avantages.map((avantage, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <Shield className="w-5 h-5 text-blue-600 mr-4 flex-shrink-0" />
                  {avantage}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Additional Details */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Matériaux utilisés</h3>
            <div className="flex flex-wrap gap-3">
              {metier.materiaux_utilises.map((materiau, index) => (
                <span key={index} className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                  {materiau}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Normes respectées</h3>
            <div className="flex flex-wrap gap-3">
              {metier.normes.map((norme, index) => (
                <span key={index} className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
                  {norme}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TradePage;