CREATE DATABASE IF NOT EXISTS estadio;

USE estadio;

CREATE TABLE IF NOT EXISTS areas (
    ID_areas      int NOT NULL AUTO_INCREMENT,
    Nome          varchar(50) NOT NULL,
    Descricao     char(100) NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE IF NOT EXISTS atividades (
    ID_atividades  int NOT NULL AUTO_INCREMENT,
    ID_areas       int NOT NULL AUTO_INCREMENT,
    Nome           varchar(50) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (ID_areas) REFERENCES areas_de_atividade(ID_areas)
);

INSERT INTO areas_de_atividade(Nome,Descricao) VALUES ('Piscina', 'Piscina Olímpica');
INSERT INTO areas_de_atividade(Nome) VALUES ('Natação');