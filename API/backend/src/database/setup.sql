CREATE DATABASE IF NOT EXISTS estadio;

USE estadio;

CREATE TABLE IF NOT EXISTS areas (
    ID_areas      int NOT NULL AUTO_INCREMENT,
    Nome          varchar(50) NOT NULL,
    Descricao     char(100) NOT NULL,
    PRIMARY KEY (ID_areas)
);

CREATE TABLE IF NOT EXISTS atividades (
    ID_atividades  int NOT NULL AUTO_INCREMENT,
    Nome           varchar(50) NOT NULL,
    PRIMARY KEY (ID_atividades)
);

INSERT INTO areas(Nome,Descricao) VALUES ('Piscina', 'Piscina Olímpica');
INSERT INTO atividades(Nome) VALUES ('Natação');