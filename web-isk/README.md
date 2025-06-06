# ISK Rechner

Dieses Projekt ist eine einfache Single-Page-Webapp, welche Daten aus der EVE Online ESI Schnittstelle nutzt. Die Anwendung funktioniert ohne vorbereitete `.env`‑Datei. Beim ersten Login fragt die Oberfläche nach der benötigten Client‑ID, welche danach im Browser gespeichert wird. Alternativ kann wie bisher eine `.env` Datei mit folgenden Werten angelegt werden:

```
VITE_EVE_CLIENT_ID=<Client-ID aus dem EVE Entwicklerportal>
VITE_EVE_REDIRECT_URI=http://localhost:5173/
```

Im Anschluss startet man die Entwicklungsumgebung mit `npm run dev`. Der Login erfolgt über die Schaltfläche "Mit EVE einloggen". Nach erfolgreicher Anmeldung können über "Wallet laden" erste Daten angezeigt werden.
