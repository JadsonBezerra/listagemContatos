CREATE PROCEDURE removerContato
    @idPessoa INT
AS
    IF (EXISTS (SELECT 1 FROM Contatos WHERE idPessoa = @idPessoa))
        BEGIN
            DELETE FROM Contatos WHERE idPessoa = @idPessoa
            SELECT 'OK'
        END
    ELSE SELECT 'Contato com ID não existe!'