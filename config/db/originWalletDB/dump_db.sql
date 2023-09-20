--
-- PostgreSQL database dump
--

-- Dumped from database version 15.4 (Debian 15.4-1.pgdg120+1)
-- Dumped by pg_dump version 15.4 (Debian 15.4-1.pgdg120+1)

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
-- Name: accounts; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    email character varying NOT NULL,
    did character varying NOT NULL,
    hashed_pass character varying(128) NOT NULL,
    salt character varying(32) NOT NULL
);


ALTER TABLE public.accounts OWNER TO admin;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.accounts_id_seq OWNER TO admin;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.accounts (id, email, did, hashed_pass, salt) FROM stdin;
26	andreibobirica99@gmail.com	did:key:z6MkiaR6gf8kKDbxtuUYXYobZA99TnkABFmg6uztd3hsp7zE	0f86e0ecfc88b2b0db3cc25facf22ea67441726a5a9955b0ac32383e020b2664f778d30103c6e40931e3d269745a94d9113a2be251a8b7f6b911ae839b705f22	e5f33ae1c53cc7d84c0350e81420eaec
27	0f9afb03-bdc9-459c-918c-a52c950ff119@gmail.com	did:key:z6MkfKXW5wHuNf3VVMzoe4SF9h8X6rh6LMFJVBnu1C7zRLbK	b13ed916d4e1b44715194d8450b38c756797c5f677d9c1b57148283a31d20b97b41cc1f62d90d453ad6b09a621ba52ac9350f01859b06fb2acb8ee27aa46323a	3af7cb26cd30b0c5a873eea128289b84
28	d2912199-fdb8-433d-95f9-118b927d82ba@gmail.com	did:key:z6Mkf9uqJNCdD9B3ENHzsep1qYS2rwb7taskC9odevHVXWXD	9728c6e5af3c52ab084cd06619c1ad2c444acdc47cb531cb030118a406f66ca5a84391e10582efb8b7b2d1da5f594f5d70ad1be187fcf44aaf1dba8b4fc7b01b	2a269441ef870dae1bdaa831e33b8085
30	8a3d4386-4f1f-40e0-83fb-1c04609eee33@gmail.com	did:key:z6MkhEfF6LnjNFo1mBE8kYbrdtnPevJ9rrvxENi9HPA4aUgy	e990ce34c5c26ab6157d2fa541c2acb5b026efee03694007fcde4d9a3509100de42d01854d5aacd267090221206f92ae870aca8d6b66e66690d1c2f1c241d23e	ade03aebbc15312c06f0f33a4aa8570d
31	045c1dd8-f468-458f-a850-8505abf6c717@gmail.com	did:key:z6Mkn3anguQunKV4YMvcFhhgeMSXnKFDjBtBFG5BGvbM8EFd	d7c533ee122e969a2ec6d734941f876dd437f165850615e440ef8a4d3c2a4b4927139a60899f58caf49eb060e7e45373838e78e2cc6cffbad0b5780a9ed4f827	45fe156f9c0616146d400ab7c421e7d6
32	mario.rossi@gmail.com	did:key:z6Mki9ipS93r1DZzLWJ6gqzmY7hVa2S8WGNf6X1GyqX8LDXn	1d678d982b1b774e8fe95a6ec8d2287deccf18cc1afaed789cc5705848ec1fb5040eb034eb12206eee1fb68c764ee3f63e0a4624b77920cad901476a0f95fbc8	e99c39cea77ec9806c629daa47097fdc
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.accounts_id_seq', 26, true);


--
-- Name: accounts accounts_email_key; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_email_key UNIQUE (email);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

