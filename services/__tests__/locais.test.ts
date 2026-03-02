import {
  getLocais,
  getLocaisPorCategoria,
  getLocaisOrdenados,
  getLocaisFiltrados,
  getLocaisPorCategoriaFiltrados,
} from '../locais';

describe('locais service', () => {
  describe('getLocais', () => {
    it('retorna array de locais', () => {
      const locais = getLocais();
      expect(Array.isArray(locais)).toBe(true);
      expect(locais.length).toBeGreaterThan(0);
    });

    it('cada local tem nome, endereco, categoria e telefone', () => {
      const locais = getLocais();
      locais.forEach((local) => {
        expect(local).toHaveProperty('nome');
        expect(local).toHaveProperty('endereco');
        expect(local).toHaveProperty('categoria');
        expect(local).toHaveProperty('telefone');
      });
    });
  });

  describe('getLocaisPorCategoria', () => {
    it('retorna locais da categoria Saúde', () => {
      const locais = getLocaisPorCategoria('Saúde');
      expect(locais.length).toBeGreaterThan(0);
      locais.forEach((l) => expect(l.categoria).toBe('Saúde'));
    });

    it('é case insensitive', () => {
      const locais1 = getLocaisPorCategoria('saúde');
      const locais2 = getLocaisPorCategoria('Saúde');
      expect(locais1).toEqual(locais2);
    });

    it('retorna array vazio para categoria inexistente', () => {
      const locais = getLocaisPorCategoria('CategoriaQueNãoExiste');
      expect(locais).toHaveLength(0);
    });
  });

  describe('getLocaisOrdenados', () => {
    it('ordena por nome-az', () => {
      const locais = getLocaisOrdenados('nome-az');
      for (let i = 1; i < locais.length; i++) {
        expect(locais[i].nome.localeCompare(locais[i - 1].nome, 'pt-BR')).toBeGreaterThanOrEqual(0);
      }
    });

    it('ordena por nome-za', () => {
      const locais = getLocaisOrdenados('nome-za');
      for (let i = 1; i < locais.length; i++) {
        expect(locais[i].nome.localeCompare(locais[i - 1].nome, 'pt-BR')).toBeLessThanOrEqual(0);
      }
    });
  });

  describe('getLocaisFiltrados', () => {
    it('retorna todos quando busca vazia', () => {
      const filtrados = getLocaisFiltrados('', 'nome-az');
      const todos = getLocais();
      expect(filtrados).toHaveLength(todos.length);
    });

    it('filtra por texto de busca', () => {
      const filtrados = getLocaisFiltrados('Delegacia', 'nome-az');
      expect(filtrados.length).toBeLessThanOrEqual(getLocais().length);
      filtrados.forEach((l) =>
        expect(
          l.nome.toLowerCase().includes('delegacia') ||
            l.endereco.toLowerCase().includes('delegacia') ||
            l.categoria.toLowerCase().includes('delegacia')
        ).toBe(true)
      );
    });
  });

  describe('getLocaisPorCategoriaFiltrados', () => {
    it('retorna locais da categoria quando busca vazia', () => {
      const filtrados = getLocaisPorCategoriaFiltrados('Saúde', '');
      const porCategoria = getLocaisPorCategoria('Saúde');
      expect(filtrados).toEqual(porCategoria);
    });

    it('filtra dentro da categoria', () => {
      const filtrados = getLocaisPorCategoriaFiltrados('Saúde', 'UBS');
      filtrados.forEach((l) => {
        expect(l.categoria).toBe('Saúde');
        expect(
          l.nome.toLowerCase().includes('ubs') || l.endereco.toLowerCase().includes('ubs')
        ).toBe(true);
      });
    });
  });
});
