import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import { HeroSection } from '@/components/hero-section';
import { LugarCard } from '@/components/lugar-card';
import { LugaresEmptyState } from '@/components/lugares-empty-state';
import { OrderChips } from '@/components/order-chips';
import { SearchBar } from '@/components/search-bar';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import type { LocalServicoGratuito } from '@/data/locais-servicos';
import { useLocaisExplore } from '@/hooks/use-locais-explore';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function ExploreScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const {
    searchText,
    setSearchText,
    ordenacao,
    setOrdenacao,
    locaisFiltrados,
    locaisOrdenados,
    handleLigar,
    handlePressCategoria,
  } = useLocaisExplore();

  const subtitle =
    `${locaisFiltrados.length} ${locaisFiltrados.length === 1 ? 'local encontrado' : 'locais encontrados'}` +
    (searchText.length > 0 ? ` de ${locaisOrdenados.length}` : '');

  const renderItem = ({ item }: { item: LocalServicoGratuito }) => (
    <LugarCard
      lugar={item}
      colors={colors}
      onLigar={handleLigar}
      showCategoria
      onPressCategoria={handlePressCategoria}
    />
  );

  const ListHeaderComponent = (
    <View style={styles.headerWrapper}>
      <HeroSection title="Locais" subtitle={subtitle} colors={colors} />

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar por nome, endereço ou categoria..."
        colors={colors}
      />

      <View style={[styles.filtrosWrapper, { backgroundColor: colors.background }]}>
        <ThemedText style={[styles.filtrosLabel, { color: colors.textSecondary }]}>
          Ordenar por:
        </ThemedText>
        <OrderChips ordenacao={ordenacao} onSelect={setOrdenacao} colors={colors} />
      </View>
    </View>
  );

  const ListEmptyComponent = (
    <View style={styles.emptyWrapper}>
      <LugaresEmptyState
        messageBusca="Nenhum local encontrado para sua busca."
        messagePadrao="Nenhum local cadastrado."
        isSearchActive={searchText.length > 0}
        colors={colors}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={locaisFiltrados}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.nome}-${item.endereco}`}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={ListEmptyComponent}
        contentContainerStyle={styles.listContent}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 0,
  },
  headerWrapper: {
    marginHorizontal: -20,
  },
  filtrosWrapper: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  filtrosLabel: {
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyWrapper: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
});
