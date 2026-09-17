# Arquitetura atual

O Columna separa aplicações, código compartilhado e configurações. A estrutura está estabelecida, mas não há interface, persistência ou regras financeiras implementadas.

## Direção das dependências

O princípio para evolução do código é:

```text
apps
  |
  v
packages

mobile  ----+
            +--> packages compartilhados
desktop ----+
```

O diagrama representa a direção pretendida: atualmente os manifestos de mobile e desktop não declaram dependência do core. Packages compartilhados não devem depender das aplicações.

## Core independente de plataforma

`@columna/core`, em `src/packages/core`, será o espaço para modelos e regras centrais reutilizáveis entre aplicações. Hoje, `src/index.ts` exporta apenas a constante de exemplo `columna`; não há modelagem financeira implementada.

O core deve permanecer independente de Expo, React Native, Electron e APIs de interface. As aplicações podem depender do core e adaptar seu uso à plataforma. Essa separação permite reutilizar modelos e regras sem acoplar o código compartilhado às interfaces.

## Configurações e limites atuais

`@columna/typescript-config` fornece configurações compartilhadas. O core estende `tsconfig.package.json`, compila `src` para `dist` e expõe JavaScript ESM e declarações de tipos pelo campo `exports`.

Mobile e desktop possuem apenas `package.json`, sem código ou scripts. Expo e Electron são possibilidades futuras, sem integração atual. Ainda não foi definida uma arquitetura completa de DDD ou Hexagonal.

Veja a [organização do monorepo](monorepo.md) e a [decisão sobre independência do core](../decisions/0003-platform-independent-core.md).
