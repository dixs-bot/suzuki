import React from 'react'
export default function VehicleModal({ selected, onClose }) {
  if (!selected) return null
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-3xl rounded shadow-lg overflow-auto">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">{selected.name}</h2>
          <div className="flex items-center gap-2">
            <div className="text-red-600 font-bold">{selected.price}</div>
            <button onClick={onClose} className="px-3 py-1 border rounded">Tutup</button>
          </div>
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src={selected.img || '/images/placeholder.jpg'} alt={selected.name} className="w-full h-64 object-cover rounded" />
          <div>
            <h3 className="font-semibold mb-2">Spesifikasi</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>Engine: {selected.specs.engine}</li>
              <li>Daya: {selected.specs.power}</li>
              <li>Transmisi: {selected.specs.transm}</li>
              <li>Kursi: {selected.specs.seats}</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a target="_blank" rel="noreferrer" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'}?text=${encodeURIComponent('Halo, saya mau info lebih lanjut tentang ' + selected.name)}`} className="px-4 py-2 rounded bg-green-500 text-white">Hubungi WA</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
