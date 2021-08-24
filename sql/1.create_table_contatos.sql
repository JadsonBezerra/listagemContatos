USE wipro
CREATE TABLE Contatos (
    idPessoa int IDENTITY(1,1) PRIMARY KEY,
    nome varchar(255) NOT NULL,
    dataNascimento DATE,
    observacoes varchar(255)
);