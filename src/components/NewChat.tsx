import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Send, HourglassSplit } from "react-bootstrap-icons"
import { getNotifications, sendMessage } from "../api"
import userAva from "../assets/user.png"
import "./NewChat.css"

interface Message {
  id: number
  text: string
  sender: "me" | "them"
}

const NewChat: React.FC = () => {
  const { id } = useParams()
  const [messages, setMessages] = useState<Message[]>([])
  const [messageText, setMessageText] = useState<string>("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessageText(event.target.value)
  }

  const fetchData = async () => {}

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      setLoading(true)
      await sendMessage(messageText, `${id}@c.us`)
      setLoading(false)
      const newMessage: Message = {
        id: messages.length + 1,
        text: messageText,
        sender: "me",
      }
      setMessages([...messages, newMessage])
      setMessageText("")
    } catch (error: any) {
      setError(error.message)
      setLoading(false)
      const errorMessage: Message = {
        id: messages.length + 1,
        text: "error",
        sender: "me",
      }
      setMessages([...messages, errorMessage])
    }
  }

  ;(async () => {
    const notifs = await getNotifications(`${id}@c.us`)
    if (notifs) {
      const newMessageFromNotifications: Message = {
        id: messages.length + 1,
        text: notifs,
        sender: "them",
      }
      setMessages([...messages, newMessageFromNotifications])
    }
  })()

  return (
    <div className='chat-window'>
      <div className='header'>
        <img src={userAva} alt='Profile Pic' />
        <div className='contact-info mt-2'>
          <h2>Chat with: {id}</h2>
          <p>Last seen ???</p>
        </div>
      </div>
      <div className='chat-messages d-flex flex-column'>
        {messages.map((message, i) => (
          <div
            key={`${message.text}-${i}`}
            className={`message ${
              message.sender === "me" ? "sent align-self-end" : "received"
            }`}
          >
            {message.text}
          </div>
        ))}
      </div>
      <div className='composer'>
        <form onSubmit={handleSubmit}>
          <input type='text' value={messageText} onChange={handleInputChange} />
          <button
            disabled={!messageText}
            type='submit'
            className='btn btn-primary'
          >
            {loading ? <HourglassSplit /> : <Send />}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewChat
