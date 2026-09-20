import { DomainError } from "../../../errors/DomainError";

/**
 * Erro de domínio lançado quando o código da moeda não é informado.
 */
export class CurrencyCodeRequiredError extends DomainError {
  /**
   * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
   */
  constructor(message?: string) {
    super("CURRENCY_CODE_REQUIRED", message ?? "Currency code is required");
  }
}
