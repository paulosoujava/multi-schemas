DROP TABLE IF EXISTS DB_HEROIS;
CREATE TABLE DB_HEROIS(
  ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
  NOME TEXT NOT NULL,
  PODER TEXT NOT NULL
)

INSERT INTO DB_HEROIS(NOME, PODER)
  VALUES
   ('Flash', 'Velocidade'),
   ('Aquaman', 'Falar com os animais'),
   ('Bataman', 'Dinheiro')


   