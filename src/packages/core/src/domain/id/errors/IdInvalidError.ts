import { DomainError } from "../../../errors";

/**
 * Erro de domínio lançado ao tentar criar um identificador sem conteúdo.
 */
export class IdInvalidError extends DomainError {
    /**
     * Cria o erro associado a um valor inválido de identificador.
     *
     * @param message Mensagem personalizada; quando omitida, usa a mensagem padrão do domínio.
     */
    constructor(message?: string){
        super("ID_VALUE_INVALID", message ?? "ID cannot be empty");
    }
}
