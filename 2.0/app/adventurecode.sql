--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'SQL_ASCII';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: goals; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE goals (
    id integer NOT NULL,
    description character varying(255),
    image_path character varying(255)
);


ALTER TABLE public.goals OWNER TO postgres;

--
-- Name: goals_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE goals_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goals_id_seq OWNER TO postgres;

--
-- Name: goals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE goals_id_seq OWNED BY goals.id;


--
-- Name: heroes; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE heroes (
    id integer NOT NULL,
    description character varying(255),
    image_path character varying(255)
);


ALTER TABLE public.heroes OWNER TO postgres;

--
-- Name: heroes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE heroes_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.heroes_id_seq OWNER TO postgres;

--
-- Name: heroes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE heroes_id_seq OWNED BY heroes.id;


--
-- Name: mazemaps; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE mazemaps (
    id integer NOT NULL,
    description character varying(255),
    map character varying(255)
);


ALTER TABLE public.mazemaps OWNER TO postgres;

--
-- Name: mazemaps_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE mazemaps_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.mazemaps_id_seq OWNER TO postgres;

--
-- Name: mazemaps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE mazemaps_id_seq OWNED BY mazemaps.id;


--
-- Name: settings; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE settings (
    id integer NOT NULL,
    description character varying(255),
    image_path character varying(255)
);


ALTER TABLE public.settings OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE settings_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.settings_id_seq OWNER TO postgres;

--
-- Name: settings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE settings_id_seq OWNED BY settings.id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY goals ALTER COLUMN id SET DEFAULT nextval('goals_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY heroes ALTER COLUMN id SET DEFAULT nextval('heroes_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY mazemaps ALTER COLUMN id SET DEFAULT nextval('mazemaps_id_seq'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY settings ALTER COLUMN id SET DEFAULT nextval('settings_id_seq'::regclass);


--
-- Data for Name: goals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY goals (id, description, image_path) FROM stdin;
\.


--
-- Name: goals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('goals_id_seq', 1, false);


--
-- Data for Name: heroes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY heroes (id, description, image_path) FROM stdin;
\.


--
-- Name: heroes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('heroes_id_seq', 1, false);


--
-- Data for Name: mazemaps; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY mazemaps (id, description, map) FROM stdin;
\.


--
-- Name: mazemaps_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('mazemaps_id_seq', 1, false);


--
-- Data for Name: settings; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY settings (id, description, image_path) FROM stdin;
1	Description	images/dog.png
2	Description	images/dog.png
3	Description	images/dog.png
4	Description	images/dog.png
5	Help	assets/images/uploads/icon-help.png
6	Test	assets/images/uploads/icon-help.png
7	Test	assets/images/uploads/icon-help.png
8	Bird	assets/images/uploads/bird-icon.png
9	Bird	assets/images/uploads/bird-icon.png
\.


--
-- Name: settings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('settings_id_seq', 9, true);


--
-- Name: goals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY goals
    ADD CONSTRAINT goals_pkey PRIMARY KEY (id);


--
-- Name: heroes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY heroes
    ADD CONSTRAINT heroes_pkey PRIMARY KEY (id);


--
-- Name: mazemaps_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY mazemaps
    ADD CONSTRAINT mazemaps_pkey PRIMARY KEY (id);


--
-- Name: settings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY settings
    ADD CONSTRAINT settings_pkey PRIMARY KEY (id);


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

