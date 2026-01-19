import seoTemplates from '../data/seoTemplates.json';
import { interpolateText } from './textUtils';

interface MetierData {
  nom: string;
  prix: string;
  unite_prix: string;
  services: string[];
  aides_disponibles: string[];
  [key: string]: any;
}

interface VilleData {
  nom: string;
  code_postal: string;
  departement: string;
  population?: string;
  zone_desservie?: string;
  [key: string]: any;
}

/**
 * Generates a unique SEO text for a trade + city page
 * Uses a deterministic random selection based on trade and city to ensure consistency
 * 
 * @param metier - Trade data from metiers.json
 * @param ville - City data from villes.json
 * @returns Generated SEO text with interpolated variables
 */
export function generateSEOText(metier: MetierData, ville: VilleData): string {
  // Create a deterministic seed based on trade and city names
  // This ensures the same combination always gets the same template
  const seed = createSeed(metier.nom + ville.nom);
  
  // Select template based on seed
  const templateIndex = seed % seoTemplates.length;
  const selectedTemplate = seoTemplates[templateIndex];
  
  // Prepare data for interpolation
  const interpolationData = {
    metier: {
      nom: metier.nom,
      prix: metier.prix,
      unite_prix: metier.unite_prix,
      services: metier.services || [],
      aides_disponibles: metier.aides_disponibles || [],
      ...metier
    },
    ville: {
      nom: ville.nom,
      code_postal: ville.code_postal,
      departement: ville.departement || 'Vendée',
      population: ville.population || '',
      zone_desservie: ville.zone_desservie || '',
      ...ville
    },
    // Direct access variables for convenience
    code_postal: ville.code_postal,
    departement: ville.departement || 'Vendée'
  };
  
  // Interpolate the template with actual data
  const generatedText = interpolateText(selectedTemplate.template, interpolationData);
  
  // Log for debugging
  console.log(`SEO Text generated for ${metier.nom} + ${ville.nom} using template ${templateIndex + 1}`);
  
  return generatedText;
}

/**
 * Creates a deterministic seed from a string
 * Same input will always produce the same output
 * 
 * @param str - Input string
 * @returns Numeric seed
 */
function createSeed(str: string): number {
  let hash = 0;
  if (str.length === 0) return hash;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash);
}

/**
 * Gets the template ID that would be used for a given trade + city combination
 * Useful for debugging and testing
 * 
 * @param metier - Trade data
 * @param ville - City data
 * @returns Template ID (1-10)
 */
export function getTemplateId(metier: MetierData, ville: VilleData): number {
  const seed = createSeed(metier.nom + ville.nom);
  return (seed % seoTemplates.length) + 1;
}

/**
 * Validates that a generated SEO text meets the requirements
 * 
 * @param text - Generated SEO text
 * @returns Validation result with word count and structure info
 */
export function validateSEOText(text: string): {
  isValid: boolean;
  wordCount: number;
  hasH2: boolean;
  hasH3: boolean;
  paragraphCount: number;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Count words (excluding HTML tags)
  const textContent = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const wordCount = textContent.split(' ').length;
  
  // Check word count
  if (wordCount < 300) {
    issues.push(`Word count too low: ${wordCount} (minimum 300)`);
  }
  if (wordCount > 400) {
    issues.push(`Word count too high: ${wordCount} (maximum 400)`);
  }
  
  // Check structure
  const hasH2 = /<h2[^>]*>/.test(text);
  const hasH3 = /<h3[^>]*>/.test(text);
  const paragraphCount = (text.match(/<p[^>]*>/g) || []).length;
  
  if (!hasH2) {
    issues.push('Missing H2 title');
  }
  if (!hasH3) {
    issues.push('Missing H3 subtitles');
  }
  if (paragraphCount < 4) {
    issues.push(`Not enough paragraphs: ${paragraphCount} (minimum 4)`);
  }
  
  return {
    isValid: issues.length === 0,
    wordCount,
    hasH2,
    hasH3,
    paragraphCount,
    issues
  };
}