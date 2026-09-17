# Columna

Columna é um projeto de aplicação de gerenciamento financeiro pessoal, em desenvolvimento inicial. Hoje, o repositório contém a estrutura do monorepo e configurações compartilhadas, sem funcionalidades financeiras implementadas.

## Estrutura

```text
configs/
  typescript/          # Configurações TypeScript compartilhadas
src/
  apps/
    desktop/           # Manifesto da futura aplicação desktop
    mobile/            # Manifesto da futura aplicação mobile
  packages/
    core/              # Package compartilhado com exportação de exemplo
docs/                  # Documentação técnica
package.json
pnpm-workspace.yaml
pnpm-lock.yaml
```

`apps` abriga aplicações, `packages` abriga código compartilhado e `configs` abriga configurações reutilizáveis. Expo e Electron ainda não estão integrados.

## Tecnologias e requisitos

O projeto usa pnpm Workspaces, TypeScript e packages internos com namespace `@columna/*`. Requer Node.js e pnpm. O `package.json` fixa `pnpm@12.4.2` e declara TypeScript `^7.0.2`; não define uma versão de Node.js.

## Desenvolvimento

Na raiz:

```bash
pnpm install
pnpm build
pnpm typecheck
```

Os dois últimos comandos executam recursivamente os scripts existentes nos workspaces. Atualmente, somente `@columna/core` define `build` e `typecheck`.

## Workspaces

O `pnpm-workspace.yaml` inclui `src/apps/*`, `src/packages/*` e `configs/*`. Dependências internas usam `workspace:*`, como a dependência de desenvolvimento do core em `@columna/typescript-config`. Cada workspace declara suas próprias dependências.

## Documentação

A documentação está em [docs/](docs/):

- [Arquitetura atual](docs/architecture/overview.md)
- [Organização do monorepo](docs/architecture/monorepo.md)
- [Domínio em estudo](docs/domain/overview.md)
- [Decisões arquiteturais](docs/decisions/README.md)
- [Ambiente de desenvolvimento](docs/development/getting-started.md)

## Licença

Apache-2.0, conforme declarado no `package.json`. Consulte o texto integral em [LICENSE](LICENSE).

Copyright 2026 João Alves Passos