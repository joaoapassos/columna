# ADR 0001 - Usar pnpm Workspaces

## Status

Accepted

## Context

O projeto organiza múltiplas aplicações e packages, com necessidade de compartilhar código e manter dependências específicas isoladas. A estrutura atual já separa aplicações, packages compartilhados e configurações.

## Decision

Usar pnpm Workspaces, com `pnpm-workspace.yaml` incluindo `src/apps/*`, `src/packages/*` e `configs/*`. Referenciar packages internos com `workspace:*`, como já ocorre entre o core e a configuração TypeScript.

## Consequences

- Aplicações e packages permanecem em um único repositório.
- O lockfile compartilhado fica na raiz em `pnpm-lock.yaml`.
- Cada package declara suas próprias dependências.
- Os scripts raiz podem executar os scripts dos workspaces recursivamente.
- Ferramentas de orquestração podem ser adicionadas futuramente; não há necessidade estabelecida nem integração atual.
