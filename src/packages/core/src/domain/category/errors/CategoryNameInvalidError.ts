import { DomainError } from "../../../errors";

/**
 * Erro de domínio lançado quando o nome de uma categoria não possui conteúdo.
 */
export class CategoryNameInvalidError extends DomainError {
    
    /**
     * Cria o erro associado a um nome inválido de categoria.
     *
     * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
     */
    constructor(message?: string){
        super("CATEGORY_NAME_INVALID", message ?? "Name cannot be empty");
    }
}
