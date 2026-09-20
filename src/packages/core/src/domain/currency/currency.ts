import { CurrencyBaseInvalidError, CurrencyCodeRequiredError, CurrencyExponentInvalidError } from "./errors";

/**
 * Dados necessários para definir uma moeda e sua escala monetária.
 *
 * `base` e `exponent` descrevem a estrutura de escala utilizada pelo Dinero.
 * Por exemplo, uma moeda com base `10n` e exponent `2n` possui 100 unidades
 * mínimas para cada unidade principal.
 */
export type CurrencyType = {
  /** Código da moeda, normalizado por {@link Currency.create}. */
  code: string;
  /** Nome descritivo da moeda. */
  name: string;
  /** Símbolo convencional da moeda. */
  symbol: string;
  /** Base numérica usada no cálculo da escala monetária. */
  base: bigint;
  /** Expoente aplicado à base para determinar a escala monetária. */
  exponent: bigint;
};

/**
 * Representa uma moeda como um Value Object (Objeto de Valor) imutável.
 *
 * A equivalência monetária é definida por `code`, `base` e `exponent`.
 * O nome e o símbolo são dados descritivos e não participam dessa identidade.
 */
export class Currency implements CurrencyType{
    /**
     * Código normalizado da moeda, sem espaços nas extremidades e em maiúsculas.
     */
    public readonly code: string;
    /**
     * Nome descritivo da moeda.
     */
    public readonly name: string;
    /**
     * Símbolo convencional da moeda.
     */
    public readonly symbol: string;
    /**
     * Base numérica usada pelo Dinero para determinar a escala monetária.
     */
    public readonly base: bigint;
    /**
     * Expoente aplicado à base pelo Dinero para determinar a escala monetária.
     */
    public readonly exponent: bigint;

    /**
     * Restringe a instanciação à factory {@link Currency.create}, garantindo
     * que toda moeda tenha sido previamente normalizada e validada.
     *
     * @param args Dados já normalizados e validados da moeda.
     */
    private constructor(args: CurrencyType){
        this.code = args.code;
        this.name = args.name;
        this.symbol = args.symbol;
        this.base = args.base;
        this.exponent = args.exponent;
    }

    /**
     * Cria uma moeda válida e normaliza seu código.
     *
     * O código tem os espaços das extremidades removidos e é convertido para
     * maiúsculas. A base deve ser positiva e o expoente não pode ser negativo.
     *
     * @param currency Dados que definem a moeda.
     * @returns Uma nova moeda imutável com o código normalizado.
     * @throws {CurrencyCodeRequiredError} Quando o código é vazio após a normalização.
     * @throws {CurrencyBaseInvalidError} Quando a base é menor ou igual a zero.
     * @throws {CurrencyExponentInvalidError} Quando o expoente é negativo.
     */
    static create(currency: CurrencyType): Currency {
        const code = currency.code.trim().toUpperCase();

        if (!code) {
            throw new CurrencyCodeRequiredError;
        }

        if (currency.base <= 0n) {
            throw new CurrencyBaseInvalidError;
        }

        if (currency.exponent < 0n) {
            throw new CurrencyExponentInvalidError;
        }

        return new Currency({...currency, code});
    }

    /**
     * Verifica a equivalência monetária entre duas moedas.
     *
     * Duas moedas são equivalentes quando possuem o mesmo código, base e
     * expoente, independentemente de seus nomes ou símbolos.
     *
     * @param currency Moeda a ser comparada.
     * @returns `true` quando as moedas possuem a mesma identidade monetária.
     */
    public equals(currency: Currency): boolean {
        return (
            this.code === currency.code &&
            this.base === currency.base &&
            this.exponent === currency.exponent
        );
    }
}
