import seoTemplatesVendee from '../data/seoTemplatesVendee.json';
import { interpolateText } from './textUtils';

interface MetierData {
  nom: string;
  prix: string;
  unite_prix: string;
  services: string[];
  aides_disponibles: string[];
  [key: string]: any;
}

/**
 * Generates a unique SEO text for a trade page in Vendée
 * Uses a deterministic random selection based on trade name to ensure consistency
 * 
 * @param metier - Trade data from metiers.json
 * @returns Generated SEO text with interpolated variables
 */
export function generateSEOTextVendee(metier: MetierData): string {
  // Create a deterministic seed based on trade name
  // This ensures the same trade always gets the same template
  const seed = createSeed(metier.nom);
  
  // Select template based on seed
  const templateIndex = seed % seoTemplatesVendee.length;
  const selectedTemplate = seoTemplatesVendee[templateIndex];
  
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
    // Default departement data for Vendée
    departement: 'Vendée'
  };
  
  // Interpolate the template with actual data
  const generatedText = interpolateText(selectedTemplate.template, interpolationData);
  
  // Log for debugging
  console.log(`SEO Text Vendée generated for ${metier.nom} using template ${templateIndex + 1}`);
  
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
 * Gets the template ID that would be used for a given trade
 * Useful for debugging and testing
 * 
 * @param metier - Trade data
 * @returns Template ID (1-10)
 */
export function getTemplateIdVendee(metier: MetierData): number {
  const seed = createSeed(metier.nom);
  return (seed % seoTemplatesVendee.length) + 1;
}

/**
 * Validates that a generated SEO text meets the requirements
 * 
 * @param text - Generated SEO text
 * @returns Validation result with word count and structure info
 */
export function validateSEOTextVendee(text: string): {
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