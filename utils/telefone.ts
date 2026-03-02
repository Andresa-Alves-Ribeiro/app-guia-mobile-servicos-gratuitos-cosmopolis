import { Linking } from 'react-native';

export function abrirLigacao(tel: string): void {
  const numero = tel.replaceAll(/\D/g, '');
  Linking.openURL(`tel:${numero}`);
}
