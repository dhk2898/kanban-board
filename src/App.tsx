import './App.css'
import { KanbanProvider } from './contexts/KanbanContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Board from './components/Board'
import Register from './Register'
import {PrivateRoute} from './components/PrivateRoute'
import Login from './Login'
import {Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'
import { AuthContext } from './contexts/AuthContext'
import { useContext } from 'react'

function App() {

  const {session} = useContext(AuthContext);

  return (
    <ThemeProvider>
      <AuthProvider>
        <KanbanProvider>
          <Routes>
            <Route path = '/register' element = {<Register/>} />
            <Route path = '/login' element = {<Login/>} />
            <Route path = '/board' 
            element = {<PrivateRoute>
              <Board/>
            </PrivateRoute>} />
            <Route path="/" element={session ? <Navigate to="/board" /> : <Navigate to="/login" />} />
          </Routes>
        </KanbanProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
