import { LOCAIS_SERVICOS_GRATUITOS } from './locais-servicos';

/**
 * Categorias derivadas dos locais cadastrados, ordenadas alfabeticamente.
 * Sempre sincronizado com os dados em locais-servicos.ts
 */
export const CATEGORIES = [
  ...new Set(LOCAIS_SERVICOS_GRATUITOS.map((l) => l.categoria)),
].sort((a, b) => a.localeCompare(b, 'pt-BR'));
