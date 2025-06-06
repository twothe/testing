import { useEffect, useState } from 'react'
import './App.css'
import type { AuthToken } from './auth'
import { buildAuthorizeUrl, fetchToken, generateCodeChallenge, generateCodeVerifier } from './auth'
import { fetchWalletJournal, type JournalEntry } from './esi'

function App() {
  const [token, setToken] = useState<AuthToken | null>(null)
  const [journal, setJournal] = useState<JournalEntry[] | null>(null)
  const [income, setIncome] = useState<number | null>(null)

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
      setIncome(calculateIskPerHour(data, [
        'bounty_prizes',
        'mission_reward',
        'mission_bonus_reward',
      ]))
    } catch {
      alert('Failed to load wallet data')
    }
  }

  function calculateIskPerHour(entries: JournalEntry[], types: string[]): number | null {
    const relevant = entries.filter(e => types.includes(e.ref_type) && typeof e.amount === 'number')
    if (relevant.length === 0) return null
    let total = 0
    let min = Infinity
    let max = 0
    for (const e of relevant) {
      const t = new Date(e.date).getTime()
      if (t < min) min = t
      if (t > max) max = t
      total += e.amount ?? 0
    }
    const hours = Math.max((max - min) / 3600000, 1)
    return total / hours
  }

  return (
    <div className="container">
      {token ? (
        <>
          <button onClick={loadJournal}>Load Wallet</button>
          {income !== null && (
            <p>ISK/h: {income.toFixed(2)}</p>
          )}
          {journal && (
            <pre>{JSON.stringify(journal.slice(0, 5), null, 2)}</pre>
          )}
        </>
      ) : (
        <>
          <h1>ISK Calculator</h1>
          <p>Log in with EVE to fetch wallet data.</p>
          <button onClick={login}>Login with EVE</button>
        </>
      )}
    </div>
  )
}

export default App
