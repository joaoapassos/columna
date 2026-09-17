# Ambiente de desenvolvimento

## Requisitos

- Node.js. O repositório não fixa sua versão.
- pnpm `12.4.2`, conforme `packageManager` no `package.json` raiz.

TypeScript `^7.0.2` é uma dependência de desenvolvimento da raiz; não exige instalação global.

## Instalação e comandos

Execute na raiz do repositório:

```bash
pnpm install
pnpm build
pnpm typecheck
```

`build` executa `pnpm -r --if-present build`; `typecheck` executa `pnpm -r --if-present typecheck`. Atualmente, apenas `@columna/core` possui esses scripts. Mobile e desktop ainda não têm comandos de execução.

O build do core usa `tsc -p tsconfig.json`, gerando JavaScript, declarações de tipos e mapas em `src/packages/core/dist`. O typecheck usa o mesmo projeto com `--noEmit`.

## Workspaces

O `pnpm-workspace.yaml` inclui:

- `src/apps/*`: aplicações, atualmente `@columna/mobile` e `@columna/desktop`.
- `src/packages/*`: código compartilhado, atualmente `@columna/core`.
- `configs/*`: configurações compartilhadas, atualmente `@columna/typescript-config`.

## Adicionar dependências

Use `pnpm --filter` na raiz para direcionar a alteração ao workspace que usa a dependência. Exemplo da sintaxe, substituindo o nome indicado por um package real:

```bash
pnpm --filter @columna/mobile add <nome-do-package>
```

Para dependências de desenvolvimento, acrescente `-D`. A dependência de configuração já existente no core corresponde a:

```bash
pnpm --filter @columna/core add -D '@columna/typescript-config@workspace:*'
```

Quando o mobile precisar consumir o core, a dependência interna poderá ser adicionada assim:

```bash
pnpm --filter @columna/mobile add '@columna/core@workspace:*'
```

Esse último exemplo é uma alteração futura, não uma etapa necessária da instalação atual. A declaração resultante no manifesto seria:

```json
{
  "dependencies": {
    "@columna/core": "workspace:*"
  }
}
```

## Adicionar workspaces

Crie novos packages compartilhados em `src/packages/<nome>` e novas aplicações em `src/apps/<nome>`, com seu próprio `package.json` e nome `@columna/<nome>`. Essas pastas já são abrangidas pelos padrões do workspace. Configurações reutilizáveis pertencem a `configs/<nome>`.

Para um novo package TypeScript, declare `@columna/typescript-config` como dependência de desenvolvimento e estenda a configuração apropriada. Defina os caminhos de entrada e saída e os scripts no próprio package, tomando o core como referência.

Mantenha dependências de plataforma na aplicação que as utiliza e respeite a [independência do core](../architecture/overview.md).
