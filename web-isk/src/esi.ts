export async function fetchWalletJournal(token: string): Promise<any[]> {
  const res = await fetch('https://esi.evetech.net/latest/characters/@me/wallet/journal/', {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Wallet request failed')
  return res.json()
}
