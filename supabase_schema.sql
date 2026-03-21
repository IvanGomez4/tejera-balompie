-- ================================================
-- TEJERA BALOMPIÉ — Schema Supabase
-- Ejecuta este archivo completo en el SQL Editor
-- ================================================

-- 1. JUGADORES
create table if not exists jugadores (
  id         serial primary key,
  nombre     text not null,
  posicion   text check (posicion in ('Portero','Defensa','Centrocampista','Extremo','Delantero')),
  dorsal     int,
  activo     boolean default true,
  created_at timestamptz default now()
);

-- 2. PARTIDOS
create table if not exists partidos (
  id               serial primary key,
  jornada          int not null,
  fecha            date not null,
  local            text not null,
  visitante        text not null,
  goles_local      int default 0,
  goles_visitante  int default 0,
  campo            text default 'Campo Municipal',
  jugado           boolean default false,
  created_at       timestamptz default now()
);

-- 3. ESTADÍSTICAS por jugador por partido
create table if not exists estadisticas (
  id                  serial primary key,
  jugador_id          int references jugadores(id) on delete cascade,
  partido_id          int references partidos(id)  on delete cascade,
  goles               int default 0,
  asistencias         int default 0,
  tarjetas_amarillas  int default 0,
  tarjetas_rojas      int default 0,
  minutos             int default 90,
  created_at          timestamptz default now(),
  unique(jugador_id, partido_id)
);

-- 4. CLASIFICACIÓN
create table if not exists clasificacion (
  id     serial primary key,
  pos    int,
  equipo text unique not null,
  pj     int default 0,
  pg     int default 0,
  pe     int default 0,
  pp     int default 0,
  gf     int default 0,
  gc     int default 0,
  pts    int default 0
);

-- ================================================
-- VISTA: totales por jugador (se calcula sola)
-- ================================================
create or replace view stats_jugadores as
select
  j.id,
  j.nombre,
  j.posicion,
  j.dorsal,
  count(distinct e.partido_id)           as partidos,
  coalesce(sum(e.goles), 0)             as goles,
  coalesce(sum(e.asistencias), 0)       as asistencias,
  coalesce(sum(e.tarjetas_amarillas),0) as tarjetas_amarillas,
  coalesce(sum(e.tarjetas_rojas), 0)    as tarjetas_rojas
from jugadores j
left join estadisticas e on e.jugador_id = j.id
where j.activo = true
group by j.id, j.nombre, j.posicion, j.dorsal;

-- ================================================
-- SEGURIDAD (RLS)
-- Lectura pública + escritura pública sin login
-- (cualquier jugador puede modificar desde el Admin)
-- ================================================
alter table jugadores     enable row level security;
alter table partidos      enable row level security;
alter table estadisticas  enable row level security;
alter table clasificacion enable row level security;

create policy "lectura_jugadores"
  on jugadores for select using (true);
create policy "escritura_jugadores"
  on jugadores for all using (true) with check (true);

create policy "lectura_partidos"
  on partidos for select using (true);
create policy "escritura_partidos"
  on partidos for all using (true) with check (true);

create policy "lectura_estadisticas"
  on estadisticas for select using (true);
create policy "escritura_estadisticas"
  on estadisticas for all using (true) with check (true);

create policy "lectura_clasificacion"
  on clasificacion for select using (true);
create policy "escritura_clasificacion"
  on clasificacion for all using (true) with check (true);
