import React, { useState, useEffect } from 'react'
import VehicleCard from '../components/VehicleCard'
import VehicleModal from '../components/VehicleModal'

export default function Home() {
  const [vehicles, setVehicles] = useState([])
  const [selected, setSelected] = useState(null)
  const [q, setQ] = useState('')

  useEffect(() => {
    fetch('/api/vehicles').then(r => r.json()).then(setVehicles).catch(e => console.error(e))
  }, [])

  const filtered = vehicles.filter(v => v.name.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-md bg-suzukiBlue flex items-center justify-center text-white font-bold">S</div>
            <div>
              <div className="text-xl font-semibold">Suzuki Sales</div>
              <div className="text-sm text-gray-500">Dealer demo</div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Cari model..." className="border rounded p-2 w-64" />
          <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded shadow-sm bg-green-500 text-white">Chat WA</a>
        </div>
      </header>

      <section className="py-8 px-6 text-center">
        <h1 className="text-3xl font-bold mb-3">Pilihan Unit Suzuki</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">Pilih unit, lihat spesifikasi & harga, hubungi via WhatsApp.</p>
      </section>

      <main className="px-6 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(v => <VehicleCard key={v.id} v={v} onSelect={setSelected} />)}
        </div>
        {filtered.length === 0 && <div className="text-center mt-12 text-gray-500">Tidak ada hasil.</div>}
      </main>

      {selected && <VehicleModal selected={selected} onClose={() => setSelected(null)} />}
      <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'}`} target="_blank" rel="noreferrer" className="fixed right-6 bottom-6 p-4 rounded-full shadow-lg flex items-center gap-2 bg-green-600 text-white">Chat WA</a>

      <footer className="border-t p-4 text-center text-sm text-gray-600">© {new Date().getFullYear()} Suzuki Sales — Demo. Pastikan izin penggunaan merek untuk produksi.</footer>
    </div>
  )
}
