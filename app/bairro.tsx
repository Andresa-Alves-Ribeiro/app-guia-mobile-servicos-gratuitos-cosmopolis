import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { BairroItem } from '@/components/bairro-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BAIRROS } from '@/data/bairros';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function BairroScreen() {
  const [selectedBairro, setSelectedBairro] = useState<string | null>(null);
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1f2224' }, 'background');
  const cardBorder = useThemeColor({ light: '#e6e6e6', dark: '#2a2f32' }, 'background');

  return (
    <ThemedView style={styles.container}>
      <ThemedView
        style={[
          styles.headerCard,
          { backgroundColor: cardBackground, borderColor: cardBorder },
        ]}>
        <ThemedText type="title">Seleção de bairro</ThemedText>
        <ThemedText style={styles.subtitle}>
          Escolha seu bairro para ver os dias de coleta.
        </ThemedText>
      </ThemedView>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {BAIRROS.map((bairro) => {
          const isSelected = bairro === selectedBairro;

          return (
            <BairroItem
              key={bairro}
              bairro={bairro}
              isSelected={isSelected}
              onPress={() => setSelectedBairro(bairro)}
            />
          );
        })}
      </ScrollView>

      <ThemedView
        style={[
          styles.footerCard,
          { backgroundColor: cardBackground, borderColor: cardBorder },
        ]}>
        <ThemedText style={styles.selectedText}>
          {selectedBairro ? 'Selecionado: ' : 'Nenhum bairro selecionado.'}
          {selectedBairro ? (
            <ThemedText type="defaultSemiBold">{selectedBairro}</ThemedText>
          ) : null}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 16,
  },
  headerCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
  },
  subtitle: {
    marginTop: 6,
    opacity: 0.75,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 12,
    paddingBottom: 12,
  },
  footerCard: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
  },
  selectedText: {
    textAlign: 'center',
  },
});
