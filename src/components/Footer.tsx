import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Hammer, 
  Mail, 
  MapPin, 
  Phone, 
  Shield, 
  FileText, 
  Star, 
  Clock,
  CheckCircle,
  Users,
  Award,
  BookOpen
} from 'lucide-react';
import ClientOnly from './ClientOnly';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-xl mr-4">
                <Hammer className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                  Quel Artisan 85
                </h3>
                <p className="text-gray-400 text-sm">Artisans fiables en Vendée</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-6">
              Votre partenaire de confiance pour trouver des artisans qualifiés et vérifiés 
              dans toute la Vendée. Service gratuit et sans engagement.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-green-900/50 text-green-300 px-3 py-2 rounded-full text-sm">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>100% gratuit</span>
              </div>
              <div className="flex items-center bg-blue-900/50 text-blue-300 px-3 py-2 rounded-full text-sm">
                <Shield className="h-4 w-4 mr-2" />
                <span>Artisans vérifiés</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <Star className="h-5 w-5 mr-2 text-orange-400" />
              Nos services
            </h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/devis" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                  Demande de devis gratuit
                </Link>
              </li>
              <li>
                <Link 
                  to="/charte" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                  Notre charte qualité
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-300 hover:text-orange-400 transition-colors duration-300 flex items-center group"
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                  Blog et conseils
                </Link>
              </li>
              <li>
                <span className="text-gray-300 flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Mise en relation rapide
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Artisans certifiés
                </span>
              </li>
              <li>
                <span className="text-gray-300 flex items-center">
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  Suivi personnalisé
                </span>
              </li>
            </ul>
          </div>

          {/* Zone d'intervention */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-orange-400" />
              Zone d'intervention
            </h4>
            <ul className="space-y-3">
              <li className="text-gray-300 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Toute la Vendée (85)
              </li>
              <li className="text-gray-300 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                La Roche-sur-Yon
              </li>
              <li className="text-gray-300 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Les Sables-d'Olonne
              </li>
              <li className="text-gray-300 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Challans
              </li>
              <li className="text-gray-300 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Fontenay-le-Comte
              </li>
              <li className="text-gray-300 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Et toutes les communes
              </li>
            </ul>
          </div>

          {/* Contact & Stats */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 flex items-center">
              <Users className="h-5 w-5 mr-2 text-orange-400" />
              Contact & Chiffres
            </h4>
            
            {/* Contact */}
            <div className="mb-6">
              <div className="flex items-center text-gray-300 mb-3">
                <Mail className="h-4 w-4 mr-3 text-orange-400" />
                <a 
                  href="mailto:contact@margouillapp.re" 
                  className="hover:text-orange-400 transition-colors duration-300"
                >
                  contact@margouillapp.re
                </a>
              </div>
              <div className="flex items-center text-gray-300">
                <Clock className="h-4 w-4 mr-3 text-orange-400" />
                <span>Réponse sous 24h</span>
              </div>
            </div>

            {/* Stats */}
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded-lg p-3 border border-orange-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-orange-300 text-sm font-medium">Artisans partenaires</span>
                  <span className="text-orange-100 font-bold">500+</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 rounded-lg p-3 border border-blue-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-blue-300 text-sm font-medium">Clients satisfaits</span>
                  <span className="text-blue-100 font-bold">2000+</span>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-lg p-3 border border-green-800/30">
                <div className="flex items-center justify-between">
                  <span className="text-green-300 text-sm font-medium">Devis traités</span>
                  <span className="text-green-100 font-bold">5000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-white mb-2">
                Prêt à démarrer vos travaux ?
              </h3>
              <p className="text-orange-100">
                Obtenez votre devis gratuit en 2 minutes chrono !
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/devis"
                className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <FileText className="h-5 w-5 mr-3" />
                Devis gratuit
              </Link>
              <Link 
                to="/charte"
                className="bg-orange-500/20 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-2xl font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
              >
                <Award className="h-5 w-5 mr-3" />
                Notre charte
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Copyright */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © <ClientOnly fallback="2025">{currentYear}</ClientOnly> Quel Artisan 85. Tous droits réservés.
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <Link 
                to="/mentions-legales" 
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center"
              >
                <FileText className="h-4 w-4 mr-2" />
                Mentions légales
              </Link>
              <Link 
                to="/politique-confidentialite" 
                className="text-gray-400 hover:text-orange-400 transition-colors duration-300 flex items-center"
              >
                <Shield className="h-4 w-4 mr-2" />
                Confidentialité
              </Link>
              <div className="flex items-center text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-xs">Service actif</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;