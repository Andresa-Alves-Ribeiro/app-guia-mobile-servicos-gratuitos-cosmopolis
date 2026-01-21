import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

const BAIRROS = [
  'Bela Vista IV',
  'Bosque',
  'Centro',
  'Chácara Horizonte',
  'Chácara Santo Antônio',
  'Condomínio Residencial Cosmópolis I',
  'Conjunto Habitacional 30 de Novembro',
  'Conjunto Habitacional Vila Cosmos',
  'Daniel Rossetti',
  'Extinta Estação Experimental de Sericultura',
  'Jacinto Hackel Fren Aun',
  'Jardim Alvorada',
  'Jardim Bela Vista',
  'Jardim Bela Vista Continuação',
  'Jardim Bela Vista III',
  'Jardim Beto Spana',
  'Jardim Campos Salles',
  'Jardim Chico Mendes',
  'Jardim Cosmopolitano',
  'Jardim das Paineiras',
  'Jardim de Faveri',
  'Jardim do Sol',
  'Jardim dos Scursonis',
  'Jardim Eldorado',
  'Jardim Lourdes',
  'Jardim Margarida',
  'Jardim Nova Esperança',
  'Jardim Paulista',
  'Jardim Planalto',
  'Jardim Primavera',
  'Jardim Santa Rosa',
  'Kalmann',
  'Núcleo Habitacional Vila Nova',
  'Núcleo Residencial Jardim Cosmopolita',
  'Parque das Laranjeiras',
  'Parque das Laranjeiras II',
  'Parque Dona Esther',
  'Parque dos Girassóis',
  'Parque dos Trabalhadores',
  'Parque Independência',
  'Parque Real',
  'Parque Residencial das Andorinhas',
  'Parque Residencial das Laranjeiras', 
  'Parque Residencial Dona Chiquinha',
  'Parque Residencial Rosamélia',
  'Parque Residencial Rosamélia II',
  'Parque Residencial Rossetti',
  'Parque San Giovani',
  'Parque São Pedro',
  'Parque Souza Queiroz',
  'Real Center',
  'Recanto das Laranjeiras',
  'Recanto dos Colibris',
  'Recanto Novo Cosmópolis',
  'Residencial 1º de Maio',
  'Residencial Bader José Aun',
  'Residencial Cidade Jardim',
  'Residencial do Bosque',
  'Residencial Mont Blanc',
  'Residencial Souza Queiroz',
  'Santana',
  'Santo Antônio',
  'São João',
  'Vila Damiano',
  'Vila Fontana',
  'Vila Guilhermina',
  'Vila José Kalil Aun',
  'Vila Morro do Castanho',
  'Vila Nova',
  'Vila São Pedro',
  'Vila Vakula',
  'Village Monte Cristo',
  'Zona Industrial 1 Andorinha',
];

export default function BairroScreen() {
  const [selectedBairro, setSelectedBairro] = useState<string | null>(null);
  const cardBackground = useThemeColor({ light: '#ffffff', dark: '#1f2224' }, 'background');
  const cardBorder = useThemeColor({ light: '#e6e6e6', dark: '#2a2f32' }, 'background');
  const itemBackground = useThemeColor({ light: '#ffffff', dark: '#1c1f21' }, 'background');
  const itemBorder = useThemeColor({ light: '#e1e1e1', dark: '#2a2f32' }, 'background');
  const itemSelectedBackground = useThemeColor(
    { light: '#e8f6fb', dark: '#19323a' },
    'background'
  );
  const tintColor = useThemeColor({}, 'tint');

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
            <Pressable
              key={bairro}
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
              onPress={() => setSelectedBairro(bairro)}>
              <ThemedText type={isSelected ? 'defaultSemiBold' : 'default'}>
                {bairro}
              </ThemedText>
            </Pressable>
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
  itemSelected: {
  },
  itemPressed: {
    opacity: 0.85,
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
