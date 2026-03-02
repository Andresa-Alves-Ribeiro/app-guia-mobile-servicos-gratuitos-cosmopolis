import type { LocalServicoGratuito } from '@/data/locais-servicos';

export function filtrarLocaisPorBusca(
  locais: LocalServicoGratuito[],
  searchText: string,
  incluirCategoria = false
): LocalServicoGratuito[] {
  const searchLower = searchText.toLowerCase().trim();
  if (!searchLower) return locais;

  return locais.filter(
    (l) =>
      l.nome.toLowerCase().includes(searchLower) ||
      l.endereco.toLowerCase().includes(searchLower) ||
      l.telefone.includes(searchText.trim()) ||
      (l.email != null && l.email.toLowerCase().includes(searchLower)) ||
      (incluirCategoria && l.categoria.toLowerCase().includes(searchLower))
  );
}
