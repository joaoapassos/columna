# ADR 0002 - Compartilhar configurações TypeScript

## Status

Accepted

## Context

Packages TypeScript precisam de opções consistentes sem duplicar toda a configuração do compilador. O repositório já possui o workspace `@columna/typescript-config` em `configs/typescript`.

## Decision

Manter as configurações compartilhadas nesse workspace. `tsconfig.json` fornece a base, com verificações estritas; `tsconfig.package.json` estende essa base com ES2022, módulos ESNext, resolução Bundler e emissão de declarações e mapas.

Packages podem estender a configuração apropriada e definir opções locais. Atualmente, o core declara `@columna/typescript-config` como dependência de desenvolvimento com `workspace:*`, estende `@columna/typescript-config/tsconfig.package.json` e define `rootDir`, `outDir` e `include` localmente.

## Consequences

- Menos duplicação e maior consistência entre os packages que adotarem as configurações.
- Alterações compartilhadas podem afetar todos os consumidores e precisam considerar esse alcance.
- Configurações especializadas para outros ambientes poderão ser criadas futuramente; hoje existem apenas a base e a configuração de package.
