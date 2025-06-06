export interface JournalEntry {
  amount?: number
  date: string
  ref_type: string
}

export async function fetchWalletJournal(token: string): Promise<JournalEntry[]> {
  const res = await fetch('https://esi.evetech.net/latest/characters/@me/wallet/journal/?datasource=tranquility', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Wallet request failed')
  return res.json()
}
