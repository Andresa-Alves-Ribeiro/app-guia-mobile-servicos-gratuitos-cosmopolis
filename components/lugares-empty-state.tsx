import { StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ThemeColors } from '@/constants/theme';

type LugaresEmptyStateProps = {
  messageBusca: string;
  messagePadrao: string;
  isSearchActive: boolean;
  colors: Pick<ThemeColors, 'backgroundCard' | 'border' | 'textSecondary'>;
};

export function LugaresEmptyState({
  messageBusca,
  messagePadrao,
  isSearchActive,
  colors,
}: LugaresEmptyStateProps) {
  return (
    <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
      <IconSymbol name="map" size={40} color={colors.textSecondary} />
      <ThemedText style={[styles.text, { color: colors.textSecondary }]} numberOfLines={2}>
        {isSearchActive ? messageBusca : messagePadrao}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});
