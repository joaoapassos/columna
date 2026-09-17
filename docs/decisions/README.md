# Decisões arquiteturais

ADRs (Architecture Decision Records) registram o contexto, a decisão e suas consequências. No Columna, preservam os motivos das escolhas estruturais e orientam a evolução do projeto.

Crie um ADR quando uma escolha relevante afetar limites entre packages, dependências, configurações compartilhadas ou outras partes da arquitetura. Mudanças rotineiras não precisam de um ADR.

Use numeração sequencial e um nome descritivo, como `0001-use-pnpm-workspaces.md`, com este formato:

```markdown
# ADR XXXX - título

## Status

Accepted

## Context

Contexto da escolha.

## Decision

Decisão adotada.

## Consequences

Efeitos e limitações da decisão.
```

Não apague decisões antigas quando forem substituídas. Marque seu status como `Superseded` ou `Deprecated` e inclua um link para a decisão que as substitui, quando houver.

## Índice

- [0001 - Usar pnpm Workspaces](0001-use-pnpm-workspaces.md)
- [0002 - Compartilhar configurações TypeScript](0002-shared-typescript-config.md)
- [0003 - Manter o core independente de plataforma](0003-platform-independent-core.md)
