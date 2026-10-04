# Organização do monorepo

Um único repositório mantém aplicações e packages próximos para permitir compartilhar código e configurações. Cada workspace continua responsável por declarar suas dependências específicas.

## Descoberta dos workspaces

O arquivo `pnpm-workspace.yaml`, na raiz, define:

```yaml
packages:
  - "src/packages/*"
  - "src/apps/*"
  - "configs/*"
```

| Caminho | Workspace atual | Responsabilidade |
| --- | --- | --- |
| `src/apps/mobile` | `@columna/mobile` | Futura aplicação mobile; apenas manifesto |
| `src/apps/desktop` | `@columna/desktop` | Futura aplicação desktop; apenas manifesto |
| `src/packages/core` | `@columna/core` | Código compartilhado; exportação de exemplo |
| `configs/typescript` | `@columna/typescript-config` | Configurações TypeScript compartilhadas |

Os manifestos atuais são privados e usam o namespace `@columna/*`. Novos workspaces devem ter seu próprio `package.json` dentro de uma dessas áreas.

## Dependências internas

O protocolo `workspace:*` referencia packages locais. No manifesto atual do core:

```json
{
  "devDependencies": {
    "@columna/typescript-config": "workspace:*"
  }
}
```

No `tsconfig.json` do core, a configuração é consumida por:

```json
{
  "extends": "@columna/typescript-config/tsconfig.package.json"
}
```

Mobile e desktop ainda não dependem de `@columna/core`. Quando houver esse consumo, a aplicação deverá declarar a dependência interna com `workspace:*`.

## Local das dependências e ferramentas

Dependências específicas pertencem ao workspace que as utiliza. Se Expo for integrado, suas dependências pertencerão ao mobile; se Electron for integrado, suas dependências pertencerão ao desktop. Nenhum desses frameworks está nos manifestos atuais.

Ferramentas compartilhadas podem ficar na raiz ou em packages de configuração. Atualmente, TypeScript está nas `devDependencies` da raiz, e as configurações ficam em `configs/typescript`.

O repositório possui `pnpm-lock.yaml` na raiz para o lockfile compartilhado. Os scripts raiz `build` e `typecheck` usam `pnpm -r --if-present`, executando os scripts declarados nos workspaces e ignorando aqueles que não os definem. Não há ferramenta adicional de orquestração configurada.

Veja o [guia de desenvolvimento](../development/getting-started.md).
