import { useState } from 'react'

export default function MindSpace() {
  const [message, setMessage] = useState('')

  return (
    <div style={{ padding: 40 }}>
      <h1>MindSpace AI</h1>

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type here"
      />

      <button>Send</button>
    </div>
  )
}