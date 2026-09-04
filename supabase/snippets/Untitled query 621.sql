ALTER TABLE partidos ADD COLUMN IF NOT EXISTS penaltis bool DEFAULT false;
ALTER TABLE partidos ADD COLUMN IF NOT EXISTS goles_penaltis_local int DEFAULT 0;
ALTER TABLE partidos ADD COLUMN IF NOT EXISTS goles_penaltis_visitante int DEFAULT 0;
ALTER TABLE partidos ADD COLUMN IF NOT EXISTS eventos_penaltis jsonb DEFAULT '[]';