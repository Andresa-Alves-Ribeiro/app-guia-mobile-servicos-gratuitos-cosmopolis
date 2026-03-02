import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import type { ThemeColors } from '@/constants/theme';
import type { LocalServicoGratuito } from '@/data/locais-servicos';

type LugarCardProps = {
  lugar: LocalServicoGratuito;
  colors: Pick<
    ThemeColors,
    'backgroundCard' | 'border' | 'tint' | 'textSecondary' | 'accentMuted' | 'accentText'
  >;
  onLigar: (tel: string) => void;
  showCategoria?: boolean;
  onPressCategoria?: (categoria: string) => void;
};

export function LugarCard({
  lugar,
  colors,
  onLigar,
  showCategoria = false,
  onPressCategoria,
}: LugarCardProps) {
  const isPressable = !!onPressCategoria;
  const content = (
    <>
      <View style={styles.header}>
        <ThemedText type="defaultSemiBold" style={styles.nome} numberOfLines={2}>
          {lugar.nome}
        </ThemedText>
        {lugar.telefone ? (
          <Pressable
            onPress={(e) => {
              e.stopPropagation?.();
              onLigar(lugar.telefone);
            }}
            style={[styles.phoneButton, { backgroundColor: colors.accentMuted }]}>
            <IconSymbol name="phone.fill" size={16} color={colors.accentText} />
            <ThemedText style={[styles.phoneText, { color: colors.accentText }]}>Ligar</ThemedText>
          </Pressable>
        ) : null}
      </View>

      {showCategoria && lugar.categoria ? (
        <Pressable
          onPress={() => onPressCategoria?.(lugar.categoria)}
          style={styles.categoriaBadge}
          disabled={!isPressable}>
          <ThemedText style={[styles.categoriaText, { color: colors.tint }]}>{lugar.categoria}</ThemedText>
        </Pressable>
      ) : null}

      <View style={[styles.infoRow, { borderLeftColor: colors.tint }]}>
        <IconSymbol name="mappin.circle.fill" size={18} color={colors.textSecondary} />
        <ThemedText style={[styles.infoText, { color: colors.textSecondary }]} numberOfLines={2}>
          {lugar.endereco}
        </ThemedText>
      </View>

      {lugar.horarios && lugar.horarios.length > 0 ? (
        <View style={[styles.infoRow, { borderLeftColor: colors.tint }]}>
          <IconSymbol name="clock.fill" size={18} color={colors.textSecondary} />
          <ThemedText style={[styles.infoText, { color: colors.textSecondary }]} numberOfLines={1}>
            {lugar.horarios.join(' | ')}
          </ThemedText>
        </View>
      ) : null}

      {lugar.telefone ? (
        <View style={[styles.infoRow, { borderLeftColor: colors.tint }]}>
          <IconSymbol name="phone.fill" size={18} color={colors.textSecondary} />
          <ThemedText style={[styles.infoText, { color: colors.textSecondary }]}>{lugar.telefone}</ThemedText>
        </View>
      ) : null}
    </>
  );

  const cardStyle = [
    styles.card,
    { backgroundColor: colors.backgroundCard, borderColor: colors.border },
  ];

  if (isPressable && lugar.categoria) {
    return (
      <Pressable
        onPress={() => onPressCategoria?.(lugar.categoria)}
        style={({ pressed }) => [...cardStyle, pressed && styles.pressed]}>
        {content}
      </Pressable>
    );
  }

  return <View style={cardStyle}>{content}</View>;
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
  pressed: {
    opacity: 0.95,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 12,
  },
  nome: {
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
});
