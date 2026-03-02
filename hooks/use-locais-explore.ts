import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';

import { getLocaisFiltrados } from '@/services/locais';
import { abrirLigacao } from '@/utils/telefone';
import type { Ordenacao } from '@/utils/ordenacao';

export function useLocaisExplore() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('nome-az');

  const locaisOrdenados = useMemo(() => getLocaisFiltrados('', ordenacao), [ordenacao]);

  const locaisFiltrados = useMemo(
    () => getLocaisFiltrados(searchText, ordenacao),
    [searchText, ordenacao]
  );

  const handleLigar = useCallback((tel: string) => {
    abrirLigacao(tel);
  }, []);

  const handlePressCategoria = useCallback(
    (categoria: string) => {
      router.push(`/categoria/${encodeURIComponent(categoria)}`);
    },
    [router]
  );

  return {
    searchText,
    setSearchText,
    ordenacao,
    setOrdenacao,
    locaisFiltrados,
    locaisOrdenados,
    handleLigar,
    handlePressCategoria,
  };
}
