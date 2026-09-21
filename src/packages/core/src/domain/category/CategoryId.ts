import { Id } from "../id";

/**
 * Identificador de domínio específico de uma categoria.
 *
 * Herda de {@link Id} a validação, a imutabilidade e a comparação por valor.
 */
export class CategoryId extends Id {

    /**
     * Restringe a instanciação à factory {@link CategoryId.create}.
     *
     * @param value Valor textual do identificador.
     */
    private constructor(value: string) {
        super(value);
    }

    /**
     * Cria um identificador válido para uma categoria.
     *
     * @param value Valor textual do identificador.
     * @returns Um novo identificador imutável de categoria.
     * @throws {IdInvalidError} Quando o valor é vazio ou contém somente espaços.
     */
    public static create(value: string): CategoryId {
        return new CategoryId(value);
    }
}
