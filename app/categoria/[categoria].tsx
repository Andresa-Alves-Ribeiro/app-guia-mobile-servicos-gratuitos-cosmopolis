import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';

import { HeroSection } from '@/components/hero-section';
import { LugarCard } from '@/components/lugar-card';
import { LugaresEmptyState } from '@/components/lugares-empty-state';
import { SearchBar } from '@/components/search-bar';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import type { LocalServicoGratuito } from '@/data/locais-servicos';
import { useLocaisCategoria } from '@/hooks/use-locais-categoria';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  const categoriaDecoded = categoria ? decodeURIComponent(categoria) : '';
  const { searchText, setSearchText, lugares, lugaresFiltrados, handleLigar } =
    useLocaisCategoria(categoriaDecoded);

  const subtitle =
    `${lugaresFiltrados.length} ${lugaresFiltrados.length === 1 ? 'local encontrado' : 'locais encontrados'}` +
    (searchText.length > 0 ? ` de ${lugares.length}` : '');

  const renderItem = ({ item }: { item: LocalServicoGratuito }) => (
    <LugarCard lugar={item} colors={colors} onLigar={handleLigar} />
  );

  const ListHeaderComponent = (
    <View style={styles.headerWrapper}>
      <HeroSection
        title={categoriaDecoded}
        subtitle={subtitle}
        colors={colors}
        showBackButton
        onBackPress={() => router.back()}
      />

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar por nome, endereço ou telefone..."
        colors={colors}
      />
    </View>
  );

  const ListEmptyComponent = (
    <View style={styles.emptyWrapper}>
      <LugaresEmptyState
        messageBusca="Nenhum local encontrado para sua busca."
        messagePadrao="Nenhum local encontrado nesta categoria."
        isSearchActive={searchText.length > 0}
        colors={colors}
      />
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={lugaresFiltrados}
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
  emptyWrapper: {
    paddingTop: 0,
    paddingBottom: 20,
  },
  separator: {
    height: 16,
  },
});
