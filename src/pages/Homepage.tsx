import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Clock, Users, Star, CheckCircle, Award, Hammer, Wrench, Zap, Palette, MapPin, Search } from 'lucide-react';
import metiers from '../data/metiers.json';
import villes from '../data/villes.json';
import DevisForm from '../components/DevisForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ClientOnly from '../components/ClientOnly';
import SEOHead from '../components/SEOHead';

const Homepage = () => {
  const navigate = useNavigate();
  const [selectedTrade, setSelectedTrade] = React.useState('');
  const [selectedTradeSlug, setSelectedTradeSlug] = React.useState('');
  const [selectedCity, setSelectedCity] = React.useState('');
  const [selectedCitySlug, setSelectedCitySlug] = React.useState('vendee');
  const [tradeQuery, setTradeQuery] = React.useState('');
  const [cityQuery, setCityQuery] = React.useState('');
  const [showTradeSuggestions, setShowTradeSuggestions] = React.useState(false);
  const [showCitySuggestions, setShowCitySuggestions] = React.useState(false);

  // Filter trades based on search query
  const filteredTrades = React.useMemo(() => {
    if (!tradeQuery.trim()) return metiers;
    return metiers.filter(metier =>
      metier.nom.toLowerCase().includes(tradeQuery.toLowerCase()) ||
      metier.description_courte.toLowerCase().includes(tradeQuery.toLowerCase())
    );
  }, [tradeQuery]);

  // Filter cities based on search query
  const filteredCities = React.useMemo(() => {
    if (!cityQuery.trim()) return villes;
    return villes.filter(ville =>
      ville.nom.toLowerCase().includes(cityQuery.toLowerCase()) ||
      ville.code_postal.includes(cityQuery)
    );
  }, [cityQuery]);

  // Close suggestions when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowTradeSuggestions(false);
        setShowCitySuggestions(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (!selectedTradeSlug) return;
    
    if (selectedCitySlug && selectedCitySlug !== 'vendee') {
      // Redirect to specific city page
      navigate(`/${selectedTradeSlug}/${selectedCitySlug}`);
    } else {
      // Redirect to general trade page for Vendée
      navigate(`/${selectedTradeSlug}/vendee`);
    }
  };

  return (
    <>
      <SEOHead
        title="Quel Artisan 85 - Devis gratuits d'artisans en Vendée - 2 min chrono !"
        description="Trouvez rapidement un artisan fiable en Vendée. Devis gratuits en 2 minutes pour tous vos travaux. Artisans vérifiés et qualifiés dans toute la Vendée (85)."
        canonical="/"
      />

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="w-full">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                    Trouvez rapidement
                  </span>
                  <br />
                  <span className="text-gray-800">un artisan fiable</span>
                  <br />
                  <span className="text-orange-600">en Vendée</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-gray-700 leading-relaxed">
                  Devis gratuits en 2 minutes pour tous vos travaux. 
                  <span className="font-semibold text-orange-600"> Artisans vérifiés et qualifiés</span> dans toute la Vendée (85).
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex items-center border-l-4 border-green-500">
                    <Shield className="h-6 w-6 mr-3 text-green-600" />
                    <span className="font-semibold text-gray-800">Artisans certifiés</span>
                  </div>
                  <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex items-center border-l-4 border-blue-500">
                    <Clock className="h-6 w-6 mr-3 text-blue-600" />
                    <span className="font-semibold text-gray-800">Réponse rapide</span>
                  </div>
                  <div className="bg-white shadow-lg rounded-2xl px-6 py-4 flex items-center border-l-4 border-purple-500">
                    <CheckCircle className="h-6 w-6 mr-3 text-purple-600" />
                    <span className="font-semibold text-gray-800">Sans engagement</span>
                  </div>
                </div>
              </div>
              
              <div className="relative lg:flex lg:justify-center">
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:max-w-lg">
                  <div className="space-y-4">
                    <img
                      src="https://res.cloudinary.com/dcngcvz9k/image/upload/f_auto,q_auto,w_400/v1758201227/1_vvwkpd.jpg"
                      alt="Artisan menuisier en Vendée"
                      width={400}
                      height={192}
                      loading="lazy"
                      className="w-full h-48 object-cover rounded-2xl shadow-xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
                    />
                    <img
                      src="https://res.cloudinary.com/dcngcvz9k/image/upload/f_auto,q_auto,w_400/v1758201227/3_e1q2x3.jpg"
                      alt="Artisan charpentier en Vendée"
                      width={400}
                      height={128}
                      loading="lazy"
                      className="w-full h-32 object-cover rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300"
                    />
                  </div>
                  <div className="space-y-4 mt-8">
                    <img
                      src="https://res.cloudinary.com/dcngcvz9k/image/upload/f_auto,q_auto,w_400/v1758201227/2_ho3cir.jpg"
                      alt="Artisan potier en Vendée"
                      width={400}
                      height={128}
                      loading="lazy"
                      className="w-full h-32 object-cover rounded-2xl shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-300"
                    />
                    <img
                      src="https://res.cloudinary.com/dcngcvz9k/image/upload/f_auto,q_auto,w_400/v1758201228/6_bsskhi.jpg"
                      alt="Equipe d'artisans en Vendée"
                      width={400}
                      height={192}
                      loading="lazy"
                      className="w-full h-48 object-cover rounded-2xl shadow-xl transform rotate-1 hover:rotate-0 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-2xl shadow-2xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-sm">Artisans partenaires</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Form - Full Width */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 search-container">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Trouvez votre artisan idéal
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Sélectionnez votre métier et votre ville pour obtenir des devis gratuits d'artisans qualifiés
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Trade Search */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Quel type d'artisan recherchez-vous ?
                  </label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tapez le nom d'un métier (ex: plombier, électricien...)"
                      value={tradeQuery}
                      onChange={(e) => {
                        setTradeQuery(e.target.value);
                        setShowTradeSuggestions(true);
                        if (!e.target.value.trim()) {
                          setSelectedTrade('');
                          setSelectedTradeSlug('');
                        }
                      }}
                      onFocus={() => setShowTradeSuggestions(true)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-lg"
                    />
                  </div>

                  {/* Trade Suggestions */}
                  {showTradeSuggestions && (tradeQuery.trim() || !selectedTrade) && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
                      {filteredTrades.length > 0 ? (
                        <>
                          <div className="px-4 py-2 text-xs text-gray-500 font-medium border-b border-gray-100">
                            {filteredTrades.length} métier{filteredTrades.length > 1 ? 's' : ''} trouvé{filteredTrades.length > 1 ? 's' : ''}
                          </div>
                          {filteredTrades.slice(0, 8).map((metier) => (
                            <button
                              key={metier.id}
                              onClick={() => {
                                setSelectedTrade(metier.nom);
                                setSelectedTradeSlug(metier.slug);
                                setTradeQuery(metier.nom);
                                setShowTradeSuggestions(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group"
                            >
                              <div className="flex items-start">
                                <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                                <div className="flex-1">
                                  <div className="font-medium text-gray-900 group-hover:text-orange-600">{metier.nom}</div>
                                  <div className="text-sm text-gray-500 mt-1">{metier.description_courte}</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </>
                      ) : tradeQuery.trim() && (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">Aucun métier trouvé pour "{tradeQuery}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* City Search */}
                <div className="relative">
                  <label className="block text-sm font-bold text-gray-900 mb-3">
                    Dans quelle ville en Vendée ?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tapez le nom d'une ville ou laissez vide pour toute la Vendée"
                      value={cityQuery}
                      onChange={(e) => {
                        setCityQuery(e.target.value);
                        setShowCitySuggestions(true);
                        if (!e.target.value.trim()) {
                          setSelectedCity('Toute la Vendée');
                          setSelectedCitySlug('vendee');
                        }
                      }}
                      onFocus={() => setShowCitySuggestions(true)}
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 text-lg"
                    />
                  </div>

                  {/* City Suggestions */}
                  {showCitySuggestions && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 max-h-80 overflow-y-auto">
                      {/* Always show "Toute la Vendée" option first */}
                      <button
                        onClick={() => {
                          setSelectedCity('Toute la Vendée');
                          setSelectedCitySlug('vendee');
                          setCityQuery('');
                          setShowCitySuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-600 transition-all duration-200 group border-b border-gray-100"
                      >
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900 group-hover:text-blue-600">Toute la Vendée</div>
                            <div className="text-sm text-gray-500">Tous les artisans du département (85)</div>
                          </div>
                        </div>
                      </button>

                      {filteredCities.length > 0 && (
                        <>
                          <div className="px-4 py-2 text-xs text-gray-500 font-medium">
                            {filteredCities.length} ville{filteredCities.length > 1 ? 's' : ''} trouvée{filteredCities.length > 1 ? 's' : ''}
                          </div>
                          {filteredCities.slice(0, 8).map((ville) => (
                            <button
                              key={ville.id}
                              onClick={() => {
                                setSelectedCity(ville.nom);
                                setSelectedCitySlug(ville.slug);
                                setCityQuery(ville.nom);
                                setShowCitySuggestions(false);
                              }}
                              className="w-full text-left px-4 py-3 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 transition-all duration-200 group"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center flex-1">
                                  <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></div>
                                  <div>
                                    <div className="font-medium text-gray-900 group-hover:text-orange-600">{ville.nom}</div>
                                    <div className="text-sm text-gray-500">{ville.code_postal}</div>
                                  </div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Search Button */}
              <div className="text-center">
                <button
                  onClick={handleSearch}
                  disabled={!selectedTradeSlug}
                  className={`inline-flex items-center px-12 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform ${
                    selectedTradeSlug
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-2xl hover:scale-105 hover:from-orange-600 hover:to-red-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Search className="h-6 w-6 mr-3" />
                  {selectedTradeSlug ? 'Obtenir mes devis gratuits' : 'Sélectionnez un métier'}
                </button>
                
                {selectedTradeSlug && (
                  <p className="mt-4 text-sm text-gray-600">
                    Recherche : <span className="font-semibold text-orange-600">{selectedTrade}</span>
                    {selectedCity && selectedCity !== 'Toute la Vendée' && (
                      <> à <span className="font-semibold text-orange-600">{selectedCity}</span></>
                    )}
                  </p>
                )}
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                <div className="flex items-center bg-green-50 px-4 py-2 rounded-full">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  100% gratuit
                </div>
                <div className="flex items-center bg-blue-50 px-4 py-2 rounded-full">
                  <Shield className="w-4 h-4 text-blue-600 mr-2" />
                  Sans engagement
                </div>
                <div className="flex items-center bg-purple-50 px-4 py-2 rounded-full">
                  <Clock className="w-4 h-4 text-purple-600 mr-2" />
                  Réponse rapide
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Tous les métiers d'artisans en <span className="text-orange-600">Vendée</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Sélectionnez votre métier pour obtenir des devis gratuits d'artisans qualifiés près de chez vous. 
                Chaque artisan est vérifié et certifié par nos équipes.
              </p>
            </div>

            {/* Trades Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {metiers.map((metier, index) => (
                <Link
                  key={metier.id}
                  to={`/${metier.slug}/vendee`}
                  className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:border-orange-300 transition-all duration-300 transform hover:-translate-y-3 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      index % 4 === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      index % 4 === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      index % 4 === 2 ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                      'bg-gradient-to-r from-orange-500 to-red-500'
                    } group-hover:scale-110 transition-transform duration-300`}>
                      {index % 4 === 0 ? <Hammer className="h-6 w-6 text-white" /> :
                       index % 4 === 1 ? <Wrench className="h-6 w-6 text-white" /> :
                       index % 4 === 2 ? <Zap className="h-6 w-6 text-white" /> :
                       <Palette className="h-6 w-6 text-white" />}
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors mb-3">
                    {metier.nom}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {metier.description_courte}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-2 rounded-full">
                      {metier.prix}
                    </span>
                    <span className="text-xs text-gray-500 font-medium">
                      {metier.unite_prix}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-green-600 bg-green-50 px-3 py-2 rounded-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-semibold">Devis gratuit</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-orange-500 to-red-500 text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/dcngcvz9k/image/upload/f_auto,q_auto,w_1200/v1758201228/6_bsskhi.jpg"
              alt="Artisan peintre en Vendée"
              width={1200}
              height={400}
              loading="lazy"
              className="w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/90 to-red-500/90"></div>
          </div>
          
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Award className="h-20 w-20 mx-auto mb-8 text-orange-200" />
            <h2 className="text-4xl font-bold mb-6">
              Prêt à démarrer vos travaux ?
            </h2>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed">
              Choisissez votre métier ci-dessus et recevez jusqu'à 3 devis gratuits 
              d'artisans qualifiés et vérifiés en Vendée.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Star className="h-5 w-5 mr-2 text-yellow-300" />
                <span className="font-semibold">Service 100% gratuit</span>
              </div>
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Shield className="h-5 w-5 mr-2" />
                <span className="font-semibold">Artisans certifiés</span>
              </div>
              <div className="flex items-center text-orange-100 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-semibold">Réponse sous 24h</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Homepage;