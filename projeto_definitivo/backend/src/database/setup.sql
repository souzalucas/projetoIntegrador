CREATE DATABASE IF NOT EXISTS estadio;

USE estadio;

CREATE TABLE IF NOT EXISTS areas_de_atividade (
    ID          int NOT NULL AUTO_INCREMENT,
    Nome        varchar(50) NOT NULL,
    Descricao    char(100) NOT NULL,
    PRIMARY KEY (ID)
);

INSERT INTO areas_de_atividade(Nome,Descricao) VALUES ('Piscina', 'Piscina Olímpica');