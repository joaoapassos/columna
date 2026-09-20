import { DomainError } from "../../../errors/DomainError";

/**
 * Erro de domínio lançado quando o expoente de uma moeda é negativo.
 */
export class CurrencyExponentInvalidError extends DomainError {
  /**
   * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
   */
  constructor(message?: string) {
    super("CURRENCY_EXPONENT_INVALID", message ?? "Currency exponent cannot be negative");
  }
}
