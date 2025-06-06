# Projektarchitektur

Die Anwendung basiert auf React und wird mit Vite gebaut. Alle ESI Aufrufe erfolgen direkt vom Browser aus. Wichtige Dateien:

- `src/App.tsx` – Hauptkomponente mit Login und Beispielabfrage
- `src/auth.ts` – Hilfsfunktionen für das OAuth2-PKCE-Verfahren
- `src/esi.ts` – Wrapper für ESI-Requests

Das Build erfolgt über `npm run build`; das Ergebnis findet sich im Ordner `dist` und kann auf jeden Webserver kopiert werden.
