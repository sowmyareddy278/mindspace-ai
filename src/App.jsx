import { useState } from 'react'
import { motion } from 'framer-motion'
import { getAIResponse } from './lib/gemini'

function App() {
  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [mood, setMood] = useState('😊')
  const [wellness, setWellness] = useState(82)

  const sendMessage = async () => {
    if (!message) return

    const userMessage = message

    setChat((prev) => [
      ...prev,
      {
        user: userMessage,
        ai: 'MindSpace AI is thinking...'
      }
    ])

    setMessage('')

    const aiReply = await getAIResponse(userMessage)

    setChat((prev) => {
      const updated = [...prev]

      updated[updated.length - 1].ai = aiReply

      return updated
    })

    setWellness((prev) =>
      Math.min(100, prev + 1)
    )
  }

  return (
    <div className="min-h-screen overflow-hidden relative bg-black flex items-center justify-center p-6">

      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 10
          }}
          className="absolute w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20 top-0 left-0"
        />

        <motion.div
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 12
          }}
          className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 bottom-0 right-0"
        />
      </div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-4xl
        bg-white/10
        backdrop-blur-xl
        border border-white/20
        rounded-[40px]
        shadow-2xl
        p-8"
      >

        {/* Header */}
        <div className="text-center">
          <motion.h1
            animate={{
              scale: [1, 1.03, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 3
            }}
            className="text-6xl font-extrabold text-white"
          >
            MindSpace AI
          </motion.h1>

          <p className="text-gray-300 mt-3 text-lg">
            AI-powered emotional wellness companion ✨
          </p>
        </div>

        {/* Wellness Score */}
        <div className="mt-8">
          <div className="flex justify-between text-white mb-2">
            <span>Wellness Score</span>
            <span>{wellness}%</span>
          </div>

          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${wellness}%` }}
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
            />
          </div>
        </div>

        {/* Breathing Orb */}
        <div className="flex justify-center mt-10">
          <motion.div
            animate={{
              scale: [1, 1.25, 1]
            }}
            transition={{
              repeat: Infinity,
              duration: 4
            }}
            className="w-36 h-36 rounded-full
            bg-gradient-to-r
            from-pink-500
            to-purple-600
            shadow-[0_0_60px_rgba(236,72,153,0.7)]"
          />
        </div>

        {/* Mood Selector */}
        <div className="flex justify-center gap-5 mt-10">
          {['😊', '😔', '😰', '😌', '🤩'].map((emoji) => (
            <motion.button
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              key={emoji}
              onClick={() => setMood(emoji)}
              className={`text-5xl transition ${
                mood === emoji
                  ? 'drop-shadow-[0_0_15px_white]'
                  : ''
              }`}
            >
              {emoji}
            </motion.button>
          ))}
        </div>

        {/* AI Suggestion Cards */}
        <div className="grid grid-cols-2 gap-4 mt-10">
          {[
            '🧘 Breathing Exercise',
            '🎵 Relaxing Music',
            '🌿 Stress Relief Tips',
            '💤 Better Sleep Guide'
          ].map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item}
              className="bg-white/10
              border border-white/10
              p-5 rounded-3xl
              text-white
              cursor-pointer"
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="mt-10 h-[320px] overflow-y-auto space-y-4 pr-2">
          {chat.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="bg-blue-500/20 text-white p-4 rounded-3xl mb-2">
                <strong>You:</strong> {item.user}
              </div>

              <div className="bg-purple-500/20 text-white p-4 rounded-3xl">
                <strong>MindSpace AI:</strong> {item.ai}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-4 mt-8">
          <input
            type="text"
            placeholder="Share your thoughts..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 p-5 rounded-3xl
            bg-white/10
            text-white
            placeholder:text-gray-400
            outline-none
            border border-white/10"
          />

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={sendMessage}
            className="px-8 rounded-3xl
            bg-gradient-to-r
            from-pink-500
            to-purple-600
            text-white
            font-bold
            shadow-xl"
          >
            Send ✨
          </motion.button>
        </div>

        {/* Footer */}
        <div className="mt-10 text-center text-gray-300">
          <p>24/7 Mental Health Support Resources</p>

          <p className="mt-2">
            📞 iCall: +91 9152987821
          </p>

          <p>
            📞 Tranquility INC: 9999666555
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default App