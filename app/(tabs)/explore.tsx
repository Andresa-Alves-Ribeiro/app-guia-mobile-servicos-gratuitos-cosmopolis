import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { LOCAIS_SERVICOS_GRATUITOS } from '@/data/locais-servicos';
import { useColorScheme } from '@/hooks/use-color-scheme';

type Ordenacao = 'nome-az' | 'nome-za' | 'categoria' | 'endereco';

function normalizarEnderecoParaOrdenacao(endereco: string): string {
  return endereco
    .replace(/^(avenida|av\.?)\s+/i, '')
    .replace(/^(rua|r\.?)\s+/i, '')
    .trim();
}

const OPCOES_ORDENACAO: { value: Ordenacao; label: string }[] = [
  { value: 'nome-az', label: 'A-Z' },
  { value: 'nome-za', label: 'Z-A' },
  { value: 'categoria', label: 'Categoria' },
  { value: 'endereco', label: 'Endereço' },
];

export default function ExploreScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme];

  const [searchText, setSearchText] = useState('');
  const [ordenacao, setOrdenacao] = useState<Ordenacao>('nome-az');

  const locaisOrdenados = useMemo(() => {
    const base = [...LOCAIS_SERVICOS_GRATUITOS];
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
  }, [ordenacao]);

  const searchLower = searchText.toLowerCase().trim();
  const locaisFiltrados = useMemo(() => {
    if (!searchLower) return locaisOrdenados;
    return locaisOrdenados.filter(
      (l) =>
        l.nome.toLowerCase().includes(searchLower) ||
        l.endereco.toLowerCase().includes(searchLower) ||
        l.categoria.toLowerCase().includes(searchLower) ||
        l.telefone.includes(searchText.trim()) ||
        (l.email != null && l.email.toLowerCase().includes(searchLower))
    );
  }, [locaisOrdenados, searchLower, searchText]);

  const renderOrdenacaoChip = useCallback(
    (opcao: (typeof OPCOES_ORDENACAO)[0]) => {
      const isActive = ordenacao === opcao.value;
      return (
        <Pressable
          key={opcao.value}
          onPress={() => setOrdenacao(opcao.value)}
          style={[
            styles.chip,
            {
              backgroundColor: isActive ? colors.tint : colors.backgroundCard,
              borderColor: isActive ? colors.tint : colors.border,
            },
          ]}>
          <ThemedText
            style={[
              styles.chipText,
              { color: isActive ? '#fff' : colors.textSecondary },
            ]}>
            {opcao.label}
          </ThemedText>
        </Pressable>
      );
    },
    [ordenacao, colors]
  );

  const handleLigar = useCallback((tel: string) => {
    const numero = tel.replaceAll(/\D/g, '');
    Linking.openURL(`tel:${numero}`);
  }, []);

  const handlePressLocal = useCallback(
    (categoria: string) => {
      router.push(`/categoria/${encodeURIComponent(categoria)}`);
    },
    [router]
  );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: colors.tint, paddingTop: insets.top + 16 }]}>
          <ThemedText lightColor="#fff" darkColor="#fff" style={styles.heroTitle}>
            Locais
          </ThemedText>
          <ThemedText
            lightColor="rgba(255,255,255,0.9)"
            darkColor="rgba(255,255,255,0.9)"
            style={styles.heroDesc}>
            {locaisFiltrados.length}{' '}
            {locaisFiltrados.length === 1 ? 'local encontrado' : 'locais encontrados'}
            {searchText.length > 0 && ` de ${locaisOrdenados.length}`}
          </ThemedText>
        </View>

        <View style={[styles.searchWrapper, { backgroundColor: colors.background }]}>
          <View style={[styles.searchBar, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar por nome, endereço ou categoria..."
              placeholderTextColor={colors.textSecondary}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 ? (
              <Pressable onPress={() => setSearchText('')} hitSlop={12}>
                <ThemedText style={{ color: colors.textSecondary, fontSize: 14 }}>Limpar</ThemedText>
              </Pressable>
            ) : null}
          </View>
        </View>

        <View style={[styles.filtrosWrapper, { backgroundColor: colors.background }]}>
          <ThemedText style={[styles.filtrosLabel, { color: colors.textSecondary }]}>
            Ordenar por:
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chipsContainer}
            style={styles.chipsScroll}>
            {OPCOES_ORDENACAO.map(renderOrdenacaoChip)}
          </ScrollView>
        </View>

        <View style={[styles.lugaresWrapper, { backgroundColor: colors.background }]}>
          <View style={styles.lugaresList}>
            {locaisFiltrados.length === 0 ? (
              <View
                style={[
                  styles.lugarCard,
                  { backgroundColor: colors.backgroundCard, borderColor: colors.border },
                ]}>
                <IconSymbol name="map" size={40} color={colors.textSecondary} />
                <ThemedText
                  style={[styles.emptyText, { color: colors.textSecondary }]}
                  numberOfLines={2}>
                  {searchText.length > 0
                    ? 'Nenhum local encontrado para sua busca.'
                    : 'Nenhum local cadastrado.'}
                </ThemedText>
              </View>
            ) : (
              locaisFiltrados.map((lugar) => (
                <Pressable
                  key={lugar.nome + lugar.endereco}
                  onPress={() => handlePressLocal(lugar.categoria)}
                  style={({ pressed }) => [
                    styles.lugarCard,
                    { backgroundColor: colors.backgroundCard, borderColor: colors.border },
                    pressed && styles.lugarPressed,
                  ]}>
                  <View style={styles.lugarHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.lugarNome} numberOfLines={2}>
                      {lugar.nome}
                    </ThemedText>
                    {lugar.telefone ? (
                      <Pressable
                        onPress={(e) => {
                          e.stopPropagation();
                          handleLigar(lugar.telefone);
                        }}
                        style={[styles.phoneButton, { backgroundColor: colors.accentMuted }]}>
                        <IconSymbol name="phone.fill" size={16} color={colors.tint} />
                        <ThemedText style={[styles.phoneText, { color: colors.tint }]}>
                          Ligar
                        </ThemedText>
                      </Pressable>
                    ) : null}
                  </View>

                  <Pressable
                    onPress={() => handlePressLocal(lugar.categoria)}
                    style={styles.categoriaBadge}>
                    <ThemedText style={[styles.categoriaText, { color: colors.tint }]}>
                      {lugar.categoria}
                    </ThemedText>
                  </Pressable>

                  <View style={[styles.infoRow, { borderLeftColor: colors.tint }]}>
                    <IconSymbol name="mappin.circle.fill" size={18} color={colors.textSecondary} />
                    <ThemedText
                      style={[styles.infoText, { color: colors.textSecondary }]}
                      numberOfLines={2}>
                      {lugar.endereco}
                    </ThemedText>
                  </View>

                  {lugar.horarios && lugar.horarios.length > 0 ? (
                    <View style={[styles.infoRow, { borderLeftColor: colors.tint }]}>
                      <IconSymbol name="clock.fill" size={18} color={colors.textSecondary} />
                      <ThemedText
                        style={[styles.infoText, { color: colors.textSecondary }]}
                        numberOfLines={1}>
                        {lugar.horarios.join(' | ')}
                      </ThemedText>
                    </View>
                  ) : null}

                  {lugar.telefone ? (
                    <View style={[styles.infoRow, { borderLeftColor: colors.tint }]}>
                      <IconSymbol name="phone.fill" size={18} color={colors.textSecondary} />
                      <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>
                        {lugar.telefone}
                      </ThemedText>
                    </View>
                  ) : null}
                </Pressable>
              ))
            )}
          </View>
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
    position: 'relative',
  },
  heroTitle: {
    fontSize: 26,
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
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 0,
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
  chipsScroll: {
    width: '100%',
    marginHorizontal: 0,
  },
  chipsContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
  },
  lugaresWrapper: {
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  lugaresList: {
    gap: 16,
  },
  lugarCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  lugarPressed: {
    opacity: 0.95,
  },
  lugarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  lugarNome: {
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
  },
  categoriaBadge: {
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  categoriaText: {
    fontSize: 12,
    fontWeight: '600',
  },
  phoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  phoneText: {
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingLeft: 16,
    borderLeftWidth: 3,
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  bottomSpacer: {
    height: 24,
  },
});
