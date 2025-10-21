import fs from 'fs'
import path from 'path'

const dataFile = path.join(process.cwd(), 'data', 'vehicles.json')

function readData() {
  const raw = fs.readFileSync(dataFile, 'utf8')
  return JSON.parse(raw)
}
function writeData(arr) {
  fs.writeFileSync(dataFile, JSON.stringify(arr, null, 2), 'utf8')
}

export default function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = readData()
      return res.status(200).json(data)
    }

    // Protected write operations: require ADMIN_PASSWORD in body header/req
    const adminKey = req.headers['x-admin-key'] || req.body?.adminKey
    if (adminKey !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    if (req.method === 'POST') {
      const vehicles = readData()
      const newV = req.body
      vehicles.push(newV)
      writeData(vehicles)
      return res.status(201).json(newV)
    }

    if (req.method === 'PUT') {
      const vehicles = readData()
      const updated = req.body
      const idx = vehicles.findIndex(v => v.id === updated.id)
      if (idx === -1) return res.status(404).json({ error: 'Not found' })
      vehicles[idx] = updated
      writeData(vehicles)
      return res.status(200).json(updated)
    }

    if (req.method === 'DELETE') {
      const { id } = req.body
      let vehicles = readData()
      vehicles = vehicles.filter(v => v.id !== id)
      writeData(vehicles)
      return res.status(200).json({ ok: true })
    }

    res.setHeader('Allow', 'GET,POST,PUT,DELETE')
    res.status(405).end('Method Not Allowed')
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}
