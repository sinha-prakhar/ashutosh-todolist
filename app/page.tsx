"use client"

// importing and requireing packages and file
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from "@/components/Navbar";
import { motion, Reorder } from "framer-motion"



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
  toggleThemeButtonBG: string,
  noTodoText: string
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
    toggleThemeButtonBG: "bg-zinc-700 text-white",
    noTodoText: "text-gray-600",
  })

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

  // constants in the app

  const completedCount = todos.filter(t => t.isDone).length;
  const progress = todos.filter(t => t.isDone === false).length;


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



  const editTodos = (id: number) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (!todoToEdit) return;

    setTodos(todos.filter(todo => todo.id !== id));
    setTodo(todoToEdit.value);
  };


  const deleteTodos = (id: number) => {
    const comfirm = confirm("Do you really want to delete this todo?");
    if (!comfirm) return;

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
    return true;
  });


  useEffect(() => {
    const randomIndex: number = Math.floor(Math.random() * placeholders.length);
    setInterval(() => {
      setplaceholder(placeholders[randomIndex]);
    }, 8000);
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
        theme.backgroundTheme === "bg-white" ? "bg-zinc-600" : "bg-white",
      todosNumberParagraph:
        theme.todosNumberParagraph === "text-white" ? "text-black" : "text-white",
      toggleThemeButtonBG:
        theme.toggleThemeButtonBG === "bg-zinc-700 text-white" ? "bg-white text-black" : "bg-zinc-700 text-white",
      noTodoText:
        theme.noTodoText === "text-gray-600" ? "text-white" : "text-gray-600",
    }));
  };


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 2, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`h-screen w-full ${theme.backgroundTheme}`}>


        <Navbar Theme={theme.NavbarTheme} todos={todos} alltodosLength={filteredTodos.length} setTodos={setTodos} ToggleTheme={ToggleTheme} toggleThemeButtonBG={theme.toggleThemeButtonBG} completedCount={completedCount} progress={progress}/>
        <main>

          <ToastContainer />
          <div className={`helper w-full mt-30 flex p-1.5 active:scale-99`}>
            <input
              autoCapitalize='words'
              autoComplete='on'
              autoCorrect='on'
              list='suggestion'
              autoFocus
              type="text"
              id='todoInput'
              name='todoInput'
              className='border border-black bg-white focus:border-blue-600 focus:border-3 h-9 rounded-tl-md rounded-bl-md w-full md:w-1/2 transition-all mr-0'
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
              aria-label='Add'
              className='h-9 bg-blue-500 w-18 ml-0 transition-all shadow-blue-200 font-light text-3xl rounded-tr-md rounded-br-md'
              onClick={saveTodo}
              disabled={!todo.trim()}
            >
              +
            </button>

          </div>

          <div className="helper  w-full">
            <div className='w-full items-center px-4 md:px-50'>


              <div className="helper">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFilter("all")}
                  className={`m-2 p-2 rounded-xl w-30 font-bold transition-all active:scale-95 ${filter === "all" ? "bg-zinc-400 scale-95" : "bg-zinc-300 scale-85"}`}
                  title='Shows all todos'
                  aria-label='All todos'
                >
                  All
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFilter("active")}
                  className={`m-2 p-2 rounded-xl w-30 font-bold transition-all active:scale-95 ${filter === "active" ? "bg-zinc-400 scale-95" : "bg-zinc-300 scale-85"}`}
                  title='Shows all active todos'
                  aria-label='Active todos'
                >
                  Active
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setFilter("completed")}
                  className={`m-2 p-2 rounded-xl w-30 font-bold transition-all active:scale-95 ${filter === "completed" ? "bg-zinc-400 scale-95" : "bg-zinc-300 scale-85"}`}
                  title='Shows all completed todos'
                  aria-label='Completed todos'
                >
                  Completed
                </motion.button>
              </div>

              <Reorder.Group
                axis="y"
                values={todos}
                onReorder={setTodos}
                className="w-full mt-20"
              >

                {
                  filteredTodos.length === 0 ? (
                    <div className='helper w-full'>
                      <p className={`text-gray-600 ${theme.noTodoText}`}>
                        {filter === "all"
                          ? "No todos yet."
                          : filter === "active"
                            ? "No active tasks 🎉"
                            : "No completed tasks yet."}
                      </p>
                    </div>
                  ) :

                    filteredTodos.map((item) => (

                      <Reorder.Item
                        layout
                        key={item.id}
                        value={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.97 }}
                        className={`flex items-center justify-around w-full bg-blue p-3 top-4 bg-zinc-300 m-1.5 border border-gray-600 rounded-md min-h-10 transition-all ease-in-out
hover:bg-zinc-200 hover:-translate-y-1 duration-300 hover:scale-105 hover:shadow-xl`}
                      >


                        <div className="gap-2 flex justify-evenly w-full items-center">
                          <div>
                            <input
                              type="checkbox"
                              name={`name${item.id}`}
                              id={`id${item.id}`}
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


                          <button onClick={() => editTodos(item.id)}>
                            Edit
                          </button>

                          <button
                            onClick={() => deleteTodos(item.id)}
                            className="bg-zinc-200 hover:bg-red-100 hover:text-red-600 text-zinc-500 w-8 h-8 rounded-full flex items-center justify-center transition-colors text-sm"
                          >
                            X
                          </button>
                        </div>
                      </Reorder.Item>
                    ))

                }
              </Reorder.Group>
            </div>
          </div>

        </main>
      </motion.div>
    </>
  )
}

export default Page