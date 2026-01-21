import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Selecao de bairro</ThemedText>
      <ThemedText style={styles.subtitle}>
        Escolha seu bairro para ver os dias de coleta.
      </ThemedText>

      <ScrollView
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}>
        {BAIRROS.map((bairro) => {
          const isSelected = bairro === selectedBairro;

          return (
            <Pressable
              key={bairro}
              style={[styles.item, isSelected && styles.itemSelected]}
              onPress={() => setSelectedBairro(bairro)}>
              <ThemedText type={isSelected ? 'defaultSemiBold' : 'default'}>
                {bairro}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      <ThemedText style={styles.selectedText}>
        {selectedBairro ? 'Selecionado: ' : 'Nenhum bairro selecionado.'}
        {selectedBairro ? (
          <ThemedText type="defaultSemiBold">{selectedBairro}</ThemedText>
        ) : null}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 12,
  },
  subtitle: {
    marginBottom: 8,
  },
  list: {
    flex: 1,
  },
  listContent: {
    gap: 10,
    paddingBottom: 8,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d0d0d0',
  },
  itemSelected: {
    borderColor: '#0a7ea4',
    backgroundColor: '#e0f1f6',
  },
  selectedText: {
    marginTop: 8,
  },
});
