import './App.css'
import { KanbanProvider } from './contexts/KanbanContext'
import { ThemeProvider } from './contexts/ThemeContext'
import Board from './components/Board'
import Register from './Register'
import {PrivateRoute} from './components/PrivateRoute'
import Login from './Login'
import {Routes, Route, Navigate} from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext'

function App() {

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
            <Route path="/" element={<Navigate to="/register" />} />
          </Routes>
        </KanbanProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
