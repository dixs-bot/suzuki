import React from 'react'

export default function VehicleCard({ v, onSelect }) {
  return (
    <article className="border rounded overflow-hidden shadow-sm hover:shadow-md bg-white">
      <button onClick={() => onSelect(v)} className="text-left w-full">
        <img src={v.img || '/images/placeholder.jpg'} alt={v.name} className="w-full h-44 object-cover" />
        <div className="p-4">
          <h3 className="font-semibold text-lg">{v.name}</h3>
          <div className="mt-2 text-red-600 font-bold">{v.price}</div>
          <div className="mt-2 text-sm text-gray-600">{v.specs?.engine} • {v.specs?.transm} • {v.specs?.seats} seat(s)</div>
        </div>
      </button>
      <div className="p-3 border-t flex items-center justify-between">
        <a target="_blank" rel="noreferrer" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP || '6281234567890'}?text=${encodeURIComponent('Halo, saya tertarik dengan ' + v.name)}`} className="px-3 py-2 rounded bg-green-500 text-white">Tanya via WA</a>
      </div>
    </article>
  )
}
