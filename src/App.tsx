import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Chats from "./components/Chats"
import NewChat from "./components/NewChat"
import Start from "./components/Start"
import WhatsAppLogo from "./assets/whatsapp-logo.png"

export default function App() {
  const handleLoginSuccess = (IdInstance: string, ApiTokenInstance: string) => {
    localStorage.setItem("IdInstance", IdInstance)
    localStorage.setItem("ApiTokenInstance", ApiTokenInstance)
  }

  return (
    <Router>
      <div className='app-container'>
        <div className='sidebar'>
          <div className='header'>
            <img src={WhatsAppLogo} alt='WhatsApp Logo' />
            <h1>WhatsApp Web</h1>
          </div>
          <div className='chat-list'>
            <ul>
              <li>
                <Link to='/'>
                  Start
                </Link>
              </li>
              <li>
                <Link to='/chats'>Chats</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className='m-5'>
          <Routes>
            <Route
              path='/'
              element={<Start onSuccess={handleLoginSuccess} />}
            />
            <Route path='/chats' element={<Chats />} />
            <Route path='/chats/:id' element={<NewChat />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}
