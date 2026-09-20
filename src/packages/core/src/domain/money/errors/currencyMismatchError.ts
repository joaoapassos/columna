import { DomainError } from "../../shared/errors/DomainError";

/**
 * Erro de domínio lançado ao tentar operar valores de moedas incompatíveis.
 */
export class CurrencyMismatchError extends DomainError {
	/**
	 * @param leftCurrency Código da moeda do operando à esquerda.
	 * @param rightCurrency Código da moeda do operando à direita.
	 */
	constructor(
		public readonly leftCurrency: string,
		public readonly rightCurrency: string,
	) {
		super(
            "MONEY_CURRENCY_MISMATCH",
			`Cannot operate with different currencies: ` +
				`${leftCurrency} and ${rightCurrency}`,
		);
	}
}
