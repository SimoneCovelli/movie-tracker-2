# MOVIE TRACKER

[English version](README.en.md)

Applicazione che permette a un singolo utente di tenere traccia dei film visti e da vedere (non sono previste autenticazione né gestione di più utenti).

L'applicazione è suddivisa in due sezioni principali:

- **Movie Catalog:** contiene i film recuperati tramite l'API di [TMDB](https://www.themoviedb.org/);
- **My Movie Library:** contiene la lista personale dell'utente, con stato (`watched` o `to-watch`), eventuale valutazione e tag associati a ciascun film.

## TECNOLOGIE UTILIZZATE

- **HTML5** --> struttura delle pagine dell'applicazione.
- **CSS3** --> stile, layout e responsività dell'interfaccia.
- **TypeScript** --> gestione della logica e delle interazioni del frontend.
- **React** --> sviluppo dell'interfaccia utente tramite componenti riutilizzabili e gestione dello stato dell'applicazione.
- **PHP** --> gestione del backend e delle comunicazioni con il database e le API esterne.
- **PostgreSQL** --> gestione e memorizzazione dei dati della libreria personale.
- **TMDB API** --> recupero dei dati relativi ai film.
- **Vite** --> ambiente di sviluppo e build del frontend.
- **Git / GitHub** --> gestione e versionamento del progetto.

## HOMEPAGE

La homepage mostra un breve messaggio di benvenuto e fornisce due collegamenti principali per accedere **Movie Catalog** e a **My Movie Library**.

## MOVIE CATALOG

Questa sezione mostra il catalogo dei film disponibili tramite l'API di TMDB.

- I film vengono visualizzati sotto forma di elenco di schede cliccabili.
- I risultati sono suddivisi in pagine e l'utente può modificare il numero di pagina per visualizzare altri film.
- Una barra di ricerca permette di cercare uno specifico film nel catalogo.
- Cliccando su un film è possibile visualizzarne i dettagli.
- Dalla pagina dei dettagli è possibile aggiungere il film alla propria libreria, specificandone lo stato (`watched` o `to-watch`).

## MY MOVIE LIBRARY

Questa sezione contiene la lista personale dei film dell'utente.

A ogni film sono associati:

- uno stato (`watched` o `to-watch`);
- una valutazione opzionale da 1 a 5 stelle, disponibile solo per i film con stato `watched`;
- uno o più tag opzionali, scelti da una lista predefinita.

La lista può essere filtrata attraverso:

- il titolo del film;
- lo stato (`watched` o `to-watch`);
- un tag.

I film possono inoltre essere ordinati secondo diversi criteri:

- data di uscita più recente;
- data di uscita meno recente;
- titolo A-Z;
- titolo Z-A;
- valutazione più alta;
- valutazione più bassa.

Cliccando su un film è possibile visualizzarne i dettagli e:

- modificare lo stato (`watched` o `to-watch`);
- assegnare, modificare o rimuovere la valutazione;
- aggiungere, modificare o rimuovere i tag;
- eliminare il film dalla libreria.

## SVILUPPI FUTURI:

- **Responsive design:** migliorare l'adattabilità dell'interfaccia a dispositivi mobili e a schermi di diverse dimensioni.
- **Gestione di più utenti:** introdurre un sistema di autenticazione che permetta a utenti diversi di accedere alla propria libreria personale.
- **Navigazione nel catalogo:** migliorare la navigazione tra i film, permettendo di passare più facilmente da un film all'altro senza dover tornare ogni volta alla lista del catalogo.
- **Gestione distinta degli errori e dei risultati vuoti:** attualmente, l'assenza di film e un eventuale errore durante il recupero dei dati vengono gestiti attraverso lo stesso messaggio. Sarebbe preferibile distinguere i due casi, mostrando un messaggio specifico quando non vengono trovati risultati e uno diverso quando si verifica un errore nel recupero dei dati.
