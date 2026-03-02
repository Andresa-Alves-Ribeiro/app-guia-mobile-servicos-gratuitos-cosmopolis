import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ThemeColors } from '@/constants/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  colors: Pick<ThemeColors, 'background' | 'backgroundCard' | 'border' | 'text' | 'textSecondary'>;
  /** Variante "overlap" para sobrepor o hero (ex: Home) */
  variant?: 'default' | 'overlap';
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Buscar...',
  colors,
  variant = 'default',
}: SearchBarProps) {
  return (
    <View
      style={[
        styles.wrapper,
        variant === 'overlap' && styles.wrapperOverlap,
        { backgroundColor: colors.background },
      ]}>
        <View
          style={[
            styles.bar,
            variant === 'overlap' && styles.barOverlap,
            { backgroundColor: colors.backgroundCard, borderColor: colors.border },
          ]}>
        <IconSymbol name="magnifyingglass" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
        />
        {value.length > 0 ? (
          <Pressable onPress={() => onChangeText('')} hitSlop={12}>
            <ThemedText style={{ color: colors.textSecondary, fontSize: 14 }}>Limpar</ThemedText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  wrapperOverlap: {
    marginTop: -16,
    paddingBottom: 20,
    paddingTop: 0,
  },
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
  },
  barOverlap: {
    marginTop: 15,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 0,
  },
});
