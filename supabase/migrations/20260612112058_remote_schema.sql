


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";





SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."activity_log" (
    "id" integer NOT NULL,
    "jugador_id" integer,
    "jugador_nombre" "text",
    "accion" "text" NOT NULL,
    "entidad" "text" NOT NULL,
    "detalle" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "temporada_id" integer
);


ALTER TABLE "public"."activity_log" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."activity_log_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."activity_log_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."activity_log_id_seq" OWNED BY "public"."activity_log"."id";



CREATE TABLE IF NOT EXISTS "public"."alineaciones" (
    "id" integer NOT NULL,
    "partido_id" integer,
    "formacion" "text" DEFAULT '1-3-2-1'::"text",
    "jugadores" "jsonb" DEFAULT '[]'::"jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "temporada_id" integer
);


ALTER TABLE "public"."alineaciones" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."alineaciones_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."alineaciones_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."alineaciones_id_seq" OWNED BY "public"."alineaciones"."id";



CREATE TABLE IF NOT EXISTS "public"."clasificacion" (
    "id" integer NOT NULL,
    "pos" integer,
    "equipo" "text" NOT NULL,
    "pj" integer DEFAULT 0,
    "pg" integer DEFAULT 0,
    "pe" integer DEFAULT 0,
    "pp" integer DEFAULT 0,
    "gf" integer DEFAULT 0,
    "gc" integer DEFAULT 0,
    "pts" integer DEFAULT 0,
    "grupo" "text" DEFAULT 'A'::"text",
    "temporada_id" integer
);


ALTER TABLE "public"."clasificacion" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."clasificacion_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."clasificacion_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."clasificacion_id_seq" OWNED BY "public"."clasificacion"."id";



CREATE TABLE IF NOT EXISTS "public"."comentarios" (
    "id" integer NOT NULL,
    "partido_id" integer,
    "jugador_id" integer,
    "nombre" "text" NOT NULL,
    "texto" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."comentarios" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."comentarios_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."comentarios_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."comentarios_id_seq" OWNED BY "public"."comentarios"."id";



CREATE TABLE IF NOT EXISTS "public"."estadisticas" (
    "id" integer NOT NULL,
    "jugador_id" integer,
    "partido_id" integer,
    "goles" integer DEFAULT 0,
    "asistencias" integer DEFAULT 0,
    "tarjetas_amarillas" integer DEFAULT 0,
    "tarjetas_rojas" integer DEFAULT 0,
    "minutos" integer DEFAULT 90,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "paradas" integer DEFAULT 0,
    "goles_encajados" integer DEFAULT 0,
    "temporada_id" integer
);


ALTER TABLE "public"."estadisticas" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."estadisticas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."estadisticas_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."estadisticas_id_seq" OWNED BY "public"."estadisticas"."id";



CREATE TABLE IF NOT EXISTS "public"."jugadores" (
    "id" integer NOT NULL,
    "nombre" "text" NOT NULL,
    "posicion" "text",
    "dorsal" integer,
    "activo" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "foto_url" "text",
    "estado" "text" DEFAULT 'disponible'::"text",
    "estado_desc" "text",
    CONSTRAINT "jugadores_posicion_check" CHECK (("posicion" = ANY (ARRAY['Portero'::"text", 'Defensa'::"text", 'Centrocampista'::"text", 'Extremo'::"text", 'Delantero'::"text"])))
);


ALTER TABLE "public"."jugadores" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."jugadores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."jugadores_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."jugadores_id_seq" OWNED BY "public"."jugadores"."id";



CREATE TABLE IF NOT EXISTS "public"."noticias" (
    "id" bigint NOT NULL,
    "titulo" "text" NOT NULL,
    "imagen_url" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."noticias" OWNER TO "postgres";


ALTER TABLE "public"."noticias" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."noticias_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."partidos" (
    "id" integer NOT NULL,
    "jornada" integer NOT NULL,
    "fecha" "date" NOT NULL,
    "local" "text" NOT NULL,
    "visitante" "text" NOT NULL,
    "goles_local" integer DEFAULT 0,
    "goles_visitante" integer DEFAULT 0,
    "campo" "text" DEFAULT 'Campo Municipal'::"text",
    "jugado" boolean DEFAULT false,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "mvp_jugador_id" integer,
    "alineacion" "jsonb",
    "formacion" "text" DEFAULT '1-3-2-1'::"text",
    "temporada_id" integer,
    "amistoso" boolean DEFAULT false,
    "hora" "text",
    "escudo_rival_url" "text",
    "convocados" "jsonb" DEFAULT '[]'::"jsonb"
);


ALTER TABLE "public"."partidos" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."partidos_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."partidos_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."partidos_id_seq" OWNED BY "public"."partidos"."id";



CREATE TABLE IF NOT EXISTS "public"."patrocinadores" (
    "id" integer NOT NULL,
    "imagen_url" "text" NOT NULL,
    "nombre" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."patrocinadores" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."patrocinadores_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."patrocinadores_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."patrocinadores_id_seq" OWNED BY "public"."patrocinadores"."id";



CREATE TABLE IF NOT EXISTS "public"."push_subscriptions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "endpoint" "text" NOT NULL,
    "p256dh" "text" NOT NULL,
    "auth" "text" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."push_subscriptions" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."stats_jugadores" WITH ("security_invoker"='true') AS
 SELECT "id",
    "jugador_id",
    "partido_id",
    "goles",
    "asistencias",
    "tarjetas_amarillas",
    "tarjetas_rojas",
    "minutos",
    "created_at",
    "paradas",
    "goles_encajados",
    "temporada_id"
   FROM "public"."estadisticas";


ALTER VIEW "public"."stats_jugadores" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."temporadas" (
    "id" integer NOT NULL,
    "nombre" "text" NOT NULL,
    "año" integer NOT NULL,
    "activa" boolean DEFAULT true,
    "created_at" timestamp with time zone DEFAULT "now"()
);


ALTER TABLE "public"."temporadas" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."temporadas_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."temporadas_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."temporadas_id_seq" OWNED BY "public"."temporadas"."id";



CREATE TABLE IF NOT EXISTS "public"."votos_mvp" (
    "id" integer NOT NULL,
    "partido_id" integer,
    "votante_id" integer,
    "votado_id" integer,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "temporada_id" integer
);


ALTER TABLE "public"."votos_mvp" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."votos_mvp_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE "public"."votos_mvp_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."votos_mvp_id_seq" OWNED BY "public"."votos_mvp"."id";



ALTER TABLE ONLY "public"."activity_log" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."activity_log_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."alineaciones" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."alineaciones_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."clasificacion" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."clasificacion_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."comentarios" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."comentarios_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."estadisticas" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."estadisticas_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."jugadores" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."jugadores_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."partidos" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."partidos_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."patrocinadores" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."patrocinadores_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."temporadas" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."temporadas_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."votos_mvp" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."votos_mvp_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."activity_log"
    ADD CONSTRAINT "activity_log_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."alineaciones"
    ADD CONSTRAINT "alineaciones_partido_id_key" UNIQUE ("partido_id");



ALTER TABLE ONLY "public"."alineaciones"
    ADD CONSTRAINT "alineaciones_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."clasificacion"
    ADD CONSTRAINT "clasificacion_equipo_key" UNIQUE ("equipo");



ALTER TABLE ONLY "public"."clasificacion"
    ADD CONSTRAINT "clasificacion_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."comentarios"
    ADD CONSTRAINT "comentarios_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."estadisticas"
    ADD CONSTRAINT "estadisticas_jugador_id_partido_id_key" UNIQUE ("jugador_id", "partido_id");



ALTER TABLE ONLY "public"."estadisticas"
    ADD CONSTRAINT "estadisticas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."jugadores"
    ADD CONSTRAINT "jugadores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."noticias"
    ADD CONSTRAINT "noticias_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."partidos"
    ADD CONSTRAINT "partidos_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."patrocinadores"
    ADD CONSTRAINT "patrocinadores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."push_subscriptions"
    ADD CONSTRAINT "push_subscriptions_endpoint_key" UNIQUE ("endpoint");



ALTER TABLE ONLY "public"."push_subscriptions"
    ADD CONSTRAINT "push_subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."temporadas"
    ADD CONSTRAINT "temporadas_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."votos_mvp"
    ADD CONSTRAINT "votos_mvp_partido_id_votante_id_key" UNIQUE ("partido_id", "votante_id");



ALTER TABLE ONLY "public"."votos_mvp"
    ADD CONSTRAINT "votos_mvp_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_log"
    ADD CONSTRAINT "activity_log_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "public"."jugadores"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."activity_log"
    ADD CONSTRAINT "activity_log_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "public"."temporadas"("id");



ALTER TABLE ONLY "public"."alineaciones"
    ADD CONSTRAINT "alineaciones_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "public"."partidos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."alineaciones"
    ADD CONSTRAINT "alineaciones_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "public"."temporadas"("id");



ALTER TABLE ONLY "public"."clasificacion"
    ADD CONSTRAINT "clasificacion_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "public"."temporadas"("id");



ALTER TABLE ONLY "public"."comentarios"
    ADD CONSTRAINT "comentarios_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "public"."jugadores"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."comentarios"
    ADD CONSTRAINT "comentarios_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "public"."partidos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."estadisticas"
    ADD CONSTRAINT "estadisticas_jugador_id_fkey" FOREIGN KEY ("jugador_id") REFERENCES "public"."jugadores"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."estadisticas"
    ADD CONSTRAINT "estadisticas_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "public"."partidos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."estadisticas"
    ADD CONSTRAINT "estadisticas_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "public"."temporadas"("id");



ALTER TABLE ONLY "public"."partidos"
    ADD CONSTRAINT "partidos_mvp_jugador_id_fkey" FOREIGN KEY ("mvp_jugador_id") REFERENCES "public"."jugadores"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."partidos"
    ADD CONSTRAINT "partidos_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "public"."temporadas"("id");



ALTER TABLE ONLY "public"."votos_mvp"
    ADD CONSTRAINT "votos_mvp_partido_id_fkey" FOREIGN KEY ("partido_id") REFERENCES "public"."partidos"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."votos_mvp"
    ADD CONSTRAINT "votos_mvp_temporada_id_fkey" FOREIGN KEY ("temporada_id") REFERENCES "public"."temporadas"("id");



ALTER TABLE ONLY "public"."votos_mvp"
    ADD CONSTRAINT "votos_mvp_votado_id_fkey" FOREIGN KEY ("votado_id") REFERENCES "public"."jugadores"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."votos_mvp"
    ADD CONSTRAINT "votos_mvp_votante_id_fkey" FOREIGN KEY ("votante_id") REFERENCES "public"."jugadores"("id") ON DELETE CASCADE;



CREATE POLICY "acceso_alineaciones" ON "public"."alineaciones" USING (true) WITH CHECK (true);



ALTER TABLE "public"."activity_log" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."alineaciones" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "borrar_suscripcion" ON "public"."push_subscriptions" FOR DELETE USING (true);



ALTER TABLE "public"."clasificacion" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."comentarios" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "delete anon" ON "public"."push_subscriptions" FOR DELETE TO "anon" USING (true);



CREATE POLICY "escritura_clasificacion" ON "public"."clasificacion" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_comentarios" ON "public"."comentarios" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_estadisticas" ON "public"."estadisticas" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_jugadores" ON "public"."jugadores" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_partidos" ON "public"."partidos" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_patrocinadores" ON "public"."patrocinadores" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_temporadas" ON "public"."temporadas" USING (true) WITH CHECK (true);



CREATE POLICY "escritura_votos" ON "public"."votos_mvp" USING (true) WITH CHECK (true);



ALTER TABLE "public"."estadisticas" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "insert anon" ON "public"."push_subscriptions" FOR INSERT TO "anon" WITH CHECK (true);



CREATE POLICY "insertar_log" ON "public"."activity_log" FOR INSERT WITH CHECK (true);



CREATE POLICY "insertar_suscripcion" ON "public"."push_subscriptions" FOR INSERT WITH CHECK (true);



ALTER TABLE "public"."jugadores" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "lectura_clasificacion" ON "public"."clasificacion" FOR SELECT USING (true);



CREATE POLICY "lectura_comentarios" ON "public"."comentarios" FOR SELECT USING (true);



CREATE POLICY "lectura_estadisticas" ON "public"."estadisticas" FOR SELECT USING (true);



CREATE POLICY "lectura_jugadores" ON "public"."jugadores" FOR SELECT USING (true);



CREATE POLICY "lectura_log" ON "public"."activity_log" FOR SELECT USING (true);



CREATE POLICY "lectura_partidos" ON "public"."partidos" FOR SELECT USING (true);



CREATE POLICY "lectura_patrocinadores" ON "public"."patrocinadores" FOR SELECT USING (true);



CREATE POLICY "lectura_temporadas" ON "public"."temporadas" FOR SELECT USING (true);



CREATE POLICY "lectura_votos" ON "public"."votos_mvp" FOR SELECT USING (true);



CREATE POLICY "leer_suscripciones" ON "public"."push_subscriptions" FOR SELECT USING (true);



ALTER TABLE "public"."noticias" ENABLE ROW LEVEL SECURITY;


CREATE POLICY "noticias DELETE" ON "public"."noticias" FOR DELETE TO "authenticated", "anon" USING (true);



CREATE POLICY "noticias INSERT" ON "public"."noticias" FOR INSERT TO "authenticated", "anon" WITH CHECK (true);



CREATE POLICY "noticias SELECT" ON "public"."noticias" FOR SELECT TO "authenticated", "anon" USING (true);



ALTER TABLE "public"."partidos" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."patrocinadores" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."push_subscriptions" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."temporadas" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."votos_mvp" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";





































































































































































GRANT ALL ON TABLE "public"."activity_log" TO "anon";
GRANT ALL ON TABLE "public"."activity_log" TO "authenticated";
GRANT ALL ON TABLE "public"."activity_log" TO "service_role";



GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."activity_log_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."alineaciones" TO "anon";
GRANT ALL ON TABLE "public"."alineaciones" TO "authenticated";
GRANT ALL ON TABLE "public"."alineaciones" TO "service_role";



GRANT ALL ON SEQUENCE "public"."alineaciones_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."alineaciones_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."alineaciones_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."clasificacion" TO "anon";
GRANT ALL ON TABLE "public"."clasificacion" TO "authenticated";
GRANT ALL ON TABLE "public"."clasificacion" TO "service_role";



GRANT ALL ON SEQUENCE "public"."clasificacion_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."clasificacion_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."clasificacion_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."comentarios" TO "anon";
GRANT ALL ON TABLE "public"."comentarios" TO "authenticated";
GRANT ALL ON TABLE "public"."comentarios" TO "service_role";



GRANT ALL ON SEQUENCE "public"."comentarios_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."comentarios_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."comentarios_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."estadisticas" TO "anon";
GRANT ALL ON TABLE "public"."estadisticas" TO "authenticated";
GRANT ALL ON TABLE "public"."estadisticas" TO "service_role";



GRANT ALL ON SEQUENCE "public"."estadisticas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."estadisticas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."estadisticas_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."jugadores" TO "anon";
GRANT ALL ON TABLE "public"."jugadores" TO "authenticated";
GRANT ALL ON TABLE "public"."jugadores" TO "service_role";



GRANT ALL ON SEQUENCE "public"."jugadores_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."jugadores_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."jugadores_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."noticias" TO "anon";
GRANT ALL ON TABLE "public"."noticias" TO "authenticated";
GRANT ALL ON TABLE "public"."noticias" TO "service_role";



GRANT ALL ON SEQUENCE "public"."noticias_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."noticias_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."noticias_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."partidos" TO "anon";
GRANT ALL ON TABLE "public"."partidos" TO "authenticated";
GRANT ALL ON TABLE "public"."partidos" TO "service_role";



GRANT ALL ON SEQUENCE "public"."partidos_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."partidos_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."partidos_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."patrocinadores" TO "anon";
GRANT ALL ON TABLE "public"."patrocinadores" TO "authenticated";
GRANT ALL ON TABLE "public"."patrocinadores" TO "service_role";



GRANT ALL ON SEQUENCE "public"."patrocinadores_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."patrocinadores_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."patrocinadores_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."push_subscriptions" TO "anon";
GRANT ALL ON TABLE "public"."push_subscriptions" TO "authenticated";
GRANT ALL ON TABLE "public"."push_subscriptions" TO "service_role";



GRANT ALL ON TABLE "public"."stats_jugadores" TO "anon";
GRANT ALL ON TABLE "public"."stats_jugadores" TO "authenticated";
GRANT ALL ON TABLE "public"."stats_jugadores" TO "service_role";



GRANT ALL ON TABLE "public"."temporadas" TO "anon";
GRANT ALL ON TABLE "public"."temporadas" TO "authenticated";
GRANT ALL ON TABLE "public"."temporadas" TO "service_role";



GRANT ALL ON SEQUENCE "public"."temporadas_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."temporadas_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."temporadas_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."votos_mvp" TO "anon";
GRANT ALL ON TABLE "public"."votos_mvp" TO "authenticated";
GRANT ALL ON TABLE "public"."votos_mvp" TO "service_role";



GRANT ALL ON SEQUENCE "public"."votos_mvp_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."votos_mvp_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."votos_mvp_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";

drop policy "noticias DELETE" on "public"."noticias";

drop policy "noticias INSERT" on "public"."noticias";

drop policy "noticias SELECT" on "public"."noticias";


  create policy "noticias DELETE"
  on "public"."noticias"
  as permissive
  for delete
  to anon, authenticated
using (true);



  create policy "noticias INSERT"
  on "public"."noticias"
  as permissive
  for insert
  to anon, authenticated
with check (true);



  create policy "noticias SELECT"
  on "public"."noticias"
  as permissive
  for select
  to anon, authenticated
using (true);



  create policy "Public delete escudos-rivales"
  on "storage"."objects"
  as permissive
  for delete
  to public
using ((bucket_id = 'escudos-rivales'::text));



  create policy "Public read escudos-rivales"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'escudos-rivales'::text));



  create policy "Public update escudos-rivales"
  on "storage"."objects"
  as permissive
  for update
  to public
using ((bucket_id = 'escudos-rivales'::text));



  create policy "Public write escudos-rivales"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'escudos-rivales'::text));



  create policy "actualizacion_avatares"
  on "storage"."objects"
  as permissive
  for update
  to public
using ((bucket_id = 'avatares'::text));



  create policy "borrar patrocinador hfpijg_0"
  on "storage"."objects"
  as permissive
  for delete
  to public
using ((bucket_id = 'patrocinadores'::text));



  create policy "lectura_avatares"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'avatares'::text));



  create policy "noticias DELETE"
  on "storage"."objects"
  as permissive
  for delete
  to anon, authenticated
using ((bucket_id = 'noticias'::text));



  create policy "noticias INSERT"
  on "storage"."objects"
  as permissive
  for insert
  to anon, authenticated
with check ((bucket_id = 'noticias'::text));



  create policy "noticias SELECT"
  on "storage"."objects"
  as permissive
  for select
  to anon, authenticated
using ((bucket_id = 'noticias'::text));



  create policy "patrocinadores SELECT hfpijg_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using ((bucket_id = 'patrocinadores'::text));



  create policy "subida_avatares"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'avatares'::text));



  create policy "subir patrocinadores hfpijg_0"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'patrocinadores'::text));



  create policy "subir_portadas q7tx5a_0"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check ((bucket_id = 'NOTICIAS'::text));



