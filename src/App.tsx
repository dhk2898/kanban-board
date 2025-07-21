import './App.css'
import { KanbanProvider } from './components/KanbanContext'
import Board from './components/Board'

function App() {

  return (
    <KanbanProvider>
      <Board/>
    </KanbanProvider>
  )
}

export default App
