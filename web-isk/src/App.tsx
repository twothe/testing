import { useEffect, useState } from 'react'
import './App.css'
import type { AuthToken } from './auth'
import { buildAuthorizeUrl, fetchToken, generateCodeChallenge, generateCodeVerifier } from './auth'
import { fetchWalletJournal } from './esi'

function App() {
  const [token, setToken] = useState<AuthToken | null>(null)
  const [journal, setJournal] = useState<any[] | null>(null)

  useEffect(() => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    if (code && state) {
      fetchToken(code, state)
        .then(t => {
          setToken(t)
          window.history.replaceState({}, '', url.origin)
        })
        .catch(() => alert('Authentication failed'))
    }
  }, [])

  function login() {
    const v = generateCodeVerifier()
    generateCodeChallenge(v).then(challenge => {
      window.location.href = buildAuthorizeUrl(v, challenge)
    })
  }

  async function loadJournal() {
    if (!token) return
    try {
      const data = await fetchWalletJournal(token.accessToken)
      setJournal(data)
    } catch {
      alert('Failed to load wallet data')
    }
  }

  return (
    <div className="container">
      {token ? (
        <>
          <button onClick={loadJournal}>Load Wallet</button>
          {journal && (
            <pre>{JSON.stringify(journal.slice(0, 5), null, 2)}</pre>
          )}
        </>
      ) : (
        <button onClick={login}>Login with EVE</button>
      )}
    </div>
  )
}

export default App
