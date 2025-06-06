# ISK Rechner

Dieses Projekt ist eine einfache Single-Page-Webapp, welche Daten aus der EVE Online ESI Schnittstelle nutzt. Zur Nutzung muss eine `.env` Datei mit den folgenden Werten angelegt werden:

```
VITE_EVE_CLIENT_ID=<Client-ID aus dem EVE Entwicklerportal>
VITE_EVE_REDIRECT_URI=http://localhost:5173/
```

Anschließend startet man die Entwicklungsumgebung mit `npm run dev`. Der Login erfolgt über die Schaltfläche "Login with EVE". Nach erfolgreicher Anmeldung können erste Wallet-Daten geladen werden.
