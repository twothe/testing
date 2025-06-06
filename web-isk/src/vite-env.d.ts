/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EVE_CLIENT_ID: string
  readonly VITE_EVE_REDIRECT_URI?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
