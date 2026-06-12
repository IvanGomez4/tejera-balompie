SET session_replication_role = replica;

--
-- PostgreSQL database dump
--

-- \restrict i32S6D5NaJzA1wPZfOyqzZHNJDenxxH5Q3gXoLX0HHi3VilRlwG8f9xxk1kcvS6

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: jugadores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."jugadores" ("id", "nombre", "posicion", "dorsal", "activo", "created_at", "foto_url", "estado", "estado_desc") VALUES
	(4, 'Jerry', 'Defensa', 4, true, '2026-03-21 12:24:25.89113+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170373/jugador_4_i9waoh.jpg', 'disponible', NULL),
	(5, 'Jamie', 'Defensa', 21, true, '2026-03-21 12:25:28.974647+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170375/jugador_5_swrexh.jpg', 'disponible', NULL),
	(6, 'José Ger', 'Defensa', 3, true, '2026-03-21 12:25:46.521656+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170378/jugador_6_fxxbek.jpg', 'disponible', NULL),
	(7, 'Frozen', 'Defensa', 88, true, '2026-03-21 12:26:16.759287+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170364/jugador_7_eu5wmp.jpg', 'disponible', NULL),
	(8, 'Mark ', 'Centrocampista', 8, true, '2026-03-21 17:42:57.193418+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170365/jugador_8_tvlnnk.jpg', 'disponible', NULL),
	(9, 'Masca', 'Delantero', 7, true, '2026-03-21 17:43:15.279509+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170367/jugador_9_biqwo6.jpg', 'disponible', NULL),
	(10, 'Ruben', 'Delantero', 89, true, '2026-03-21 17:43:25.87228+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170381/jugador_10_u7ipc1.jpg', 'disponible', NULL),
	(11, 'Mota', 'Delantero', 18, true, '2026-03-21 17:44:07.015574+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170383/jugador_11_eocwhe.jpg', 'disponible', NULL),
	(12, 'Tonii', 'Defensa', 75, true, '2026-03-21 17:44:26.362534+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170386/jugador_12_g1hrtm.jpg', 'disponible', NULL),
	(15, 'Rix', 'Defensa', 28, true, '2026-03-23 19:42:58.278799+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170395/jugador_15_biyobf.jpg', 'disponible', NULL),
	(17, 'Alonsito', 'Centrocampista', 79, true, '2026-04-15 22:24:11.034151+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170398/jugador_17_clzcly.jpg', 'disponible', NULL),
	(29, 'Muli III', 'Defensa', 5, true, '2026-06-08 17:20:06.332311+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781171122/muli_iii_nkc9o5.jpg', 'disponible', NULL),
	(13, 'Jumpy', 'Delantero', 9, true, '2026-03-21 17:44:59.846739+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170389/jugador_13_lhwemw.jpg', 'disponible', NULL),
	(14, 'Chudi', 'Centrocampista', 10, true, '2026-03-21 17:46:55.77694+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170392/jugador_14_lwbpet.jpg', 'disponible', NULL),
	(2, 'Dada', 'Portero', 1, true, '2026-03-21 12:22:34.605787+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170369/jugador_2_b4kswh.jpg', 'disponible', NULL),
	(3, 'Javi', 'Centrocampista', 14, true, '2026-03-21 12:23:23.293866+00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781170370/jugador_3_p4dl5l.jpg', 'lesionado', 'Esguince de rodilla');


--
-- Data for Name: temporadas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."temporadas" ("id", "nombre", "año", "activa", "created_at") VALUES
	(1, 'Liga Verano Villacañas 2026', 2026, true, '2026-04-11 20:12:37.960834+00');


--
-- Data for Name: activity_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."activity_log" ("id", "jugador_id", "jugador_nombre", "accion", "entidad", "detalle", "created_at", "temporada_id") VALUES
	(1, 4, 'Jerry', '📰 Publicó', 'Noticia', 'srhgasa', '2026-04-11 19:32:51.154342+00', 1),
	(2, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '2', '2026-04-11 20:02:32.316377+00', 1),
	(3, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Fran', '2026-04-13 07:57:57.282588+00', NULL),
	(4, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Frozen', '2026-04-14 08:45:47.922849+00', NULL),
	(5, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Frozen', '2026-04-14 17:01:54.171583+00', NULL),
	(6, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Frozen', '2026-04-14 21:45:18.230889+00', NULL),
	(7, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Fran', '2026-04-14 21:49:30.654553+00', NULL),
	(8, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Mark ', '2026-04-14 21:50:38.56198+00', NULL),
	(9, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Pablo ', '2026-04-14 21:52:45.729441+00', NULL),
	(10, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Darío', '2026-04-14 21:53:33.731797+00', NULL),
	(11, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Jamie', '2026-04-15 22:07:11.723855+00', NULL),
	(12, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Darío es pillado en la isla Epstein', '2026-04-15 22:09:09.797355+00', NULL),
	(13, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Una guerra entre equipos, aunque tambien entre hermanos', '2026-04-15 22:10:59.502831+00', NULL),
	(14, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Darío', '2026-04-15 22:11:42.146401+00', NULL),
	(15, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Darío', '2026-04-15 22:12:08.92052+00', NULL),
	(16, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Pedro', '2026-04-15 22:14:26.160265+00', NULL),
	(17, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Pedro', '2026-04-15 22:22:26.703042+00', NULL),
	(18, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.130681+00', NULL),
	(19, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.156917+00', NULL),
	(20, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.175976+00', NULL),
	(21, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.284891+00', NULL),
	(22, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.289113+00', NULL),
	(23, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.390122+00', NULL),
	(24, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.394482+00', NULL),
	(25, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.470889+00', NULL),
	(26, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.468862+00', NULL),
	(27, 8, 'Mark ', '➕ Añadió', 'Jugador', 'Alonsito', '2026-04-15 22:24:11.49937+00', NULL),
	(28, 7, 'Frozen', '📰 Publicó', 'Noticia', 'No quiero futbolistas, quiero 11 DARIOS!!!! Viva Dehesa del Tallar!', '2026-04-15 22:24:22.586179+00', NULL),
	(29, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Tonii', '2026-04-15 22:24:33.597675+00', NULL),
	(30, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.712421+00', NULL),
	(31, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.705881+00', NULL),
	(32, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.724199+00', NULL),
	(33, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.796315+00', NULL),
	(34, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.802173+00', NULL),
	(35, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.813365+00', NULL),
	(36, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.813674+00', NULL),
	(37, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.810602+00', NULL),
	(38, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:35.820552+00', NULL),
	(39, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:36.942856+00', NULL),
	(40, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '26', '2026-04-15 22:24:37.06213+00', NULL),
	(41, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '25', '2026-04-15 22:24:38.314283+00', NULL),
	(42, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '24', '2026-04-15 22:24:39.384855+00', NULL),
	(43, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '23', '2026-04-15 22:24:41.543244+00', NULL),
	(44, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '22', '2026-04-15 22:24:42.66365+00', NULL),
	(45, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '21', '2026-04-15 22:24:43.684386+00', NULL),
	(46, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '20', '2026-04-15 22:24:44.718034+00', NULL),
	(47, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '19', '2026-04-15 22:24:45.808214+00', NULL),
	(48, 8, 'Mark ', '🗑️ Eliminó', 'Jugador', '18', '2026-04-15 22:24:47.872971+00', NULL),
	(49, 8, 'Mark ', '✏️ Editó', 'Jugador', 'Alonsito', '2026-04-15 22:25:18.760698+00', NULL),
	(50, 8, 'Mark ', '✏️ Editó', 'Jugador', 'Mota', '2026-04-15 22:27:16.525184+00', NULL),
	(51, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Una nueva propuesta para camiseta de un fan de la tejera', '2026-04-15 22:27:35.276072+00', NULL),
	(52, 8, 'Mark ', '✏️ Editó', 'Jugador', 'Ruben', '2026-04-15 22:28:44.377299+00', NULL),
	(53, 12, 'Tonii', '✏️ Editó', 'Jugador', 'José Ger', '2026-04-15 22:29:09.88967+00', NULL),
	(54, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Masca', '2026-04-15 22:30:21.776974+00', NULL),
	(55, 8, 'Mark ', '✏️ Editó', 'Jugador', 'Rix', '2026-04-15 22:30:38.750391+00', NULL),
	(56, 8, 'Mark ', '✏️ Editó', 'Jugador', 'Jerry', '2026-04-15 22:31:15.779054+00', NULL),
	(57, 12, 'Tonii', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-15 22:31:19.547199+00', NULL),
	(58, 8, 'Mark ', '✏️ Editó', 'Jugador', 'Rix', '2026-04-15 22:33:02.208599+00', NULL),
	(59, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Pedro', '2026-04-15 22:33:13.535916+00', NULL),
	(60, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Darío cansado de tanto trabajar, y de jugar al futbolín !!!', '2026-04-15 22:33:24.589928+00', NULL),
	(61, 7, 'Frozen', '📰 Publicó', 'Noticia', 'EFECTO MANTEMA !!! Los petrodólares llegan al tejera', '2026-04-15 22:33:55.949268+00', NULL),
	(62, 7, 'Frozen', '🗑️ Eliminó', 'Noticia', '8', '2026-04-15 22:37:08.846075+00', NULL),
	(63, 7, 'Frozen', '📰 Publicó', 'Noticia', 'EFECTO MANTEMA !! Los petrodólares llegan al Tejera.', '2026-04-15 22:37:39.142169+00', NULL),
	(64, 13, 'Pablo ', '✏️ Editó', 'Jugador', 'Pablo ', '2026-04-16 10:13:45.969288+00', NULL),
	(65, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Onichan', '2026-04-16 10:27:37.63416+00', NULL),
	(66, 3, 'Fran', '➕ Añadió', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:38:02.324479+00', NULL),
	(67, 3, 'Fran', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:38:07.750714+00', NULL),
	(68, 3, 'Fran', '📰 Publicó', 'Noticia', 'Vuelve 🙏', '2026-04-16 10:41:32.523577+00', NULL),
	(69, 3, 'Fran', '👕 Alineación', 'Alineación', 'J0 — 1-3-2-1', '2026-04-16 10:43:58.832124+00', NULL),
	(70, 3, 'Fran', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:45:00.117089+00', NULL),
	(71, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Mark  en J0', '2026-04-16 10:45:00.138698+00', NULL),
	(72, 3, 'Fran', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:45:10.223786+00', NULL),
	(73, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Ruben en J0', '2026-04-16 10:45:10.236971+00', NULL),
	(74, 3, 'Fran', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:45:17.399136+00', NULL),
	(75, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Mota en J0', '2026-04-16 10:45:17.411687+00', NULL),
	(76, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Ruben en J0', '2026-04-16 10:45:21.799609+00', NULL),
	(77, 3, 'Fran', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:45:21.798994+00', NULL),
	(78, 3, 'Fran', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 10:45:24.047971+00', NULL),
	(79, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Mota en J0', '2026-04-16 10:45:24.048483+00', NULL),
	(80, 3, 'Fran', '🗑️ Eliminó', 'Estadísticas', 'Mark  en J0', '2026-04-16 10:47:57.595591+00', NULL),
	(81, 3, 'Fran', '🗑️ Eliminó', 'Estadísticas', 'Ruben en J0', '2026-04-16 10:47:59.7056+00', NULL),
	(82, 3, 'Fran', '🗑️ Eliminó', 'Estadísticas', 'Mota en J0', '2026-04-16 10:48:01.644347+00', NULL),
	(83, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Con dinero si se puede fichar !! Los fanáticos esperan una temporada exitosa.', '2026-04-16 11:46:26.007692+00', NULL),
	(84, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Pablo, a tope en la rueda de prensa de pretemporada', '2026-04-16 14:31:58.082445+00', NULL),
	(85, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Declaraciones de fernan y nuevos patrocinadores', '2026-04-16 14:33:32.614524+00', NULL),
	(86, 12, 'Tonii', '📰 Publicó', 'Noticia', 'IMPACTO HITLER y la dura pretemporada desempeñada por el tejera', '2026-04-16 14:44:14.072564+00', NULL),
	(87, 7, 'Frozen', '📰 Publicó', 'Noticia', 'ÚLTIMA HORA !!! Acaban de expulsar a Darío del WOK. Pero qué injusticia !!!', '2026-04-16 14:50:06.542852+00', NULL),
	(88, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Honor 🤟', '2026-04-16 15:00:20.296929+00', NULL),
	(89, 15, 'Rix', '✏️ Editó', 'Jugador', 'Frozen', '2026-04-16 15:13:33.278688+00', NULL),
	(90, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Nueva baja para el tejera', '2026-04-16 15:13:45.408156+00', NULL),
	(91, 12, 'Tonii', '🗑️ Eliminó', 'Noticia', '3', '2026-04-16 15:18:41.758569+00', NULL),
	(92, 12, 'Tonii', '📰 Publicó', 'Noticia', 'EXCLUSIVAAA DARIO IMPLICADO EN EL CASO EPSTEIN !!!', '2026-04-16 15:19:46.38688+00', NULL),
	(93, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Nuevo marketing tejeríl', '2026-04-16 15:25:59.005631+00', NULL),
	(94, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Nuevas caras en el equipo', '2026-04-16 15:30:45.128517+00', NULL),
	(95, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Duras declaraciones de Francisco Javier', '2026-04-16 16:32:19.566039+00', NULL),
	(96, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 16:59:20.835444+00', NULL),
	(97, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Mark  en J0', '2026-04-16 17:00:21.996798+00', NULL),
	(98, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:00:22.005574+00', NULL),
	(99, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Jerry en J0', '2026-04-16 17:00:30.861235+00', NULL),
	(100, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:00:30.876201+00', NULL),
	(101, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:00:42.425974+00', NULL),
	(102, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Mota en J0', '2026-04-16 17:00:42.433499+00', NULL),
	(103, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:03:08.177043+00', NULL),
	(104, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:03:21.98394+00', NULL),
	(105, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Ruben en J0', '2026-04-16 17:03:21.987834+00', NULL),
	(106, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:04:29.156554+00', NULL),
	(107, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 17:11:13.872099+00', NULL),
	(108, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Alonsito en J0', '2026-04-16 17:11:13.917109+00', NULL),
	(109, 12, 'Tonii', '✏️ Editó', 'Jugador', 'Masca', '2026-04-16 17:25:22.174072+00', NULL),
	(110, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Cual será la futura equipación de la tejera, estos son algunos prototipos enviados por nuestros fans', '2026-04-16 17:30:18.949477+00', NULL),
	(111, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Orgullosos de nuestro presente primeros en el ranking UEFA', '2026-04-16 17:41:35.876832+00', NULL),
	(112, 3, 'Fran', '📰 Publicó', 'Noticia', '" Este año no bajo de 9 goles " declara Frozen', '2026-04-16 18:05:44.328105+00', NULL),
	(113, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-16 19:17:39.776605+00', NULL),
	(114, 12, 'Tonii', '📰 Publicó', 'Noticia', 'La pretemporada de Antonio', '2026-04-16 21:04:28.615491+00', NULL),
	(115, 5, 'Jamie', '✏️ Editó', 'Jugador', 'Jamie', '2026-04-16 22:31:30.636997+00', NULL),
	(116, 3, 'Fran', '📰 Publicó', 'Noticia', 'Buenos dias tejereños 😍', '2026-04-17 08:43:01.824003+00', NULL),
	(117, 4, 'Jerry', '📰 Publicó', 'Noticia', 'sdgsdgs', '2026-04-17 19:03:33.66959+00', NULL),
	(118, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '28', '2026-04-17 19:04:49.804163+00', NULL),
	(119, 4, 'Jerry', '📰 Publicó', 'Noticia', 'efsdgsgd', '2026-04-17 19:05:08.309359+00', NULL),
	(120, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '29', '2026-04-17 19:07:45.895076+00', NULL),
	(121, 4, 'Jerry', '📰 Publicó', 'Noticia', 'sgasgs', '2026-04-17 19:19:44.517083+00', NULL),
	(122, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '30', '2026-04-17 19:20:06.181284+00', NULL),
	(123, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Creo que a moto moto le gustas', '2026-04-17 22:18:56.103627+00', NULL),
	(124, 4, 'Jerry', '📰 Publicó', 'Noticia', 'Vcgjbv', '2026-04-17 23:18:09.812001+00', NULL),
	(125, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '32', '2026-04-17 23:18:44.723195+00', NULL),
	(126, 4, 'Jerry', '📰 Publicó', 'Noticia', 'dsgsdgdsf', '2026-04-18 10:15:13.318184+00', NULL),
	(127, 4, 'Jerry', '📰 Publicó', 'Noticia', 'sdgsgsfg', '2026-04-18 10:20:04.610756+00', NULL),
	(128, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '34', '2026-04-18 10:26:59.345249+00', NULL),
	(129, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '33', '2026-04-18 10:27:03.745646+00', NULL),
	(130, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fgsgdgf', '2026-04-18 10:31:35.534223+00', NULL),
	(131, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fggsgfdg', '2026-04-18 10:34:22.909744+00', NULL),
	(132, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '36', '2026-04-18 10:34:55.933031+00', NULL),
	(133, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '35', '2026-04-18 10:34:59.0055+00', NULL),
	(134, 4, 'Jerry', '📰 Publicó', 'Noticia', 'dfgsg', '2026-04-18 10:39:20.059465+00', NULL),
	(135, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '37', '2026-04-18 10:41:00.738424+00', NULL),
	(136, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '35', '2026-04-18 10:41:04.036651+00', NULL),
	(137, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fdhdf', '2026-04-18 10:41:33.775683+00', NULL),
	(138, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '38', '2026-04-18 10:52:47.84145+00', NULL),
	(139, 4, 'Jerry', '📰 Publicó', 'Noticia', 'guuvuoyv', '2026-04-18 10:53:03.798256+00', NULL),
	(140, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '39', '2026-04-18 11:05:35.271414+00', NULL),
	(141, 4, 'Jerry', '📰 Publicó', 'Noticia', 'dsgdfgd', '2026-04-18 11:05:45.646385+00', NULL),
	(142, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '40', '2026-04-18 11:07:14.470608+00', NULL),
	(143, 4, 'Jerry', '📰 Publicó', 'Noticia', 'rahddfgh', '2026-04-18 11:07:25.945567+00', NULL),
	(144, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '41', '2026-04-18 11:11:37.010629+00', NULL),
	(145, 4, 'Jerry', '📰 Publicó', 'Noticia', 'zsfsgs', '2026-04-18 11:11:43.737688+00', NULL),
	(146, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '42', '2026-04-18 11:20:25.935545+00', NULL),
	(147, 4, 'Jerry', '📰 Publicó', 'Noticia', 'regdgd', '2026-04-18 11:20:37.528042+00', NULL),
	(148, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '43', '2026-04-18 11:21:09.928579+00', NULL),
	(149, 4, 'Jerry', '📰 Publicó', 'Noticia', 'dfsdgs', '2026-04-18 11:21:31.893178+00', NULL),
	(150, 4, 'Jerry', '📰 Publicó', 'Noticia', 'sgsgs', '2026-04-18 11:24:30.448921+00', NULL),
	(151, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fdbfb', '2026-04-18 11:29:07.336466+00', NULL),
	(152, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '46', '2026-04-18 11:31:06.8974+00', NULL),
	(153, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '44', '2026-04-18 11:31:10.092308+00', NULL),
	(154, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '45', '2026-04-18 11:31:17.965108+00', NULL),
	(155, 4, 'Jerry', '📰 Publicó', 'Noticia', 'gdfgd', '2026-04-18 11:31:26.198199+00', NULL),
	(156, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '47', '2026-04-18 11:32:59.831689+00', NULL),
	(157, 4, 'Jerry', '📰 Publicó', 'Noticia', 'gvghv', '2026-04-18 11:33:11.183806+00', NULL),
	(158, 4, 'Jerry', '📰 Publicó', 'Noticia', 'ddfsg', '2026-04-18 11:35:39.618415+00', NULL),
	(159, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '49', '2026-04-18 11:36:59.577783+00', NULL),
	(160, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '48', '2026-04-18 11:37:02.267978+00', NULL),
	(161, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fdbdfg', '2026-04-18 11:37:10.19307+00', NULL),
	(162, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fshdfh', '2026-04-18 11:41:08.376509+00', NULL),
	(163, 4, 'Jerry', '📰 Publicó', 'Noticia', 'dsfgdf', '2026-04-18 11:46:47.713105+00', NULL),
	(164, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '52', '2026-04-18 11:46:55.241415+00', NULL),
	(165, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '51', '2026-04-18 11:46:58.451716+00', NULL),
	(166, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '50', '2026-04-18 11:47:01.360434+00', NULL),
	(167, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-18 12:30:25.401972+00', NULL),
	(168, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Mark  en J0', '2026-04-18 12:30:25.404259+00', NULL),
	(169, 4, 'Jerry', '📰 Publicó', 'Noticia', 'gdfgsgs', '2026-04-18 14:14:05.43598+00', NULL),
	(170, 4, 'Jerry', '📰 Publicó', 'Noticia', 'ahora si', '2026-04-18 14:14:41.711848+00', NULL),
	(171, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-18 14:15:49.040781+00', NULL),
	(172, 4, 'Jerry', '📰 Publicó', 'Noticia', 'fdgdgd', '2026-04-18 14:16:24.082539+00', NULL),
	(173, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '55', '2026-04-18 14:16:50.178138+00', NULL),
	(174, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '54', '2026-04-18 14:16:53.399578+00', NULL),
	(175, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '53', '2026-04-18 14:16:56.233919+00', NULL),
	(176, 4, 'Jerry', '📰 Publicó', 'Noticia', 'Jsjdjdjd', '2026-04-18 15:03:39.719937+00', NULL),
	(177, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '56', '2026-04-18 15:03:52.887003+00', NULL),
	(178, 4, 'Jerry', '👕 Alineación', 'Alineación', 'J0 — 1-3-2-1', '2026-04-19 15:18:25.539334+00', NULL),
	(179, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs Prueba', '2026-04-19 17:18:50.941473+00', NULL),
	(180, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs Prueba', '2026-04-19 17:39:17.197357+00', NULL),
	(181, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-19 17:39:54.773212+00', NULL),
	(182, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-04-19 18:30:19.546958+00', NULL),
	(183, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs Prueba', '2026-04-19 22:19:31.151207+00', NULL),
	(184, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-19 22:22:11.660277+00', NULL),
	(185, 4, 'Jerry', '➕ Añadió', 'Jugador', 'Jerry', '2026-04-20 06:42:19.940179+00', NULL),
	(186, 4, 'Jerry', '🗑️ Eliminó', 'Jugador', '27', '2026-04-20 06:42:25.194094+00', NULL),
	(187, 4, 'Jerry', '➕ Añadió', 'Jugador', 'Pepe', '2026-04-20 06:44:42.495515+00', NULL),
	(188, 4, 'Jerry', '🗑️ Eliminó', 'Jugador', '28', '2026-04-20 06:44:47.680966+00', NULL),
	(189, 4, 'Jerry', '📰 Publicó', 'Noticia', 'La TORDA se suma al movimiento de la Tejera!!!', '2026-04-20 07:01:59.075512+00', NULL),
	(190, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Francisco Javier, al borde del colapso', '2026-04-20 08:00:38.041489+00', NULL),
	(191, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Portada de Mundo Delictivo 20/04/2026', '2026-04-20 08:06:06.18584+00', NULL),
	(192, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs gdfgdgs', '2026-04-20 08:10:32.258533+00', NULL),
	(193, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs gdfgdgs', '2026-04-20 08:11:08.150774+00', NULL),
	(194, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs gdfgdgs', '2026-04-20 08:11:46.661183+00', NULL),
	(195, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs gdfgdgs', '2026-04-20 08:20:02.132891+00', NULL),
	(196, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-20 08:20:22.919625+00', NULL),
	(197, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La pregunta que está dando la vuelta al mundo', '2026-04-20 09:51:09.363389+00', NULL),
	(198, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs Prueba', '2026-04-20 19:01:25.800293+00', NULL),
	(199, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs Prueba', '2026-04-20 19:01:35.960069+00', NULL),
	(200, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs Prueba', '2026-04-20 19:28:03.417139+00', NULL),
	(201, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-20 19:37:21.284066+00', NULL),
	(202, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs sddfghdfgc', '2026-04-20 19:37:42.204452+00', NULL),
	(203, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-20 19:39:32.926657+00', NULL),
	(204, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La tejera está de vuelta', '2026-04-21 09:12:25.065369+00', NULL),
	(205, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Rueda de prensa del mister', '2026-04-21 09:20:58.792708+00', NULL),
	(206, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs Prueba ', '2026-04-22 06:58:36.109673+00', NULL),
	(207, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs Prueba ', '2026-04-22 06:58:53.146282+00', NULL),
	(208, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-22 06:59:14.043613+00', NULL),
	(209, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs Hfryuhg', '2026-04-22 06:59:37.911121+00', NULL),
	(210, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs Hfryuhg', '2026-04-22 07:04:05.961503+00', NULL),
	(211, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-04-22 07:04:22.191455+00', NULL),
	(212, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Aura', '2026-04-22 09:54:47.513005+00', NULL),
	(213, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'No al racismo', '2026-04-22 10:01:08.60375+00', NULL),
	(214, 4, 'Jerry', '📰 Publicó', 'Noticia', '🚨OFICIAL: Se confirma un secreto a voces', '2026-04-22 11:29:45.168738+00', NULL),
	(215, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Pillan a Darío celebrando la renovación en un buffet estilo asiático', '2026-04-22 20:45:58.195179+00', NULL),
	(216, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Última hora🚨🚨 El autobús de la tejera sufre un accidente', '2026-04-23 08:43:08.061185+00', NULL),
	(217, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El sueño húmedo de la afición de la tejera', '2026-04-23 08:50:26.914135+00', NULL),
	(218, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Pillan a funcionario de la tejera trabajando🚨🚨🧨🧨', '2026-04-23 08:50:55.173654+00', NULL),
	(219, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '57', '2026-04-23 08:57:55.260236+00', NULL),
	(220, 4, 'Jerry', '🗑️ Eliminó', 'Noticia', '27', '2026-04-23 08:57:59.012376+00', NULL),
	(221, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'IMPRESENTABLE. Dario jugador de la tejera durmiendo en un buffet de estilo asiático.', '2026-04-23 09:05:15.830301+00', NULL),
	(222, 3, 'Fran', '📰 Publicó', 'Noticia', 'Cuestión de tiempo', '2026-04-23 10:22:41.242298+00', NULL),
	(223, 3, 'Fran', '🗑️ Eliminó', 'Noticia', '71', '2026-04-23 10:22:47.65004+00', NULL),
	(224, 3, 'Fran', '📰 Publicó', 'Noticia', 'Cuestión de tiempo !!! ✍️✍️', '2026-04-24 08:34:39.314692+00', NULL),
	(225, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Última hora🚨🚨 encuentran muerto a la mente', '2026-04-24 09:07:45.373056+00', NULL),
	(226, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El campo en sus venas', '2026-04-24 18:28:40.000054+00', NULL),
	(227, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Darío', '2026-04-26 14:53:57.649121+00', NULL),
	(228, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Alonsito', '2026-04-26 14:55:08.945215+00', NULL),
	(229, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Mota', '2026-04-26 14:55:26.22911+00', NULL),
	(230, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Pablo ', '2026-04-26 14:55:31.849059+00', NULL),
	(231, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Fran', '2026-04-26 14:55:40.755469+00', NULL),
	(232, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Frozen', '2026-04-26 14:56:37.860092+00', NULL),
	(233, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Jamie', '2026-04-26 14:56:47.234567+00', NULL),
	(234, 12, 'Tonii', '📰 Publicó', 'Noticia', '‼️🚨ATENCION COCHE ROBADO🚨‼️', '2026-04-26 21:50:23.370829+00', NULL),
	(235, 12, 'Tonii', '📰 Publicó', 'Noticia', 'ESTOS SON LOS PATROCINADORES O', '2026-04-28 13:15:21.237438+00', NULL),
	(236, 12, 'Tonii', '🗑️ Eliminó', 'Noticia', '76', '2026-04-28 13:15:26.315679+00', NULL),
	(237, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Estos son nuestros patrocinadores oficiales', '2026-04-28 13:16:00.400382+00', NULL),
	(238, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La prueba más difícil de Dario: Pasar la ITV', '2026-04-29 08:47:00.863793+00', NULL),
	(239, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Compromiso con el club', '2026-04-29 08:49:01.049927+00', NULL),
	(240, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Granjero busca cabra', '2026-04-29 08:53:43.739575+00', NULL),
	(241, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Gonzalo la pelota', '2026-04-29 09:02:04.916526+00', NULL),
	(242, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Desde la tejera balompié felicitamos a nuestro jugador Darío por conseguir pasar la ITV', '2026-04-29 10:48:40.997151+00', NULL),
	(243, 13, 'Pablo ', '🗑️ Eliminó', 'Noticia', '81', '2026-04-29 10:57:38.492398+00', NULL),
	(244, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Última hora: Fran es judío🚨🚨', '2026-05-01 22:28:38.397033+00', NULL),
	(245, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Cuenta atrás la vuelta de la tejera', '2026-05-02 19:10:07.473715+00', NULL),
	(246, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Gnomo', '2026-05-02 19:50:16.458001+00', NULL),
	(247, 13, 'Pablo ', '🗑️ Eliminó', 'Noticia', '85', '2026-05-02 19:51:16.773665+00', NULL),
	(248, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Más defensas que un actimel', '2026-05-08 10:08:40.921822+00', NULL),
	(249, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs los mierdas', '2026-05-10 09:46:56.308773+00', NULL),
	(250, 4, 'Jerry', '🗑️ Eliminó', 'Partido', 'Jundefined vs undefined', '2026-05-10 09:50:12.520486+00', NULL),
	(251, 12, 'Tonii', '📰 Publicó', 'Noticia', 'EXCLUSIVA', '2026-05-10 22:54:03.358486+00', NULL),
	(252, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Directas a los más alto de éxitos España', '2026-05-11 09:45:37.743727+00', NULL),
	(253, 14, 'Pedro', '✏️ Editó', 'Jugador', 'Tonii', '2026-05-11 21:50:25.595857+00', NULL),
	(254, 14, 'Pedro', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-05-11 21:51:18.48142+00', NULL),
	(255, 14, 'Pedro', '📰 Publicó', 'Noticia', 'Nada mas q añadir', '2026-05-11 21:53:40.556276+00', NULL),
	(256, 14, 'Pedro', '📰 Publicó', 'Noticia', 'Comida de empresa por el cristo del Valle', '2026-05-11 22:01:31.050631+00', NULL),
	(257, 7, 'Frozen', '📰 Publicó', 'Noticia', 'ÉXITO MUNDIAL !!! Se desvela quién es Batman y su nombre de pila es Pedro', '2026-05-11 22:28:02.947648+00', NULL),
	(258, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La tejera está de celebración por el cumpleaños de dos jugadores🥰🤩🤟🧨🐷', '2026-05-12 10:10:10.075556+00', NULL),
	(259, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El ojeador mota pone rumbo a la Patagonia en busca de talento', '2026-05-12 12:36:03.045041+00', NULL),
	(260, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La tejera pone rumbo a la gloria', '2026-05-12 13:17:11.517345+00', NULL),
	(261, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Comienzan las jornadas de captación para la temporada 2026 de la mano del agente motiti', '2026-05-13 11:15:05.29806+00', NULL),
	(262, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El equipo de ojeadores de la tejera han reclutado al llamado por los interinos "el futuro mbappe"', '2026-05-13 11:20:40.221046+00', NULL),
	(263, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Putas putas y más putas ! Así celebran los cumpleaños los chicos del Tejera', '2026-05-13 11:23:36.531737+00', NULL),
	(264, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Está es la historia de un hombre que se lesiono.Increíble cambio !!!!', '2026-05-13 11:30:26.057589+00', NULL),
	(265, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Trabajo ? Usted está de putas !!! Tendrá sanción por parte del mister.', '2026-05-13 13:04:40.228049+00', NULL),
	(266, 12, 'Tonii', '📰 Publicó', 'Noticia', 'Pan javi como la cancion de tecno', '2026-05-13 13:18:56.156224+00', NULL),
	(267, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Quien está suplantando la identidad de dj furgoneta??', '2026-05-13 13:23:35.187794+00', NULL),
	(268, 12, 'Tonii', '📰 Publicó', 'Noticia', 'El nombre del portero de la tejera sale en la rua del barsa PA LA RACHA', '2026-05-13 13:29:30.797001+00', NULL),
	(269, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Frozen', '2026-05-13 16:52:39.72658+00', NULL),
	(270, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Jamie', '2026-05-13 16:52:59.891208+00', NULL),
	(271, 15, 'Rix', '📰 Publicó', 'Noticia', 'BAJAS DE ÚLTIMA HORA 🚨 Ivi y Fran han ido a por la parejita. ENHORABUENA 👶🏼', '2026-05-15 22:01:01.676152+00', NULL),
	(272, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Pillan a Ricardo trabajando en puy du fou', '2026-05-15 22:05:31.870328+00', NULL),
	(273, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Dario ha sido infiel al wok con un delokos', '2026-05-15 22:08:08.045248+00', NULL),
	(274, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Ya en cines🚨🚨', '2026-05-15 22:57:13.225116+00', NULL),
	(275, 4, 'Jerry', '📰 Publicó', 'Noticia', '🚨ÚLTIMA HORA: Nuestro jugador Frozen intentando convencer a unos fichajes', '2026-05-16 19:26:17.116888+00', NULL),
	(276, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El pintor; la obra de arte', '2026-05-16 21:06:27.74427+00', NULL),
	(277, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El jugador frozen mind de la tejera acusado de fraude fiscal en una trama de apuestas deportivas ilegales', '2026-05-17 14:18:30.909943+00', NULL),
	(278, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Imágenes del partido de pretemporada', '2026-05-17 17:38:43.023528+00', NULL),
	(279, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Tonii', '2026-05-17 19:03:35.37157+00', NULL),
	(280, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Muchas llamadas y poco fútbol en Grúas San Antón', '2026-05-18 20:49:43.877214+00', NULL),
	(281, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La noche de nuestros superhéroes', '2026-05-18 21:04:22.139468+00', NULL),
	(282, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Ivan y Darío, posibles bajas para la primera jornada de liga', '2026-05-19 11:31:53.805157+00', NULL),
	(283, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Parque jurásico la nueva', '2026-05-19 12:22:52.242506+00', NULL),
	(284, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Nuestro jugador Jaime el whiskas ya está calentando en la banda', '2026-05-19 12:29:57.101303+00', NULL),
	(285, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Nuestro jugador el miau miau ya está en el estadio calentando', '2026-05-19 12:33:03.662165+00', NULL),
	(286, 7, 'Frozen', '📰 Publicó', 'Noticia', 'El hombre mas rápido del mundo!!! En Tembleque', '2026-05-19 20:10:45.666254+00', NULL),
	(287, 12, 'Tonii', '📰 Publicó', 'Noticia', 'ÚLTIMA HORA la tejera anuncia su jornada retro por el retraso del pedido de nuevas camisetas', '2026-05-20 06:23:18.66581+00', NULL),
	(288, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Corre que te corre', '2026-05-20 07:47:29.653151+00', NULL),
	(289, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Francisco Javier se duerme en su último día de prácticas', '2026-05-20 12:31:31.348195+00', NULL),
	(290, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Francisco Javier ha tenido que hacer autostop para llegar al gimnasio', '2026-05-20 12:34:05.611117+00', NULL),
	(291, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Entrevista a uno de nuestros rivales', '2026-05-20 12:37:22.566238+00', NULL),
	(292, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Frozen atrapado', '2026-05-20 12:50:31.911113+00', NULL),
	(293, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Se filtra la increíble dieta que está siguiendo Jumpy !!', '2026-05-20 16:51:40.291939+00', NULL),
	(294, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Acusado !!’ Jumpy a los tribunales.', '2026-05-20 16:52:57.790492+00', NULL),
	(295, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Nada más que decir', '2026-05-21 11:20:56.280059+00', NULL),
	(296, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La tejera presenta la edición especial con la que jugarán contra leones del atlas', '2026-05-21 11:26:32.170271+00', NULL),
	(297, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Impresentable!!! A Málaga a solo una semana de la competición.IMAGEN DE JAVI HOYOS', '2026-05-21 11:36:15.48233+00', NULL),
	(298, 13, 'Pablo ', '📰 Publicó', 'Noticia', '¿Gula, que es eso? En la tejera somos de delokos', '2026-05-21 11:37:16.98374+00', NULL),
	(299, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Este verano no te quedes sin tus chanclas de la tejera. Están volando !!', '2026-05-21 11:51:13.051264+00', NULL),
	(300, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Si buscas en internet que es un jalufo, esto es lo que sale. Esto es lo que son: una panda de cerdos', '2026-05-21 12:13:33.497369+00', NULL),
	(301, 7, 'Frozen', '📰 Publicó', 'Noticia', 'Afición: Son muy buenos nos ganarán. El putisimo fachero Pedro pistas: Pan comido', '2026-05-21 12:43:47.724422+00', NULL),
	(302, 4, 'Jerry', '📰 Publicó', 'Noticia', 'Markitos ante su mayor reto: aprobar un examen', '2026-05-21 13:14:01.902286+00', NULL),
	(303, 13, 'Pablo ', '📰 Publicó', 'Noticia', '"Peor que el coronavirus" El sionismo se está contagiando en la tejera🚨🚨', '2026-05-22 17:33:00.593529+00', NULL),
	(304, 4, 'Jerry', '📰 Publicó', 'Noticia', 'Parte médico | Frozen', '2026-05-22 22:18:18.885295+00', NULL),
	(305, 4, 'Jerry', '📰 Publicó', 'Noticia', 'Se revela el tratamiento que va a recibir Frozen de la mano de los mejores especialistas', '2026-05-22 22:43:15.913689+00', NULL),
	(306, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-05-23 15:46:07.689872+00', NULL),
	(307, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-05-23 16:03:42.701947+00', NULL),
	(308, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-05-23 16:08:17.988618+00', NULL),
	(309, 4, 'Jerry', '✏️ Editó', 'Partido', 'J0 vs Dinamo de divas', '2026-05-23 16:09:12.842275+00', NULL),
	(310, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Expedición al de lokos', '2026-05-23 18:45:45.03331+00', NULL),
	(311, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Franul realiza el ritual del fuego para la suerte de la tejera', '2026-05-24 00:15:55.86522+00', NULL),
	(312, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'GT-Neta', '2026-06-08 17:14:03.834329+00', NULL),
	(313, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Grouz label - Sala Cherokee', '2026-06-08 17:14:54.294139+00', NULL),
	(314, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Tejera Balompié', '2026-06-08 17:15:16.965842+00', NULL),
	(315, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Inter Jalufo', '2026-06-08 17:15:44.076186+00', NULL),
	(316, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Leones del Atlas', '2026-06-08 17:16:07.713829+00', NULL),
	(317, 4, 'Jerry', '➕ Añadió', 'Partido', 'J1 vs GT-Neta', '2026-06-08 17:18:16.917387+00', NULL),
	(318, 4, 'Jerry', '➕ Añadió', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-08 17:19:04.479977+00', NULL),
	(319, 4, 'Jerry', '➕ Añadió', 'Jugador', 'Muli III', '2026-06-08 17:20:06.548533+00', NULL),
	(320, 4, 'Jerry', '👕 Alineación', 'Alineación', 'J2 — 1-2-3-1', '2026-06-08 17:20:53.468439+00', NULL),
	(321, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-08 17:21:10.694419+00', NULL),
	(322, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Ruben en J2', '2026-06-08 17:21:10.748642+00', NULL),
	(323, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Ruben en J1', '2026-06-08 17:21:43.887067+00', NULL),
	(324, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 17:21:43.895091+00', NULL),
	(326, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Pablo  en J1', '2026-06-08 17:21:51.989517+00', NULL),
	(327, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 17:21:57.374205+00', NULL),
	(325, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 17:21:51.977042+00', NULL),
	(328, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Alonsito en J1', '2026-06-08 17:21:57.386026+00', NULL),
	(329, 4, 'Jerry', '➕ Añadió', 'Partido', 'J3 vs Leones del Atlas', '2026-06-08 17:22:53.378999+00', NULL),
	(330, 4, 'Jerry', '👕 Alineación', 'Alineación', 'J1 — 1-3-2-1', '2026-06-08 17:28:49.439124+00', NULL),
	(331, 4, 'Jerry', '✏️ Editó', 'Partido', 'J3 vs Leones del Atlas', '2026-06-08 17:31:51.518182+00', NULL),
	(332, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 17:35:17.952572+00', NULL),
	(333, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Tejera Balompié', '2026-06-08 17:46:48.301588+00', NULL),
	(334, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 17:57:52.619292+00', NULL),
	(335, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-08 17:58:12.428734+00', NULL),
	(336, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Veteranos de Villacañas de Fútbol', '2026-06-08 18:58:20.266771+00', NULL),
	(337, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Jarinha F.C.', '2026-06-08 18:58:46.089624+00', NULL),
	(338, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Fifotes FC', '2026-06-08 18:59:16.804627+00', NULL),
	(339, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Bayer Patxiskusen', '2026-06-08 19:00:04.244446+00', NULL),
	(340, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Peña Latina F.C.', '2026-06-08 19:00:29.216141+00', NULL),
	(341, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Nocis', '2026-06-08 19:00:58.193882+00', NULL),
	(342, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Bar La Moderna', '2026-06-08 19:01:27.784597+00', NULL),
	(343, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Puertas Sesmero Soletillas', '2026-06-08 19:01:50.010613+00', NULL),
	(344, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Los Chavales del Moes', '2026-06-08 19:02:08.430372+00', NULL),
	(345, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Feyerneta F.C.', '2026-06-08 19:02:30.852693+00', NULL),
	(346, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Kaixo', '2026-06-08 19:02:47.332701+00', NULL),
	(347, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'F.C. Raíces Compartidas by Allison', '2026-06-08 19:03:01.524607+00', NULL),
	(348, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Bar El Risco', '2026-06-08 19:03:45.841827+00', NULL),
	(349, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Frente Panocha', '2026-06-08 19:04:08.271504+00', NULL),
	(350, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Moteños MP', '2026-06-08 19:04:31.793417+00', NULL),
	(351, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'La Juanoteca', '2026-06-08 19:04:49.725656+00', NULL),
	(352, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Los Pitillos', '2026-06-08 19:05:08.772226+00', NULL),
	(353, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Cervecería Tere', '2026-06-08 19:05:26.338656+00', NULL),
	(354, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Viejas Glorias Pizzería Mayor', '2026-06-08 19:05:50.349683+00', NULL),
	(355, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'La Tronkería FC', '2026-06-08 19:06:09.48685+00', NULL),
	(356, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Los Minis del Moe´s', '2026-06-08 19:06:48.112894+00', NULL),
	(357, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Ese perrillo es tuyo?', '2026-06-08 19:07:12.68257+00', NULL),
	(358, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Union Segarro Amegos (USA)', '2026-06-08 19:07:33.269182+00', NULL),
	(359, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'CD Giro Flash Paquetines', '2026-06-08 19:07:50.159219+00', NULL),
	(360, 4, 'Jerry', '✏️ Editó', 'Clasificación', 'Cervecería Tere', '2026-06-08 19:09:28.040191+00', NULL),
	(361, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Darío en J1', '2026-06-08 19:11:01.650515+00', NULL),
	(362, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 19:11:01.658005+00', NULL),
	(363, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Darío en J2', '2026-06-08 19:11:19.643256+00', NULL),
	(364, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-08 19:11:19.656976+00', NULL),
	(365, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-08 19:24:10.141857+00', NULL),
	(366, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-08 19:24:28.388858+00', NULL),
	(367, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 19:24:41.135187+00', NULL),
	(368, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-08 19:26:05.449525+00', NULL),
	(369, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:18:05.181448+00', NULL),
	(370, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:46:46.242669+00', NULL),
	(371, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:47:12.373141+00', NULL),
	(372, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:48:42.036682+00', NULL),
	(373, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:53:48.837234+00', NULL),
	(374, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:54:35.895829+00', NULL),
	(375, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 17:54:58.782226+00', NULL),
	(376, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 18:05:04.142136+00', NULL),
	(377, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 18:05:27.160446+00', NULL),
	(378, 3, 'Fran', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-09 18:07:58.648838+00', NULL),
	(379, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Fran en J1', '2026-06-09 18:07:58.658824+00', NULL),
	(380, 3, 'Fran', '📊 Stats', 'Estadísticas', 'Muli III en J2', '2026-06-09 18:08:37.886031+00', NULL),
	(381, 3, 'Fran', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-09 18:08:37.910861+00', NULL),
	(382, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Frozen', '2026-06-11 09:31:55.096972+00', NULL),
	(383, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Muli III', '2026-06-11 09:44:26.175449+00', NULL),
	(384, 4, 'Jerry', '📰 Publicó', 'Noticia', '"Estamos de vuelta", declara el capi', '2026-06-11 10:38:23.26117+00', NULL),
	(385, 4, 'Jerry', '📰 Publicó', 'Noticia', 'Muli III ya se atreve con el brazalete', '2026-06-11 14:35:07.60087+00', NULL),
	(386, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El cm de las noticias tejeriles is back', '2026-06-11 16:29:51.088206+00', NULL),
	(387, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'La peor noche de Fran', '2026-06-11 16:32:17.026827+00', NULL),
	(388, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Marcos al tembleque CANCELADO Adolf no fue capaz de convencerle, insultando a todos y cada uno de sus amigos', '2026-06-11 16:36:31.747313+00', NULL),
	(389, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Fichajes ?', '2026-06-11 16:37:05.58249+00', NULL),
	(390, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Se filtra la foto del jugador lesionado en las pistas', '2026-06-11 16:59:56.317602+00', NULL),
	(391, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'El culpable de la lesión que arrastra frozen mind', '2026-06-11 17:04:36.951788+00', NULL),
	(392, 6, 'José Ger', '📰 Publicó', 'Noticia', 'Jumpy entrenando en el mismo gimnasio que Lebron James 🫨🫨', '2026-06-11 17:35:52.118292+00', NULL),
	(393, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Error en la imprenta', '2026-06-11 21:26:45.486729+00', NULL),
	(394, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Dario prueba el gangbang', '2026-06-11 21:29:45.754417+00', NULL),
	(395, 6, 'José Ger', '📰 Publicó', 'Noticia', 'Oferton de bienvenida !!', '2026-06-11 21:30:17.751483+00', NULL),
	(396, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'Se desvela la existencia de santa claus, es Dario', '2026-06-11 21:32:20.456072+00', NULL),
	(397, 6, 'José Ger', '✏️ Editó', 'Jugador', 'Jumpy', '2026-06-11 21:33:27.091379+00', NULL),
	(398, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Jumpy', '2026-06-11 21:33:48.173211+00', NULL),
	(399, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Chudi', '2026-06-11 21:34:01.187126+00', NULL),
	(400, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Javi', '2026-06-11 21:34:10.308331+00', NULL),
	(401, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Dada', '2026-06-11 21:35:03.184876+00', NULL),
	(402, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Dada en J1', '2026-06-11 21:36:08.445045+00', NULL),
	(403, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-11 21:36:08.454964+00', NULL),
	(404, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Dada en J2', '2026-06-11 21:36:34.931739+00', NULL),
	(405, 4, 'Jerry', '✏️ Editó', 'Partido', 'J2 vs Grouz label - Sala Cherokee', '2026-06-11 21:36:35.055244+00', NULL),
	(406, 13, 'Pablo ', '📰 Publicó', 'Noticia', 'En qué estrella estará', '2026-06-11 22:11:18.716873+00', NULL),
	(407, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Javi', '2026-06-12 09:47:11.570039+00', NULL),
	(408, 4, 'Jerry', '✏️ Editó', 'Jugador', 'Javi', '2026-06-12 09:48:14.334391+00', NULL),
	(409, 4, 'Jerry', '✏️ Editó', 'Partido', 'J1 vs GT-Neta', '2026-06-12 10:05:28.918314+00', NULL),
	(410, 4, 'Jerry', '📊 Stats', 'Estadísticas', 'Ruben en J1', '2026-06-12 10:05:28.947562+00', NULL);


--
-- Data for Name: partidos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."partidos" ("id", "jornada", "fecha", "local", "visitante", "goles_local", "goles_visitante", "campo", "jugado", "created_at", "mvp_jugador_id", "alineacion", "formacion", "temporada_id", "amistoso", "hora", "escudo_rival_url", "convocados") VALUES
	(2, 0, '2026-04-02', 'Tejera Balompié', 'Dinamo de divas', 4, 6, 'La Serna', true, '2026-04-16 10:38:02.071882+00', NULL, NULL, NULL, 1, true, '18:30', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169996/rival_2_vygz1c.png', '[2, 3, 4, 5, 7, 8, 10, 11, 13, 14, 15, 17]'),
	(13, 3, '2026-06-13', 'Tejera Balompié', 'Leones del Atlas', 0, 0, 'Campo Municipal', false, '2026-06-08 17:22:53.094738+00', NULL, NULL, NULL, 1, false, '21:00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781191063/Leones_del_Atlas_icvh7m.png', '[2, 5, 12, 6, 4, 15, 29, 8, 11, 13, 10, 9]'),
	(12, 2, '2026-06-06', 'Tejera Balompié', 'Grouz label - Sala Cherokee', 1, 1, 'Campo Municipal', true, '2026-06-08 17:19:04.337044+00', NULL, NULL, NULL, 1, false, '20:00', NULL, '[2, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 17, 29]'),
	(11, 1, '2026-05-29', 'Tejera Balompié', 'GT-Neta', 2, 4, 'Campo Municipal', true, '2026-06-08 17:18:16.778064+00', NULL, NULL, NULL, 1, false, '22:00', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169997/rival_11_cgsel1.png', '[2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 17]');


--
-- Data for Name: alineaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."alineaciones" ("id", "partido_id", "formacion", "jugadores", "created_at", "temporada_id") VALUES
	(8, 2, '1-3-2-1', '[{"linea": "portero", "posicion": 0, "jugador_id": 2}, {"linea": "defensas", "posicion": 0, "jugador_id": 5}, {"linea": "defensas", "posicion": 1, "jugador_id": 4}, {"linea": "defensas", "posicion": 2, "jugador_id": 15}, {"linea": "medios", "posicion": 0, "jugador_id": 8}, {"linea": "medios", "posicion": 1, "jugador_id": 3}, {"linea": "delanteros", "posicion": 0, "jugador_id": 11}]', '2026-04-16 10:43:58.412781+00', NULL),
	(10, 12, '1-2-3-1', '[{"linea": "portero", "posicion": 0, "jugador_id": 2}, {"linea": "defensas", "posicion": 0, "jugador_id": 4}, {"linea": "defensas", "posicion": 1, "jugador_id": 29}, {"linea": "medios", "posicion": 0, "jugador_id": 14}, {"linea": "medios", "posicion": 1, "jugador_id": 10}, {"linea": "medios", "posicion": 2, "jugador_id": 8}, {"linea": "delanteros", "posicion": 0, "jugador_id": 17}]', '2026-06-08 17:20:53.357661+00', NULL),
	(11, 11, '1-3-2-1', '[{"linea": "portero", "posicion": 0, "jugador_id": 2}, {"linea": "defensas", "posicion": 0, "jugador_id": 15}, {"linea": "defensas", "posicion": 1, "jugador_id": 4}, {"linea": "defensas", "posicion": 2, "jugador_id": 5}, {"linea": "medios", "posicion": 0, "jugador_id": 14}, {"linea": "medios", "posicion": 1, "jugador_id": 8}, {"linea": "delanteros", "posicion": 0, "jugador_id": 11}]', '2026-06-08 17:28:49.240257+00', NULL);


--
-- Data for Name: clasificacion; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."clasificacion" ("id", "pos", "equipo", "pj", "pg", "pe", "pp", "gf", "gc", "pts", "grupo", "temporada_id") VALUES
	(41, 1, 'GT-Neta', 2, 2, 0, 0, 18, 6, 6, '5', 1),
	(42, 1, 'Grouz label - Sala Cherokee', 2, 1, 1, 0, 4, 3, 4, '5', 1),
	(36, 1, 'Inter Jalufo', 1, 0, 0, 1, 2, 3, 0, '5', 1),
	(37, 1, 'Leones del Atlas', 1, 0, 0, 1, 4, 14, 0, '5', 1),
	(39, 1, 'Tejera Balompié', 2, 0, 1, 1, 3, 5, 1, '5', 1),
	(12, 1, 'Veteranos de Villacañas de Fútbol', 2, 1, 0, 1, 3, 13, 3, '1', 1),
	(13, 1, 'Jarinha F.C.', 2, 1, 1, 0, 5, 4, 4, '1', 1),
	(14, 1, 'Fifotes FC', 2, 0, 0, 2, 4, 8, 0, '1', 1),
	(15, 1, 'Bayer Patxiskusen', 2, 1, 1, 0, 14, 2, 4, '1', 1),
	(17, 1, 'Peña Latina F.C.', 2, 0, 0, 2, 2, 20, 0, '1', 1),
	(16, 1, 'Nocis', 2, 2, 0, 0, 22, 3, 6, '1', 1),
	(20, 1, 'Bar La Moderna', 2, 2, 0, 0, 10, 5, 6, '2', 1),
	(18, 1, 'Puertas Sesmero Soletillas', 2, 2, 0, 0, 7, 2, 6, '2', 1),
	(23, 1, 'Los Chavales del Moes', 2, 1, 0, 1, 8, 5, 3, '2', 1),
	(21, 1, 'Feyerneta F.C.', 2, 1, 0, 1, 10, 9, 3, '2', 1),
	(22, 1, 'Kaixo', 2, 0, 0, 2, 5, 9, 0, '2', 1),
	(19, 1, 'F.C. Raíces Compartidas by Allison', 2, 0, 0, 2, 1, 11, 0, '2', 1),
	(27, 1, 'Bar El Risco', 2, 2, 0, 0, 8, 3, 6, '3', 1),
	(25, 1, 'Frente Panocha', 2, 1, 1, 0, 4, 3, 4, '3', 1),
	(26, 1, 'Moteños MP', 2, 1, 0, 1, 5, 3, 3, '3', 1),
	(24, 1, 'La Juanoteca', 2, 0, 2, 0, 4, 4, 2, '3', 1),
	(28, 1, 'Los Pitillos', 2, 0, 1, 1, 5, 6, 1, '3', 1),
	(35, 1, 'Viejas Glorias Pizzería Mayor', 2, 2, 0, 0, 22, 1, 6, '4', 1),
	(33, 1, 'La Tronkería FC', 2, 2, 0, 0, 13, 3, 6, '4', 1),
	(32, 1, 'Los Minis del Moe´s', 2, 2, 0, 0, 8, 2, 6, '4', 1),
	(30, 1, 'Ese perrillo es tuyo?', 2, 0, 0, 2, 2, 10, 0, '4', 1),
	(34, 1, 'Union Segarro Amegos (USA)', 2, 0, 0, 2, 2, 12, 0, '4', 1),
	(31, 1, 'CD Giro Flash Paquetines', 2, 0, 0, 2, 2, 21, 0, '4', 1),
	(29, 1, 'Cervecería Tere', 2, 0, 0, 2, 1, 8, -3, '3', 1);


--
-- Data for Name: comentarios; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: estadisticas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."estadisticas" ("id", "jugador_id", "partido_id", "goles", "asistencias", "tarjetas_amarillas", "tarjetas_rojas", "minutos", "created_at", "paradas", "goles_encajados", "temporada_id") VALUES
	(8, 4, 2, 0, 1, 0, 0, 90, '2026-04-16 17:00:30.730068+00', 0, 0, 1),
	(9, 11, 2, 1, 0, 0, 0, 90, '2026-04-16 17:00:42.3084+00', 0, 0, 1),
	(10, 10, 2, 1, 0, 0, 0, 90, '2026-04-16 17:03:21.833061+00', 0, 0, 1),
	(11, 17, 2, 1, 0, 0, 0, 90, '2026-04-16 17:11:13.762095+00', 0, 0, 1),
	(7, 8, 2, 1, 0, 0, 0, 90, '2026-04-16 17:00:21.842556+00', 0, 0, 1),
	(13, 10, 12, 1, 0, 0, 0, 90, '2026-06-08 17:21:10.617823+00', 0, 0, 1),
	(15, 13, 11, 1, 0, 0, 0, 90, '2026-06-08 17:21:51.782765+00', 0, 0, 1),
	(16, 17, 11, 0, 1, 0, 0, 90, '2026-06-08 17:21:57.300704+00', 0, 0, 1),
	(19, 6, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.078929+00', 0, 0, 1),
	(20, 4, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.311389+00', 0, 0, 1),
	(22, 9, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.63259+00', 0, 0, 1),
	(23, 8, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.754687+00', 0, 0, 1),
	(24, 13, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.856044+00', 0, 0, 1),
	(25, 14, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.960083+00', 0, 0, 1),
	(26, 11, 12, 0, 0, 0, 0, 90, '2026-06-09 17:55:00.070175+00', 0, 0, 1),
	(27, 5, 12, 0, 0, 0, 0, 90, '2026-06-09 17:55:00.46977+00', 0, 0, 1),
	(28, 17, 12, 0, 0, 0, 0, 90, '2026-06-09 17:55:00.557609+00', 0, 0, 1),
	(29, 7, 12, 0, 0, 0, 0, 90, '2026-06-09 17:55:00.662874+00', 0, 0, 1),
	(30, 3, 11, 0, 0, 0, 0, 90, '2026-06-09 18:07:58.410154+00', 0, 0, 1),
	(21, 29, 12, 0, 0, 0, 0, 90, '2026-06-09 17:54:59.505593+00', 0, 0, 1),
	(17, 2, 11, 0, 0, 0, 0, 90, '2026-06-08 19:11:01.394896+00', 7, 4, 1),
	(18, 2, 12, 0, 0, 0, 0, 90, '2026-06-08 19:11:19.525969+00', 5, 1, 1),
	(14, 10, 11, 1, 0, 0, 0, 90, '2026-06-08 17:21:43.623099+00', 0, 0, 1);


--
-- Data for Name: noticias; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."noticias" ("id", "titulo", "imagen_url", "created_at") OVERRIDING SYSTEM VALUE VALUES
	(59, 'Portada de Mundo Delictivo', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168915/noticia_1776672363109_kun1l4.jpg', '2026-04-20 08:06:03.109+00'),
	(25, '"Este año no bajo de 9 goles", declara Frozen', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168920/noticia_1776362743003_kng2vm.jpg', '2026-04-16 18:05:43.003+00'),
	(26, 'La pretemporada de Antonio', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1776373466579_exuxhi.jpg', '2026-04-16 21:04:26.579+00'),
	(31, 'Creo que a moto moto le gustas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168923/noticia_1776464332843_it07l3.jpg', '2026-04-17 22:18:52.843+00'),
	(58, 'Francisco Javier, al borde del colapso', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168915/noticia_1776672036530_oajxzg.jpg', '2026-04-20 08:00:36.53+00'),
	(72, 'Cuestión de tiempo!!! ✍️✍️', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168905/noticia_1777019678563_m25vau.png', '2026-04-24 08:34:38.564+00'),
	(60, 'La pregunta que está dando la vuelta al mundo', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168910/noticia_1776678667554_le235o.jpg', '2026-04-20 09:51:07.554+00'),
	(61, 'La tejera está de vuelta', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1776762741822_jcdx5k.jpg', '2026-04-21 09:12:21.822+00'),
	(62, 'Rueda de prensa del mister', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168917/noticia_1776763257596_bf6f73.jpg', '2026-04-21 09:20:57.596+00'),
	(63, 'Aura', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168919/noticia_1776851685859_vzkuiz.jpg', '2026-04-22 09:54:45.859+00'),
	(64, 'No al racismo', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168901/noticia_1776852066797_i37o6q.png', '2026-04-22 10:01:06.797+00'),
	(65, '🚨OFICIAL: Se confirma un secreto a voces', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168908/noticia_1776857381471_aph81w.png', '2026-04-22 11:29:41.471+00'),
	(66, 'Pillan a Darío celebrando la renovación en un buffet estilo asiático', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1776890753788_uohwb8.jpg', '2026-04-22 20:45:53.788+00'),
	(67, 'Última hora🚨🚨 El autobús de la tejera sufre un accidente', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168920/noticia_1776933786328_s40qq4.jpg', '2026-04-23 08:43:06.328+00'),
	(68, 'El sueño húmedo de la afición de la tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1776934225928_ymu5cu.jpg', '2026-04-23 08:50:25.928+00'),
	(69, 'Pillan a funcionario de la tejera trabajando🚨🚨🧨🧨', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168923/noticia_1776934254463_w2jpg7.jpg', '2026-04-23 08:50:54.463+00'),
	(70, 'IMPRESENTABLE. Darío jugador de la tejera durmiendo en un buffet de estilo asiático', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168919/noticia_1776935114571_lzduoz.jpg', '2026-04-23 09:05:14.571+00'),
	(75, '‼️🚨ATENCIÓN COCHE ROBADO🚨‼️', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168916/noticia_1777240222279_l53wdy.jpg', '2026-04-26 21:50:22.279+00'),
	(73, 'Última hora🚨🚨 encuentran muerto a la mente', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1777021664512_okvxgf.jpg', '2026-04-24 09:07:44.512+00'),
	(74, 'El campo en sus venas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168913/noticia_1777055316720_kirccv.jpg', '2026-04-24 18:28:36.72+00'),
	(78, 'La prueba más difícil de Darío: Pasar la ITV', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168916/noticia_1777452419124_ehoa7f.jpg', '2026-04-29 08:46:59.124+00'),
	(77, 'Estos son nuestros patrocinadores oficiales', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168921/noticia_1777382159264_ueeygx.jpg', '2026-04-28 13:15:59.264+00'),
	(89, 'Nada más que añadir', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168912/noticia_1778536419379_jxggtq.jpg', '2026-05-11 21:53:39.379+00'),
	(79, 'Compromiso con el club', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168918/noticia_1777452539866_npisgj.jpg', '2026-04-29 08:48:59.866+00'),
	(80, 'Granjero busca cabra', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168909/noticia_1777452822841_ezcvvi.jpg', '2026-04-29 08:53:42.841+00'),
	(82, 'Desde la tejera balompié felicitamos a nuestro jugador Darío por conseguir pasar la ITV', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168912/noticia_1777459719279_aka498.jpg', '2026-04-29 10:48:39.279+00'),
	(83, 'Última hora: Fran es judío🚨🚨', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168913/noticia_1777674517090_hjpdxx.jpg', '2026-05-01 22:28:37.09+00'),
	(84, 'Cuenta atrás la vuelta de la tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168912/noticia_1777749005733_hfklry.jpg', '2026-05-02 19:10:05.733+00'),
	(86, 'Más defensas que un actimel', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168918/noticia_1778234919487_w5iu1u.jpg', '2026-05-08 10:08:39.487+00'),
	(87, 'EXCLUSIVA', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168909/noticia_1778453641116_fjkvoc.jpg', '2026-05-10 22:54:01.116+00'),
	(88, 'Directas a los más alto de éxitos España', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1778492736532_gq4p2d.jpg', '2026-05-11 09:45:36.532+00'),
	(91, 'ÉXITO MUNDIAL!!! Se desvela quién es Batman y su nombre de pila es Pedro', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168913/noticia_1778538481664_jsadmz.jpg', '2026-05-11 22:28:01.664+00'),
	(90, 'Comida de empresa por el cristo del Valle', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168923/noticia_1778536889559_wj5gzh.jpg', '2026-05-11 22:01:29.559+00'),
	(93, 'El ojeador Mota pone rumbo a la Patagonia en busca de talento', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168907/noticia_1778589361521_g82wzl.jpg', '2026-05-12 12:36:01.521+00'),
	(92, 'La tejera está de celebración por el cumpleaños de dos jugadores🥰🤩🤟🧨🐷', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1778580608401_zhxtyb.jpg', '2026-05-12 10:10:08.401+00'),
	(96, 'El equipo de ojeadores de la tejera ha reclutado al llamado por los interinos "el futuro Mbappé"', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168912/noticia_1778671238896_dub10a.jpg', '2026-05-13 11:20:38.896+00'),
	(94, 'La tejera pone rumbo a la gloria', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168908/noticia_1778591827730_ongs7c.jpg', '2026-05-12 13:17:07.73+00'),
	(95, 'Comienzan las jornadas de captación para la temporada 2026 de la mano del agente motiti', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1778670904058_gggoa4.jpg', '2026-05-13 11:15:04.058+00'),
	(121, 'Francisco Javier ha tenido que hacer autostop para llegar al gimnasio', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168901/noticia_1779280443587_etglfe.jpg', '2026-05-20 12:34:03.587+00'),
	(24, 'Orgullosos de ser primeros en el ranking UEFA', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168919/noticia_1776361294252_uqihb8.jpg', '2026-04-16 17:41:34.252+00'),
	(101, 'Quién está suplantando la identidad de dj furgoneta??', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168921/noticia_1778678610853_o2ra3a.png', '2026-05-13 13:23:30.853+00'),
	(100, 'Pan javi como la cancion de techno', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168909/noticia_1778678335310_ctlwjd.jpg', '2026-05-13 13:18:55.31+00'),
	(114, 'Parque jurásico, ya en cines', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1779193370677_ltspas.jpg', '2026-05-19 12:22:50.677+00'),
	(102, 'El nombre del portero de la tejera sale en la rua del barsa PA LA RACHA', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168921/noticia_1778678969207_chribv.jpg', '2026-05-13 13:29:29.207+00'),
	(103, 'BAJAS DE ÚLTIMA HORA 🚨 Ivi y Fran han ido a por la parejita. ENHORABUENA 👶🏼', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168917/noticia_1778882460337_jadcz0.jpg', '2026-05-15 22:01:00.337+00'),
	(104, 'Pillan a Ricardo trabajando en puy du fou', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1778882730544_be78kb.jpg', '2026-05-15 22:05:30.544+00'),
	(130, 'Este verano no te quedes sin tus chanclas de la tejera. Están volando!!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168918/noticia_1779364271518_texleh.jpg', '2026-05-21 11:51:11.518+00'),
	(106, 'Ya en cines🚨🚨', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168908/noticia_1778885831284_eazixt.jpg', '2026-05-15 22:57:11.284+00'),
	(107, '🚨ÚLTIMA HORA: Nuestro jugador Frozen intentando convencer a unos fichajes', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1778959575491_t9imm8.png', '2026-05-16 19:26:15.491+00'),
	(108, 'El pintor; la obra de arte', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1778965585820_rpxrgq.jpg', '2026-05-16 21:06:25.82+00'),
	(105, 'Darío ha sido infiel al wok con un de lokos', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168913/noticia_1778882886715_aw99gs.jpg', '2026-05-15 22:08:06.715+00'),
	(110, 'Imágenes del partido de pretemporada', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1779039520879_n72qba.jpg', '2026-05-17 17:38:40.879+00'),
	(111, 'Muchas llamadas y poco fútbol en Grúas San Antón', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168915/noticia_1779137383003_ifyodq.jpg', '2026-05-18 20:49:43.003+00'),
	(112, 'La noche de nuestros superhéroes', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168914/noticia_1779138260727_hvtq2k.jpg', '2026-05-18 21:04:20.727+00'),
	(99, 'Trabajo? Usted está de putas!!! Tendrá sanción por parte del míster', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168905/noticia_1778677478544_zhmh1j.png', '2026-05-13 13:04:38.544+00'),
	(118, 'ÚLTIMA HORA!! La tejera anuncia su jornada retro por el retraso del pedido de nuevas camisetas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1779258196815_lthsim.jpg', '2026-05-20 06:23:16.815+00'),
	(116, 'Nuestro jugador el miau miau ya está en el estadio calentando', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1779193981511_kp7z5u.jpg', '2026-05-19 12:33:01.511+00'),
	(117, 'El hombre mas rápido del mundo!!! En Tembleque', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168921/noticia_1779221438351_thwcfp.jpg', '2026-05-19 20:10:38.351+00'),
	(143, 'Marcos al tembleque CANCELADO Adolf no fue capaz de convencerle, insultando a todos y cada uno de sus amigos', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781195790/tejera/noticias/imlovkpcau8vvyszudbf.jpg', '2026-06-11 16:36:29.231+00'),
	(119, 'Corre que te corre', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168901/noticia_1779263248021_md0mbb.jpg', '2026-05-20 07:47:28.021+00'),
	(120, 'Francisco Javier se duerme en su último día de prácticas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168908/noticia_1779280289707_rkgegm.jpg', '2026-05-20 12:31:29.707+00'),
	(123, 'Frozen atrapado', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168910/noticia_1779281422606_naekxw.jpg', '2026-05-20 12:50:22.606+00'),
	(97, 'Putas, putas y más putas! Así celebran los cumpleaños los chicos del Tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1778671415039_wkba9d.jpg', '2026-05-13 11:23:35.039+00'),
	(126, 'Nada más que decir', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168921/noticia_1779362454778_picirz.jpg', '2026-05-21 11:20:54.778+00'),
	(98, 'Está es la historia de un hombre que se lesionó. Increíble cambio!!!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168910/noticia_1778671824646_fdiexg.jpg', '2026-05-13 11:30:24.646+00'),
	(127, 'La tejera presenta la edición especial con la que jugarán contra leones del atlas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1779362790119_fhp2er.jpg', '2026-05-21 11:26:30.119+00'),
	(109, 'El jugador Frozen Mind de la tejera acusado de fraude fiscal en una trama de apuestas deportivas ilegales', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168922/noticia_1779027508270_mpjl9p.jpg', '2026-05-17 14:18:28.27+00'),
	(148, 'Error en la imprenta', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781213204/tejera/noticias/u8vnnyditneq44pvzlu6.jpg', '2026-06-11 21:26:43.315+00'),
	(128, 'Impresentable!!! A Málaga a sólo una semana de la competición. IMAGEN DE JAVI HOYOS', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168919/noticia_1779363374108_bfl6qn.jpg', '2026-05-21 11:36:14.108+00'),
	(129, '¿Gula, qué es eso? En la tejera somos de delokos', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1779363435718_hkafvp.jpg', '2026-05-21 11:37:15.718+00'),
	(125, 'Acusado!! Jumpy a los tribunales', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168920/noticia_1779295976308_sre6q9.jpg', '2026-05-20 16:52:56.308+00'),
	(124, 'Se filtra la increíble dieta que está siguiendo Jumpy!!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168916/noticia_1779295898661_vpaaka.jpg', '2026-05-20 16:51:38.661+00'),
	(23, 'Cuál será la futura equipación de la tejera? Estos son algunos prototipos enviados por nuestros fans', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168905/noticia_1776360617140_v2eo9m.jpg', '2026-04-16 17:30:17.14+00'),
	(113, 'Iván y Darío, posibles bajas para la primera jornada de liga', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1779190312355_jpaato.jpg', '2026-05-19 11:31:52.355+00'),
	(9, 'EFECTO MANTEMA!! Los petrodólares llegan al Tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168918/noticia_1776292658302_qgwq3n.png', '2026-04-15 22:37:38.302+00'),
	(16, 'ÚLTIMA HORA!!! Acaban de expulsar a Darío del WOK. Pero qué injusticia!!!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168907/noticia_1776351004640_etwsqj.jpg', '2026-04-16 14:50:04.64+00'),
	(12, 'Con dinero si se puede fichar!! Los fanáticos esperan una temporada exitosa', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168916/noticia_1776339983554_lgqoqa.jpg', '2026-04-16 11:46:23.554+00'),
	(19, 'EXCLUSIVAAA DARIO IMPLICADO EN EL CASO EPSTEIN!!!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168911/noticia_1776352784698_noirvh.jpg', '2026-04-16 15:19:44.698+00'),
	(139, '"Estamos de vuelta", declara el capi', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781174301/tejera/noticias/ue8lli06ihmqmtuuysvc.jpg', '2026-06-11 10:38:19.866+00'),
	(144, 'Fichajes ?', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781195824/tejera/noticias/cpxnfzujydorip8rveng.jpg', '2026-06-11 16:37:03.899+00'),
	(149, 'Dario prueba el gangbang', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781213384/tejera/noticias/gfuhbmwxrarjgotvrijg.jpg', '2026-06-11 21:29:43.161+00'),
	(5, 'No quiero futbolistas, quiero 11 DARIOS!!!! Viva Dehesa del Tallar!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168905/noticia_1776291861864_hw8tfe.jpg', '2026-04-15 22:24:21.864+00'),
	(6, 'Una nueva propuesta para camiseta de un fan de la tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168922/noticia_1776292054562_usjfmi.jpg', '2026-04-15 22:27:34.562+00'),
	(10, 'Onichan', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1776335255707_tdkjqt.jpg', '2026-04-16 10:27:35.707+00'),
	(11, 'Vuelve 🙏', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168911/noticia_1776336090632_mipgez.jpg', '2026-04-16 10:41:30.632+00'),
	(13, 'Pablo, a tope en la rueda de prensa de pretemporada', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168910/noticia_1776349916015_gdybvf.jpg', '2026-04-16 14:31:56.015+00'),
	(14, 'Declaraciones de fernan y nuevos patrocinadores', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168911/noticia_1776350010969_zkr9fj.jpg', '2026-04-16 14:33:30.969+00'),
	(15, 'IMPACTO HITLER y la dura pretemporada desempeñada por el tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168910/noticia_1776350652052_co5muq.jpg', '2026-04-16 14:44:12.052+00'),
	(17, 'Honor 🤟', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168909/noticia_1776351618391_x19uzc.jpg', '2026-04-16 15:00:18.391+00'),
	(18, 'Nueva baja para el tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168912/noticia_1776352423872_ycdgrm.jpg', '2026-04-16 15:13:43.872+00'),
	(20, 'Nuevo marketing tejeríl', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168912/noticia_1776353157671_e89ezw.jpg', '2026-04-16 15:25:57.671+00'),
	(21, 'Nuevas caras en el equipo', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1776353443017_zl4zuf.jpg', '2026-04-16 15:30:43.017+00'),
	(22, 'Duras declaraciones de Francisco Javier', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168918/noticia_1776357137938_flibtb.jpg', '2026-04-16 16:32:17.938+00'),
	(4, 'Una guerra entre equipos, aunque también entre hermanos', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168922/noticia_1776291058619_cag586.jpg', '2026-04-15 22:10:58.619+00'),
	(7, 'Darío cansado de tanto trabajar, y de jugar al futbolín!!!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168923/noticia_1776292403912_pucgj9.jpg', '2026-04-15 22:33:23.912+00'),
	(140, 'Muli III ya se atreve con el brazalete', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781188506/tejera/noticias/uv6hjmsthxnltakdf5pn.jpg', '2026-06-11 14:35:04.959+00'),
	(145, 'Se filtra la foto del jugador lesionado en las pistas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781197195/tejera/noticias/o8w5jkboxpeikyjrbbf5.jpg', '2026-06-11 16:59:54.034+00'),
	(150, 'Oferton de bienvenida !!', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781213416/tejera/noticias/yef2huhvajhtqbz1dgqb.jpg', '2026-06-11 21:30:15.604+00'),
	(141, 'El cm de las noticias tejeriles is back', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781195389/tejera/noticias/h5wo5rmabc5t5p93t2rv.jpg', '2026-06-11 16:29:47.07+00'),
	(146, 'El culpable de la lesión que arrastra frozen mind', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781197475/tejera/noticias/vhfdjylq2jtilvtzfmgz.jpg', '2026-06-11 17:04:34.047+00'),
	(151, 'Se desvela la existencia de santa claus, es Dario', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781213539/tejera/noticias/y70qvgqt4kwabcz9dbk1.jpg', '2026-06-11 21:32:17.988+00'),
	(132, 'Afición: Son muy buenos nos ganarán. El putisimo fachero Pedro pistas: Pan comido', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168915/noticia_1779367426485_exqssu.jpg', '2026-05-21 12:43:46.485+00'),
	(133, 'Markitos ante su mayor reto: aprobar un examen', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168906/noticia_1779369240721_kogn8r.jpg', '2026-05-21 13:14:00.721+00'),
	(135, 'Parte médico | Frozen', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168901/noticia_1779488296738_dvcwbo.png', '2026-05-22 22:18:16.738+00'),
	(136, 'Se revela el tratamiento que va a recibir Frozen de la mano de los mejores especialistas', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168901/noticia_1779489794061_mdawam.jpg', '2026-05-22 22:43:14.061+00'),
	(137, 'Expedición al de lokos', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168903/noticia_1779561934211_c8hqmc.jpg', '2026-05-23 18:45:34.211+00'),
	(138, 'Franul realiza el ritual del fuego para la suerte de la tejera', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168902/noticia_1779581754459_lzymr8.jpg', '2026-05-24 00:15:54.459+00'),
	(134, '"Peor que el coronavirus". El sionismo se está contagiando en la tejera🚨🚨', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168901/noticia_1779471178625_pflll6.jpg', '2026-05-22 17:32:58.625+00'),
	(131, 'Si buscas en internet qué es un jalufo, esto es lo que sale. Esto es lo que son: una panda de cerdos', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781168915/noticia_1779365611859_bh3uar.jpg', '2026-05-21 12:13:31.859+00'),
	(142, 'La peor noche de Fran', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781195535/tejera/noticias/qnldlxgoifigjwhd5o7g.jpg', '2026-06-11 16:32:13.837+00'),
	(147, 'Jumpy entrenando en el mismo gimnasio que Lebron James 🫨🫨', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781199350/tejera/noticias/bwenru7wof5sznugke1z.jpg', '2026-06-11 17:35:49.407+00'),
	(152, 'En qué estrella estará', 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781215877/tejera/noticias/xlkasfyw2txn8itnbhjb.jpg', '2026-06-11 22:11:16.182+00');


--
-- Data for Name: patrocinadores; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."patrocinadores" ("id", "imagen_url", "nombre", "created_at") VALUES
	(19, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169835/patrocinador_1777224928858_diyfch.png', 'Rivas Mascotas', '2026-04-26 17:35:30.09581+00'),
	(18, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169833/patrocinador_1777224906200_alzkeg.png', 'Ceda el Vaso', '2026-04-26 17:35:07.194934+00'),
	(16, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169830/patrocinador_1777224867627_n8wdrt.png', 'Farmacolmenar', '2026-04-26 17:34:28.763346+00'),
	(15, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169828/patrocinador_1777224847150_rv5rpn.png', 'Hyundai Miloma', '2026-04-26 17:34:08.532005+00'),
	(13, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169826/patrocinador_1777224801225_lkxab6.png', 'Mantema', '2026-04-26 17:33:22.668796+00'),
	(12, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169825/patrocinador_1777224785784_fgawww.png', 'Bar Restaurante Puerta de la Mancha', '2026-04-26 17:33:07.276441+00'),
	(20, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169836/patrocinador_1777224948817_uxcfze.png', 'Summerland', '2026-04-26 17:35:50.014486+00'),
	(11, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169823/patrocinador_1777224764459_fc0a0o.png', 'Casablanca', '2026-04-26 17:32:45.86568+00'),
	(22, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169822/patrocinador_1779034990540_gb7ru4.png', 'Cocinas minaya', '2026-05-17 16:23:13.257528+00'),
	(21, 'https://res.cloudinary.com/dno3lltbe/image/upload/v1781169821/patrocinador_1777224963782_itz6ce.png', 'Mecavic', '2026-04-26 17:36:04.77496+00');


--
-- Data for Name: push_subscriptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."push_subscriptions" ("id", "endpoint", "p256dh", "auth", "updated_at") VALUES
	('07531c34-7b21-4690-8a00-f76435d7d87c', 'https://web.push.apple.com/QIhMKaJb1m_J8ieDPajFRreKPAxb7u3ndj-qg7Pr2sZ4d_FhAoTMV1cnTgl0GV9j52EBxGBpsa3NGnU_e9E7x8KIlQZmsGUuZU9es0r-sEWOedxNdKlgEI4J1EUuagIcd8N0KKaI-vti38yEdBvRJ8QlG_eniuL7A7NO3na6DO4', 'BP1iK05AJ_RpW9b2eiZ9jUQA9eJcLGkJ6jEMjlQm6urtFuoGcioqDkkiZSe_5R2Xg7HzQdsURSBRJg_9T5gquZs', 'n6rN6QxRythCy1EkiHb-VQ', '2026-04-18 14:10:10.069+00'),
	('f60fdc18-d208-44e0-8256-0a7fc6521602', 'https://fcm.googleapis.com/fcm/send/cEumJzq6ZDE:APA91bFhDUTG9oDoJROfPlbYDvA5d2rUE3BTnU4hzkq5YzKE0Xh5uB6e_Cfkc3apUN6Ig2y9se7muKyAQDalgGa-3-BEcnnGQ7nIj-DNyR3Apmuw7QSCvkhY5rTfnbLevZjedgClsA16', 'BHbPRSQw0iZGJtVLLCZWeF_HVF2u6OOI44e_4-MYbJS1G1TljuUkbRWvN6xbhHCtpn0U2u2xf9cuEECmyltMjGI', 'kCwIn8r6EoeI-29fXeUDRA', '2026-04-18 14:12:45.821+00'),
	('b52b221d-96c3-411b-aa3e-975612d6498f', 'https://web.push.apple.com/QH3ItU8JkHQz-iJgSDRnoR1OScmt6bhooWnXGiMJAjiZ1B5KlPZK0feJ7Os6yaCEEw_LwVEOjExOHG2_LruvzGU_dCYclWg6Wdmu7MltfcuX3A9K_3A0w7w6HT3ykTiNtFKPxYv-1yHknMZ05rMX2zWoQSCox9AhOY-xQ9EFojI', 'BIdMT_CxutcApZAGQfB7OFe6pCEdZp4RuCVglItWmygBPnYAFLnlgSL1VD_A5tHEOwraOzBv9JKv49Z7SNqXd-M', 'ynkKMq9p1nfOG4y_HjN2eQ', '2026-04-18 15:02:40.659+00'),
	('15fa3b2d-e501-43a2-b6c0-29c8f58ba2e0', 'https://web.push.apple.com/QOmkFC5jeYnJH6dnOZSeKCCkcKaYzmmz7kBMI2rgVpgGcL8k3VWXgc6h3yGO0H0R3i9j_uuxmmylDhjuW0vbkMZ1TI2lPpVHrMIMAszMExs-gOLCix7MhXNgwYTcXnHfCo9LN9YMb6hrylEd-GeJsO2kzQm9iO8Kh3K-uaSNyzI', 'BA2laoAZZO65aFNyTv2pcR2KtkFkehUNXICeNM5pleQFmVQIyX8lgTEqNY_2tQ19sdM5A42UGIcj02iFhlSDnus', '4I6jwKOfOBfoRFeS0YwTHg', '2026-04-18 15:28:06.671+00'),
	('b4173ded-9acc-4095-8ff0-0b4be0e0af25', 'https://web.push.apple.com/QHWgI45kht1W5Diofolbkn9NMTkyDwi2az9AIqrOk3bdIEX6jdVM9yuDmPtI-Iov7yaejZANKw58E65GHlmarwkBcoBDXrYXYa5Yz2gbVFap5ybUB6zxQ3Z1-YCK49odIjsDHFrSEDC7_XoxqMBI_X5pDsFJzgL3hVe9Hz_i49M', 'BGkfXgfzHschiZ-7vErO6L9-UTYOmqOOLMyFkFxI-T-_oWk-0s0f2F4fLyz5JQ5ffq0bDEgr-de9zARpwNRwZCM', 'A-RRbabo-7m1HG8R5Es_Sw', '2026-04-18 17:01:56.844+00'),
	('4a7bb7b0-3f50-4721-afb5-4707e88bd07a', 'https://web.push.apple.com/QEzJjt8uNSZXzivEDmRreU4KGkgYZK_88Tq3diKEWEhtJnda2qzoMO2G9gJo_HYgcXZtZqRR7BQ3L2xkOo_ytkm3ZO8Il3M4DlVPodIZw5XA8zehZ9K7_04qoDsLXCg4Mnjrmaaexz_u8ImHF7RY-v03O7wn9XAZ8RA4P-EkRxs', 'BIDUmUqC7pWmTjghjnG9fWGYwer8MMfXgCwBDcvwkFJphurlPQ9lbKi-WsoYU1imrZoLUIKrMxJJPuyhaq4NFuQ', '3GSO_U5rj4iVyiG5C-XSKA', '2026-04-18 17:07:48.37+00'),
	('10e29ee9-1455-43c2-80a5-a3104aa42676', 'https://fcm.googleapis.com/fcm/send/de3aUzz9VBQ:APA91bGQ9NdXdyDvPCpK-KUY-SfBGdP09ACSX5ZaGeuAHkPkn89wjmxS8jL9XarzVa0fUaVCmn-MXvFtdpJ2lQbAbBwG5yhlbnUB8UHZpjbPwB7Wa2VepEfUjR1BP0fCSffb80LCryVK', 'BMJoqpGZ9JHWOSbIvfH_gJnv27mcXLHCF18O1QMsVrCAJ2AuEmqh7N61nm-vE-GpIlpHFtXg3j5TDhvB4xKSz1U', '5ypJgxWMpEQl3AzVRUYZUQ', '2026-04-19 14:45:59.113+00'),
	('71f36518-b4f8-4c09-bb68-bc76a5c4c965', 'https://web.push.apple.com/QH50HuMrOb_2p0RscaDOZQU5WWDHLQt-ADpNesSPxWdr9Oxpogr9EJHY96xpdvaNoe1GQagBnko5OX1Dn4e65qDb-4N-gw2GANy1jg0BT0IqGOa3Thuc3kpP0o0ZUxpO8g9kP7eJEipf5-HD46WTZpKyEJV71xT_2Hsx8sFU3Lc', 'BE1IkeQkIX15ua2p3mrk9l_TLBhC1Mresliz5-23K9H-O51Oz4aiAHruHpBf9G2a47EtxUtvoHt0cc-TbqGKXeQ', 'OaaqRsJCJf2M6hZZ5UOIdQ', '2026-04-25 21:34:26.342+00'),
	('b85176b5-9304-4d89-a507-caf0558f19a6', 'https://web.push.apple.com/QD78gOh-LxG6kCGJZ0XAtGZfxqN37TCpidGeVUKM4dOxlR1AwZeXm38frUiQch8DthZAAvOKmvsuZ4T3--O6DaLn7ZPZBo84_hoXBBjdKxJbAD-VoyNeGe6a4FAJycyxL6VFR-vz0LTU7fTStn1xi8gVig4ZfI7xrAnnBT5Th4A', 'BBw05bhwAnScRuAD0NsJOMO8SE-fad_NqEJMXWFpseaVr_8p3F8onjMeNGIZorncnRo9kwhSdfLUHZ7g7R9Szjk', 'n2BMwFnJ31VJzyUb1VFJ-g', '2026-05-08 10:08:46.134+00'),
	('85b28536-667e-4810-b8fe-0c6e3ca86613', 'https://web.push.apple.com/QDTw8UJQS5w0lgnsK2tGhhUa0TzyOpi4cUsSCygwKoaZlMAj2XSz5PfSYrz_DmwG7mvu62zSvCCVMKEnRulmoktYS2KGzAC8uDUcXr9xLavor0RO-q_w8Al-wQonkCDwLBK8ysVqyoxweWWUMMB9vrfhme-Kdup59yyoaru6ulM', 'BC8RztM5ncz4lN0gx9AczyuVKP-OowtfOvcWej7YSgraKIMaHNncDGVxBI4O1fwqYeyrxOHLCUsPIDyG71xQdbw', 'HCfPsmycS0oX_42hpa3Q6Q', '2026-05-11 19:31:35.04+00'),
	('d5fe56ae-63fd-4829-b372-c6a0637c1034', 'https://web.push.apple.com/QBUncBGdzty4NgS3oMzSK_DSgVuH7OQ7_WscCE3xRe2iWoait-ZyjedWRJ_ZiygT59S6n8UE9tLA8a_5U6ZyHeAe0sqMXeK6P6ACe29MJkG6Y9JQ63lRSu-eG_6Rdb2i5f2wvfH0fjoIFVyjBKrUF_AYbB5GdBFIAZ2WI0MngLE', 'BOV9z06FENrX1Nh3_uj_HyrOW8LU73KwJCRQEu7KdmJhEY67f0a7zAtvU8AQtQeJAgLC_gb3u0jPm8wE0V3sU6I', 'noW5SJNqk5nN53aV6cRuUQ', '2026-05-11 21:46:55.932+00'),
	('526d2a19-e328-4eae-85f4-71049373b185', 'https://web.push.apple.com/QOr0Ls19uwijSkk4UB_bAfUVw-HWwf_3bf10gqY7HIz_2JQ6hi43Z_xSk1T1JhW7xPsJa4J2hadTcUYx98HGF2rVauk0-TE3eMAn2r-UBt5xXhFYDTKpmYtGpy5xUxCdeWO0YvjylwAAXef_TSKhwcwldjA0o0eWNF5T2oX3t3s', 'BB0JxrsSa5-6jR7hQIib7Zim7f0BfANOj_VKFn_-fRryqpGW-MaGz9du0pMHGYMbuaTZ1z4zTE6yKmEYJzA-Prc', 'nUCNNKo7ACBKps4kEDW6-A', '2026-05-11 21:55:55.07+00'),
	('75bcda47-0c73-4fd1-9e88-ca7345aaec48', 'https://web.push.apple.com/QHXy7Xoc2_e4ij_HE6qfgpe_WrwC-Anzz3ApDjC8ZsO7f1wajLezw4udpJLIM1SCtDnBhbZtDKHk9CWdXiTxingZHc2YYZlYELzvubTGkRZJeihxro2ivMO6A2OPImfrMzdgLcjik6nqlisJLjI0274UcyCxJFzenRcNW0qX5PA', 'BC1KDkVzLL5x5LOFijaHrfpByoGFI1n7LiA7f4wKDpmR-kA8wSOxy69b8Adv_kcm3BjStkfUZXBEh84Vv1a0-1E', '0BT6Yaq463Nlx3i_ogI52A', '2026-05-20 20:57:23.397+00');


--
-- Data for Name: votos_mvp; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."votos_mvp" ("id", "partido_id", "votante_id", "votado_id", "created_at", "temporada_id") VALUES
	(3, 2, 3, 8, '2026-04-16 10:44:26.619354+00', NULL),
	(4, 2, 12, 3, '2026-04-16 13:51:26.222839+00', NULL),
	(5, 2, 7, 8, '2026-04-16 19:55:03.738155+00', NULL),
	(6, 2, 4, 8, '2026-04-16 21:14:57.712998+00', NULL),
	(7, 2, 14, 9, '2026-04-17 13:21:18.404304+00', NULL),
	(9, 11, 4, 10, '2026-06-08 19:24:55.427973+00', NULL),
	(10, 12, 8, 29, '2026-06-09 18:08:03.34654+00', NULL),
	(11, 12, 4, 29, '2026-06-09 21:20:52.513155+00', NULL),
	(12, 11, 6, 10, '2026-06-11 15:29:46.321222+00', NULL),
	(13, 12, 6, 29, '2026-06-11 15:29:55.007178+00', NULL);


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."buckets" ("id", "name", "owner", "created_at", "updated_at", "public", "avif_autodetection", "file_size_limit", "allowed_mime_types", "owner_id", "type") VALUES
	('patrocinadores', 'patrocinadores', NULL, '2026-04-16 08:38:27.991221+00', '2026-04-16 08:38:27.991221+00', true, false, 1048576, NULL, NULL, 'STANDARD'),
	('escudos-rivales', 'escudos-rivales', NULL, '2026-05-23 15:14:42.026148+00', '2026-05-23 15:14:42.026148+00', true, false, 1048576, NULL, NULL, 'STANDARD'),
	('noticias', 'noticias', NULL, '2026-03-28 11:42:05.52896+00', '2026-03-28 11:42:05.52896+00', false, false, 1048576, NULL, NULL, 'STANDARD'),
	('avatares', 'avatares', NULL, '2026-03-28 10:25:19.801426+00', '2026-03-28 10:25:19.801426+00', false, false, NULL, NULL, NULL, 'STANDARD');


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--

INSERT INTO "storage"."objects" ("id", "bucket_id", "name", "owner", "created_at", "updated_at", "last_accessed_at", "metadata", "version", "owner_id", "user_metadata") VALUES
	('6c30a494-358c-4b29-901c-b563c8f2fe47', 'noticias', 'noticia_1776353443017.jpeg', NULL, '2026-04-16 15:30:44.516111+00', '2026-04-16 15:30:44.516111+00', '2026-04-16 15:30:44.516111+00', '{"eTag": "\"65d7419d0618d10908b10615e30b6c37\"", "size": 513942, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T15:30:45.000Z", "contentLength": 513942, "httpStatusCode": 200}', 'd33d626c-5dfa-469c-9c35-e6eecb63f1b9', NULL, '{}'),
	('c13af837-39d2-4c9d-b5ae-a9f7e69bda36', 'noticias', 'noticia_1776678667554.jpeg', NULL, '2026-04-20 09:51:08.959221+00', '2026-04-20 09:51:08.959221+00', '2026-04-20 09:51:08.959221+00', '{"eTag": "\"8396eb005ad34fc46874a9c608ded840\"", "size": 836792, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-20T09:51:09.000Z", "contentLength": 836792, "httpStatusCode": 200}', 'eff31023-7e85-4040-8259-19866a32e0de', NULL, '{}'),
	('bbfab4f6-e863-4115-9e38-92cca5dddc4a', 'noticias', 'noticia_1776361294252.jpeg', NULL, '2026-04-16 17:41:35.376079+00', '2026-04-16 17:41:35.376079+00', '2026-04-16 17:41:35.376079+00', '{"eTag": "\"052c9529e936bccace6e92038d243649\"", "size": 273857, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T17:41:36.000Z", "contentLength": 273857, "httpStatusCode": 200}', '42cc2840-8639-4098-9163-3790fc7156e1', NULL, '{}'),
	('55a854c9-4e33-4b48-8979-5c690848e463', 'noticias', 'noticia_1777459719279.jpeg', NULL, '2026-04-29 10:48:40.434732+00', '2026-04-29 10:48:40.434732+00', '2026-04-29 10:48:40.434732+00', '{"eTag": "\"069e15c8db145fa1ed3bb0437eead495\"", "size": 443597, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-29T10:48:41.000Z", "contentLength": 443597, "httpStatusCode": 200}', '2c8ecb20-b65e-4931-a13a-1b6d89e51ccd', NULL, '{}'),
	('4d60b180-48d6-47d3-a3ad-ef6637dc9521', 'avatares', 'jugador_5.jpeg', NULL, '2026-04-16 22:31:30.05757+00', '2026-04-16 22:31:30.05757+00', '2026-04-16 22:31:30.05757+00', '{"eTag": "\"633bf326388f4a64646ad6c9d0fe49d2\"", "size": 241923, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T22:31:31.000Z", "contentLength": 241923, "httpStatusCode": 200}', '07fb2c7b-0131-44c1-b61b-208d7a0853ac', NULL, '{}'),
	('a3a0d537-065d-4ae7-ac2b-fda191f61cb9', 'noticias', 'noticia_1776934225928.jpeg', NULL, '2026-04-23 08:50:26.477335+00', '2026-04-23 08:50:26.477335+00', '2026-04-23 08:50:26.477335+00', '{"eTag": "\"b5c8d49578a24cd702b47b21eb92d636\"", "size": 489896, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-23T08:50:27.000Z", "contentLength": 489896, "httpStatusCode": 200}', '78790a01-e426-4f08-86ab-192bc78c3bed', NULL, '{}'),
	('4694170a-4c42-43c4-8c82-53047503fce4', 'patrocinadores', 'patrocinador_1777224785784.png', NULL, '2026-04-26 17:33:07.053305+00', '2026-04-26 17:33:07.053305+00', '2026-04-26 17:33:07.053305+00', '{"eTag": "\"8d81a95b2757a9a8a2a4ef4402fa1478\"", "size": 392934, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:33:07.000Z", "contentLength": 392934, "httpStatusCode": 200}', 'da0d50d4-20ef-4ae8-8252-48dca7acb329', NULL, '{}'),
	('9154d89f-8a86-43d0-a28b-faa40ca6cd74', 'noticias', 'noticia_1778536889559.jpeg', NULL, '2026-05-11 22:01:30.5106+00', '2026-05-11 22:01:30.5106+00', '2026-05-11 22:01:30.5106+00', '{"eTag": "\"76381c46b92b050f6182c142f4d45cf5\"", "size": 126714, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-11T22:01:31.000Z", "contentLength": 126714, "httpStatusCode": 200}', 'a78c2785-d7aa-499d-8a82-e50a81807d52', NULL, '{}'),
	('4c2e6551-8167-4dc8-8fdc-a525c2f0ed86', 'noticias', 'noticia_1778591827730.jpeg', NULL, '2026-05-12 13:17:08.817322+00', '2026-05-12 13:17:08.817322+00', '2026-05-12 13:17:08.817322+00', '{"eTag": "\"0a89dc9b95d9a922972a7b6347970b16\"", "size": 378828, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-12T13:17:09.000Z", "contentLength": 378828, "httpStatusCode": 200}', 'be042e9d-df4d-4658-851b-d8a18368d5c5', NULL, '{}'),
	('d401ff53-c01d-4b25-bedb-2afb04cfc2b3', 'patrocinadores', 'patrocinador_1777224847150.png', NULL, '2026-04-26 17:34:08.123836+00', '2026-04-26 17:34:08.123836+00', '2026-04-26 17:34:08.123836+00', '{"eTag": "\"b96de4b4429cde40cc5b754b0cd4a95c\"", "size": 235267, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:34:09.000Z", "contentLength": 235267, "httpStatusCode": 200}', '2db246a7-6ca7-4358-a3fb-5165fd12a083', NULL, '{}'),
	('b9cba58e-82a2-4f6d-82f1-0ffd8939b70e', 'avatares', 'jugador_3.jpg', NULL, '2026-04-14 21:49:30.102384+00', '2026-04-14 21:49:30.102384+00', '2026-04-14 21:49:30.102384+00', '{"eTag": "\"a9ae60832237d9e62063dd7bb8ab3932\"", "size": 57101, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T21:49:31.000Z", "contentLength": 57101, "httpStatusCode": 200}', 'aec2950c-bf95-4f20-b933-7178af620e1e', NULL, '{}'),
	('c44d059d-8ee6-47e3-9e90-c90194d44e7e', 'avatares', 'jugador_8.jpg', NULL, '2026-04-14 21:50:37.987272+00', '2026-04-14 21:50:37.987272+00', '2026-04-14 21:50:37.987272+00', '{"eTag": "\"327d3dedbbd5c98a2e085aa6fb9ca9b6\"", "size": 49865, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T21:50:38.000Z", "contentLength": 49865, "httpStatusCode": 200}', '2544912a-67fa-4f2c-873a-21a7f28734d2', NULL, '{}'),
	('25d671ec-efc6-492a-a0bf-41838eef7d5d', 'avatares', 'jugador_13.jpg', NULL, '2026-04-14 21:52:44.763895+00', '2026-04-14 21:52:44.763895+00', '2026-04-14 21:52:44.763895+00', '{"eTag": "\"e81758c3705b217f094ee30e88dac2d8\"", "size": 72459, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T21:52:45.000Z", "contentLength": 72459, "httpStatusCode": 200}', '1a69c2c3-23de-4cfc-81b2-67d009e456f0', NULL, '{}'),
	('a8ba5ec0-0be6-42f6-a1b2-6878ba364b34', 'noticias', '.emptyFolderPlaceholder', NULL, '2026-04-14 21:57:55.263213+00', '2026-04-14 21:57:55.263213+00', '2026-04-14 21:57:55.263213+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2026-04-14T21:57:55.263Z", "contentLength": 0, "httpStatusCode": 200}', 'd922e506-d4c8-486a-a114-451f1d5a6d41', NULL, '{}'),
	('107c9360-cfd3-4d0d-9f3a-f4c3674cb063', 'noticias', 'noticia_1776291058619.jpeg', NULL, '2026-04-15 22:10:59.147873+00', '2026-04-15 22:10:59.147873+00', '2026-04-15 22:10:59.147873+00', '{"eTag": "\"dbac7e58cacb0163a2b68502aea59633\"", "size": 1017170, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:11:00.000Z", "contentLength": 1017170, "httpStatusCode": 200}', '340e87b7-4c16-44e9-abe6-06d2d2204d19', NULL, '{}'),
	('3a7975d8-d702-49c8-b64c-2380803dbb3a', 'avatares', 'jugador_2.jpg', NULL, '2026-04-14 21:53:33.301647+00', '2026-04-15 22:12:08.634787+00', '2026-04-14 21:53:33.301647+00', '{"eTag": "\"85a3e356db5513be584a1a0675249c9d\"", "size": 95317, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:12:09.000Z", "contentLength": 95317, "httpStatusCode": 200}', '1f0406e3-206a-434d-96d1-38cb4826eadb', NULL, '{}'),
	('53539167-6a5d-42ff-a6a1-3445cb34a2d4', 'avatares', 'jugador_14.jpg', NULL, '2026-04-15 22:14:25.596318+00', '2026-04-15 22:33:13.293287+00', '2026-04-15 22:14:25.596318+00', '{"eTag": "\"022d6c379f485a2ff5923eec21fa3237\"", "size": 65123, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:33:14.000Z", "contentLength": 65123, "httpStatusCode": 200}', 'ccd4ca68-fc28-4f57-9283-9e8a0bc04283', NULL, '{}'),
	('6d318a3a-f9fd-44f7-bc33-cf761e3930b1', 'noticias', 'noticia_1776357137938.jpeg', NULL, '2026-04-16 16:32:18.83278+00', '2026-04-16 16:32:18.83278+00', '2026-04-16 16:32:18.83278+00', '{"eTag": "\"0fa22ca6f79a6db206379b085828eab8\"", "size": 212034, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T16:32:19.000Z", "contentLength": 212034, "httpStatusCode": 200}', '21a8f271-6113-4294-8e37-b5e11a6b31bf', NULL, '{}'),
	('1375995a-c8b9-45bd-9bc6-b473aad2ad08', 'avatares', 'jugador_12.jpg', NULL, '2026-04-15 22:24:33.380069+00', '2026-04-15 22:24:33.380069+00', '2026-04-15 22:24:33.380069+00', '{"eTag": "\"04154b80ac9b87f4263f521c249b0635\"", "size": 81435, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:24:34.000Z", "contentLength": 81435, "httpStatusCode": 200}', '99eec7ba-b578-4620-b63b-0bb00b87ac4b', NULL, '{}'),
	('2077f51f-32d4-4ea2-8bf6-a3218510e916', 'noticias', 'noticia_1776762741822.jpeg', NULL, '2026-04-21 09:12:24.519753+00', '2026-04-21 09:12:24.519753+00', '2026-04-21 09:12:24.519753+00', '{"eTag": "\"41d7c661d46dd16139dfc1d0320137f3\"", "size": 1137291, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-21T09:12:25.000Z", "contentLength": 1137291, "httpStatusCode": 200}', '2784660a-a724-412b-90be-22d15eb5d841', NULL, '{}'),
	('2b80cedf-45da-4bba-85d6-a9b9124fd3f4', 'avatares', 'jugador_17.jpg', NULL, '2026-04-15 22:25:18.472515+00', '2026-04-15 22:25:18.472515+00', '2026-04-15 22:25:18.472515+00', '{"eTag": "\"9d4e5376c6a964305f5816eb2de40873\"", "size": 71303, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:25:19.000Z", "contentLength": 71303, "httpStatusCode": 200}', '50834333-f05e-4898-86c3-2b88a7deaf33', NULL, '{}'),
	('14a8cbbf-3828-49a5-80c9-3f202f8b69f7', 'noticias', 'noticia_1776362743003.jpg', NULL, '2026-04-16 18:05:43.252157+00', '2026-04-16 18:05:43.252157+00', '2026-04-16 18:05:43.252157+00', '{"eTag": "\"d852f6a5feff37191685aca9e8a846dc\"", "size": 151009, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T18:05:44.000Z", "contentLength": 151009, "httpStatusCode": 200}', '51949069-5385-4154-bddb-3c3bc552cf57', NULL, '{}'),
	('4571d542-9d2c-40a2-8e1f-1270be24744b', 'avatares', 'jugador_11.jpg', NULL, '2026-04-15 22:27:16.238468+00', '2026-04-15 22:27:16.238468+00', '2026-04-15 22:27:16.238468+00', '{"eTag": "\"459d5ca89c6a14693c3c61e4aaff31ed\"", "size": 71223, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:27:17.000Z", "contentLength": 71223, "httpStatusCode": 200}', '936cc685-bd9b-40dc-904b-779c52b9c684', NULL, '{}'),
	('1281b155-5602-47b8-85bd-2509309f7cde', 'noticias', 'noticia_1776292054562.jpeg', NULL, '2026-04-15 22:27:34.981506+00', '2026-04-15 22:27:34.981506+00', '2026-04-15 22:27:34.981506+00', '{"eTag": "\"b729ee35c0324c32466d13de99c9ebff\"", "size": 103395, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:27:35.000Z", "contentLength": 103395, "httpStatusCode": 200}', '82925b32-ab76-4cc5-8411-522240f20e62', NULL, '{}'),
	('3dc31fb7-7a77-4eb7-9764-266a940270bf', 'avatares', 'jugador_10.jpg', NULL, '2026-04-15 22:28:42.405954+00', '2026-04-15 22:28:42.405954+00', '2026-04-15 22:28:42.405954+00', '{"eTag": "\"7b9fab6b5b816b6857e354c0b7ac3a78\"", "size": 63252, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:28:43.000Z", "contentLength": 63252, "httpStatusCode": 200}', '79c47f07-d15a-4c40-a19e-81cee1e7d5d9', NULL, '{}'),
	('84bba56e-b534-46dc-88fd-00a48628657d', 'noticias', 'noticia_1776763257596.jpeg', NULL, '2026-04-21 09:20:58.293742+00', '2026-04-21 09:20:58.293742+00', '2026-04-21 09:20:58.293742+00', '{"eTag": "\"61e6d96d1cc6d30045f6e967787a9bd8\"", "size": 372534, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-21T09:20:59.000Z", "contentLength": 372534, "httpStatusCode": 200}', '8f0af878-893d-469f-a0a2-b068d4a59ae0', NULL, '{}'),
	('ebf43c89-7457-43ac-a092-2bec66a387e3', 'noticias', 'noticia_1776464332843.jpeg', NULL, '2026-04-17 22:18:55.740531+00', '2026-04-17 22:18:55.740531+00', '2026-04-17 22:18:55.740531+00', '{"eTag": "\"cbcb59d8206024b970f69ef504218655\"", "size": 91792, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-17T22:18:56.000Z", "contentLength": 91792, "httpStatusCode": 200}', '1066c17c-ec62-4251-89c1-299b90a0a6f3', NULL, '{}'),
	('ba7a0331-d526-4077-9fc5-9d6d80bec9a0', 'avatares', 'jugador_4.jpg', NULL, '2026-04-15 22:31:15.553924+00', '2026-04-15 22:31:15.553924+00', '2026-04-15 22:31:15.553924+00', '{"eTag": "\"fd386e0b6b7d69e9673adc736636e723\"", "size": 31643, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:31:16.000Z", "contentLength": 31643, "httpStatusCode": 200}', '0df336e9-dfcf-4f79-9f2e-e9b10a2302e9', NULL, '{}'),
	('c811120f-0df8-48fd-a1ba-a9da0ea304d3', 'avatares', 'jugador_15.jpg', NULL, '2026-04-15 22:30:38.528628+00', '2026-04-15 22:33:01.306613+00', '2026-04-15 22:30:38.528628+00', '{"eTag": "\"69800147a4e79f31cdc4124c3d630054\"", "size": 68422, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:33:02.000Z", "contentLength": 68422, "httpStatusCode": 200}', '517e4b00-b94b-4216-9d56-abff0eb9a1c5', NULL, '{}'),
	('0a44461e-2fb0-484e-ada8-62a11d524309', 'noticias', 'noticia_1776935114571.jpeg', NULL, '2026-04-23 09:05:15.416625+00', '2026-04-23 09:05:15.416625+00', '2026-04-23 09:05:15.416625+00', '{"eTag": "\"6825a222ccd8a9326d860c2d396bfe60\"", "size": 205150, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-23T09:05:16.000Z", "contentLength": 205150, "httpStatusCode": 200}', '41e79447-9ae8-4f0b-9924-7f4b29c7113a', NULL, '{}'),
	('b9167ca0-c78b-410a-951d-2ea50d96ceda', 'noticias', 'noticia_1777019678563.png', NULL, '2026-04-24 08:34:38.492191+00', '2026-04-24 08:34:38.492191+00', '2026-04-24 08:34:38.492191+00', '{"eTag": "\"87a1538be90872087bda4333132eae06\"", "size": 433610, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-24T08:34:39.000Z", "contentLength": 433610, "httpStatusCode": 200}', '5cdb7ba7-b069-4190-a5d4-a3b06bbe393a', NULL, '{}'),
	('e3b26f96-04ba-402d-a43b-114928484c45', 'patrocinadores', 'patrocinador_1777224963782.png', NULL, '2026-04-26 17:36:04.643123+00', '2026-04-26 17:36:04.643123+00', '2026-04-26 17:36:04.643123+00', '{"eTag": "\"5c758e8a83691fcea288676df82ae74f\"", "size": 40652, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:36:05.000Z", "contentLength": 40652, "httpStatusCode": 200}', '54eb8155-eb6f-4a5b-b986-98f2211b7552', NULL, '{}'),
	('da39b7e2-8027-4906-a62b-ad9e6e96edbd', 'noticias', 'noticia_1777452539866.jpeg', NULL, '2026-04-29 08:49:00.434921+00', '2026-04-29 08:49:00.434921+00', '2026-04-29 08:49:00.434921+00', '{"eTag": "\"68ebfb7a5d5b93d5fbb61f86b1cdf1bd\"", "size": 217655, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-29T08:49:01.000Z", "contentLength": 217655, "httpStatusCode": 200}', 'a375aa3f-ead7-4644-a250-62458ae21fd9', NULL, '{}'),
	('7221d353-626b-410e-a28b-efda0c34bed5', 'noticias', 'noticia_1777674517090.jpeg', NULL, '2026-05-01 22:28:37.613624+00', '2026-05-01 22:28:37.613624+00', '2026-05-01 22:28:37.613624+00', '{"eTag": "\"aa9c199b74aedfa72772db2a6bff7aa8\"", "size": 288024, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-01T22:28:38.000Z", "contentLength": 288024, "httpStatusCode": 200}', '75a59fbc-92fb-40f2-b546-c85cde3735a8', NULL, '{}'),
	('8c343897-600a-42ad-84f0-7570159ecc77', 'noticias', 'noticia_1778234919487.jpeg', NULL, '2026-05-08 10:08:40.216331+00', '2026-05-08 10:08:40.216331+00', '2026-05-08 10:08:40.216331+00', '{"eTag": "\"49bdb69044ac7e465809b17c856284f4\"", "size": 238451, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-08T10:08:41.000Z", "contentLength": 238451, "httpStatusCode": 200}', '6ff5d552-069d-4b69-bbb6-fb07f1160031', NULL, '{}'),
	('1c0a04c3-77f0-4e74-8189-1bf1f9e34508', 'noticias', 'noticia_1776291861864.jpeg', NULL, '2026-04-15 22:24:22.232756+00', '2026-04-15 22:24:22.232756+00', '2026-04-15 22:24:22.232756+00', '{"eTag": "\"1a01a11b6a2efa751fbce35d2baff756\"", "size": 730475, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:24:23.000Z", "contentLength": 730475, "httpStatusCode": 200}', 'f72f8f5c-58a7-43e9-a3c4-b2992174321a', NULL, '{}'),
	('be3171e7-5e8c-4805-a2c5-d35d3455430b', 'noticias', 'noticia_1776851685859.jpeg', NULL, '2026-04-22 09:54:46.649374+00', '2026-04-22 09:54:46.649374+00', '2026-04-22 09:54:46.649374+00', '{"eTag": "\"f6313a975728dc218cfc99006a84cd3c\"", "size": 322797, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-22T09:54:47.000Z", "contentLength": 322797, "httpStatusCode": 200}', '1e28ec0e-9cf5-4051-89e4-731db778f732', NULL, '{}'),
	('c197d8f6-8e0c-4738-bebc-a0870addeace', 'avatares', 'jugador_6.jpg', NULL, '2026-04-15 22:29:09.635833+00', '2026-04-15 22:29:09.635833+00', '2026-04-15 22:29:09.635833+00', '{"eTag": "\"c376734537baca8a2095645c20395230\"", "size": 31589, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:29:10.000Z", "contentLength": 31589, "httpStatusCode": 200}', 'd1554b43-b9b4-46ff-b966-a28651b907fa', NULL, '{}'),
	('47fa9459-1fbc-40bb-979a-2219acf35826', 'noticias', 'noticia_1779295898661.jpeg', NULL, '2026-05-20 16:51:39.154071+00', '2026-05-20 16:51:39.154071+00', '2026-05-20 16:51:39.154071+00', '{"eTag": "\"c8ef1df339c92b34dd9a3cd671db8f97\"", "size": 245389, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T16:51:40.000Z", "contentLength": 245389, "httpStatusCode": 200}', '0ed57a2e-a7f4-41bd-b86b-4371349984ee', NULL, '{}'),
	('3181117b-73a1-48c6-ac8d-9a3ac4a2522b', 'avatares', 'jugador_9.jpg', NULL, '2026-04-15 22:30:21.285376+00', '2026-04-15 22:30:21.285376+00', '2026-04-15 22:30:21.285376+00', '{"eTag": "\"d9c37277838ac76b5ee1fe9a2f854308\"", "size": 57495, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:30:22.000Z", "contentLength": 57495, "httpStatusCode": 200}', '0e940ff3-3e8a-4f76-bfbd-41151fde10da', NULL, '{}'),
	('322e7a44-bb8d-461a-98e1-4fd6323c978e', 'noticias', 'noticia_1779364271518.jpeg', NULL, '2026-05-21 11:51:12.094248+00', '2026-05-21 11:51:12.094248+00', '2026-05-21 11:51:12.094248+00', '{"eTag": "\"b625c995d4f84795d1ceaab99ec3229e\"", "size": 236181, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T11:51:13.000Z", "contentLength": 236181, "httpStatusCode": 200}', 'fe36798b-6d0e-4603-b066-6a7ff261319a', NULL, '{}'),
	('bd309d79-935d-464b-863b-fa7d9de65413', 'noticias', 'noticia_1776292403912.jpeg', NULL, '2026-04-15 22:33:24.357079+00', '2026-04-15 22:33:24.357079+00', '2026-04-15 22:33:24.357079+00', '{"eTag": "\"1fe368951cd4849e1735cee24e7909ee\"", "size": 103577, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:33:25.000Z", "contentLength": 103577, "httpStatusCode": 200}', '424f3da9-fec0-454a-a705-67a6f8c2222b', NULL, '{}'),
	('fcd7c465-2a1e-4638-9b86-45b5b3fa5143', 'noticias', 'noticia_1776292658302.png', NULL, '2026-04-15 22:37:38.847777+00', '2026-04-15 22:37:38.847777+00', '2026-04-15 22:37:38.847777+00', '{"eTag": "\"170e20bce4babc175c355e89b8f32c0c\"", "size": 1069305, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-15T22:37:39.000Z", "contentLength": 1069305, "httpStatusCode": 200}', '81f7b96b-ef8a-4151-9bb6-dd6d037d40b6', NULL, '{}'),
	('e19c0101-270f-4c15-bbfa-4a12fdd123dc', 'noticias', 'noticia_1778538481664.jpeg', NULL, '2026-05-11 22:28:02.075274+00', '2026-05-11 22:28:02.075274+00', '2026-05-11 22:28:02.075274+00', '{"eTag": "\"21a57c0dc0f6267c2bc8310d7ac86606\"", "size": 292451, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-11T22:28:03.000Z", "contentLength": 292451, "httpStatusCode": 200}', '920df21a-4849-449f-a0b4-b7820dfe246e', NULL, '{}'),
	('64e8ccbc-9606-4d27-ac46-3549c01fcbdc', 'noticias', 'noticia_1778670904058.jpeg', NULL, '2026-05-13 11:15:04.763556+00', '2026-05-13 11:15:04.763556+00', '2026-05-13 11:15:04.763556+00', '{"eTag": "\"1593c9e21c74e035e3748c7b07b0315a\"", "size": 520046, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T11:15:05.000Z", "contentLength": 520046, "httpStatusCode": 200}', '9cb4a881-98b8-4194-8dc8-7c2ef3ad8d1c', NULL, '{}'),
	('89abe90a-8a56-4903-9c2a-d45038114b97', 'noticias', 'noticia_1778671415039.jpeg', NULL, '2026-05-13 11:23:35.672002+00', '2026-05-13 11:23:35.672002+00', '2026-05-13 11:23:35.672002+00', '{"eTag": "\"a5fc94d1af778db1110d13dbda3b8666\"", "size": 412770, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T11:23:36.000Z", "contentLength": 412770, "httpStatusCode": 200}', '194ecf4f-9ab5-43df-8b08-deac95129a0a', NULL, '{}'),
	('6b0df16b-5f6d-4fe1-9557-033b1f9b01dd', 'noticias', 'noticia_1776335255707.jpeg', NULL, '2026-04-16 10:27:36.96403+00', '2026-04-16 10:27:36.96403+00', '2026-04-16 10:27:36.96403+00', '{"eTag": "\"d309a801c0f54e13c46d2d5e19d8967e\"", "size": 1545900, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T10:27:37.000Z", "contentLength": 1545900, "httpStatusCode": 200}', '010f6fac-5576-4d37-944c-f48a2cb16812', NULL, '{}'),
	('6d41349f-dfe4-463b-b49d-47f5518d4430', 'noticias', 'noticia_1778677478544.png', NULL, '2026-05-13 13:04:39.422332+00', '2026-05-13 13:04:39.422332+00', '2026-05-13 13:04:39.422332+00', '{"eTag": "\"bc65fb448feff48d2fa9f27f4a8623f9\"", "size": 1021331, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T13:04:40.000Z", "contentLength": 1021331, "httpStatusCode": 200}', '8cc59cfd-a6a8-4130-9d52-c7ce31496b4c', NULL, '{}'),
	('a8961618-445f-4cf6-b077-c854dcb465c0', 'noticias', 'noticia_1776336090632.webp', NULL, '2026-04-16 10:41:31.86193+00', '2026-04-16 10:41:31.86193+00', '2026-04-16 10:41:31.86193+00', '{"eTag": "\"b6d89ad9f9ec4e2e5a7459c992562682\"", "size": 264304, "mimetype": "image/webp", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T10:41:32.000Z", "contentLength": 264304, "httpStatusCode": 200}', '371bbffe-8be0-46c7-b8f0-1b6b9e01d88b', NULL, '{}'),
	('8017e007-14c3-408b-a5f6-6983e8a1f7ce', 'noticias', 'noticia_1778885831284.jpeg', NULL, '2026-05-15 22:57:12.289955+00', '2026-05-15 22:57:12.289955+00', '2026-05-15 22:57:12.289955+00', '{"eTag": "\"fd809416a8916e8be962b2c342f5d90e\"", "size": 385841, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-15T22:57:13.000Z", "contentLength": 385841, "httpStatusCode": 200}', '986c85ad-08b1-4aaf-b219-c1ef4a5c100c', NULL, '{}'),
	('c5499f59-e130-48a8-8395-30d94e95137d', 'noticias', 'noticia_1776852066797.png', NULL, '2026-04-22 10:01:08.290924+00', '2026-04-22 10:01:08.290924+00', '2026-04-22 10:01:08.290924+00', '{"eTag": "\"d9c302f6ee8bbc9401db62da30e68605\"", "size": 3359490, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-22T10:01:09.000Z", "contentLength": 3359490, "httpStatusCode": 200}', '098ce1cc-1549-4c30-a64b-87dc9de7a93c', NULL, '{}'),
	('f396ba18-cec9-4ec4-bbf7-f002c8ca88dc', 'noticias', 'noticia_1776339983554.jpeg', NULL, '2026-04-16 11:46:25.557632+00', '2026-04-16 11:46:25.557632+00', '2026-04-16 11:46:25.557632+00', '{"eTag": "\"9fc813ac67573bc98eb823a4ece2a188\"", "size": 241821, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T11:46:26.000Z", "contentLength": 241821, "httpStatusCode": 200}', 'f203be70-5d2c-4ef1-b10a-9f731d7024be', NULL, '{}'),
	('73693c74-f3a7-4ccb-b081-9f5a8b1227fd', 'noticias', 'noticia_1776360617140.jpeg', NULL, '2026-04-16 17:30:18.482549+00', '2026-04-16 17:30:18.482549+00', '2026-04-16 17:30:18.482549+00', '{"eTag": "\"0ca91976f1c2f9ca7f326dd34a4298d0\"", "size": 432820, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T17:30:19.000Z", "contentLength": 432820, "httpStatusCode": 200}', 'b21563e8-f451-497d-b5c3-d0be7acf9985', NULL, '{}'),
	('07de6985-ede2-408f-b3e8-441aba6c517e', 'noticias', 'noticia_1776349916015.jpeg', NULL, '2026-04-16 14:31:57.331652+00', '2026-04-16 14:31:57.331652+00', '2026-04-16 14:31:57.331652+00', '{"eTag": "\"afc852acf4b6dc59d43e026971a9787a\"", "size": 467633, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T14:31:58.000Z", "contentLength": 467633, "httpStatusCode": 200}', '4bd7aada-5097-495f-b053-cc41d2984104', NULL, '{}'),
	('de5d0c83-fd77-4826-8e1f-2bfb4785c4df', 'noticias', 'noticia_1776373466579.jpeg', NULL, '2026-04-16 21:04:27.891525+00', '2026-04-16 21:04:27.891525+00', '2026-04-16 21:04:27.891525+00', '{"eTag": "\"06dce47ac2505559c8d5b46a379a9371\"", "size": 628122, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T21:04:28.000Z", "contentLength": 628122, "httpStatusCode": 200}', '9a93fdf7-adc5-469a-b1a1-0149c0bdbe45', NULL, '{}'),
	('6f89b655-64a9-40f9-ac59-2cddb54839d1', 'noticias', 'noticia_1776350010969.jpeg', NULL, '2026-04-16 14:33:31.943139+00', '2026-04-16 14:33:31.943139+00', '2026-04-16 14:33:31.943139+00', '{"eTag": "\"e9a6faf5af86e12b071969181a1b4576\"", "size": 468906, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T14:33:32.000Z", "contentLength": 468906, "httpStatusCode": 200}', 'fa4df20d-ef0c-4016-8682-990051c4367a', NULL, '{}'),
	('deb46ff3-6d7b-422b-9dc5-919449c8f1d9', 'noticias', 'noticia_1776350652052.jpeg', NULL, '2026-04-16 14:44:13.534957+00', '2026-04-16 14:44:13.534957+00', '2026-04-16 14:44:13.534957+00', '{"eTag": "\"1bf44a00e50dde044af1da48baf1873c\"", "size": 468098, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T14:44:14.000Z", "contentLength": 468098, "httpStatusCode": 200}', '15f257e5-724e-4b61-91ec-0260dcff4c1c', NULL, '{}'),
	('bcf7f9b9-7374-4690-aae3-4c87ba5019a2', 'noticias', 'noticia_1776351004640.jpeg', NULL, '2026-04-16 14:50:06.284129+00', '2026-04-16 14:50:06.284129+00', '2026-04-16 14:50:06.284129+00', '{"eTag": "\"941af1eff0ccce6de61d863e24fb3fc1\"", "size": 550020, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T14:50:07.000Z", "contentLength": 550020, "httpStatusCode": 200}', 'b32d565f-d4e6-44ed-b571-0577768247d2', NULL, '{}'),
	('f7c2e9bf-675b-4197-9b46-f1400f9765a7', 'noticias', 'noticia_1777021664512.jpeg', NULL, '2026-04-24 09:07:44.963195+00', '2026-04-24 09:07:44.963195+00', '2026-04-24 09:07:44.963195+00', '{"eTag": "\"1a4b5a6ed01f9e965a68108f84c3ac0b\"", "size": 420959, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-24T09:07:45.000Z", "contentLength": 420959, "httpStatusCode": 200}', '1b7cfeed-8ae8-4951-9e79-251704f407e8', NULL, '{}'),
	('1ac62854-80fb-4ebe-8462-e962a3630fcb', 'noticias', 'noticia_1776351618391.jpeg', NULL, '2026-04-16 15:00:19.885811+00', '2026-04-16 15:00:19.885811+00', '2026-04-16 15:00:19.885811+00', '{"eTag": "\"1fa14bd93d186f618ed4b5d5424d60c1\"", "size": 512456, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T15:00:20.000Z", "contentLength": 512456, "httpStatusCode": 200}', 'f18abb1e-dba3-4a03-8d9d-346874dd67f0', NULL, '{}'),
	('b3b58611-c619-41e1-a0bf-1b75ced877f0', 'avatares', 'jugador_7.jpeg', NULL, '2026-04-16 15:13:32.620516+00', '2026-06-11 09:31:54.458356+00', '2026-04-16 15:13:32.620516+00', '{"eTag": "\"ff8c0b83958011430e0786ea1a8505c7\"", "size": 423742, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-11T09:31:55.000Z", "contentLength": 423742, "httpStatusCode": 200}', '94fa0a27-9b1e-46f6-9a20-bc3aad90aa93', NULL, '{}'),
	('2c09328c-26db-46c8-b3ca-ae87fd6646f8', 'noticias', 'noticia_1777240222279.jpeg', NULL, '2026-04-26 21:50:22.706496+00', '2026-04-26 21:50:22.706496+00', '2026-04-26 21:50:22.706496+00', '{"eTag": "\"4ade102efc67a7026070c7e83bc61696\"", "size": 322103, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T21:50:23.000Z", "contentLength": 322103, "httpStatusCode": 200}', 'f0100a91-aac9-4b85-b1dc-24998e705468', NULL, '{}'),
	('72476cd7-b9a6-4203-a272-f37ec24bbf69', 'noticias', 'noticia_1776352423872.jpeg', NULL, '2026-04-16 15:13:44.932957+00', '2026-04-16 15:13:44.932957+00', '2026-04-16 15:13:44.932957+00', '{"eTag": "\"dfa95d7d864cd0e1f66b8da3a098abf7\"", "size": 442530, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T15:13:45.000Z", "contentLength": 442530, "httpStatusCode": 200}', '7af581c5-95a6-4abe-9782-1f67ede805ff', NULL, '{}'),
	('5314ed81-e3f5-498d-81da-0de6ddf9d0cf', 'noticias', 'noticia_1777452822841.jpeg', NULL, '2026-04-29 08:53:43.392697+00', '2026-04-29 08:53:43.392697+00', '2026-04-29 08:53:43.392697+00', '{"eTag": "\"5d226c0676b70a1095225d9c32590638\"", "size": 356500, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-29T08:53:44.000Z", "contentLength": 356500, "httpStatusCode": 200}', 'f7c5bca1-40cd-4770-9c03-4cf5a82fdc37', NULL, '{}'),
	('92301898-a5ca-4cf8-b3bc-3b1c70a6cb12', 'noticias', 'noticia_1776352784698.jpeg', NULL, '2026-04-16 15:19:45.854929+00', '2026-04-16 15:19:45.854929+00', '2026-04-16 15:19:45.854929+00', '{"eTag": "\"6c59788c9705a519f6463d629249bcba\"", "size": 458158, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T15:19:46.000Z", "contentLength": 458158, "httpStatusCode": 200}', 'e324916b-f138-4775-8203-84db6dc0d473', NULL, '{}'),
	('66303bfc-5f20-4eed-938a-115a79d26f9e', 'noticias', 'noticia_1776353157671.jpeg', NULL, '2026-04-16 15:25:58.541032+00', '2026-04-16 15:25:58.541032+00', '2026-04-16 15:25:58.541032+00', '{"eTag": "\"03efb95cdbe97e9ec0bfd34c6f48c1a5\"", "size": 417752, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-16T15:25:59.000Z", "contentLength": 417752, "httpStatusCode": 200}', '339e141c-83dd-4568-aa05-7f5ffae0149e', NULL, '{}'),
	('5f49e7d7-40be-410d-a8bf-12a80217ea5a', 'noticias', 'noticia_1777749005733.jpeg', NULL, '2026-05-02 19:10:06.591629+00', '2026-05-02 19:10:06.591629+00', '2026-05-02 19:10:06.591629+00', '{"eTag": "\"6232e0b9693ed73bacc23b2ba2eb2f47\"", "size": 318435, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-02T19:10:07.000Z", "contentLength": 318435, "httpStatusCode": 200}', '073c25af-0e9b-4311-9ea8-6be7c7765984', NULL, '{}'),
	('ed0701e9-db17-4c0c-9270-1e657277cda6', 'noticias', 'noticia_1776857381471.png', NULL, '2026-04-22 11:29:44.71322+00', '2026-04-22 11:29:44.71322+00', '2026-04-22 11:29:44.71322+00', '{"eTag": "\"5a217e0ad03cff17b28b7a8d6cb28403\"", "size": 1269366, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-22T11:29:45.000Z", "contentLength": 1269366, "httpStatusCode": 200}', '2507b5f5-0b08-4d10-b1ec-7b9cb36fc895', NULL, '{}'),
	('42edc19c-8411-45dd-a785-1ca2b509535c', 'noticias', 'noticia_1779295976308.jpeg', NULL, '2026-05-20 16:52:56.850079+00', '2026-05-20 16:52:56.850079+00', '2026-05-20 16:52:56.850079+00', '{"eTag": "\"854d4c4968cde4276a7e677729d93a4a\"", "size": 151474, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T16:52:57.000Z", "contentLength": 151474, "httpStatusCode": 200}', '3a513f4e-a89e-4e73-9e77-6d2d5ca17bb4', NULL, '{}'),
	('00662e74-53cc-4e82-8e91-efbe785a2591', 'noticias', 'noticia_1779365611859.jpeg', NULL, '2026-05-21 12:13:32.539288+00', '2026-05-21 12:13:32.539288+00', '2026-05-21 12:13:32.539288+00', '{"eTag": "\"ca27cc74d48f6843b3875bfadcb6102c\"", "size": 278990, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T12:13:33.000Z", "contentLength": 278990, "httpStatusCode": 200}', '7f0d6258-384e-4b86-9c9b-2bb4b74d1d14', NULL, '{}'),
	('aeba38e2-08ba-4701-bba8-0e6041b05dc8', 'noticias', 'noticia_1778453641116.jpeg', NULL, '2026-05-10 22:54:02.204439+00', '2026-05-10 22:54:02.204439+00', '2026-05-10 22:54:02.204439+00', '{"eTag": "\"7374956743d54cf977e402e393a04796\"", "size": 346294, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-10T22:54:03.000Z", "contentLength": 346294, "httpStatusCode": 200}', 'd3e610f4-e529-4cc1-a081-607202fd3dcb', NULL, '{}'),
	('44aeb35b-c745-4836-ac0e-9767cd65f7ba', 'noticias', 'noticia_1778580608401.jpeg', NULL, '2026-05-12 10:10:09.524888+00', '2026-05-12 10:10:09.524888+00', '2026-05-12 10:10:09.524888+00', '{"eTag": "\"33a516128412a53b9b0c1b6014e50282\"", "size": 612066, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-12T10:10:10.000Z", "contentLength": 612066, "httpStatusCode": 200}', 'dbb43594-e980-4e6d-b93b-e08662a41abb', NULL, '{}'),
	('26af339e-54e0-42a6-8666-d4fe8a00b617', 'noticias', 'noticia_1778671238896.jpeg', NULL, '2026-05-13 11:20:39.735324+00', '2026-05-13 11:20:39.735324+00', '2026-05-13 11:20:39.735324+00', '{"eTag": "\"7354e3b14f08172c4ca3dd2c9f7e469b\"", "size": 845190, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T11:20:40.000Z", "contentLength": 845190, "httpStatusCode": 200}', 'f1ca5150-3b14-4a1e-897e-fa90d5627b0b', NULL, '{}'),
	('fdb4344b-8c41-4c2c-8e07-ff63d2149bcc', 'noticias', 'noticia_1777055316720.jpeg', NULL, '2026-04-24 18:28:38.968143+00', '2026-04-24 18:28:38.968143+00', '2026-04-24 18:28:38.968143+00', '{"eTag": "\"5c87508cd25fd2dda26b455d6f96b187\"", "size": 189426, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-24T18:28:39.000Z", "contentLength": 189426, "httpStatusCode": 200}', '36426a06-2c5b-41a0-8536-3aab86688266', NULL, '{}'),
	('98ae84c2-86d7-4995-85fc-83d4e1008d67', 'noticias', 'noticia_1778678335310.jpeg', NULL, '2026-05-13 13:18:55.866184+00', '2026-05-13 13:18:55.866184+00', '2026-05-13 13:18:55.866184+00', '{"eTag": "\"1a36282b63d6c97fdef156a367217b12\"", "size": 358123, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T13:18:56.000Z", "contentLength": 358123, "httpStatusCode": 200}', 'bf2f0d9d-de82-4156-a12b-13e230221a69', NULL, '{}'),
	('bb2c5ce3-82b0-4d40-b79f-27d53c8a876d', 'noticias', 'noticia_1778882460337.jpeg', NULL, '2026-05-15 22:01:01.164637+00', '2026-05-15 22:01:01.164637+00', '2026-05-15 22:01:01.164637+00', '{"eTag": "\"1cac084d68089be5ea894b66d0d11927\"", "size": 219835, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-15T22:01:02.000Z", "contentLength": 219835, "httpStatusCode": 200}', '547d8737-846f-4ef2-9172-640f4f9d4310', NULL, '{}'),
	('4a221f91-c3a4-40d4-9937-194299d21618', 'noticias', 'noticia_1778959575491.png', NULL, '2026-05-16 19:26:16.234978+00', '2026-05-16 19:26:16.234978+00', '2026-05-16 19:26:16.234978+00', '{"eTag": "\"d55988cce3a0ca1cd310ff242a14f365\"", "size": 726565, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-16T19:26:17.000Z", "contentLength": 726565, "httpStatusCode": 200}', '0fd4bdd4-5bc2-48b0-8470-a0c7fbf176e0', NULL, '{}'),
	('2e7f27bc-b456-465c-84a5-899f50fba6d4', 'noticias', 'noticia_1779027508270.jpeg', NULL, '2026-05-17 14:18:29.74572+00', '2026-05-17 14:18:29.74572+00', '2026-05-17 14:18:29.74572+00', '{"eTag": "\"39fbf0a7b905e4744b83cba9c18d2d29\"", "size": 185139, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-17T14:18:30.000Z", "contentLength": 185139, "httpStatusCode": 200}', '671f593d-c142-4346-ba21-8fdfeb0bbe34', NULL, '{}'),
	('bf8f20e8-5c4c-48e6-aa15-0ceac2dbbd88', 'noticias', 'noticia_1779039520879.jpeg', NULL, '2026-05-17 17:38:42.162069+00', '2026-05-17 17:38:42.162069+00', '2026-05-17 17:38:42.162069+00', '{"eTag": "\"c7ac1c36a1460ac4725183d8b30307c4\"", "size": 464848, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-17T17:38:43.000Z", "contentLength": 464848, "httpStatusCode": 200}', '82e2083c-2753-40bd-b7ca-49943d32ce7e', NULL, '{}'),
	('562ad969-2729-4c0d-97da-b6e354ba667f', 'noticias', 'noticia_1779138260727.jpeg', NULL, '2026-05-18 21:04:21.812483+00', '2026-05-18 21:04:21.812483+00', '2026-05-18 21:04:21.812483+00', '{"eTag": "\"1003f9bc01e15919e8d1672893ac3c50\"", "size": 717735, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-18T21:04:22.000Z", "contentLength": 717735, "httpStatusCode": 200}', '1ed6f838-4d58-4ffb-8307-360e2ff6bd0b', NULL, '{}'),
	('273f643d-1aa2-4446-ad61-ac008c32ff6e', 'noticias', 'noticia_1779193370677.jpeg', NULL, '2026-05-19 12:22:51.386875+00', '2026-05-19 12:22:51.386875+00', '2026-05-19 12:22:51.386875+00', '{"eTag": "\"3785deff8e95a2697be9ee0103b52de1\"", "size": 458493, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-19T12:22:52.000Z", "contentLength": 458493, "httpStatusCode": 200}', '23c489ad-01d9-49e1-ae31-b687327603c4', NULL, '{}'),
	('dbb21f1a-c977-4862-97fd-091e2974b3a0', 'noticias', 'noticia_1779221438351.jpeg', NULL, '2026-05-19 20:10:39.07265+00', '2026-05-19 20:10:39.07265+00', '2026-05-19 20:10:39.07265+00', '{"eTag": "\"2a636efda3f8a41fc27075074d623d76\"", "size": 198692, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-19T20:10:39.000Z", "contentLength": 198692, "httpStatusCode": 200}', '22f304ff-bd44-49c9-9660-abb5c075182a', NULL, '{}'),
	('b090e93f-08b5-4387-839c-0cc55be0365d', 'noticias', 'noticia_1779258196815.jpeg', NULL, '2026-05-20 06:23:17.550534+00', '2026-05-20 06:23:17.550534+00', '2026-05-20 06:23:17.550534+00', '{"eTag": "\"ee53a8c1c3afa0c66ee5b7ff90d3b02c\"", "size": 524720, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T06:23:18.000Z", "contentLength": 524720, "httpStatusCode": 200}', 'aa138953-1ecd-4d1c-91b9-844d080a8fba', NULL, '{}'),
	('8de0ac04-b9a0-4ed6-b5e0-2edecb963ef3', 'noticias', 'noticia_1776890753788.jpeg', NULL, '2026-04-22 20:45:57.261615+00', '2026-04-22 20:45:57.261615+00', '2026-04-22 20:45:57.261615+00', '{"eTag": "\"62a1c1a2fdb2c9d9c3187e2218bd83fe\"", "size": 1200861, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-22T20:45:58.000Z", "contentLength": 1200861, "httpStatusCode": 200}', 'b15b25f6-70a9-489e-8a52-069b4af6de9b', NULL, '{}'),
	('ee9009d9-5a86-4994-9413-d48aff38dc74', 'noticias', 'noticia_1779362454778.jpeg', NULL, '2026-05-21 11:20:55.538601+00', '2026-05-21 11:20:55.538601+00', '2026-05-21 11:20:55.538601+00', '{"eTag": "\"0b660a108f563c38ff9892e75d855bbb\"", "size": 222472, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T11:20:56.000Z", "contentLength": 222472, "httpStatusCode": 200}', '3dd8437f-4b95-4c34-a942-ea3b1e668da0', NULL, '{}'),
	('302192a5-8171-402d-84d9-ff561495e384', 'patrocinadores', '.emptyFolderPlaceholder', NULL, '2026-04-26 17:31:34.26749+00', '2026-04-26 17:31:34.26749+00', '2026-04-26 17:31:34.26749+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:31:34.263Z", "contentLength": 0, "httpStatusCode": 200}', '6c278a08-fea8-4b42-8524-075e77c5958d', NULL, '{}'),
	('8b19416c-c022-4860-8d29-e28600dc5ba9', 'noticias', 'noticia_1778492736532.jpeg', NULL, '2026-05-11 09:45:37.230272+00', '2026-05-11 09:45:37.230272+00', '2026-05-11 09:45:37.230272+00', '{"eTag": "\"2bc18aa6becd58216819949240b053ed\"", "size": 428546, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-11T09:45:38.000Z", "contentLength": 428546, "httpStatusCode": 200}', '894756f3-4f12-4e35-8e70-3ae1683867c8', NULL, '{}'),
	('a8aca923-d046-459e-8d14-b06fdac58b21', 'noticias', 'noticia_1777382159264.jpeg', NULL, '2026-04-28 13:15:59.980364+00', '2026-04-28 13:15:59.980364+00', '2026-04-28 13:15:59.980364+00', '{"eTag": "\"44512f9936acf577f6993e2d9272c109\"", "size": 663887, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-28T13:16:00.000Z", "contentLength": 663887, "httpStatusCode": 200}', '09ea1a26-17da-46c7-880e-060401b7c233', NULL, '{}'),
	('74b36e98-aec9-4d9f-a722-39e09340b5a3', 'noticias', 'noticia_1778589361521.jpeg', NULL, '2026-05-12 12:36:02.167502+00', '2026-05-12 12:36:02.167502+00', '2026-05-12 12:36:02.167502+00', '{"eTag": "\"098178df7699d442e846aef4fbdb048b\"", "size": 393479, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-12T12:36:03.000Z", "contentLength": 393479, "httpStatusCode": 200}', '99d2e34a-238f-4e6f-a0a1-6d6b3735f1fe', NULL, '{}'),
	('78c6a270-eb45-4c7d-9d1f-404669dcf73d', 'noticias', 'noticia_1778671824646.jpeg', NULL, '2026-05-13 11:30:25.278225+00', '2026-05-13 11:30:25.278225+00', '2026-05-13 11:30:25.278225+00', '{"eTag": "\"9b7c8c74de7d6505f886548f908c898c\"", "size": 345120, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T11:30:26.000Z", "contentLength": 345120, "httpStatusCode": 200}', '3eda0699-c6a3-4770-bb9a-23cd741397b8', NULL, '{}'),
	('23ff44aa-75d8-4bdd-8499-29f28da98484', 'noticias', 'noticia_1778678610853.png', NULL, '2026-05-13 13:23:34.108229+00', '2026-05-13 13:23:34.108229+00', '2026-05-13 13:23:34.108229+00', '{"eTag": "\"ed21c594475d205ff196fef2d0f81786\"", "size": 870030, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T13:23:35.000Z", "contentLength": 870030, "httpStatusCode": 200}', '2ced4456-552f-4e1c-906b-9cc1d4ce8649', NULL, '{}'),
	('465c2b7c-a1a8-4907-9b98-93091de4fcd8', 'noticias', 'noticia_1778678969207.jpeg', NULL, '2026-05-13 13:29:29.951497+00', '2026-05-13 13:29:29.951497+00', '2026-05-13 13:29:29.951497+00', '{"eTag": "\"e51fbdb79ebf54efb043c160acd654f6\"", "size": 137675, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-13T13:29:30.000Z", "contentLength": 137675, "httpStatusCode": 200}', '4dc66433-ba13-4e8b-b951-df55d2923d1c', NULL, '{}'),
	('de247b1a-e3eb-4ecf-aa1d-a73be5ef4501', 'noticias', 'noticia_1778882730544.jpeg', NULL, '2026-05-15 22:05:31.436259+00', '2026-05-15 22:05:31.436259+00', '2026-05-15 22:05:31.436259+00', '{"eTag": "\"4927b5afe9423852786a9df1e13287a2\"", "size": 503044, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-15T22:05:32.000Z", "contentLength": 503044, "httpStatusCode": 200}', '36e8b9c3-0da3-4175-b966-c2734ba37f6a', NULL, '{}'),
	('db09e42d-5274-4610-a2f7-2e142cddfebe', 'noticias', 'noticia_1778882886715.jpeg', NULL, '2026-05-15 22:08:07.354355+00', '2026-05-15 22:08:07.354355+00', '2026-05-15 22:08:07.354355+00', '{"eTag": "\"985888cd03197d9afc535db7ef6e2c92\"", "size": 287250, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-15T22:08:08.000Z", "contentLength": 287250, "httpStatusCode": 200}', '8dfb5d72-f8a6-4c03-aac4-f9bf6025cb8e', NULL, '{}'),
	('e24a99f9-a1a2-48da-bafe-7bbab4159b02', 'noticias', 'noticia_1778965585820.jpeg', NULL, '2026-05-16 21:06:26.93344+00', '2026-05-16 21:06:26.93344+00', '2026-05-16 21:06:26.93344+00', '{"eTag": "\"bea7cdf50bb51375ecd0cbee2186eedb\"", "size": 602829, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-16T21:06:27.000Z", "contentLength": 602829, "httpStatusCode": 200}', 'af0842bc-6ad5-41db-9f7d-5c29b3f639b2', NULL, '{}'),
	('910137da-6b2c-458f-8e8f-681ab942658d', 'patrocinadores', 'patrocinador_1779034990540.png', NULL, '2026-05-17 16:23:12.832165+00', '2026-05-17 16:23:12.832165+00', '2026-05-17 16:23:12.832165+00', '{"eTag": "\"aa5623c24c909a81cea3c1ec639357b6\"", "size": 67774, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-17T16:23:13.000Z", "contentLength": 67774, "httpStatusCode": 200}', 'f1dd46f2-fc86-41c9-809a-bec91b7904e3', NULL, '{}'),
	('b5a324fc-3b1f-46ae-9c93-1e8ca1215876', 'noticias', 'noticia_1779137383003.jpeg', NULL, '2026-05-18 20:49:43.416059+00', '2026-05-18 20:49:43.416059+00', '2026-05-18 20:49:43.416059+00', '{"eTag": "\"0c748eefe7a8f387c04caedca5f26409\"", "size": 253553, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-18T20:49:44.000Z", "contentLength": 253553, "httpStatusCode": 200}', 'd4cea2da-a740-4fbe-9dbb-d40daf191da9', NULL, '{}'),
	('a40eaed9-d4aa-427e-95ae-5ddf28b3020b', 'noticias', 'noticia_1779190312355.jpeg', NULL, '2026-05-19 11:31:53.23235+00', '2026-05-19 11:31:53.23235+00', '2026-05-19 11:31:53.23235+00', '{"eTag": "\"6e26ed2331080637af123cafb394dc92\"", "size": 475495, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-19T11:31:54.000Z", "contentLength": 475495, "httpStatusCode": 200}', '88d21eed-5d7a-4bc5-a1d6-98c89f1e98c5', NULL, '{}'),
	('0be12e8b-eab9-475c-9120-5277d96e8c5b', 'noticias', 'noticia_1779193981511.jpeg', NULL, '2026-05-19 12:33:02.776127+00', '2026-05-19 12:33:02.776127+00', '2026-05-19 12:33:02.776127+00', '{"eTag": "\"f615a20aca60a0e92b2c9368430770d2\"", "size": 481974, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-19T12:33:03.000Z", "contentLength": 481974, "httpStatusCode": 200}', '6148708a-474c-412e-bf70-69aa264b565e', NULL, '{}'),
	('caf7f308-3802-41fa-9ed8-fd95af1599db', 'noticias', 'noticia_1776933786328.jpeg', NULL, '2026-04-23 08:43:07.145767+00', '2026-04-23 08:43:07.145767+00', '2026-04-23 08:43:07.145767+00', '{"eTag": "\"0772a46294ebf983420d2c483ede1960\"", "size": 179668, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-23T08:43:08.000Z", "contentLength": 179668, "httpStatusCode": 200}', '54bd453e-7bed-453f-8c80-ceeb09c9e203', NULL, '{}'),
	('df0b5db3-518e-46d3-8842-0720abb3fadd', 'noticias', 'noticia_1779362790119.jpeg', NULL, '2026-05-21 11:26:30.886733+00', '2026-05-21 11:26:30.886733+00', '2026-05-21 11:26:30.886733+00', '{"eTag": "\"8045c4a33813b7bc7f1905abf0557748\"", "size": 491150, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T11:26:31.000Z", "contentLength": 491150, "httpStatusCode": 200}', '454c7a67-f7d3-453d-ac86-3ce68e30203e', NULL, '{}'),
	('63eb92f5-47f5-4856-881c-bc7433565b41', 'noticias', 'noticia_1776934254463.jpeg', NULL, '2026-04-23 08:50:54.860724+00', '2026-04-23 08:50:54.860724+00', '2026-04-23 08:50:54.860724+00', '{"eTag": "\"ec7cf4bf3ac0b11fa937c168fe1d9e46\"", "size": 99901, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-23T08:50:55.000Z", "contentLength": 99901, "httpStatusCode": 200}', '25d3fc9b-efbd-42c1-acec-e2e12e4dc429', NULL, '{}'),
	('fcec047f-1f37-4277-8cec-3385d0c96b93', 'noticias', 'noticia_1779363374108.jpeg', NULL, '2026-05-21 11:36:14.732482+00', '2026-05-21 11:36:14.732482+00', '2026-05-21 11:36:14.732482+00', '{"eTag": "\"af61b32ff65eb61e1675bd504f6522f3\"", "size": 209967, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T11:36:15.000Z", "contentLength": 209967, "httpStatusCode": 200}', 'a7c2033d-e40c-4394-88d1-221a4562410e', NULL, '{}'),
	('1825efe9-7ba3-4b4a-91f5-26664756f88d', 'noticias', 'noticia_1779367426485.jpeg', NULL, '2026-05-21 12:43:46.743341+00', '2026-05-21 12:43:46.743341+00', '2026-05-21 12:43:46.743341+00', '{"eTag": "\"1960184e36a79dd4c2f0be7916f53a57\"", "size": 274535, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T12:43:47.000Z", "contentLength": 274535, "httpStatusCode": 200}', '7ef8ecee-be73-4a3c-8c4f-1daebf8481b3', NULL, '{}'),
	('f952b393-82ee-4192-8ca2-8100c264cf37', 'noticias', 'noticia_1778536419379.jpeg', NULL, '2026-05-11 21:53:40.252079+00', '2026-05-11 21:53:40.252079+00', '2026-05-11 21:53:40.252079+00', '{"eTag": "\"b7b6d9b8056b48659c4e42c44a8a203b\"", "size": 307743, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-11T21:53:41.000Z", "contentLength": 307743, "httpStatusCode": 200}', 'b234ce86-0ee7-4c7e-b7c6-c03375e3f95d', NULL, '{}'),
	('d97dbfde-7497-458c-8491-9d24c58c29a9', 'patrocinadores', 'patrocinador_1777224764459.png', NULL, '2026-04-26 17:32:45.475106+00', '2026-04-26 17:32:45.475106+00', '2026-04-26 17:32:45.475106+00', '{"eTag": "\"7e8d1afe75bdb2fe8fb97f15d4c265f5\"", "size": 99592, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:32:46.000Z", "contentLength": 99592, "httpStatusCode": 200}', '86f29a56-0965-44a8-83d0-0bde5fc33888', NULL, '{}'),
	('baa78025-5a9e-4150-bf42-57dfaee9aa2c', 'patrocinadores', 'patrocinador_1777224801225.png', NULL, '2026-04-26 17:33:22.42803+00', '2026-04-26 17:33:22.42803+00', '2026-04-26 17:33:22.42803+00', '{"eTag": "\"cba33d77fee1385bd5b3f3dad42e4f46\"", "size": 196856, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:33:23.000Z", "contentLength": 196856, "httpStatusCode": 200}', '274cc0f4-4202-429e-816e-93d3774b23a3', NULL, '{}'),
	('937cff83-c94b-4626-9ff9-432bd7e7ecac', 'noticias', 'noticia_1776672036530.jpeg', NULL, '2026-04-20 08:00:37.391487+00', '2026-04-20 08:00:37.391487+00', '2026-04-20 08:00:37.391487+00', '{"eTag": "\"f5019fdbc11d107e1786007f908ec309\"", "size": 703726, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-20T08:00:38.000Z", "contentLength": 703726, "httpStatusCode": 200}', '4b87b8a9-50f0-4803-a30f-95a841378dea', NULL, '{}'),
	('3fb655e4-4e79-417b-adf1-0630b6d4815a', 'noticias', 'noticia_1776672363109.jpeg', NULL, '2026-04-20 08:06:04.783589+00', '2026-04-20 08:06:04.783589+00', '2026-04-20 08:06:04.783589+00', '{"eTag": "\"7de8aa2c0c4017a8460a2d31cb84e33d\"", "size": 680483, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-20T08:06:05.000Z", "contentLength": 680483, "httpStatusCode": 200}', '633f39e6-3203-49f6-bffe-8360dbdafc10', NULL, '{}'),
	('6a851def-478e-4775-b55e-c0c26a49bb77', 'patrocinadores', 'patrocinador_1777224867627.png', NULL, '2026-04-26 17:34:28.500445+00', '2026-04-26 17:34:28.500445+00', '2026-04-26 17:34:28.500445+00', '{"eTag": "\"3a390b9b38986b316fab03a633990be0\"", "size": 36970, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:34:29.000Z", "contentLength": 36970, "httpStatusCode": 200}', 'f48d7dd8-b042-45d6-aac9-c343484840a6', NULL, '{}'),
	('9806db43-b9a3-42f6-96ea-39ba5dd9ce66', 'patrocinadores', 'patrocinador_1777224906200.png', NULL, '2026-04-26 17:35:07.063872+00', '2026-04-26 17:35:07.063872+00', '2026-04-26 17:35:07.063872+00', '{"eTag": "\"d6d9a8d8554ba33ba6f61aa1aa98df9a\"", "size": 114279, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:35:08.000Z", "contentLength": 114279, "httpStatusCode": 200}', 'c995fea0-d606-49ed-b45d-11b3dda52137', NULL, '{}'),
	('c328cff4-9747-4696-be26-b14c33d909f9', 'patrocinadores', 'patrocinador_1777224928858.png', NULL, '2026-04-26 17:35:29.805943+00', '2026-04-26 17:35:29.805943+00', '2026-04-26 17:35:29.805943+00', '{"eTag": "\"0bd7bc63ee0da7b090a26fa556ac77c9\"", "size": 486216, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:35:30.000Z", "contentLength": 486216, "httpStatusCode": 200}', '7bcaa904-338d-4988-a9fd-1c312a2a742c', NULL, '{}'),
	('8c14090c-1e5c-4108-b214-833c2aa6190f', 'patrocinadores', 'patrocinador_1777224948817.png', NULL, '2026-04-26 17:35:49.834164+00', '2026-04-26 17:35:49.834164+00', '2026-04-26 17:35:49.834164+00', '{"eTag": "\"ce9f1fd21ccea240c8f3b05c638d37da\"", "size": 125029, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-04-26T17:35:50.000Z", "contentLength": 125029, "httpStatusCode": 200}', '476d4f6a-6d26-4fdd-a706-ee2d8c60241d', NULL, '{}'),
	('579fbabe-3cef-4200-85c1-3233276c3ba9', 'noticias', 'noticia_1777452419124.jpeg', NULL, '2026-04-29 08:47:00.036834+00', '2026-04-29 08:47:00.036834+00', '2026-04-29 08:47:00.036834+00', '{"eTag": "\"291ed36ee1fc05b755c2dd339bbdde55\"", "size": 656595, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-04-29T08:47:00.000Z", "contentLength": 656595, "httpStatusCode": 200}', '5fe456ee-0aa3-45ae-920b-950c97ccb013', NULL, '{}'),
	('b31cfe58-239e-44fe-959b-2a48a0130e8c', 'noticias', 'noticia_1779263248021.jpeg', NULL, '2026-05-20 07:47:28.8242+00', '2026-05-20 07:47:28.8242+00', '2026-05-20 07:47:28.8242+00', '{"eTag": "\"2db1adb9a0f5ec393a605b4704af20e1\"", "size": 643479, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T07:47:29.000Z", "contentLength": 643479, "httpStatusCode": 200}', 'a5da071e-2732-4346-8bc3-bd20e1de09d5', NULL, '{}'),
	('307218e6-53af-4ab8-8972-0bd83987620c', 'noticias', 'noticia_1779280289707.jpeg', NULL, '2026-05-20 12:31:30.627657+00', '2026-05-20 12:31:30.627657+00', '2026-05-20 12:31:30.627657+00', '{"eTag": "\"540a85fcfad35c66b13d024103f75263\"", "size": 379421, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T12:31:31.000Z", "contentLength": 379421, "httpStatusCode": 200}', 'f71d33c1-872c-4953-88f8-0164d1e923e9', NULL, '{}'),
	('3844678c-ac2f-4ee7-8e16-30af59846d21', 'noticias', 'noticia_1779363435718.jpeg', NULL, '2026-05-21 11:37:16.356063+00', '2026-05-21 11:37:16.356063+00', '2026-05-21 11:37:16.356063+00', '{"eTag": "\"fbc2663c1fd5cb36936b141f097f04c8\"", "size": 432422, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T11:37:17.000Z", "contentLength": 432422, "httpStatusCode": 200}', 'a4f6c4f7-c3cc-4e95-9661-db2e4df871cb', NULL, '{}'),
	('d1ac8291-135c-4c04-b6fa-7d407cb0148a', 'noticias', 'noticia_1779280443587.jpeg', NULL, '2026-05-20 12:34:05.061224+00', '2026-05-20 12:34:05.061224+00', '2026-05-20 12:34:05.061224+00', '{"eTag": "\"d3aaa608504be98ce469c2afbb90ef96\"", "size": 617809, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T12:34:05.000Z", "contentLength": 617809, "httpStatusCode": 200}', 'd1b5d7df-04e9-48eb-a721-8a9069f339e8', NULL, '{}'),
	('188b69f2-fe82-4562-b71b-219fbe504821', 'noticias', 'noticia_1779369240721.jpeg', NULL, '2026-05-21 13:14:01.370388+00', '2026-05-21 13:14:01.370388+00', '2026-05-21 13:14:01.370388+00', '{"eTag": "\"6c60060d37b7c298e63796189e6ba53b\"", "size": 995474, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-21T13:14:02.000Z", "contentLength": 995474, "httpStatusCode": 200}', 'c471a2c3-503d-4488-b2f0-1b1bd355d70a', NULL, '{}'),
	('824adb9a-8b3f-4432-bec2-16e83d059f42', 'noticias', 'noticia_1779281422606.jpeg', NULL, '2026-05-20 12:50:24.272876+00', '2026-05-20 12:50:24.272876+00', '2026-05-20 12:50:24.272876+00', '{"eTag": "\"638fe93f850253010c67e92cab8404e9\"", "size": 332288, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-20T12:50:25.000Z", "contentLength": 332288, "httpStatusCode": 200}', '36d18de5-cc7e-450c-aef9-868cd0c15a81', NULL, '{}'),
	('7d948f25-7cd8-4239-9ab7-d1ea433bb80d', 'noticias', 'noticia_1779471178625.jpeg', NULL, '2026-05-22 17:32:59.742837+00', '2026-05-22 17:32:59.742837+00', '2026-05-22 17:32:59.742837+00', '{"eTag": "\"1e8fc51ae7869e8ece771e665300a551\"", "size": 638765, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-22T17:33:00.000Z", "contentLength": 638765, "httpStatusCode": 200}', 'e72b4c06-074d-41eb-97d0-4143d63ab626', NULL, '{}'),
	('29934b65-9388-47fd-badb-fe14574568c0', 'noticias', 'noticia_1779488296738.png', NULL, '2026-05-22 22:18:18.297054+00', '2026-05-22 22:18:18.297054+00', '2026-05-22 22:18:18.297054+00', '{"eTag": "\"8e6f1268d69923086d5bcf32acf85e08\"", "size": 905814, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-22T22:18:19.000Z", "contentLength": 905814, "httpStatusCode": 200}', 'c8775663-4841-42bb-9610-b8f9e214252b', NULL, '{}'),
	('0b14ee7d-7880-418a-af8f-6bb1a352399d', 'noticias', 'noticia_1779489794061.jpeg', NULL, '2026-05-22 22:43:15.15948+00', '2026-05-22 22:43:15.15948+00', '2026-05-22 22:43:15.15948+00', '{"eTag": "\"6f173f9ca648199f5f2b88ff2fc600ce\"", "size": 644430, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-22T22:43:16.000Z", "contentLength": 644430, "httpStatusCode": 200}', '73caa9e4-11fd-4a93-b345-a8e0ea5a867f', NULL, '{}'),
	('5443a8a3-40a7-4936-aa1f-ae4473687762', 'escudos-rivales', '.emptyFolderPlaceholder', NULL, '2026-05-23 16:02:58.808265+00', '2026-05-23 16:02:58.808265+00', '2026-05-23 16:02:58.808265+00', '{"eTag": "\"d41d8cd98f00b204e9800998ecf8427e\"", "size": 0, "mimetype": "application/octet-stream", "cacheControl": "max-age=3600", "lastModified": "2026-05-23T16:02:58.808Z", "contentLength": 0, "httpStatusCode": 200}', '6f0c88cd-86c1-45af-8b8d-91dabea0025c', NULL, '{}'),
	('90609d49-cea1-4d7e-a534-655b96a776bd', 'escudos-rivales', 'rival_2.png', NULL, '2026-05-23 16:09:12.398912+00', '2026-05-23 16:09:12.398912+00', '2026-05-23 16:09:12.398912+00', '{"eTag": "\"6574bd2019512ca8770965298e704028\"", "size": 672460, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-05-23T16:09:13.000Z", "contentLength": 672460, "httpStatusCode": 200}', 'eb242ba9-aefd-4f80-8a82-717089fdd4f0', NULL, '{}'),
	('4a47a4ec-f134-4bcc-97cc-67b7e7168911', 'noticias', 'noticia_1779561934211.jpeg', NULL, '2026-05-23 18:45:44.177304+00', '2026-05-23 18:45:44.177304+00', '2026-05-23 18:45:44.177304+00', '{"eTag": "\"0ef99624693251fa170ab16d7dbdbc31\"", "size": 482369, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-23T18:45:45.000Z", "contentLength": 482369, "httpStatusCode": 200}', 'f74b2849-bc83-4848-b10d-f97d7fa488f4', NULL, '{}'),
	('d3b8e597-0320-441b-9354-ae332e815726', 'noticias', 'noticia_1779581754459.jpeg', NULL, '2026-05-24 00:15:55.307816+00', '2026-05-24 00:15:55.307816+00', '2026-05-24 00:15:55.307816+00', '{"eTag": "\"0a9d110b406766c6d427de70d337b3ea\"", "size": 561305, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-05-24T00:15:56.000Z", "contentLength": 561305, "httpStatusCode": 200}', 'd8024265-5d07-4011-9461-218fac051150', NULL, '{}'),
	('556a1f47-ae5e-412c-9def-27b70d5dfea3', 'escudos-rivales', 'rival_13.png', NULL, '2026-06-08 17:31:51.204438+00', '2026-06-08 17:31:51.204438+00', '2026-06-08 17:31:51.204438+00', '{"eTag": "\"6995f291b8761a7dd50a013aa08838f8\"", "size": 151787, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-08T17:31:52.000Z", "contentLength": 151787, "httpStatusCode": 200}', '1d0b8a8f-02a5-409d-b651-7c38b228b210', NULL, '{}'),
	('b13c1e79-3358-4a2c-8400-aaac02c7cdbb', 'escudos-rivales', 'rival_11.png', NULL, '2026-06-08 19:26:04.792145+00', '2026-06-08 19:26:04.792145+00', '2026-06-08 19:26:04.792145+00', '{"eTag": "\"286853f74fea220dbe6fef0882f91015\"", "size": 145923, "mimetype": "image/png", "cacheControl": "max-age=3600", "lastModified": "2026-06-08T19:26:05.000Z", "contentLength": 145923, "httpStatusCode": 200}', '33891401-11ec-463b-ac82-67274f3242e3', NULL, '{}'),
	('b9e00e71-e4e4-4a85-8faa-6956f38940f6', 'avatares', 'jugador_29.jpeg', NULL, '2026-06-11 09:44:25.510299+00', '2026-06-11 09:44:25.510299+00', '2026-06-11 09:44:25.510299+00', '{"eTag": "\"9e0bb32710f6d0a7ac80db268cb2fb51\"", "size": 337937, "mimetype": "image/jpeg", "cacheControl": "max-age=3600", "lastModified": "2026-06-11T09:44:26.000Z", "contentLength": 337937, "httpStatusCode": 200}', '792cf730-eee2-4f14-8857-d0b10cd58169', NULL, '{}');


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 1, false);


--
-- Name: activity_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."activity_log_id_seq"', 410, true);


--
-- Name: alineaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."alineaciones_id_seq"', 11, true);


--
-- Name: clasificacion_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."clasificacion_id_seq"', 42, true);


--
-- Name: comentarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."comentarios_id_seq"', 1, false);


--
-- Name: estadisticas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."estadisticas_id_seq"', 34, true);


--
-- Name: jugadores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."jugadores_id_seq"', 29, true);


--
-- Name: noticias_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."noticias_id_seq"', 152, true);


--
-- Name: partidos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."partidos_id_seq"', 13, true);


--
-- Name: patrocinadores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."patrocinadores_id_seq"', 22, true);


--
-- Name: temporadas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."temporadas_id_seq"', 1, true);


--
-- Name: votos_mvp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."votos_mvp_id_seq"', 13, true);


--
-- PostgreSQL database dump complete
--

-- \unrestrict i32S6D5NaJzA1wPZfOyqzZHNJDenxxH5Q3gXoLX0HHi3VilRlwG8f9xxk1kcvS6

RESET ALL;
