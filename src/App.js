import './App.css';
import List from './components/List';
import { TodoContextProvider } from './context/TodoContext';
import Form from './components/Form';

function App() {
  return (
    <>
     <section className='flex flex-col items-center gap-10 py-20'>
      <h1 className='text-4xl uppercase font-bold'>react todo</h1>
      
      </section>
    <TodoContextProvider>
    <Form />
    <List />
    </TodoContextProvider>
   
    </>
  );
}

export default App;
