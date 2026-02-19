import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { HORARIOS_COLETA } from '@/data/horarios-coleta';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function HorariosScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const insets = useSafeAreaInsets();
  const colors = Colors[colorScheme];

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.hero, { backgroundColor: colors.tint, paddingTop: insets.top + 16 }]}>
          <View style={styles.heroIconWrapper}>
            <IconSymbol name="calendar" size={32} color="#fff" />
          </View>
          <ThemedText lightColor="#fff" darkColor="#fff" type="subtitle" style={styles.heroSubtitle}>
            Horários
          </ThemedText>
          <ThemedText lightColor="#fff" darkColor="#fff" style={styles.heroTitle}>
            Coleta de Resíduos
          </ThemedText>
          <ThemedText
            lightColor="rgba(255,255,255,0.9)"
            darkColor="rgba(255,255,255,0.9)"
            style={styles.heroDesc}>
            Consulte os dias e horários da coleta
          </ThemedText>
        </View>

        {/* Schedule List */}
        <View style={[styles.scheduleWrapper, { backgroundColor: colors.background }]}>
          <View style={styles.scheduleList}>
            {HORARIOS_COLETA.map((item, index) => (
              <View
                key={item.dia}
                style={[
                  styles.scheduleCard,
                  {
                    backgroundColor: colors.backgroundCard,
                    borderColor: colors.border,
                  },
                  index === HORARIOS_COLETA.length - 1 && styles.scheduleCardLast,
                ]}>
                <View style={styles.scheduleHeader}>
                  <ThemedText type="defaultSemiBold" style={styles.dayName}>
                    {item.dia}
                  </ThemedText>
                  {item.horarios.length > 0 ? (
                    <View style={[styles.badge, { backgroundColor: colors.accentMuted }]}>
                      <ThemedText style={[styles.badgeText, { color: colors.tint }]}>
                        {item.horarios.length} {item.horarios.length === 1 ? 'período' : 'períodos'}
                      </ThemedText>
                    </View>
                  ) : (
                    <View style={[styles.badge, styles.badgeEmpty, { backgroundColor: colors.border }]}>
                      <ThemedText style={[styles.badgeText, { color: colors.textSecondary }]}>
                        Sem coleta
                      </ThemedText>
                    </View>
                  )}
                </View>

                {item.horarios.length > 0 ? (
                  <View style={styles.horariosList}>
                    {item.horarios.map((horario, i) => (
                      <View
                        key={i}
                        style={[styles.horarioItem, { borderLeftColor: colors.tint }]}>
                        <ThemedText style={[styles.horarioText, { color: colors.textSecondary }]}>
                          {horario}
                        </ThemedText>
                      </View>
                    ))}
                  </View>
                ) : (
                  item.observacao && (
                    <ThemedText
                      style={[styles.observacao, { color: colors.textSecondary }]}
                      numberOfLines={2}>
                      {item.observacao}
                    </ThemedText>
                  )
                )}
              </View>
            ))}
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
    alignItems: 'center',
  },
  heroIconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    fontSize: 14,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    opacity: 0.9,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '700',
    letterSpacing: -0.5,
    marginBottom: 4,
    textAlign: 'center',
  },
  heroDesc: {
    fontSize: 15,
    fontWeight: '400',
    textAlign: 'center',
  },
  scheduleWrapper: {
    paddingHorizontal: 20,
    marginTop: -16,
    paddingBottom: 20,
  },
  scheduleList: {
    gap: 12,
  },
  scheduleCard: {
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  scheduleCardLast: {
    marginBottom: 0,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayName: {
    fontSize: 16,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgeEmpty: {
    opacity: 0.8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  horariosList: {
    gap: 8,
  },
  horarioItem: {
    paddingLeft: 16,
    borderLeftWidth: 3,
    paddingVertical: 4,
  },
  horarioText: {
    fontSize: 15,
    fontWeight: '500',
  },
  observacao: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: 24,
  },
});
