import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RoomPage from './pages/room/RoomPage'

function App() {
  return (
			<BrowserRouter basename={import.meta.env.BASE_URL}>
			  <Routes>
			    <Route path="/room/:room_id" element={<RoomPage />} />
			  </Routes>
			</BrowserRouter>
  )
}

export default App
