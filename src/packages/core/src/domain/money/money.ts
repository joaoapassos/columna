import {
	add,
	dinero,
	equal,
	greaterThan,
	lessThan,
	multiply,
	subtract,
	toDecimal,
} from "dinero.js/bigint";

import type { Currency } from "../currency/currency";
import { CurrencyMismatchError } from "./errors";

/**
 * Estado que compõe um valor monetário: quantidade em unidades mínimas e moeda.
 */
type MoneyType = {
    /** Quantidade expressa em minor units (unidades mínimas) da moeda. */
    amount: bigint,
    /** Moeda que define a identidade e a escala do valor. */
    currency: Currency,
}

/**
 * Representa um valor monetário como um Value Object (Objeto de Valor) imutável.
 *
 * O valor é armazenado em minor units (unidades mínimas) e todas as operações
 * aritméticas retornam uma nova instância de `Money`, sem modificar a atual.
 */
export class Money implements MoneyType{
	/**
	 * Quantidade expressa em minor units (unidades mínimas) da moeda.
	 *
	 * O significado da unidade depende da escala da moeda: `1098n` em BRL com
	 * base 10 e exponent 2 representa R$ 10,98, enquanto `100n` em JPY com
	 * exponent 0 representa 100 unidades da própria moeda.
	 */
	public readonly amount: bigint;
	/**
	 * Moeda associada ao valor, responsável por definir sua identidade e escala.
	 */
	public readonly currency: Currency;

	/**
	 * Mantém a criação de instâncias centralizada nas factories da classe.
	 *
	 * @param amount Valor já expresso em unidades mínimas.
	 * @param currency Moeda associada ao valor.
	 */
	private constructor(amount: bigint, currency: Currency) {
		this.amount = amount;
		this.currency = currency;
	}

	/**
	 * Cria um valor monetário a partir da unidade mínima da moeda.
	 *
	 * O valor recebido já deve estar normalizado de acordo com a escala definida
	 * pela `Currency`. Este método não interpreta entradas textuais, símbolos ou
	 * formatos dependentes de locale.
	 *
	 * @example
	 * // BRL com base 10 e exponent 2:
	 * Money.fromMinor(1098n, brl); // R$ 10,98
	 *
	 * @param value Valor expresso em minor units (unidades mínimas).
	 * @param currency Moeda associada ao valor.
	 * @returns Um novo valor monetário imutável.
	 */
	public static fromMinor(value: bigint, currency: Currency): Money {
		return new Money(value, currency);
	}

	/**
	 * Cria um valor monetário zero mantendo a moeda informada.
	 *
	 * @param currency Moeda associada ao valor zero.
	 * @returns Um novo `Money` de valor zero na moeda informada.
	 */
	public static zero(currency: Currency): Money {
		return new Money(0n, currency);
	}

	/**
	 * Soma outro valor de mesma moeda e retorna um novo `Money`.
	 *
	 * @param other Valor monetário a ser somado.
	 * @returns Um novo valor com o resultado da soma.
	 * @throws {CurrencyMismatchError} Quando os valores possuem moedas diferentes.
	 */
	public add(other: Money): Money {
		this.ensureSameCurrency(other);

		const result = add(this.toDinero(), other.toDinero());

		return Money.fromMinor(result.toJSON().amount, this.currency);
	}

	/**
	 * Subtrai outro valor de mesma moeda e retorna um novo `Money`.
	 *
	 * @param other Valor monetário a ser subtraído.
	 * @returns Um novo valor com o resultado da subtração.
	 * @throws {CurrencyMismatchError} Quando os valores possuem moedas diferentes.
	 */
	subtract(other: Money): Money {
		this.ensureSameCurrency(other);

		const result = subtract(this.toDinero(), other.toDinero());

		return Money.fromMinor(result.toJSON().amount, this.currency);
	}

	/**
	 * Multiplica o valor por um número inteiro sem modificar a instância atual.
	 *
	 * @param multiplier Fator inteiro aplicado ao valor em unidades mínimas.
	 * @returns Um novo valor monetário com o resultado da multiplicação.
	 */
	multiply(multiplier: bigint): Money {
		const result = multiply(this.toDinero(), multiplier);

		return Money.fromMinor(result.toJSON().amount, this.currency);
	}

	/**
	 * Compara valor e moeda para determinar a igualdade monetária.
	 *
	 * Valores de moedas não equivalentes são considerados diferentes.
	 *
	 * @param other Valor monetário a ser comparado.
	 * @returns `true` quando valor e moeda são equivalentes.
	 */
	equals(other: Money): boolean {
		if (!this.currency.equals(other.currency)) {
			return false;
		}

		return equal(this.toDinero(), other.toDinero());
	}

	/**
	 * Verifica se este valor é maior que outro da mesma moeda.
	 *
	 * @param other Valor monetário a ser comparado.
	 * @returns `true` quando este valor é maior que o informado.
	 * @throws {CurrencyMismatchError} Quando os valores possuem moedas diferentes.
	 */
	greaterThan(other: Money): boolean {
		this.ensureSameCurrency(other);

		return greaterThan(this.toDinero(), other.toDinero());
	}

	/**
	 * Verifica se este valor é menor que outro da mesma moeda.
	 *
	 * @param other Valor monetário a ser comparado.
	 * @returns `true` quando este valor é menor que o informado.
	 * @throws {CurrencyMismatchError} Quando os valores possuem moedas diferentes.
	 */
	lessThan(other: Money): boolean {
		this.ensureSameCurrency(other);

		return lessThan(this.toDinero(), other.toDinero());
	}

	/**
	 * Obtém a representação decimal neutra fornecida pelo Dinero.
	 *
	 * O resultado não aplica localização, símbolo monetário ou regras de
	 * apresentação para interfaces de usuário.
	 *
	 * @returns Representação decimal não localizada do valor.
	 */
	toDecimal(): string {
		return toDecimal(this.toDinero());
	}

	/**
	 * Converte o Value Object para a representação interna usada pelo Dinero.
	 *
	 * @returns Objeto do Dinero com o valor, a moeda e sua escala monetária.
	 */
	private toDinero() {
		return dinero({
			amount: this.amount,
			currency: this.currency,
		});
	}

	/**
	 * Garante a invariante de que operações entre valores monetários utilizem
	 * moedas equivalentes.
	 *
	 * @param other Valor cuja moeda será validada.
	 * @throws {CurrencyMismatchError} Quando a moeda do valor é incompatível.
	 */
	private ensureSameCurrency(other: Money): void {
		if (!this.currency.equals(other.currency)) {
			throw new CurrencyMismatchError(
				this.currency.code,
				other.currency.code,
			);
		}
	}
}
