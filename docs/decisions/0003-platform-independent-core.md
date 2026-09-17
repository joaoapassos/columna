# ADR 0003 - Manter o core independente de plataforma

## Status

Accepted

## Context

O projeto possui espaços para aplicações mobile e desktop e um package compartilhado, `@columna/core`. Reutilizar modelos e regras centrais entre essas aplicações exige evitar dependências específicas de interface ou plataforma no core.

Atualmente, o core contém apenas uma exportação de exemplo e não declara dependências de plataforma. As aplicações ainda não declaram dependência do core.

## Decision

Manter `@columna/core` independente das aplicações, de Expo, React Native, Electron e APIs específicas de UI. As aplicações podem depender do core; o core não deve depender das aplicações.

## Consequences

- Modelos e regras centrais poderão ser reutilizados entre aplicações.
- Integrações específicas de plataforma devem permanecer fora do core.
- Novas dependências do core precisam respeitar essa independência.
- Essa decisão estabelece um limite de dependências, sem definir ainda uma arquitetura completa de DDD ou Hexagonal.
