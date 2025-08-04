import './App.css'
import { KanbanProvider } from './components/KanbanContext'
import { ThemeProvider } from './components/ThemeContext'
import Board from './components/Board'
function App() {

  return (
    <ThemeProvider>
      <KanbanProvider>
        <Board/>
      </KanbanProvider>
    </ThemeProvider>
  )
}

export default App
