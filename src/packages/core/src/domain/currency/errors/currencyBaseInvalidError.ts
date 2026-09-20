import { DomainError } from "../../shared/errors/DomainError";

/**
 * Erro de domínio lançado quando a base de uma moeda não é positiva.
 */
export class CurrencyBaseInvalidError extends DomainError {
  /**
   * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
   */
  constructor(message?: string) {
    super("CURRENCY_BASE_INVALID", message ?? "Currency base must be greater than zero");
  }
}
