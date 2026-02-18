import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, CheckCircle, Clock, Shield, Star, FileText } from 'lucide-react';
import metiers from '../data/metiers.json';
import villes from '../data/villes.json';
import DevisForm from '../components/DevisForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';
import NotFoundPage from './NotFoundPage';
import SEOHead, { generateLocalBusinessSchema, generateBreadcrumbSchema, generateFAQSchema } from '../components/SEOHead';
import { interpolateText, getNestedProperty, formatPrice } from '../utils/textUtils';
import { generateSEOText, validateSEOText } from '../utils/seoTextGenerator';

const TradeLocationPage = () => {
  const { tradeSlug, citySlug } = useParams();

  const metier = metiers.find(m => m.slug === tradeSlug);
  const ville = villes.find(v => v.slug === citySlug);

  if (!metier || !ville) {
    return <NotFoundPage />;
  }

  // Generate SEO text
  const seoText = generateSEOText(metier, ville);
  const seoValidation = validateSEOText(seoText);

  // SEO data
  const pageTitle = `${metier.nom} à ${ville.nom} (${ville.code_postal}) - Devis gratuit en 2 min !`;
  const pageDescription = `Trouvez un ${metier.nom.toLowerCase()} qualifié à ${ville.nom} (${ville.code_postal}). Devis gratuits et rapides. Artisans certifiés près de chez vous en Vendée.`;

  // Generate JSON-LD schemas
  const jsonLdSchemas = [
    generateLocalBusinessSchema(metier.nom, ville.nom, ville.code_postal),
    generateBreadcrumbSchema([
      { name: 'Accueil', url: '/' },
      { name: `${metier.nom} en Vendée`, url: `/${metier.slug}/vendee` },
      { name: ville.nom, url: `/${metier.slug}/${ville.slug}` }
    ])
  ];

  // Add FAQ schema if FAQs exist
  if (metier.faq && Array.isArray(metier.faq) && metier.faq.length > 0) {
    const faqItems = metier.faq.map((faqItem: any) => ({
      question: interpolateText(faqItem.question || faqItem.q || '', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' }),
      answer: interpolateText(faqItem.reponse || faqItem.response || faqItem.answer || faqItem.r || faqItem.a || '', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })
    }));
    jsonLdSchemas.push(generateFAQSchema(faqItems));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        canonical={`/${metier.slug}/${ville.slug}`}
        jsonLd={jsonLdSchemas}
      />
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Accueil</Link>
          <span>/</span>
          <Link to={`/${tradeSlug}/vendee`} className="hover:text-blue-600">
            {metier.nom} en Vendée
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{ville.nom}</span>
        </nav>

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-white to-orange-50 rounded-3xl shadow-xl border border-orange-100 p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-200 to-red-200 rounded-full opacity-20 transform translate-x-20 -translate-y-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 transform -translate-x-16 translate-y-16"></div>
          
          <div className="flex items-start mb-6">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-2xl mr-4 mt-1 flex-shrink-0">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Devis gratuit d'artisans fiables dans le domaine {metier.nom.toLowerCase()} à {ville.nom} ({ville.code_postal})
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Devis gratuits et rapides pour vos travaux de {metier.nom.toLowerCase()}. Artisans fiables et certifiés près de chez vous.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center bg-gradient-to-r from-green-50 to-green-100 text-green-700 px-6 py-3 rounded-full shadow-md border border-green-200">
              <CheckCircle className="h-5 w-5 mr-2" />
              <span className="font-semibold">Devis 100% gratuit</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 px-6 py-3 rounded-full shadow-md border border-blue-200">
              <Clock className="h-5 w-5 mr-2" />
              <span className="font-semibold">Intervention rapide</span>
            </div>
            <div className="flex items-center bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 px-6 py-3 rounded-full shadow-md border border-purple-200">
              <Shield className="h-5 w-5 mr-2" />
              <span className="font-semibold">Artisans locaux certifiés</span>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Informations sur {ville.nom}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200 shadow-lg">
              <h4 className="font-bold text-blue-900 mb-3 text-lg">Localisation</h4>
              <p className="text-blue-800 font-bold text-xl">{ville.nom}</p>
              <p className="text-blue-600 font-medium">{ville.departement}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200 shadow-lg">
              <h4 className="font-bold text-green-900 mb-3 text-lg">Code postal</h4>
              <p className="text-green-800 font-bold text-2xl">{ville.code_postal}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200 shadow-lg">
              <h4 className="font-bold text-purple-900 mb-3 text-lg">Prix indicatif</h4>
              <p className="text-purple-800 font-bold text-xl">{formatPrice(metier.prix)}</p>
              <p className="text-purple-600 font-medium">
                {interpolateText(metier.unite_prix || 'par intervention', { metier, ville })}
              </p>
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

        {/* Location-Specific Information */}
        {(getNestedProperty(metier, 'description_longue') ||
          getNestedProperty(metier, 'description_courte') ||
          getNestedProperty(metier, 'conseils_localises') || 
          getNestedProperty(ville, 'informations_specifiques') ||
          getNestedProperty(metier, 'reglementations_locales') ||
          getNestedProperty(metier, 'avantages') ||
          getNestedProperty(metier, 'inconvenients') ||
          getNestedProperty(metier, 'aides_disponibles') ||
          getNestedProperty(metier, 'faq')) && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Services de {metier.nom.toLowerCase()} spécifiques à {ville.nom}
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Description adaptée à la ville */}
              {(getNestedProperty(metier, 'description_longue') || getNestedProperty(metier, 'description_courte')) && (
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Pourquoi choisir artisans fiables dans le domaine {metier.nom} à {ville.nom} ?', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">
                      {interpolateText(metier.description_longue || metier.description_courte, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Avantages */}
              {getNestedProperty(metier, 'avantages') && Array.isArray(metier.avantages) && metier.avantages.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Avantages à {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <ul className="space-y-3">
                    {metier.avantages.map((avantage: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{interpolateText(avantage, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Inconvénients */}
              {getNestedProperty(metier, 'inconvenients') && Array.isArray(metier.inconvenients) && metier.inconvenients.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Points d\'attention à {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <ul className="space-y-3">
                    {metier.inconvenients.map((inconvenient: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        </div>
                        <span>{interpolateText(inconvenient, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Conseils localisés */}
              {getNestedProperty(metier, 'conseils_localises') && Array.isArray(metier.conseils_localises) && metier.conseils_localises.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Conseils pour {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <ul className="space-y-3">
                    {metier.conseils_localises.map((conseil: string, index: number) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <MapPin className="w-5 h-5 text-orange-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span>{interpolateText(conseil, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Informations spécifiques à la ville */}
              {getNestedProperty(ville, 'informations_specifiques') && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Spécificités de {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
                    <p className="text-green-800 leading-relaxed">
                      {interpolateText(ville.informations_specifiques, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                    </p>
                  </div>
                </div>
              )}
              
              {/* Aides disponibles */}
              {getNestedProperty(metier, 'aides_disponibles') && Array.isArray(metier.aides_disponibles) && metier.aides_disponibles.length > 0 && (
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Aides et subventions disponibles à {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metier.aides_disponibles.map((aide: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                        <div className="flex items-start">
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-white text-xs font-bold">€</span>
                          </div>
                          <span className="text-green-800 text-sm font-medium">
                            {interpolateText(aide, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Réglementations locales */}
              {getNestedProperty(metier, 'reglementations_locales') && Array.isArray(metier.reglementations_locales) && metier.reglementations_locales.length > 0 && (
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Réglementations à {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metier.reglementations_locales.map((reglementation: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-start">
                          <Shield className="w-5 h-5 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-yellow-800 text-sm font-medium">
                            {interpolateText(reglementation, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Avantages locaux */}
              {getNestedProperty(metier, 'avantages_locaux') && Array.isArray(metier.avantages_locaux) && metier.avantages_locaux.length > 0 && (
                <div className="lg:col-span-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {interpolateText('Avantages à {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {metier.avantages_locaux.map((avantage: string, index: number) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 text-center">
                        <Star className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                        <span className="text-blue-800 text-sm font-medium">
                          {interpolateText(avantage, { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {/* SEO Content Section */}
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
            <div dangerouslySetInnerHTML={{ __html: seoText }} />
          </div>
          
          {/* SEO Debug Info (only in development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-sm font-bold text-gray-700 mb-2">SEO Debug Info:</h4>
              <div className="text-xs text-gray-600 space-y-1">
                <p>Word count: {seoValidation.wordCount}</p>
                <p>Has H2: {seoValidation.hasH2 ? '✅' : '❌'}</p>
                <p>Has H3: {seoValidation.hasH3 ? '✅' : '❌'}</p>
                <p>Paragraphs: {seoValidation.paragraphCount}</p>
                <p>Valid: {seoValidation.isValid ? '✅' : '❌'}</p>
                {seoValidation.issues.length > 0 && (
                  <p className="text-red-600">Issues: {seoValidation.issues.join(', ')}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* FAQ Section */}
        {getNestedProperty(metier, 'faq') && Array.isArray(metier.faq) && metier.faq.length > 0 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {interpolateText('Questions fréquentes sur {metier.nom} à {ville.nom}', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
            </h2>
            <div className="space-y-6">
              {metier.faq.map((faqItem: any, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {interpolateText(faqItem.question || faqItem.q || '', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {interpolateText(faqItem.reponse || faqItem.response || faqItem.answer || faqItem.r || faqItem.a || '', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Services Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
              Services de {metier.nom.toLowerCase()} à {ville.nom}
            </h3>
            <ul className="space-y-4">
              {metier.services.map((service, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-4 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-6 w-6 mr-3 text-yellow-500" />
              Pourquoi choisir nos artisans à {ville.nom} ?
            </h3>
            <ul className="space-y-4">
              {metier.avantages.map((avantage, index) => (
                <li key={index} className="flex items-start text-gray-700">
                  <Star className="w-5 h-5 text-yellow-500 mr-4 mt-0.5 flex-shrink-0" />
                  <span className="font-medium">{avantage}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Technical Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Matériaux utilisés</h3>
            <div className="grid grid-cols-1 gap-3">
              {metier.materiaux_utilises.map((materiau, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-sm border border-gray-200">
                  {materiau}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Normes respectées</h3>
            <div className="grid grid-cols-1 gap-2">
              {metier.normes.map((norme, index) => (
                <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 px-4 py-3 rounded-xl text-sm font-medium text-center shadow-sm border border-blue-200">
                  {norme}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative">
          <h2 className="text-3xl font-bold mb-4">
            {interpolateText('Prêt à démarrer vos travaux de {metier.nom} à {ville.nom} ?', { metier, ville, code_postal: ville.code_postal, departement: 'Vendée' })}
          </h2>
          <p className="text-xl text-orange-100 mb-8 leading-relaxed">
            Recevez jusqu'à 3 devis gratuits d'artisans qualifiés près de chez vous
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

export default TradeLocationPage;