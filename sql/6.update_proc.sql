CREATE PROCEDURE atualizarContato
    @idPessoa INT,
    @nome varchar(255) = NULL,
    @dataNascimento Date = NULL,
    @observacoes varchar(255) = NULL,
    @email varchar(255) = NULL,
    @telefone varchar(12) = NULL
AS
    IF (EXISTS (SELECT 1 FROM Contatos WHERE idPessoa = @idPessoa))
        BEGIN
            UPDATE Contatos
                SET
                    nome = CASE WHEN @nome='' OR @nome is NULL THEN nome ELSE @nome  END,
                    dataNascimento = CASE WHEN @dataNascimento='' OR @dataNascimento is NULL THEN dataNascimento ELSE @dataNascimento  END,
                    observacoes = CASE WHEN @observacoes='' OR @observacoes is NULL THEN observacoes ELSE @observacoes  END,
                    email = CASE WHEN @email='' OR @email is NULL THEN email ELSE @email  END,
                    telefone = CASE WHEN @telefone='' OR @telefone is NULL THEN telefone ELSE @telefone  END
                WHERE
                    idPessoa = @idPessoa
            SELECT 'OK'
        END
    ELSE SELECT 'Contato com ID não existe!'