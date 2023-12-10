CREATE SEQUENCE SQ_FABRICANTE
  START WITH 1 -- Define o n�mero inicial da sequ�ncia
  INCREMENT BY 1;

-- Tabela fabricante
CREATE TABLE fabricante (
  idFabricante NUMBER DEFAULT SQ_FABRICANTE.NEXTVAL PRIMARY KEY,
  nomeFabricante VARCHAR2(50)
);

CREATE SEQUENCE SQ_USUARIO
  START WITH 1 -- Define o n�mero inicial da sequ�ncia
  INCREMENT BY 1; 

-- Tabela usuario
CREATE TABLE usuario (
  lgn NUMBER DEFAULT SQ_USUARIO.NEXTVAL PRIMARY KEY,
  prenome VARCHAR2(20) NOT NULL,
  sobrenome VARCHAR2(50) NOT NULL,
  pwr VARCHAR2(300) NOT NULL
);

CREATE SEQUENCE SQ_PECA
  START WITH 1 -- Define o n�mero inicial da sequ�ncia
  INCREMENT BY 1;

-- Tabela peca
CREATE TABLE peca (
  idPeca NUMBER DEFAULT SQ_PECA.NEXTVAL PRIMARY KEY,
  nomePeca VARCHAR2(50) NOT NULL,
  preco NUMBER,
  idFabricante NUMBER,
  CONSTRAINT fk_fabricante FOREIGN KEY (idFabricante) REFERENCES fabricante(idFabricante)
);

CREATE OR REPLACE PROCEDURE insere_usuario(
  p_prenome IN VARCHAR2,
  p_sobrenome IN VARCHAR2,
  p_pwr IN VARCHAR2
)
AS
  v_pwr_hash RAW(16);
BEGIN
      -- Criptografar a senha usando MD5
      DBMS_OBFUSCATION_TOOLKIT.MD5(input => UTL_RAW.CAST_TO_RAW(p_pwr), checksum => v_pwr_hash); 

      INSERT INTO usuario (prenome, sobrenome, pwr) VALUES (p_prenome, p_sobrenome, v_pwr_hash);
      DBMS_OUTPUT.PUT_LINE('Inser��o bem-sucedida para ' || p_prenome || ' ' || p_sobrenome);
      COMMIT;
    EXCEPTION
      WHEN OTHERS THEN

        DBMS_OUTPUT.PUT_LINE('Erro: ' || SQLERRM);
    ROLLBACK; 
END insere_usuario;


CREATE OR REPLACE PROCEDURE compara_usuario(
  p_lgn IN NUMBER,
  p_senha IN VARCHAR2,
  p_resultado OUT NUMBER
)
AS
  v_pwr_hash RAW(16);
  v_count NUMBER;
  v_stored_pwr RAW(16); -- Alterado para armazenar o hash MD5 como string hexadecimal
BEGIN
  SELECT COUNT(*) INTO v_count FROM usuario WHERE lgn = p_lgn;

  IF v_count > 0 THEN
    SELECT pwr INTO v_stored_pwr FROM usuario WHERE lgn = p_lgn;

    -- Converte a senha para o formato hexadecimal
   DBMS_OBFUSCATION_TOOLKIT.MD5(input => UTL_RAW.CAST_TO_RAW(p_senha), checksum => v_pwr_hash); 

    IF v_pwr_hash = v_stored_pwr THEN
      p_resultado := 1; -- true
    ELSE
      p_resultado := 0; -- false
    END IF;
  ELSE
    p_resultado := 0; -- false
  END IF;
EXCEPTION
  WHEN OTHERS THEN
    p_resultado := 0; -- false
    ROLLBACK;
END compara_usuario;

CREATE OR REPLACE VIEW view_usuarios AS
SELECT lgn, prenome, sobrenome 
FROM usuario;

select * from view_usuarios;

CREATE OR REPLACE TRIGGER bloquear_update
BEFORE UPDATE ON usuario
BEGIN
    RAISE_APPLICATION_ERROR(-20000, 'Atualiza��o nesta tabela n�o permitida.');
END;

EXEC insere_usuario('sergio', 'marques', '1234');
select * from usuario;


SET SERVEROUTPUT ON
DECLARE
  resultado NUMBER;
BEGIN
  compara_usuario(2, 'senoooooha', resultado);
  -- Voc� pode usar o resultado para qualquer l�gica necess�ria aqui
  -- Por exemplo, exibindo o resultado
  DBMS_OUTPUT.PUT_LINE('Resultado: ' || resultado);
END;