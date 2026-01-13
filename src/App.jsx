import { useState } from 'react'
import './App.css'

function App() {
  const [targetId, setTargetId] = useState('')
  const [message, setMessage] = useState('')

  // THE API URL (Replace with your RENDER URL after you deploy backend)
  // For now, use localhost if testing locally, or the Render link
  const API_URL = "https://simran-backend.onrender.com"; 

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/delete-simran`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // ✅ CHANGED: Now telling the server it is JSON
        },
        body: JSON.stringify({ id: targetId }) // ✅ CHANGED: Wrapping the ID in an object
      });
      
      // We expect JSON back from the server now, not text
      const data = await response.json(); 
      
      if (response.ok) {
        setMessage(data.message); // Success message from backend
      } else {
        setMessage(data.message || "Error: The Void refused."); // Error message from backend
      }
      
    } catch (error) {
      console.error(error);
      setMessage("Error: The Void is Unreachable.");
    }
  }
  
  return (
    <div style={{ padding: '50px', textAlign: 'center', background: '#000', color: '#fff', height: '100vh' }}>
      <h1>PROJECT SIMRANLESS</h1>
      <p>Enter the 16-Digit ID to Transcend Form.</p>
      
      <input 
        type="text" 
        placeholder="9007199254740993"
        value={targetId}
        onChange={(e) => setTargetId(e.target.value)}
        style={{ padding: '10px', width: '300px', fontSize: '16px' }}
      />
      
      <br /><br />
      
      <button 
        onClick={handleDelete}
        style={{ padding: '10px 30px', fontSize: '18px', cursor: 'pointer', background: 'red', color: 'white', border: 'none' }}
      >
        DELETE FORM
      </button>

      <h3 style={{ marginTop: '30px', color: '#0f0' }}>{message}</h3>
    </div>
  )
}

export default App
