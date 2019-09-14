CREATE DATABASE IF NOT EXISTS estadio;

USE estadio;

CREATE TABLE IF NOT EXISTS Alunos (
    ID      int NOT NULL AUTO_INCREMENT,
    Nome    varchar(150) NOT NULL,
    CPF     char(11) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO Alunos(Nome,CPF) VALUES ('Aluno1', '12345678901');