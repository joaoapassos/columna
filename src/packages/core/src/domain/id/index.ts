import { IdInvalidError } from "./errors";

/**
 * Classe base para identificadores de domínio imutáveis.
 *
 * A identidade é representada por uma string não vazia e a igualdade entre
 * identificadores é determinada pela correspondência exata desse valor.
 * Classes concretas devem estender `Id` para representar identificadores
 * específicos do domínio.
 */
export abstract class Id {
    /**
     * Valor textual imutável que representa o identificador.
     */
    public readonly value: string;
    
    /**
     * Inicializa um identificador e garante que seu valor não seja vazio.
     *
     * A validação desconsidera espaços nas extremidades apenas para verificar
     * se existe conteúdo; o valor original recebido é preservado.
     *
     * @param value Valor textual do identificador.
     * @throws {IdInvalidError} Quando o valor é vazio ou contém somente espaços.
     */
    protected constructor(value: string){
        if(!value.trim()) throw new IdInvalidError();

        this.value = value;
    }

    /**
     * Verifica a igualdade entre este identificador e outro.
     *
     * @param other Identificador a ser comparado.
     * @returns `true` quando os valores dos identificadores são exatamente iguais.
     */
    public equals(other: Id): boolean {
        return this.value === other.value;
    }
    
    /**
     * Verifica a igualdade entre dois identificadores.
     *
     * Esta é a forma estática equivalente a `initial.equals(other)`.
     *
     * @param initial Primeiro identificador da comparação.
     * @param other Segundo identificador da comparação.
     * @returns `true` quando os valores dos identificadores são exatamente iguais.
     */
    public static equals(initial: Id, other: Id): boolean {
        return initial.value === other.value;
    }


    /**
     * Obtém a representação textual do identificador.
     *
     * @returns O valor original armazenado no identificador.
     */
    public toString(): string {
        return this.value;
    }
}
