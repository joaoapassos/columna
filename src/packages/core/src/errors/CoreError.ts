/**
 * Classe base abstrata para erros conhecidos pelo package `core`.
 *
 * Centraliza os metadados comuns aos erros da aplicação: um código estável
 * para identificação programática, uma mensagem descritiva e, opcionalmente,
 * a causa original do erro por meio de {@link ErrorOptions}.
 */
export abstract class CoreError extends Error {
  /**
   * Inicializa um erro conhecido pelo `core`.
   *
   * O nome do erro é definido a partir da classe concreta instanciada, o que
   * preserva sua identificação ao estender esta classe ou uma de suas derivadas.
   *
   * @param code Identificador estável do tipo de erro.
   * @param message Descrição do erro ocorrido.
   * @param options Opções nativas do erro, incluindo uma possível causa original.
   */
  constructor(
    /**
     * Identificador estável do tipo de erro, adequado para tratamento programático.
     */
    public readonly code: string,
    message: string,
    options?: ErrorOptions,
  ) {
    super(message, options);

    this.name = new.target.name;
  }
}
