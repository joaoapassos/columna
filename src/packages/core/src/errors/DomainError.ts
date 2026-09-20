import { CoreError } from "./CoreError";

/**
 * Representa um erro causado pela violação de uma regra do domínio.
 *
 * Especializa {@link CoreError} como uma categoria semântica para que erros de
 * domínio possam ser diferenciados dos demais erros conhecidos pelo `core`.
 * O código, a mensagem e a causa opcional são fornecidos pela classe base.
 */
export class DomainError extends CoreError {}
