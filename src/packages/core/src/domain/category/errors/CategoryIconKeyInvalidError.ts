import { DomainError } from "../../../errors";

/**
 * Erro de domínio lançado quando a chave do icone de uma categoria não possui conteúdo.
 */
export class CategoryIconKeyInvalidError extends DomainError {
    
    /**
     * Cria o erro associado a uma chave do icone inválida de categoria.
     *
     * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
     */
    constructor(message?: string){
        super("CATEGORY_ICONKEY_INVALID", message ?? "IconKey cannot be empty");
    }
}
