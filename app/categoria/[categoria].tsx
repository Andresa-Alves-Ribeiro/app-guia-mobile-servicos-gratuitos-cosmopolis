import { useLocalSearchParams, useRouter } from 'expo-router';
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

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme];

  const [searchText, setSearchText] = useState('');
  const categoriaDecoded = categoria ? decodeURIComponent(categoria) : '';
  const lugares = LOCAIS_SERVICOS_GRATUITOS.filter(
    (l) => l.categoria.toLowerCase() === categoriaDecoded.toLowerCase()
  );
  const searchLower = searchText.toLowerCase().trim();
  const lugaresFiltrados = useMemo(() => {
    if (!searchLower) return lugares;
    return lugares.filter(
      (l) =>
        l.nome.toLowerCase().includes(searchLower) ||
        l.endereco.toLowerCase().includes(searchLower) ||
        l.telefone.includes(searchText.trim()) ||
        (l.email != null && l.email.toLowerCase().includes(searchLower))
    );
  }, [lugares, searchLower, searchText]);

  const handleLigar = useCallback((tel: string) => {
    const numero = tel.replaceAll(/\D/g, '');
    Linking.openURL(`tel:${numero}`);
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.hero, { backgroundColor: colors.tint, paddingTop: insets.top + 16 }]}>
          <View style={styles.heroHeader}>
            <Pressable onPress={() => router.back()} hitSlop={12} style={styles.backButton}>
              <IconSymbol name="chevron.left" size={24} color="#fff" />
            </Pressable>
            <ThemedText lightColor="#fff" darkColor="#fff" style={styles.heroTitle}>
              {categoriaDecoded}
            </ThemedText>
          </View>
          <ThemedText
            lightColor="rgba(255,255,255,0.9)"
            darkColor="rgba(255,255,255,0.9)"
            style={styles.heroDesc}>
            {lugaresFiltrados.length}{' '}
            {lugaresFiltrados.length === 1 ? 'local encontrado' : 'locais encontrados'}
            {searchText.length > 0 && ` de ${lugares.length}`}
          </ThemedText>
        </View>

        <View style={[styles.searchWrapper, { backgroundColor: colors.background }]}>
          <View style={[styles.searchBar, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
            <TextInput
              style={[styles.searchInput, { color: colors.text }]}
              placeholder="Buscar por nome, endereço ou telefone..."
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

        <View style={[styles.lugaresWrapper, { backgroundColor: colors.background }]}>
          <View style={styles.lugaresList}>
            {lugaresFiltrados.length === 0 ? (
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
                    : 'Nenhum local encontrado nesta categoria.'}
                </ThemedText>
              </View>
            ) : (
              lugaresFiltrados.map((lugar) => (
                <View
                  key={lugar.nome + lugar.endereco}
                  style={[
                    styles.lugarCard,
                    { backgroundColor: colors.backgroundCard, borderColor: colors.border },
                  ]}>
                  <View style={styles.lugarHeader}>
                    <ThemedText type="defaultSemiBold" style={styles.lugarNome} numberOfLines={2}>
                      {lugar.nome}
                    </ThemedText>
                    {lugar.telefone ? (
                      <Pressable
                        onPress={() => handleLigar(lugar.telefone)}
                        style={[styles.phoneButton, { backgroundColor: colors.accentMuted }]}>
                        <IconSymbol name="phone.fill" size={16} color={colors.tint} />
                        <ThemedText style={[styles.phoneText, { color: colors.tint }]}>
                          Ligar
                        </ThemedText>
                      </Pressable>
                    ) : null}
                  </View>

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
                </View>
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
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  backButton: {
    padding: 4,
  },
  heroTitle: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
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
