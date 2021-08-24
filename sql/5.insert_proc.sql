CREATE PROCEDURE inserirContato
    @nome varchar(255),
    @dataNascimento Date,
    @observacoes varchar(255),
    @email varchar(255),
    @telefone varchar(12)
AS
    INSERT INTO Contatos(nome,dataNascimento,observacoes,email,telefone)
        VALUES (@nome,@dataNascimento,@observacoes, @email, @telefone);
    SELECT SCOPE_IDENTITY()