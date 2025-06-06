/// <reference types="vite/client" />

interface EveConfig {
  clientId?: string
}

interface WindowWithConfig extends Window {
  eveConfig?: EveConfig
}
