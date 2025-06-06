# ISK Rechner

Dieses Projekt ist eine einfache Single-Page-Webapp, welche Daten aus der EVE Online ESI Schnittstelle nutzt. Die Anwendung erfordert eine `.env`-Datei mit folgenden Werten:

```
VITE_EVE_CLIENT_ID=<Client-ID aus dem EVE Entwicklerportal>
VITE_EVE_REDIRECT_URI=http://localhost:5173/
```

Im Anschluss startet man die Entwicklungsumgebung mit `npm run dev`. Der Login erfolgt über die Schaltfläche "Mit EVE einloggen". Nach erfolgreicher Anmeldung können über "Wallet laden" erste Daten angezeigt werden.
