import React, { useState, useEffect } from 'react'

export default function Admin() {
  const [logged, setLogged] = useState(false)
  const [password, setPassword] = useState('')
  const [vehicles, setVehicles] = useState([])
  const [form, setForm] = useState({ id:'', name:'', price:'', img:'', specs:{engine:'',power:'',transm:'',seats:5}, colors:[] })

  async function login(e) {
    e.preventDefault()
    const res = await fetch('/api/auth', { method: 'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ password }) })
    if (res.ok) {
      setLogged(true); fetchVehicles()
    } else alert('Password salah')
  }

  async function fetchVehicles() {
    const v = await fetch('/api/vehicles').then(r=>r.json())
    setVehicles(v)
  }

  useEffect(()=> { fetchVehicles() }, [])

  async function save(e) {
    e.preventDefault()
    const method = vehicles.some(x=>x.id===form.id) ? 'PUT' : 'POST'
    const res = await fetch('/api/vehicles', {
      method,
      headers: { 'content-type':'application/json', 'x-admin-key': password },
      body: JSON.stringify(form)
    })
    if (res.ok) {
      fetchVehicles(); alert('Tersimpan')
    } else {
      const txt = await res.json(); alert('Error: ' + (txt.error || ''))
    }
  }

  async function del(id) {
    if (!confirm('Hapus unit?')) return
    const res = await fetch('/api/vehicles', {
      method: 'DELETE',
      headers: { 'content-type':'application/json', 'x-admin-key': password },
      body: JSON.stringify({ id })
    })
    if (res.ok) fetchVehicles()
  }

  return (
    <div className="min-h-screen p-6">
      {!logged ? (
        <form onSubmit={login} className="max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-3">Admin Login</h2>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password admin" className="w-full border p-2 mb-3"/>
          <button className="px-4 py-2 bg-suzukiBlue text-white rounded">Login</button>
        </form>
      ) : (
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-3">Admin Panel</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <form onSubmit={save} className="border p-4 rounded">
              <input placeholder="ID (unik)" value={form.id} onChange={e=>setForm({...form, id:e.target.value})} className="w-full border p-2 mb-2" />
              <input placeholder="Nama" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full border p-2 mb-2" />
              <input placeholder="Harga" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="w-full border p-2 mb-2" />
              <input placeholder="URL Gambar (public/images/...)" value={form.img} onChange={e=>setForm({...form, img:e.target.value})} className="w-full border p-2 mb-2" />
              <input placeholder="Engine" value={form.specs.engine} onChange={e=>setForm({...form, specs:{...form.specs, engine:e.target.value}})} className="w-full border p-2 mb-2" />
              <input placeholder="Power" value={form.specs.power} onChange={e=>setForm({...form, specs:{...form.specs, power:e.target.value}})} className="w-full border p-2 mb-2" />
              <input placeholder="Transm" value={form.specs.transm} onChange={e=>setForm({...form, specs:{...form.specs, transm:e.target.value}})} className="w-full border p-2 mb-2" />
              <input placeholder="Seats" value={form.specs.seats} onChange={e=>setForm({...form, specs:{...form.specs, seats: Number(e.target.value)}})} className="w-full border p-2 mb-2" />
              <input placeholder="Colors (comma separated)" value={form.colors.join(',')} onChange={e=>setForm({...form, colors: e.target.value.split(',').map(s=>s.trim()) })} className="w-full border p-2 mb-2" />
              <button className="px-4 py-2 bg-green-600 text-white rounded">Simpan</button>
            </form>

            <div className="border p-4 rounded">
              <h3 className="font-semibold mb-2">Daftar Unit</h3>
              <div className="space-y-3">
                {vehicles.map(v => (
                  <div key={v.id} className="p-2 border rounded flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{v.name} <span className="text-sm text-gray-500">({v.id})</span></div>
                      <div className="text-sm text-gray-600">{v.price}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={()=>setForm(v)} className="px-2 py-1 border rounded">Edit</button>
                      <button onClick={()=>del(v.id)} className="px-2 py-1 border rounded text-red-600">Hapus</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
