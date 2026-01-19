import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Hammer, ArrowRight } from 'lucide-react';

const StickySearchForm = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAtFooter, setIsAtFooter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Hide on devis page since it's redundant
  const shouldHide = location.pathname === '/devis';

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (footer) {
        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Hide when footer is visible
        setIsAtFooter(footerRect.top <= windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to devis page with search query as state
      navigate('/devis', { state: { searchQuery: searchQuery.trim() } });
    } else {
      navigate('/devis');
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleReopen = () => {
    setIsVisible(true);
    setIsMinimized(false);
  };

  if (shouldHide) return null;

  return (
    <>
      {/* Main sticky form */}
      {isVisible && (
        <div 
          className={`fixed bottom-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
            isAtFooter ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
          } ${isMinimized ? 'translate-y-full' : ''}`}
        >
          <div className="bg-gradient-to-r from-orange-500 to-red-500 shadow-2xl border-t-4 border-orange-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex items-center justify-between">
                {/* Form content */}
                <div className="flex-1 flex flex-col sm:flex-row items-center gap-4 w-full">
                  <div className="flex items-center text-white">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-xl mr-3">
                      <Hammer className="h-5 w-5 text-white" />
                    </div>
                    <span className="font-bold text-lg hidden sm:block">Quel type d'artisan recherchez-vous ?</span>
                    <span className="font-bold text-base sm:hidden">Trouvez votre artisan</span>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flex-1 w-full sm:max-w-lg lg:max-w-xl flex gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Ex: plombier, électricien..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/50 focus:outline-none text-gray-900 font-medium placeholder-gray-500 text-base"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-white text-orange-600 px-4 sm:px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center whitespace-nowrap"
                    >
                      <span className="hidden sm:inline">Trouver des artisans</span>
                      <span className="sm:hidden">Trouver</span>
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </button>
                  </form>
                </div>

                {/* Control buttons */}
                <div className="flex items-center gap-2 ml-2 sm:ml-4 flex-shrink-0">
                  {/* <button
                    onClick={handleMinimize}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors duration-300"
                    title="Réduire"
                  >
                    <div className="w-4 h-0.5 bg-white rounded"></div>
                  </button> */}
                  <button
                    onClick={handleClose}
                    className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/30 transition-colors duration-300"
                    title="Fermer"
                  >
                    <X className="h-4 w-4" />
                  </button> 
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Minimized state - small floating button */}
      {isMinimized && !isAtFooter && (
        <button
          onClick={handleRestore}
          className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          title="Rechercher un artisan"
        >
          <Search className="h-6 w-6" />
        </button>
      )}

      {/* Reopening button when completely closed */}
      {!isVisible && !isAtFooter && (
        <button
          onClick={handleReopen}
          className="fixed bottom-4 right-4 z-40 bg-gradient-to-r from-orange-500 to-red-500 text-white p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110"
          title="Rechercher un artisan"
        >
          <Hammer className="h-5 w-5" />
        </button>
      )}
    </>
  );
};

export default StickySearchForm;