import { useState } from "react"
import { useNavigate } from "react-router"

interface LoginProps {
  onSuccess: (IdInstance: string, ApiTokenInstance: string) => void
}

const Start: React.FC<LoginProps> = ({ onSuccess }) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      onSuccess(username, password)
      navigate("/chats")
    } catch (error) {
      setError("Invalid credentials")
    }
  }

  return (
    <div>
      <h2>Start</h2>
      <div
        className='card text-white bg-danger mb-3'
        style={{ maxWidth: "18rem" }}
      >
        <div className='card-body'>
          <h5 className='card-title'>Make sure the data is correct</h5>
          <p className='card-text'>
            Incorrect IdInstance and ApiTokenInstance will cause the application
            to work incorrectly
          </p>
        </div>
      </div>
      {error && <div>{error}</div>}
      <form className='d-flex flex-column' onSubmit={handleSubmit}>
        <div className='form-group mt-4'>
          <label htmlFor='username'>IdInstance</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='form-control'
            aria-describedby='emailHelp'
            placeholder='Enter email'
          />
        </div>
        <div className='form-group mt-4'>
          <label htmlFor='password'>ApiTokenInstance</label>
          <input
            type='text'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='form-control'
            placeholder='Password'
          />
        </div>
        <button type='submit' className='btn mt-4 btn-primary'>
          Add New Credentials
        </button>
      </form>
    </div>
  )
}

export default Start
