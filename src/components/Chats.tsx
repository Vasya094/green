import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

type Item = string

type Props = {}

const Chats: React.FC<Props> = () => {
  const navigate = useNavigate()
  const localData = localStorage.getItem("CHATS")
  const [items, setItems] = useState<Item[]>(
    localData ? JSON.parse(localData) : []
  )
  const [newItemName, setNewItemName] = useState<string>("")

  const handleAddItem = () => {
    const newItem: Item = newItemName
    let chats = JSON.parse(localStorage.getItem("CHATS") as string) || []
    chats.push(newItemName)
    localStorage.setItem("CHATS", JSON.stringify(chats))
    navigate(`/chats/${newItemName}`)
    setItems([...items, newItem])
    setNewItemName("")
  }

  const handleGoToChat = (numberChat: string) => {
    navigate(`/chats/${numberChat}`)
  }

  return (
    <div>
      <h2>New Chat</h2>
      <div>
        <label htmlFor='new-num'>New chat with: </label>
        <input
          id='new-num'
          type='text'
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button onClick={handleAddItem} className='btn btn-primary'>
          Start!
        </button>
        <p>
          The phone number must be specified in full, with the country code and
          without spaces.
        </p>
        <h3>
          In the format: <strong>79378207707</strong>.
        </h3>
        <p>
          Without <strong>+</strong>, dashes and spaces
        </p>
      </div>
      <hr />
      <div>
        <h2>List Of Chats</h2>
        <ul className="list-group">
          {items.map((item) => (
            <li
            className="list-group-item"
              onClick={() => handleGoToChat(item)}
              style={{ cursor: "pointer" }}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Chats
