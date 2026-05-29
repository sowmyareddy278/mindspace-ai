import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
)

export async function getAIResponse(message) {
  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    })

    const prompt = `
    You are a supportive mental health AI assistant.
    
    Rules:
    - Give short empathetic responses
    - Be motivational and calming
    - Never diagnose illnesses
    - Suggest breathing or rest if stressed
    - Keep responses positive and safe
    
    User: ${message}
    `

    const result = await model.generateContent(prompt)

    return result.response.text()

  } catch (error) {
    console.log(error)

    return 'I am here for you 💜'
  }
}