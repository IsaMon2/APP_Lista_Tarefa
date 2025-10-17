import { useState, useEffect } from 'react'
import './App.css'

function TodoApp() {
  const [ tarefas, setTarefas ] = useState([])
  const [ novaTarefa, setNovaTarefa ] = useState('')
  
  const carregar = async () => {
    const resultado = await fetch('https://dummyjson.com/todos')
    const listaTarefa = (await resultado.json()).todos;

    setTarefas( listaTarefa )
  }

  const adicionarTarefa = () => { 
    if (!novaTarefa.trim()) return; 
    const nova = { todo: novaTarefa }
      setTarefas([...tarefas, novaTarefa]); 
      setNovaTarefa(''); 
  };

  const removerTarefa = (index) => { 
    const novas = tarefas.filter((_, i) => i !== index); 
    setTarefas(novas); 
  }; 

  useEffect(() => {
    carregar()
  }, [])

  return (
    <div>
      <h1> Minha lista de tarefas </h1>
       <ul>
        {tarefas.map((tarefa, i) => (
          <li key = {i}> 
            {tarefa.todo || tarefa}
            <button onClick={() => removerTarefa(i)}>Remover</button>
          </li>

        ))}   
      </ul>

      <input
        type="text"
        placeholder="Digite uma tarefa"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
      />
      <button onClick = {adicionarTarefa}>Adicionar</button>
    </div>
  )
}

export default TodoApp
