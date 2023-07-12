--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg120+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg120+1)

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: credential_request; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.credential_request (
    credential_id integer NOT NULL,
    user_id integer NOT NULL,
    date_of_birth date NOT NULL,
    family_name character varying NOT NULL,
    first_name character varying NOT NULL,
    gender character varying NOT NULL,
    name_and_family_name_at_birth character varying NOT NULL,
    place_of_birth character varying NOT NULL,
    esito integer NOT NULL
);


ALTER TABLE public.credential_request OWNER TO admin;

--
-- Name: credential_request_credential_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.credential_request_credential_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credential_request_credential_id_seq OWNER TO admin;

--
-- Name: credential_request_credential_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.credential_request_credential_id_seq OWNED BY public.credential_request.credential_id;


--
-- Name: registered_users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.registered_users (
    id integer NOT NULL,
    family_name character varying,
    first_name character varying,
    email character varying,
    password character varying
);


ALTER TABLE public.registered_users OWNER TO admin;

--
-- Name: registered_users_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.registered_users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.registered_users_id_seq OWNER TO admin;

--
-- Name: registered_users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.registered_users_id_seq OWNED BY public.registered_users.id;


--
-- Name: credential_request credential_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request ALTER COLUMN credential_id SET DEFAULT nextval('public.credential_request_credential_id_seq'::regclass);


--
-- Name: registered_users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registered_users ALTER COLUMN id SET DEFAULT nextval('public.registered_users_id_seq'::regclass);


--
-- Data for Name: credential_request; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.credential_request (credential_id, user_id, date_of_birth, family_name, first_name, gender, name_and_family_name_at_birth, place_of_birth, esito) FROM stdin;
1	1	1961-06-06	Avido	Ivo	maschio	Ivo Avido	Abbiategrasso	0
2	2	2023-07-05	Caio	Tizio	maschio	Tizio Caio	Roma	1
\.


--
-- Data for Name: registered_users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.registered_users (id, family_name, first_name, email, password) FROM stdin;
1	Rossi	Mario	mariorossi@gmail.com	mario
2	Neri	Aldo	aldo61@gmail.com	61

\.


--
-- Name: credential_request_credential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.credential_request_credential_id_seq', 2, true);


--
-- Name: registered_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registered_users_id_seq', 2, true);


--
-- Name: credential_request credential_request_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request
    ADD CONSTRAINT credential_request_pkey PRIMARY KEY (credential_id);


--
-- Name: registered_users registered_users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.registered_users
    ADD CONSTRAINT registered_users_pkey PRIMARY KEY (id);


--
-- Name: credential_request credential_request_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request
    ADD CONSTRAINT credential_request_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.registered_users(id);


--
-- PostgreSQL database dump complete
--

