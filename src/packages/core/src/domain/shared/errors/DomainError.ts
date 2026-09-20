
/**
 * Representa a classe base dos erros originados por regras do domínio.
 *
 * Cada erro possui um código estável, adequado para identificação pela
 * aplicação, e uma mensagem descritiva destinada a fornecer contexto sobre a
 * violação ocorrida.
 */
export class DomainError extends Error {
    /**
     * Cria um erro de domínio com código e mensagem próprios.
     *
     * @param code Identificador estável do tipo de erro de domínio.
     * @param message Descrição da violação da regra de domínio.
     */
    constructor(
        /**
         * Identificador estável do tipo de erro de domínio.
         */
        public readonly code: string,
        message: string,
    ) {
        super(message);

        this.name = "DomainError";
    }
}
