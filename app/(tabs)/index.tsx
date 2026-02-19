import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { CATEGORIES } from '@/data/categories';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

type IconName = 'leaf.fill' | 'trash.fill' | 'chevron.right' | 'chevron.left.forwardslash.chevron.right';
const CATEGORY_ICONS: Record<string, IconName> = {
  Saúde: 'leaf.fill',
  Educação: 'chevron.left.forwardslash.chevron.right',
  Cultura: 'chevron.left.forwardslash.chevron.right',
  Esporte: 'chevron.left.forwardslash.chevron.right',
  Lazer: 'leaf.fill',
  'Assistência Social': 'leaf.fill',
  Segurança: 'chevron.left.forwardslash.chevron.right',
  'Meio Ambiente': 'leaf.fill',
  Transporte: 'chevron.right',
  Comércio: 'chevron.right',
  Indústria: 'chevron.right',
  'Serviços Públicos': 'chevron.left.forwardslash.chevron.right',
  Outros: 'trash.fill',
};

// Fallback para ícones não mapeados
const getCategoryIcon = (category: string) => CATEGORY_ICONS[category] || 'trash.fill';

export default function HomeScreen() {
  const [searchText, setSearchText] = useState('');
  const colorScheme = useColorScheme() ?? 'light';
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme];

  const cardWidth = (width - 48) / 2 - 8; // 2 colunas com padding
  const filteredCategories = CATEGORIES.filter((cat) =>
    cat.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderCategoryCard = useCallback(
    (category: string) => (
      <Pressable
        key={category}
        style={({ pressed }) => [
          styles.categoryCard,
          {
            width: cardWidth,
            backgroundColor: colors.backgroundCard,
            borderColor: colors.border,
          },
          pressed && styles.categoryPressed,
        ]}>
        <View style={[styles.categoryIconWrapper, { backgroundColor: colors.accentMuted }]}>
          <IconSymbol
            name={getCategoryIcon(category)}
            size={24}
            color={colors.tint}
            style={styles.categoryIcon}
          />
        </View>
        <ThemedText
          type="defaultSemiBold"
          numberOfLines={2}
          style={[styles.categoryLabel, { color: colors.text }]}>
          {category}
        </ThemedText>
      </Pressable>
    ),
    [cardWidth, colors]
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header Hero */}
        <View style={[styles.hero, { backgroundColor: colors.tint, paddingTop: insets.top + 16 }]}>
          <ThemedText lightColor="#fff" darkColor="#fff" type="subtitle" style={styles.heroSubtitle}>
            Guia de Serviços
          </ThemedText>
          <ThemedText lightColor="#fff" darkColor="#fff" style={styles.heroTitle}>
            Cosmópolis
          </ThemedText>
          <ThemedText
            lightColor="rgba(255,255,255,0.9)"
            darkColor="rgba(255,255,255,0.9)"
            style={styles.heroDesc}>
            Encontre os serviços que você precisa
          </ThemedText>
        </View>

        {/* Search Bar */}
        <View style={[styles.searchWrapper, { backgroundColor: colors.background }]}>
          <View style={[styles.searchBar, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar categoria..."
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <Pressable onPress={() => setSearchText('')} hitSlop={12}>
                <ThemedText style={{ color: colors.textSecondary, fontSize: 14 }}>Limpar</ThemedText>
              </Pressable>
            )}
          </View>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <ThemedText type="title" style={styles.sectionTitle}>
            Categorias
          </ThemedText>
          <ThemedText style={[styles.sectionCount, { color: colors.textSecondary }]}>
            {filteredCategories.length} serviços
          </ThemedText>
        </View>

        {/* Category Grid */}
        <View style={styles.categoryGrid}>
          {filteredCategories.map(renderCategoryCard)}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  hero: {
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  heroSubtitle: {
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    opacity: 0.9,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  heroDesc: {
    fontSize: 15,
    fontWeight: '400',
  },
  searchWrapper: {
    paddingHorizontal: 20,
    marginTop: -16,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 15,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  sectionCount: {
    fontSize: 14,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    minHeight: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  categoryPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  categoryIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  categoryIcon: {},
  categoryLabel: {
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 24,
  },
});
