/**
 * Utility function to interpolate variables in text templates
 * Supports nested object properties using dot notation
 * 
 * @param template - The text template with variables like {metier.nom} or {ville.nom}
 * @param data - Object containing the data to interpolate
 * @returns The interpolated text with variables replaced
 */
export function interpolateText(template: string, data: Record<string, any>): string {
  if (!template || typeof template !== 'string') {
    return template || '';
  }

  // Add default departement if not provided
  const enrichedData = {
    ...data,
    departement: data.departement || 'Vendée'
  };


  return template.replace(/\{([^}]+)\}/g, (match, path) => {
    // Split the path by dots to handle nested properties
    const keys = path.trim().split('.');
    let value = enrichedData;

    // Navigate through the object path
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        // If path doesn't exist, return empty string to avoid hydration errors
        return '';
      }
    }

    // If value is an object, try to extract common properties
    if (value && typeof value === 'object') {
      // Try common property names for objects
      if ('nom' in value && typeof value.nom === 'string') {
        return value.nom;
      }
      if ('name' in value && typeof value.name === 'string') {
        return value.name;
      }
      if ('fr' in value && typeof value.fr === 'string') {
        return value.fr;
      }
      
      // If it's an array, join it
      if (Array.isArray(value)) {
        return value.join(', ');
      }
      
      // For unhandled objects, return empty string to avoid hydration errors
      return '';
    }
    
    // Convert to string and return, ensuring no undefined/null values
    return value != null ? String(value) : '';
  });
}

/**
 * Utility function to safely get nested object properties
 * 
 * @param obj - The object to get the property from
 * @param path - The path to the property (e.g., 'user.profile.name')
 * @param defaultValue - Default value if property doesn't exist
 * @returns The property value or default value
 */
export function getNestedProperty(obj: any, path: string, defaultValue: any = undefined): any {
  if (!obj || !path) return defaultValue;
  
  const keys = path.split('.');
  let current = obj;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return defaultValue;
    }
  }
  
  return current !== undefined ? current : defaultValue;
}

/**
 * Utility function to format price with proper currency
 * 
 * @param price - The price string or number
 * @returns Formatted price string
 */
export function formatPrice(price: string | number): string {
  if (!price) return 'Sur devis';
  
  const priceStr = String(price);
  
  // If it already contains currency symbols, return as is
  if (priceStr.includes('€') || priceStr.includes('EUR')) {
    return priceStr;
  }
  
  // If it's a number, format it properly
  const numericPrice = parseFloat(priceStr.replace(/[^\d.,]/g, '').replace(',', '.'));
  if (!isNaN(numericPrice)) {
    return `${numericPrice.toLocaleString('fr-FR')} €`;
  }
  
  return priceStr;
}