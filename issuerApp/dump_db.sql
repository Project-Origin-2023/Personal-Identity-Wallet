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
    id integer NOT NULL,
    "user" integer NOT NULL,
    date_of_birth date NOT NULL,
    family_name character varying(25) NOT NULL,
    first_name character varying(25) NOT NULL,
    gender character varying(1) NOT NULL,
    name_and_family_name_at_birth character varying(25) NOT NULL,
    place_of_birth character varying NOT NULL,
    status smallint DEFAULT '0'::smallint NOT NULL
);


ALTER TABLE public.credential_request OWNER TO admin;

--
-- Name: credential_request_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.credential_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.credential_request_id_seq OWNER TO admin;

--
-- Name: credential_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.credential_request_id_seq OWNED BY public.credential_request.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    family_name character varying(25),
    first_name character varying(25),
    email character varying(50),
    password character varying(50)
);


ALTER TABLE public.users OWNER TO admin;

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

ALTER SEQUENCE public.registered_users_id_seq OWNED BY public.users.id;


--
-- Name: credential_request id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request ALTER COLUMN id SET DEFAULT nextval('public.credential_request_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.registered_users_id_seq'::regclass);


--
-- Data for Name: credential_request; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.credential_request (id, "user", date_of_birth, family_name, first_name, gender, name_and_family_name_at_birth, place_of_birth, status) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, family_name, first_name, email, password) FROM stdin;
11	admin	admin	admin	admin
\.


--
-- Name: credential_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.credential_request_id_seq', 43, true);


--
-- Name: registered_users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.registered_users_id_seq', 12, true);


--
-- Name: credential_request credential_request_pkey1; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request
    ADD CONSTRAINT credential_request_pkey1 PRIMARY KEY (id);


--
-- Name: users registered_users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT registered_users_pkey PRIMARY KEY (id);


--
-- Name: credential_request credential_request_user_fkey1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request
    ADD CONSTRAINT credential_request_user_fkey1 FOREIGN KEY ("user") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

