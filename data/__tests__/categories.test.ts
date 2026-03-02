import { LOCAIS_SERVICOS_GRATUITOS } from '../locais-servicos';
import { CATEGORIES } from '../categories';

describe('CATEGORIES', () => {
  it('contém apenas categorias únicas', () => {
    const unicas = [...new Set(CATEGORIES)];
    expect(CATEGORIES).toEqual(unicas);
  });

  it('deriva das categorias dos locais', () => {
    const categoriasDosLocais = [...new Set(LOCAIS_SERVICOS_GRATUITOS.map((l) => l.categoria))];
    const categoriasEsperadas = categoriasDosLocais.sort((a, b) =>
      a.localeCompare(b, 'pt-BR')
    );

    expect(CATEGORIES).toEqual(categoriasEsperadas);
  });

  it('está ordenada alfabeticamente em pt-BR', () => {
    for (let i = 1; i < CATEGORIES.length; i++) {
      expect(CATEGORIES[i].localeCompare(CATEGORIES[i - 1], 'pt-BR')).toBeGreaterThanOrEqual(0);
    }
  });

  it('não está vazia', () => {
    expect(CATEGORIES.length).toBeGreaterThan(0);
  });

  it('cada categoria existe em pelo menos um local', () => {
    const categoriasDosLocais = new Set(LOCAIS_SERVICOS_GRATUITOS.map((l) => l.categoria));

    CATEGORIES.forEach((cat) => {
      expect(categoriasDosLocais.has(cat)).toBe(true);
    });
  });
});
