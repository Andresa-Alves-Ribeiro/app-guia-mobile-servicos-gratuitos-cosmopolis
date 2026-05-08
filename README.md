# Guia de Servicos de Cosmopolis

Aplicativo mobile desenvolvido com React Native e Expo para facilitar o acesso a servicos gratuitos da cidade de Cosmopolis.

O projeto centraliza informacoes como nome do local, endereco, telefone, horario e, em alguns casos, e-mail, permitindo que moradores encontrem rapidamente o atendimento que precisam.

## Objetivo do projeto

- Organizar servicos publicos e gratuitos em um unico app.
- Melhorar a descoberta de locais por categoria, nome ou endereco.
- Simplificar o contato com os servicos por meio de telefone.

## Funcionalidades principais

- **Tela inicial por categorias:** exibicao das categorias de servico com busca por nome da categoria.
- **Tela de locais (geral):** listagem completa com busca por nome, endereco ou categoria.
- **Ordenacao de resultados:** filtro de ordenacao para facilitar a navegacao na lista de locais.
- **Tela de categoria:** lista dedicada para cada categoria com busca interna.
- **Acesso rapido ao contato:** acao para ligar diretamente para o telefone do local.
- **Tema adaptado (claro/escuro):** interface com suporte a esquema de cores.

## Tecnologias utilizadas

- [Expo](https://expo.dev/) e React Native
- [Expo Router](https://docs.expo.dev/router/introduction/) para roteamento baseado em arquivos
- TypeScript
- Jest + jest-expo para testes
- ESLint (configuracao Expo) para padrao de codigo

## Estrutura do projeto

- `app/`: telas e rotas do aplicativo (tabs, categoria e layout global).
- `components/`: componentes reutilizaveis da interface.
- `data/`: base local de dados de categorias e locais de servicos.
- `hooks/`: hooks customizados para busca, filtros, navegacao e tema.
- `services/`: camada de acesso e transformacao dos dados.
- `utils/`: funcoes utilitarias (filtros, ordenacao e telefone).

## Como executar localmente

### Pre-requisitos

- Node.js instalado
- npm instalado
- Expo Go no celular (opcional) ou emulador Android/iOS configurado

### Passos

1. Instale as dependencias:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm run start
```

3. Execute na plataforma desejada:

- `a` no terminal para Android
- `w` no terminal para Web
- ou use:
  - `npm run android`
  - `npm run web`
  - `npm run ios`

## Testes e qualidade

- Rodar testes:

```bash
npm run test
```

- Gerar cobertura:

```bash
npm run test:coverage
```

- Validar lint:

```bash
npm run lint
```

## Dados do aplicativo

Os dados dos servicos estao atualmente em arquivo local:

- `data/locais-servicos.ts`

As categorias sao derivadas automaticamente desses dados em:

- `data/categories.ts`

Isso garante sincronizacao entre o cadastro de locais e as categorias exibidas na interface.

## Possiveis evolucoes

- Integracao com API para dados atualizados em tempo real.
- Favoritos e historico de buscas.
- Geolocalizacao e rotas ate o local.
- Melhorias de acessibilidade e internacionalizacao.
