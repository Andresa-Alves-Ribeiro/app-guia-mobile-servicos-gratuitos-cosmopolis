import { LOCAIS_SERVICOS_GRATUITOS } from '@/data/locais-servicos';
import type { LocalServicoGratuito } from '@/data/locais-servicos';
import { filtrarLocaisPorBusca } from '@/utils/filtros';
import { ordenarLocais, type Ordenacao } from '@/utils/ordenacao';

export function getLocais(): LocalServicoGratuito[] {
  return LOCAIS_SERVICOS_GRATUITOS;
}

export function getLocaisPorCategoria(categoria: string): LocalServicoGratuito[] {
  const categoriaLower = categoria.toLowerCase();
  return LOCAIS_SERVICOS_GRATUITOS.filter((l) => l.categoria.toLowerCase() === categoriaLower);
}

export function getLocaisOrdenados(ordenacao: Ordenacao): LocalServicoGratuito[] {
  return ordenarLocais(LOCAIS_SERVICOS_GRATUITOS, ordenacao);
}

export function getLocaisFiltrados(
  searchText: string,
  ordenacao: Ordenacao,
  incluirCategoriaNaBusca = true
): LocalServicoGratuito[] {
  const ordenados = getLocaisOrdenados(ordenacao);
  return filtrarLocaisPorBusca(ordenados, searchText, incluirCategoriaNaBusca);
}

export function getLocaisPorCategoriaFiltrados(
  categoria: string,
  searchText: string
): LocalServicoGratuito[] {
  const locais = getLocaisPorCategoria(categoria);
  return filtrarLocaisPorBusca(locais, searchText, false);
}
