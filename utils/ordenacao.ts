import type { LocalServicoGratuito } from '@/data/locais-servicos';

export type Ordenacao = 'nome-az' | 'nome-za' | 'categoria' | 'endereco';

export const OPCOES_ORDENACAO: { value: Ordenacao; label: string }[] = [
  { value: 'nome-az', label: 'A-Z' },
  { value: 'nome-za', label: 'Z-A' },
  { value: 'categoria', label: 'Categoria' },
  { value: 'endereco', label: 'Endereço' },
];

export function normalizarEnderecoParaOrdenacao(endereco: string): string {
  return endereco
    .replace(/^(avenida|av\.?)\s+/i, '')
    .replace(/^(rua|r\.?)\s+/i, '')
    .trim();
}

export function ordenarLocais(locais: LocalServicoGratuito[], ordenacao: Ordenacao): LocalServicoGratuito[] {
  const base = [...locais];
  switch (ordenacao) {
    case 'nome-az':
      return base.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    case 'nome-za':
      return base.sort((a, b) => b.nome.localeCompare(a.nome, 'pt-BR'));
    case 'categoria':
      return base.sort((a, b) => {
        const cat = a.categoria.localeCompare(b.categoria, 'pt-BR');
        return cat === 0 ? a.nome.localeCompare(b.nome, 'pt-BR') : cat;
      });
    case 'endereco':
      return base.sort((a, b) =>
        normalizarEnderecoParaOrdenacao(a.endereco).localeCompare(
          normalizarEnderecoParaOrdenacao(b.endereco),
          'pt-BR'
        )
      );
    default:
      return base.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
  }
}
