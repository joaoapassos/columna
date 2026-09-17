# Domínio

Este documento será atualizado conforme o domínio financeiro do Columna for desenvolvido. Atualmente, `@columna/core` contém apenas uma exportação de exemplo, sem entidades ou regras financeiras.

## O que registrar

- Linguagem do domínio e significado dos termos.
- Entidades e sua identidade.
- Value objects e suas regras de validade.
- Aggregates e seus limites de consistência.
- Invariantes e regras financeiras.
- Relacionamentos entre conceitos.

Cada definição deverá indicar as regras adotadas e, quando implementada, o código correspondente.

## Conceitos previstos para estudo

Money, Currency, Account, Transaction, Investment, Income/Return e Category são candidatos para investigação. Não representam classes existentes nem uma modelagem aprovada. Seus nomes, responsabilidades e relacionamentos serão definidos conforme o domínio evoluir.

Decisões arquiteturais relevantes devem ser registradas em [ADRs](../decisions/README.md).
