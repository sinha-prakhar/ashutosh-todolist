"use client"

// importing and requireing packages and file
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "@/components/Navbar";

// interfaces
interface TodoData {
  id: number,
  value: string,
  isDone: boolean,
}


// interface for theme
  type Theme = {
  NavbarTheme: string,
  backgroundTheme: string,
  todosNumberParagraph: string,
  toggleThemeButtonBG: string
}



const Page = () => {


  
  // A Array that hold some sentence that atract user in input placeholder
  const placeholders = [
    "Your next victory starts here!",
    
    "Turn “I should” into “I did”",

    "Make magic happen…",

    "Tasks beware — you’re going down!",
    
    "Your genius plan goes here",
    
    "Tick this off like a boss",
    
    "Dream it. Type it. Do it.",
    
    "Today’s mission… accept it!",
    
    "One small task for you, one giant leap for productivity",
    
    "Plan something awesome…",
    
    "Your to-do goes here",
    
    "Start typing your task…",
    
    "Keep track of this…",
    
    "One step closer to productivity…",
  ]
  

  // hooks and states
  const [placeholder, setplaceholder] = useState(placeholders[0])
  const [theme, settheme] = useState<Theme>({
    NavbarTheme: "bg-zinc-800",
    backgroundTheme: "bg-white",
    todosNumberParagraph: "text-black",
    toggleThemeButtonBG: "bg-zinc-700 text-white"
  })
  
const [todo, setTodo] = useState<string>('');
const [todos, setTodos] = useState<TodoData[]>([]);
const [filter, setFilter] = useState<"all" | "active" | "completed">("all")
  
  
  
  
  const completedCount = todos.filter(t => t.isDone).length;
  const progress = todos.length === 0 ? 0 : (completedCount / todos.length) * 100;
  
  // functions


  const notify = () => toast("Wow You had acheived your goal keep it up");



const saveTodo = () => {
    if (!todo.trim()) return;

    const newTodo: TodoData = {
        id: Date.now(),
        value: todo,
        isDone: false,
    };

    setTodos(todo => [...todo, newTodo]);

    setTodo('');
};



const edittodos = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (!todoToEdit) return;

    setTodos(todos.filter(todo => todo.id !== id));
    setTodo(todoToEdit.value);
};


const deletetodos = (id: number) => {
    const confirmed = confirm("Do you really want to delete this todo?");
    if (!confirmed) return;

    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
};


//  this function cheack does todo is completed or not if yes it does it function
const doneTodo = (id: number) => {
    const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
            if (!todo.isDone) {
                notify();
            }
            return { ...todo, isDone: !todo.isDone };
        }
        return todo;
    });

    setTodos(updatedTodos);
};




const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.isDone;
    if (filter === "completed") return todo.isDone;
    return true; // all
});
  
  
  useEffect(() => {
    const randomIndex: number = Math.floor(Math.random() * placeholders.length);
    setplaceholder(placeholders[randomIndex]);
  }, [])

  
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  const ToggleTheme = () => {
  settheme(theme => ({
    NavbarTheme:
      theme.NavbarTheme === "bg-zinc-800" ? "bg-zinc-400" : "bg-zinc-800",
    backgroundTheme:
      theme.backgroundTheme === "bg-white" ? "bg-zinc-800" : "bg-white",
      todosNumberParagraph:
      theme.todosNumberParagraph === "text-white"? "text-black": "text-white",
      toggleThemeButtonBG:
      theme.toggleThemeButtonBG === "bg-zinc-700 text-white"? "bg-white text-black": "bg-zinc-700 text-white"
  }));
};


  return (
    <>
      <main className={`h-screen w-full ${theme.backgroundTheme}`}>
        <Navbar Theme={theme.NavbarTheme} />
        <ToastContainer />
        <div className={`helper w-full mt-16 flex flex-col md:flex-row gap-2}`}>
          <input
            autoComplete='on'
            autoCorrect='on'
            list='suggestion'
            autoFocus
            type="text"
            id='todoInput'
            name='todoInput'
            className='border border-black bg-white focus:border-blue-600 focus:border-3 h-9 rounded-sm w-full md:w-1/2 transition-all'
            placeholder={placeholder}
            onChange={(e) => {
              setTodo(e.target.value)
            }}
            onKeyDown={(e) => e.key === 'Enter' && saveTodo()}
            value={todo}
          />

          <datalist id="suggestion" className='transition-all'>
            <option value="Reply to emails"></option>
            <option value="Prepare presentation"></option>
            <option value="Study Chapters"></option>
            <option value="Submit assignment"></option>
            <option value="Finish project report"></option>
            <option value="Practice English speaking"></option>
            <option value="Update resume"></option>
            <option value="Doctor appointment"></option>
            <option value="Team meeting"></option>
            <option value="Friend’s birthday"></option>
            <option value="Renew subscription"></option>
            <option value="Pay electricity bill"></option>
            <option value="Buy groceries"></option>
            <option value="Do laundry"></option>
            <option value="Clean the kitchen"></option>
            <option value="Meditate"></option>
            <option value="Drink 2L of water"></option>
          </datalist>


          <button
            type="submit"
            className='h-9 rounded-sm bg-blue-500 w-18 ml-2 transition-all active:scale-95  shadow-blue-200 font-bold'
            onClick={saveTodo}
            disabled={!todo.trim()}
          >
            Add
          </button>

          <button
          className={`h-9 rounded-sm ml-2 transition-all active:scale-95 md:mt-0 mt-5  shadow-blue-200 font-bold ${theme.toggleThemeButtonBG}`}
          onClick={ToggleTheme}
          >Toggle theme</button>

        </div>

        <div className="helper  w-full">
          <div className='w-full items-center mr-70 ml-70'>


            <div className='helper mb-16 mt-2'>
              <p className={`font-bold ${theme.todosNumberParagraph}`} >All todos are {filteredTodos.length} Completed todos are {completedCount} and Active are {progress}</p>
            </div>


            <div className="helper">
              <button
                onClick={() => setFilter("all")}
                className={`m-2 p-2 rounded-xl w-30 font-bold transition-all active:scale-95 
    ${filter === "all" ? "bg-zinc-400 scale-95" : "bg-zinc-300 scale-85"}`}

                title='Shows all todos'
              >
                All
              </button>

              <button
                onClick={() => setFilter("active")}
                className={`m-2 p-2 rounded-xl w-30 font-bold transition-all active:scale-95 
    ${filter === "active" ? "bg-zinc-400 scale-95" : "bg-zinc-300 scale-85"}`}

                title='Shows all active todos'
              >
                Active
              </button>

              <button
                onClick={() => setFilter("completed")}
                className={`m-2 p-2 rounded-xl w-30 font-bold transition-all active:scale-95 
    ${filter === "completed" ? "bg-zinc-400 scale-95" : "bg-zinc-300 scale-85"}`}

                title='Shows all completed todos'
              >
                Completed
              </button>
            </div>

            {
              filteredTodos.length === 0 ? (
                <div className='helper w-full'>
                  <p className="text-gray-600">
                    {filter === "all"
                      ? "No todos yet."
                      : filter === "active"
                        ? "No active tasks 🎉"
                        : "No completed tasks yet."}
                  </p>
                </div>
              ) :

                filteredTodos.map((item) => (
                  <div key={item.id}
                    className={`flex items-center justify-around w-full bg-blue p-3 top-4 bg-zinc-300 m-1.5 border border-gray-600 rounded-md min-h-10 transition-all duration-300 ease-in-out
hover:bg-zinc-200 hover:-translate-y-1 hover:shadow-md`}
                  >

                    <div className="gap-2 flex justify-evenly w-full items-center">
                      <div>
                        <input
                          type="checkbox"
                          name="doneCheakbox"
                          id="doneCheckbox"
                          checked={item.isDone}
                          onChange={() => doneTodo(item.id)}
                        />

                      </div>
                      <div className={`font-bold w-full transition-all duration-300 
  ${item.isDone ? "line-through text-gray-500 scale-95" : "scale-100"}`}>
                        {item.value}
                      </div>
                    </div>

                    <div className='flex justify-evenly w-full '>


                      <button onClick={() => edittodos(item.id)}>
                        Edit
                      </button>

                      <button
                        onClick={() => deletetodos(item.id)}
                        className="bg-zinc-200 hover:bg-red-100 hover:text-red-600 text-zinc-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))

            }
          </div>
        </div>

      </main>
    </>
  )
}

export default Page