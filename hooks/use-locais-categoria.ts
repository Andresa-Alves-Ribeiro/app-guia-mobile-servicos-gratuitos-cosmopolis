import { useCallback, useMemo, useState } from 'react';

import { getLocaisPorCategoriaFiltrados } from '@/services/locais';
import { abrirLigacao } from '@/utils/telefone';

export function useLocaisCategoria(categoriaDecoded: string) {
  const [searchText, setSearchText] = useState('');

  const lugares = useMemo(
    () => getLocaisPorCategoriaFiltrados(categoriaDecoded, ''),
    [categoriaDecoded]
  );

  const lugaresFiltrados = useMemo(
    () => getLocaisPorCategoriaFiltrados(categoriaDecoded, searchText),
    [categoriaDecoded, searchText]
  );

  const handleLigar = useCallback((tel: string) => {
    abrirLigacao(tel);
  }, []);

  return {
    searchText,
    setSearchText,
    lugares,
    lugaresFiltrados,
    handleLigar,
  };
}
