import { ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { HORARIOS_COLETA } from '@/data/horarios-coleta';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HorariosScreen() {
  const { bairro } = useLocalSearchParams<{ bairro?: string }>();
  const pageBackground = useThemeColor({ light: '#f6f8fa', dark: '#0f1113' }, 'background');
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1b1f22' }, 'background');
  const cardBorder = useThemeColor({ light: '#e3e8ee', dark: '#2a2f32' }, 'background');
  const accent = useThemeColor({ light: '#0a7ea4', dark: '#6ec1ff' }, 'tint');
  const mutedText = useThemeColor({ light: '#5a6b77', dark: '#9aa4ab' }, 'text');
  const chipBackground = useThemeColor({ light: '#f1f5f9', dark: '#121518' }, 'background');
  const labelBackground = useThemeColor({ light: '#e7f2f7', dark: '#0f151a' }, 'background');
  const divider = useThemeColor({ light: '#e6eef3', dark: '#202529' }, 'background');
  const diasComColeta = HORARIOS_COLETA.filter((dia) => dia.horarios.length > 0).length;
  const totalPeriodos = HORARIOS_COLETA.reduce((total, dia) => total + dia.horarios.length, 0);

  return (
    <ThemedView style={[styles.container, { backgroundColor: pageBackground }]}>
      <ThemedView
        style={[
          styles.headerCard,
          styles.shadow,
          { backgroundColor: cardBackground, borderColor: cardBorder },
        ]}>
        <View style={styles.headerRow}>
          <View style={styles.headerText}>
            <ThemedText type="title">Horários de coleta</ThemedText>
            <ThemedText style={[styles.subtitle, { color: mutedText }]}>
              {bairro ? `Bairro selecionado: ${bairro}` : 'Consulte os dias e horários da semana.'}
            </ThemedText>
          </View>
        </View>
        <View style={styles.headerMeta}>
          <View style={[styles.metaCard, { backgroundColor: labelBackground }]}>
            <ThemedText style={[styles.metaValue, { color: accent }]}>{diasComColeta}</ThemedText>
            <ThemedText style={[styles.metaLabel, { color: mutedText }]}>dias com coleta</ThemedText>
          </View>
          <View style={[styles.metaCard, { backgroundColor: labelBackground }]}>
            <ThemedText style={[styles.metaValue, { color: accent }]}>{totalPeriodos}</ThemedText>
            <ThemedText style={[styles.metaLabel, { color: mutedText }]}>períodos/semana</ThemedText>
          </View>
        </View>
      </ThemedView>

      <View style={styles.sectionHeader}>
        <ThemedText type="defaultSemiBold">Agenda semanal</ThemedText>
        <View style={[styles.sectionDivider, { backgroundColor: divider }]} />
      </View>
      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        {HORARIOS_COLETA.map((dia) => (
          <ThemedView
            key={dia.dia}
            style={[
              styles.card,
              styles.shadow,
              { backgroundColor: cardBackground, borderColor: cardBorder },
            ]}>
            <View style={[styles.cardAccent, { backgroundColor: accent }]} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <ThemedText type="subtitle">{dia.dia}</ThemedText>
                <View style={styles.headerBadges}>
                  <View style={[styles.dayLabel, { backgroundColor: labelBackground }]}>
                    <ThemedText style={[styles.dayLabelText, { color: accent }]}>
                      {dia.horarios.length > 0 ? 'Ativo' : 'Sem coleta'}
                    </ThemedText>
                  </View>
                  <View style={[styles.dayLabel, { backgroundColor: chipBackground }]}>
                    <ThemedText style={[styles.dayLabelText, { color: mutedText }]}>
                      {dia.horarios.length} período(s)
                    </ThemedText>
                  </View>
                </View>
              </View>
              {dia.horarios.length > 0 ? (
                <View style={styles.chips}>
                  {dia.horarios.map((horario) => (
                    <View
                      key={horario}
                      style={[styles.chip, { backgroundColor: chipBackground }]}>
                      <View style={[styles.chipDot, { backgroundColor: accent }]} />
                      <ThemedText style={[styles.chipText, { color: mutedText }]}>
                        {horario}
                      </ThemedText>
                    </View>
                  ))}
                </View>
              ) : (
                <ThemedText style={[styles.item, { color: mutedText }]}>
                  {dia.observacao ?? 'Sem coleta.'}
                </ThemedText>
              )}
            </View>
          </ThemedView>
        ))}
      </ScrollView>
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
    padding: 18,
    borderRadius: 20,
    borderWidth: 1,
    gap: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  accentDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
  },
  headerText: {
    flex: 1,
    gap: 4,
  },
  subtitle: {
    marginTop: 6,
  },
  headerMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaCard: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 2,
  },
  metaValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  metaLabel: {
    fontSize: 12,
  },
  list: {
    gap: 14,
    paddingBottom: 20,
  },
  sectionHeader: {
    gap: 10,
  },
  sectionDivider: {
    height: 1,
    borderRadius: 999,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 18,
    borderWidth: 1,
    overflow: 'hidden',
  },
  cardAccent: {
    width: 5,
  },
  cardContent: {
    flex: 1,
    padding: 16,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  headerBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'flex-end',
  },
  dayLabel: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  dayLabelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  item: {
    opacity: 0.8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  chipDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '500',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 4,
  },
});
