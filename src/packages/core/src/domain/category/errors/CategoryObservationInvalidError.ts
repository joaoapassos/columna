import { DomainError } from "../../../errors";

/**
 * Erro de domínio lançado quando a observação de uma categoria não possui conteúdo.
 */
export class CategoryObservationInvalidError extends DomainError {
    
    /**
     * Cria o erro associado a uma observação inválida de categoria.
     *
     * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
     */
    constructor(message?: string){
        super("CATEGORY_OBSERVATION_INVALID", message ?? "Observation cannot be empty");
    }
}
