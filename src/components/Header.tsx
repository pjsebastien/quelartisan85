import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, ChevronDown, Hammer, FileText, Search, Shield, BookOpen } from 'lucide-react';
import metiers from '../data/metiers.json';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMetiersOpen, setIsDesktopMetiersOpen] = useState(false);
  const [isMobileMetiersOpen, setIsMobileMetiersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMetiers, setFilteredMetiers] = useState(metiers);
  const location = useLocation();

  // Filter métiers based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredMetiers(metiers);
    } else {
      const filtered = metiers.filter(metier =>
        metier.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        metier.description_courte.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMetiers(filtered);
    }
  }, [searchTerm]);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDesktopMetiersOpen(false);
    setIsMobileMetiersOpen(false);
    setSearchTerm('');
  }, [location]);

  // Close desktop menu on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.desktop-menu-container')) {
        setIsDesktopMetiersOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsMobileMetiersOpen(false);
    setSearchTerm('');
  };

  const toggleDesktopMetiers = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDesktopMetiersOpen(!isDesktopMetiersOpen);
    setSearchTerm('');
  };

  const toggleMobileMetiers = () => {
    setIsMobileMetiersOpen(!isMobileMetiersOpen);
    setSearchTerm('');
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDesktopMetierClick = () => {
    setIsDesktopMetiersOpen(false);
    setSearchTerm('');
  };

  const handleMobileNavClick = () => {
    setIsMobileMenuOpen(false);
    setIsMobileMetiersOpen(false);
    setSearchTerm('');
  };

  return (
    <>
      <header className="bg-white shadow-lg border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                <Hammer className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Quel Artisan 85
                </h1>
                <p className="text-sm text-gray-600">Artisans fiables en Vendée</p>
              </div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden lg:flex items-center space-x-8 desktop-menu-container">
              <Link 
                to="/" 
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                <Home className="h-4 w-4 mr-2" />
                Accueil
              </Link>

              {/* Desktop Métiers Search Dropdown */}
              <div className="relative">
                <button
                  onClick={toggleDesktopMetiers}
                  className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
                >
                  <Hammer className="h-4 w-4 mr-2" />
                  Métiers
                  <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-300 ${isDesktopMetiersOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Desktop Search Dropdown */}
                {isDesktopMetiersOpen && (
                  <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 py-4 z-50">
                    <div className="px-4 pb-4 border-b border-gray-100">
                      <h3 className="text-sm font-bold text-gray-900 mb-3">Rechercher un métier</h3>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Tapez le nom d'un métier..."
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200"
                          autoFocus
                        />
                      </div>
                    </div>
                    
                    <div className="p-2 max-h-80 overflow-y-auto">
                      {filteredMetiers.length > 0 ? (
                        <>
                          <div className="px-3 py-2 text-xs text-gray-500 font-medium">
                            {filteredMetiers.length} métier{filteredMetiers.length > 1 ? 's' : ''} trouvé{filteredMetiers.length > 1 ? 's' : ''}
                          </div>
                          {filteredMetiers.map((metier) => (
                            <Link
                              key={metier.id}
                              to={`/${metier.slug}/vendee`}
                              onClick={handleDesktopMetierClick}
                              className="flex items-start px-3 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 hover:text-orange-600 rounded-lg transition-all duration-200 group"
                            >
                              <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mr-3 mt-2 group-hover:scale-125 transition-transform duration-200 flex-shrink-0"></div>
                              <div className="flex-1">
                                <div className="font-medium mb-1">{metier.nom}</div>
                                <div className="text-xs text-gray-500 line-clamp-2">{metier.description_courte}</div>
                              </div>
                            </Link>
                          ))}
                        </>
                      ) : (
                        <div className="px-3 py-8 text-center text-gray-500">
                          <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-sm">Aucun métier trouvé pour "{searchTerm}"</p>
                          <p className="text-xs mt-1">Essayez avec d'autres mots-clés</p>
                        </div>
                      )}
                    </div>
                    
                    <div className="px-4 pt-3 border-t border-gray-100 mt-2">
                      <Link
                        to="/devis"
                        onClick={handleDesktopMetierClick}
                        className="flex items-center justify-center w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Demander un devis général
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link 
                to="/charte" 
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                <Shield className="h-4 w-4 mr-2" />
                Notre charte
              </Link>

              <Link 
                to="/blog" 
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Blog
              </Link>
              <Link 
                to="/devis" 
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium transition-colors duration-300"
              >
                <FileText className="h-4 w-4 mr-2" />
                Demander un devis
              </Link>

              {/* Desktop CTA Button */}
              <Link 
                to="/devis" 
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Devis gratuit
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-colors duration-300"
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            className="fixed top-20 left-0 right-0 bottom-0 bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="px-6 py-8 space-y-6">
              {/* Mobile Home Link */}
              <Link 
                to="/" 
                onClick={handleMobileNavClick}
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium py-4 px-4 rounded-xl hover:bg-orange-50 transition-all duration-300 border-b border-gray-100"
              >
                <Home className="h-6 w-6 mr-4" />
                <span className="text-lg">Accueil</span>
              </Link>

              {/* Mobile Métiers Section */}
              <div className="border-b border-gray-100 pb-6">
                <button
                  onClick={toggleMobileMetiers}
                  className="flex items-center justify-between w-full text-gray-700 hover:text-orange-600 font-medium py-4 px-4 rounded-xl hover:bg-orange-50 transition-all duration-300"
                >
                  <div className="flex items-center">
                    <Hammer className="h-6 w-6 mr-4" />
                    <span className="text-lg">Métiers</span>
                  </div>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${isMobileMetiersOpen ? 'rotate-180' : ''}`} />
                </button>

                {isMobileMetiersOpen && (
                  <div className="mt-4 ml-4 space-y-4">
                    {/* Mobile Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Rechercher un métier..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors duration-200 text-lg"
                      />
                    </div>

                    {/* Mobile Results */}
                    <div className="max-h-64 overflow-y-auto space-y-2">
                      {filteredMetiers.length > 0 ? (
                        <>
                          <div className="px-2 py-2 text-sm text-gray-500 font-medium">
                            {filteredMetiers.length} résultat{filteredMetiers.length > 1 ? 's' : ''}
                          </div>
                          {filteredMetiers.slice(0, 10).map((metier) => (
                            <Link
                              key={metier.id}
                              to={`/${metier.slug}/vendee`}
                              onClick={handleMobileNavClick}
                              className="block text-gray-600 hover:text-orange-600 py-3 px-4 rounded-lg hover:bg-orange-50 transition-colors duration-200 border border-gray-100"
                            >
                              <div className="font-medium">{metier.nom}</div>
                              <div className="text-sm text-gray-500 mt-1">{metier.description_courte}</div>
                            </Link>
                          ))}
                          {filteredMetiers.length > 10 && (
                            <div className="text-sm text-gray-500 py-2 px-4">
                              +{filteredMetiers.length - 10} autres résultats...
                            </div>
                          )}
                        </>
                      ) : searchTerm && (
                        <div className="px-4 py-8 text-center text-gray-500">
                          <Search className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                          <p className="text-lg">Aucun métier trouvé</p>
                          <p className="text-sm mt-2">Essayez avec d'autres mots-clés</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Other Links */}
              <Link 
                to="/charte" 
                onClick={handleMobileNavClick}
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium py-4 px-4 rounded-xl hover:bg-orange-50 transition-all duration-300 border-b border-gray-100"
              >
                <Shield className="h-6 w-6 mr-4" />
                <span className="text-lg">Notre charte</span>
              </Link>

              <Link 
                to="/blog" 
                onClick={handleMobileNavClick}
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium py-4 px-4 rounded-xl hover:bg-orange-50 transition-all duration-300 border-b border-gray-100"
              >
                <BookOpen className="h-6 w-6 mr-4" />
                <span className="text-lg">Blog</span>
              </Link>
              <Link 
                to="/devis" 
                onClick={handleMobileNavClick}
                className="flex items-center text-gray-700 hover:text-orange-600 font-medium py-4 px-4 rounded-xl hover:bg-orange-50 transition-all duration-300 border-b border-gray-100"
              >
                <FileText className="h-6 w-6 mr-4" />
                <span className="text-lg">Demander un devis</span>
              </Link>

              {/* Mobile CTA */}
              <div className="pt-6">
                <Link 
                  to="/devis" 
                  onClick={handleMobileNavClick}
                  className="flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-5 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <FileText className="h-6 w-6 mr-3" />
                  Devis gratuit
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;