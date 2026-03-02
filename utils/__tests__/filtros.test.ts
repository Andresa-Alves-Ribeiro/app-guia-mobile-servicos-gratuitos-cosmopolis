import {
  filtrarLocaisPorBusca,
} from '../filtros';
import type { LocalServicoGratuito } from '@/data/locais-servicos';

const locaisMock: LocalServicoGratuito[] = [
  {
    nome: 'Delegacia de Polícia',
    endereco: 'Avenida Marginal, 995 - Vila Guilhermina',
    horarios: ['08:00 - 18:00'],
    categoria: 'Segurança',
    telefone: '(19) 3872-1866',
  },
  {
    nome: 'CRAS Novo Cosmópolis',
    endereco: 'Avenida da Saudade, 3215',
    categoria: 'Assistência Social',
    telefone: '(19) 3812-3867',
  },
  {
    nome: 'Farmácia Municipal',
    endereco: 'Avenida da Saudade, 1121',
    categoria: 'Saúde',
    telefone: '(19) 3872-3091',
    email: 'farmacia@exemplo.gov.br',
  },
];

describe('filtrarLocaisPorBusca', () => {
  it('retorna todos os locais quando busca está vazia', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, '');
    expect(resultado).toHaveLength(3);
  });

  it('retorna todos os locais quando busca tem apenas espaços', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, '   ');
    expect(resultado).toHaveLength(3);
  });

  it('filtra por nome (case insensitive)', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, 'delegacia');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe('Delegacia de Polícia');
  });

  it('filtra por endereço', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, 'Avenida da Saudade');
    expect(resultado).toHaveLength(2);
  });

  it('filtra por telefone', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, '3872-3091');
    expect(resultado).toHaveLength(1);
    expect(resultado[0].nome).toBe('Farmácia Municipal');
  });

  it('filtra por email quando incluirCategoria é false', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, 'farmacia@exemplo', false);
    expect(resultado).toHaveLength(1);
  });

  it('inclui categoria na busca quando incluirCategoria é true', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, 'Saúde', true);
    expect(resultado).toHaveLength(1);
    expect(resultado[0].categoria).toBe('Saúde');
  });

  it('retorna array vazio quando nenhum local corresponde', () => {
    const resultado = filtrarLocaisPorBusca(locaisMock, 'xyznonexistente');
    expect(resultado).toHaveLength(0);
  });
});
