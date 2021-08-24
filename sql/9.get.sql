CREATE PROCEDURE getContato
    @idPessoa int
AS
    SELECT * FROM Contatos WHERE idPessoa = @idPessoa