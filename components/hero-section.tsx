import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ThemeColors } from '@/constants/theme';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  colors: Pick<ThemeColors, 'tint'>;
  showBackButton?: boolean;
  onBackPress?: () => void;
  /** Label pequeno acima do título (ex: "Guia de Serviços") */
  topLabel?: string;
  /** Estilo de título grande (ex: Home com "Cosmópolis") */
  titleLarge?: boolean;
};

export function HeroSection({
  title,
  subtitle,
  colors,
  showBackButton = false,
  onBackPress,
  topLabel,
  titleLarge = false,
}: HeroSectionProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.hero, { backgroundColor: colors.tint, paddingTop: insets.top + 16 }]}>
      {topLabel ? (
        <ThemedText lightColor="#fff" darkColor="#fff" style={styles.topLabel}>
          {topLabel}
        </ThemedText>
      ) : null}
      <View style={styles.header}>
        {showBackButton && onBackPress ? (
          <Pressable onPress={onBackPress} hitSlop={12} style={styles.backButton}>
            <IconSymbol name="chevron.left" size={24} color="#fff" />
          </Pressable>
        ) : null}
        <ThemedText
          lightColor="#fff"
          darkColor="#fff"
          style={[styles.title, titleLarge && styles.titleLarge]}>
          {title}
        </ThemedText>
      </View>
      <ThemedText
        lightColor="rgba(255,255,255,0.9)"
        darkColor="rgba(255,255,255,0.9)"
        style={styles.subtitle}>
        {subtitle}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    position: 'relative',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  backButton: {
    padding: 4,
  },
  topLabel: {
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    opacity: 0.9,
    marginBottom: 4,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  titleLarge: {
    fontSize: 32,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '400',
  },
});
