import type { CategoryId } from "./CategoryId"
import { CategoryIconKeyInvalidError, CategoryNameInvalidError, CategoryObservationInvalidError } from "./errors";

/**
 * Dados necessários para criar e reconstituir uma categoria.
 */
type CategoryType = {
    /** Identificador único da categoria. */
    id: CategoryId,
    /** Nome que identifica a categoria para o usuário. */
    name: string,
    /** Informação complementar opcional sobre a categoria. */
    observation?: string,
    /** Chave opcional do ícone associado à categoria. */
    iconKey?: string,
    /** Data de criação da categoria. */
    createdAt: Date,
    /** Data da última atualização da categoria. */
    updatedAt: Date,
    /** Data de desativação; quando ausente, a categoria está ativa. */
    deactivatedAt?: Date,
}

/**
 * Representa uma categoria do domínio.
 *
 * A categoria possui identidade própria, pode ter observação e ícone opcionais
 * e controla seu estado de ativação pela presença da data de desativação.
 */
export class Category {
    /** Identificador imutável da categoria. */
    protected readonly id: CategoryId;
    /** Nome atual da categoria. */
    protected name: string;
    /** Informação complementar opcional. */
    protected observation?: string;
    /** Chave opcional do ícone associado. */
    protected iconKey?: string;
    /** Data em que a categoria foi criada. */
    protected createdAt: Date;
    /** Data da última atualização da categoria. */
    protected updatedAt: Date;
    /** Data de desativação; ausente enquanto a categoria estiver ativa. */
    protected deactivatedAt?: Date;

    /**
     * Inicializa uma categoria a partir de dados previamente validados.
     *
     * Observações sem conteúdo são desconsideradas, e as datas de criação e
     * atualização são inicializadas com o instante atual.
     *
     * @param args Dados usados na criação da categoria.
     */
    protected constructor(args: Omit<CategoryType, "createdAt" | "updateAt">) {
        this.id = args.id;
        this.name = args.name;
        if(args.observation?.trim()) this.observation = args.observation;
        if(args.iconKey) this.iconKey = args.iconKey;
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
        if(args.deactivatedAt) this.deactivatedAt = args.deactivatedAt;
    }

    /**
     * Cria uma categoria com nome válido.
     *
     * @param args Dados que definem a categoria.
     * @returns Uma nova categoria.
     * @throws {CategoryNameInvalidError} Quando o nome é vazio ou contém somente espaços.
     */
    public static create(args: Omit<CategoryType, "createdAt" | "updateAt">): Category {
        if(!args.name.trim()) throw new CategoryNameInvalidError();
        
        return new Category(args);
    }

    /**
     * Altera o nome da categoria.
     *
     * @param name Novo nome da categoria.
     * @throws {CategoryNameInvalidError} Quando o nome é vazio ou contém somente espaços.
     */
    public rename(name: string): void {
        if(!name.trim()) throw new CategoryNameInvalidError();

        this.name = name;
    }

    /**
     * Altera ou remove a observação da categoria.
     *
     * Quando informado, o texto deve conter ao menos um caractere que não seja
     * espaço. O valor `undefined` remove a observação atual.
     *
     * @param observation Nova observação ou `undefined` para removê-la.
     * @throws {Error} Quando a observação informada é vazia ou contém somente espaços.
     */
    public changeObservation(observation?: string): void {
        if(observation === undefined) {
            this.removeObservation();
            return;
        }

        if(!observation.trim()) {
            throw new CategoryObservationInvalidError();
        }

        this.observation = observation;
    }

    /**
     * Remove a observação da categoria.
     */
    public removeObservation(): void {
        delete this.observation;
    }

    /**
     * Ativa a categoria removendo sua data de desativação.
     */
    public activate(): void {
        delete this.deactivatedAt;
    }

    /**
     * Desativa a categoria no instante atual.
     */
    public deactivate(): void {
        this.deactivatedAt = new Date();
    }

    /**
     * Verifica se a categoria está ativa.
     *
     * @returns `true` quando não existe uma data de desativação.
     */
    public isActive(): boolean {
        return this.deactivatedAt === undefined;
    }

    /**
     * Altera o ícone associado à categoria.
     *
     * Quando informado, a chave deve conter ao menos um caractere que não seja
     * espaço. A chave `undefined` remove o icone atual.
     * 
     * @param iconKey Nova chave do ícone.
     * @throws {Error} Quando a chave é vazia ou contém somente espaços.
     */
    public changeIcon(iconKey?: string): void {
        if(iconKey === undefined) {
            this.removeIcon();
            return;
        }
        
        if(!iconKey.trim()) throw new CategoryIconKeyInvalidError();

        this.iconKey = iconKey;
    }

    /**
     * Remove o ícone associado à categoria.
     */
    public removeIcon(): void {
        delete this.iconKey;
    }

    /**
     * Obtém o identificador da categoria sem aplicar validações adicionais.
     *
     * @returns Identificador da categoria.
     */
    public getId(): CategoryId {
        return this.id;
    }

    /**
     * Obtém o nome atual da categoria sem aplicar validações adicionais.
     *
     * @returns Nome da categoria.
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Obtém a observação da categoria sem aplicar validações adicionais.
     *
     * @returns Observação atual ou `undefined` quando não estiver definida.
     */
    public getObservation(): string | undefined {
        return this.observation;
    }

    /**
     * Obtém a chave do ícone sem aplicar validações adicionais.
     *
     * @returns Chave do ícone ou `undefined` quando não estiver definida.
     */
    public getIconKey(): string | undefined {
        return this.iconKey;
    }

    /**
     * Obtém a data de criação sem aplicar validações adicionais.
     *
     * @returns Data de criação da categoria.
     */
    public getCreatedAt(): Date {
        return this.createdAt;
    }

    /**
     * Obtém a data da última atualização sem aplicar validações adicionais.
     *
     * @returns Data da última atualização da categoria.
     */
    public getUpdateAt(): Date {
        return this.updatedAt;
    }

    /**
     * Obtém a data de desativação sem aplicar validações adicionais.
     *
     * @returns Data de desativação ou `undefined` quando a categoria estiver ativa.
     */
    public getDeactivatedAt(): Date | undefined {
        return this.deactivatedAt;
    }
}
