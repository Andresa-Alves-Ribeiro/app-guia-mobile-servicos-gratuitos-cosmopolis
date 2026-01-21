import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';

type BairroItemProps = {
  bairro: string;
  isSelected: boolean;
  onPress: () => void;
};

export function BairroItem({ bairro, isSelected, onPress }: BairroItemProps) {
  const itemBackground = useThemeColor({ light: '#ffffff', dark: '#1c1f21' }, 'background');
  const itemBorder = useThemeColor({ light: '#e1e1e1', dark: '#2a2f32' }, 'background');
  const itemSelectedBackground = useThemeColor(
    { light: '#e8f6fb', dark: '#19323a' },
    'background'
  );
  const tintColor = useThemeColor({}, 'tint');

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        { backgroundColor: itemBackground, borderColor: itemBorder },
        isSelected && styles.itemSelected,
        isSelected && {
          backgroundColor: itemSelectedBackground,
          borderColor: tintColor,
        },
        pressed && styles.itemPressed,
      ]}
      onPress={onPress}>
      <ThemedText type={isSelected ? 'defaultSemiBold' : 'default'}>{bairro}</ThemedText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  itemSelected: {},
  itemPressed: {
    opacity: 0.85,
  },
});
