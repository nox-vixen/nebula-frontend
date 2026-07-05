import { useEffect, useState } from "react"
import { nebulaFetch } from "../lib/nebula/api"

export default function TestApi() {
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    nebulaFetch("/home")
      .then(setData)
      .catch(console.error)
  }, [])

  return (
    <div style={{ padding: "20px", color: "white", background: "black", minHeight: "100vh" }}>
      <h1>NebulaOS API Test</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
