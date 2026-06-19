-- 1. Añadimos la columna para la contraseña
ALTER TABLE jugadores ADD COLUMN IF NOT EXISTS clave_hash TEXT;

-- 2. Función para asignar la contraseña (soporta letras, números y símbolos)
CREATE OR REPLACE FUNCTION asignar_clave_jugador(p_jugador_id INT, p_clave TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE jugadores
  SET clave_hash = crypt(p_clave, gen_salt('bf'))
  WHERE id = p_jugador_id;
END;
$$;

-- 3. Función para validar el login
CREATE OR REPLACE FUNCTION validar_clave(p_jugador_id INT, p_clave TEXT)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_hash_guardado TEXT;
BEGIN
  SELECT clave_hash INTO v_hash_guardado FROM jugadores WHERE id = p_jugador_id;
  IF v_hash_guardado IS NULL THEN RETURN false; END IF;
  RETURN v_hash_guardado = crypt(p_clave, v_hash_guardado);
END;
$$;