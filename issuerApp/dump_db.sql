--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3 (Debian 15.3-1.pgdg110+1)
-- Dumped by pg_dump version 15.3 (Debian 15.3-1.pgdg110+1)

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
-- Name: IssuerRegister; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public."IssuerRegister" (
    id integer NOT NULL,
    "familyName" character varying,
    "firstName" character varying,
    email character varying,
    password character varying
);


ALTER TABLE public."IssuerRegister" OWNER TO admin;

--
-- Name: IssuerRegister_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."IssuerRegister_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."IssuerRegister_id_seq" OWNER TO admin;

--
-- Name: IssuerRegister_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."IssuerRegister_id_seq" OWNED BY public."IssuerRegister".id;


--
-- Name: credential_request; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.credential_request (
    credential_id integer NOT NULL,
    user_fk integer NOT NULL,
    dateofbirth date NOT NULL,
    familyname character varying NOT NULL,
    firstname character varying NOT NULL,
    gender character varying NOT NULL,
    nameandfamilynameatbirth character varying NOT NULL,
    placeofbirth character varying NOT NULL,
    status boolean
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
-- Name: IssuerRegister id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."IssuerRegister" ALTER COLUMN id SET DEFAULT nextval('public."IssuerRegister_id_seq"'::regclass);


--
-- Name: credential_request credential_id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request ALTER COLUMN credential_id SET DEFAULT nextval('public.credential_request_credential_id_seq'::regclass);


--
-- Data for Name: IssuerRegister; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public."IssuerRegister" (id, "familyName", "firstName", email, password) FROM stdin;
1	Rossi	Mario	mr@gmail.com	m
\.


--
-- Data for Name: credential_request; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.credential_request (credential_id, user_fk, dateofbirth, familyname, firstname, gender, nameandfamilynameatbirth, placeofbirth, status) FROM stdin;
1	1	1993-05-04	Rossi	Mario	Maschio	Mario Rossi	Abbiategrasso	t
2	1	2023-06-14	1	1	1	1	1	t
\.


--
-- Name: IssuerRegister_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."IssuerRegister_id_seq"', 1, true);


--
-- Name: credential_request_credential_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.credential_request_credential_id_seq', 2, true);


--
-- Name: IssuerRegister IssuerRegister_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public."IssuerRegister"
    ADD CONSTRAINT "IssuerRegister_pkey" PRIMARY KEY (id);


--
-- Name: credential_request credential_request_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request
    ADD CONSTRAINT credential_request_pkey PRIMARY KEY (credential_id);


--
-- Name: credential_request credential_request_user_fk_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.credential_request
    ADD CONSTRAINT credential_request_user_fk_fkey FOREIGN KEY (user_fk) REFERENCES public."IssuerRegister"(id);


--
-- PostgreSQL database dump complete
--

