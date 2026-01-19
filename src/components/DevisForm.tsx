import React, { useEffect } from 'react';

interface DevisFormProps {
  className?: string;
  isHomepage?: boolean;
  initialSearchQuery?: string;
}

const DevisForm: React.FC<DevisFormProps> = ({ className = '', isHomepage = false, initialSearchQuery = '' }) => {
  useEffect(() => {
    // Configuration du formulaire unique pour toutes les pages
    (window as any).vud_partenaire_id = '2032';
    (window as any).vud_categorie_id = '0';
    
    // Création et injection du script
    const vud_js = document.createElement('script');
    vud_js.type = 'text/javascript';
    vud_js.src = `//www.viteundevis.com/9ce28b1744/${(window as any).vud_partenaire_id}/${(window as any).vud_categorie_id}/`;
    
    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(vud_js, firstScript);
    }

    // Cleanup function pour éviter les doublons
    return () => {
      const existingScript = document.querySelector(`script[src*="viteundevis.com"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []); // Suppression de la dépendance isHomepage car on utilise le même iframe partout

  return (
    <div className={`bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {initialSearchQuery ? `Devis gratuit pour : ${initialSearchQuery}` : 'Demandez votre devis gratuit'}
        </h3>
        <p className="text-gray-600">
          {initialSearchQuery 
            ? `Remplissez le formulaire pour obtenir des devis d'artisans spécialisés en ${initialSearchQuery.toLowerCase()}`
            : 'Remplissez le formulaire ci-dessous et recevez jusqu\'à 3 devis d\'artisans qualifiés'
          }
        </p>
      </div>
      
      {/* Container pour l'iframe - utilisation du même ID partout */}
      <div id="v9ce28b1744d" className="min-h-[400px]"></div>
      
      <div className="mt-6 text-center">
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            100% gratuit
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Sans engagement
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
            Réponse rapide
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 italic">
          Si le formulaire de devis n'apparaît pas, actualisez la page
        </div>
      </div>
    </div>
  );
};

export default DevisForm;