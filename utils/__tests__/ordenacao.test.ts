import {
  normalizarEnderecoParaOrdenacao,
  ordenarLocais,
  OPCOES_ORDENACAO,
} from '../ordenacao';
import type { LocalServicoGratuito } from '@/data/locais-servicos';

const locaisMock: LocalServicoGratuito[] = [
  { nome: 'Zoo', endereco: 'Rua B', categoria: 'Saúde', telefone: '111' },
  { nome: 'Alpha', endereco: 'Avenida A', categoria: 'Educação', telefone: '222' },
  { nome: 'Beta', endereco: 'Rua A', categoria: 'Saúde', telefone: '333' },
];

describe('normalizarEnderecoParaOrdenacao', () => {
  it('remove prefixo "Avenida" do endereço', () => {
    expect(normalizarEnderecoParaOrdenacao('Avenida Brasil, 100')).toBe('Brasil, 100');
  });

  it('remove prefixo "Av." do endereço', () => {
    expect(normalizarEnderecoParaOrdenacao('Av. Central, 50')).toBe('Central, 50');
  });

  it('remove prefixo "Rua" do endereço', () => {
    expect(normalizarEnderecoParaOrdenacao('Rua das Flores')).toBe('das Flores');
  });

  it('remove prefixo "r." do endereço', () => {
    expect(normalizarEnderecoParaOrdenacao('r. Principal')).toBe('Principal');
  });
});

describe('ordenarLocais', () => {
  it('ordena por nome A-Z', () => {
    const resultado = ordenarLocais(locaisMock, 'nome-az');
    expect(resultado[0].nome).toBe('Alpha');
    expect(resultado[1].nome).toBe('Beta');
    expect(resultado[2].nome).toBe('Zoo');
  });

  it('ordena por nome Z-A', () => {
    const resultado = ordenarLocais(locaisMock, 'nome-za');
    expect(resultado[0].nome).toBe('Zoo');
    expect(resultado[1].nome).toBe('Beta');
    expect(resultado[2].nome).toBe('Alpha');
  });

  it('ordena por categoria', () => {
    const resultado = ordenarLocais(locaisMock, 'categoria');
    expect(resultado[0].categoria).toBe('Educação');
    expect(resultado[1].categoria).toBe('Saúde');
    expect(resultado[2].categoria).toBe('Saúde');
  });

  it('ordena por endereço (normalizado)', () => {
    const resultado = ordenarLocais(locaisMock, 'endereco');
    expect(resultado[0].endereco).toBe('Avenida A');
    expect(resultado[1].endereco).toBe('Rua A');
    expect(resultado[2].endereco).toBe('Rua B');
  });

  it('não muta o array original', () => {
    const copia = [...locaisMock];
    ordenarLocais(locaisMock, 'nome-az');
    expect(locaisMock).toEqual(copia);
  });

  it('usa ordenação nome-az no caso default (valor inesperado)', () => {
    const resultado = ordenarLocais(locaisMock, 'qualquer' as never);
    expect(resultado[0].nome).toBe('Alpha');
    expect(resultado[1].nome).toBe('Beta');
    expect(resultado[2].nome).toBe('Zoo');
  });
});

describe('OPCOES_ORDENACAO', () => {
  it('contém 4 opções', () => {
    expect(OPCOES_ORDENACAO).toHaveLength(4);
  });

  it('tem value e label para cada opção', () => {
    OPCOES_ORDENACAO.forEach((opcao) => {
      expect(opcao).toHaveProperty('value');
      expect(opcao).toHaveProperty('label');
      expect(typeof opcao.label).toBe('string');
    });
  });
});
