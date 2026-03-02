import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import type { ThemeColors } from '@/constants/theme';
import type { Ordenacao } from '@/utils/ordenacao';
import { OPCOES_ORDENACAO } from '@/utils/ordenacao';

type OrderChipsProps = {
  ordenacao: Ordenacao;
  onSelect: (value: Ordenacao) => void;
  colors: ThemeColors;
};

export function OrderChips({ ordenacao, onSelect, colors }: OrderChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      style={styles.scroll}>
      {OPCOES_ORDENACAO.map((opcao) => {
        const isActive = ordenacao === opcao.value;
        return (
          <Pressable
            key={opcao.value}
            onPress={() => onSelect(opcao.value)}
            style={[
              styles.chip,
              {
                backgroundColor: isActive ? colors.tint : colors.backgroundCard,
                borderColor: isActive ? colors.tint : colors.border,
              },
            ]}>
            <ThemedText
              style={[styles.chipText, { color: isActive ? '#fff' : colors.textSecondary }]}>
              {opcao.label}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    width: '100%',
    marginHorizontal: 0,
  },
  container: {
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
});
