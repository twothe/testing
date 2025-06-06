# ISK Rechner

Dieses Projekt ist eine einfache Single-Page-Webapp, welche Daten aus der EVE Online ESI Schnittstelle nutzt.
Tragen Sie Ihre Client-ID im Datei `src/config.ts` ein und passen Sie `eveRedirectUri` gegebenenfalls an.
Beim Klick auf „Mit EVE einloggen“ leitet die Anwendung automatisch auf die offizielle ESI-Login-Seite weiter.

Im Anschluss startet man die Entwicklungsumgebung mit `npm run dev`. Der Login erfolgt über die Schaltfläche "Mit EVE einloggen". Nach erfolgreicher Anmeldung können über "Wallet laden" erste Daten angezeigt werden.
