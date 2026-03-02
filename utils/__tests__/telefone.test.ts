import { Linking } from 'react-native';

import { abrirLigacao } from '../telefone';

jest.mock('react-native', () => ({
  Linking: {
    openURL: jest.fn(),
  },
}));

describe('abrirLigacao', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('remove caracteres não numéricos do telefone', () => {
    abrirLigacao('(19) 3872-1866');

    expect(Linking.openURL).toHaveBeenCalledTimes(1);
    expect(Linking.openURL).toHaveBeenCalledWith('tel:1938721866');
  });

  it('funciona com telefone só números', () => {
    abrirLigacao('1938721866');

    expect(Linking.openURL).toHaveBeenCalledWith('tel:1938721866');
  });

  it('funciona com formato variado', () => {
    abrirLigacao('19 9 9826-4173');

    expect(Linking.openURL).toHaveBeenCalledWith('tel:19998264173');
  });

  it('retorna tel: vazio quando não há dígitos', () => {
    abrirLigacao('');

    expect(Linking.openURL).toHaveBeenCalledWith('tel:');
  });
});
