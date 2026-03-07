"use client"

import { useState } from "react";



const Navbar = (props: any) => {

  const [ShowProgressBar, setShowProgressBar] = useState(false);

  const toggleProggressbar = () => {
    setShowProgressBar(p => !p);
  }



  const DeleteAllTodos = () => {
    const isConfirm = window.confirm("Do you want to delete All your Todos");

    if (isConfirm === true) {
      localStorage.removeItem("todos");
      props.setTodos([])
    }
  }


  return (
    <header>
      <nav className={`items-center justify-between w-full ${props.Theme} p-4`}>
        <div className="flex h-full flex-wrap md:flex-nowrap">
          <div className="flex items-center md:ml-14 ml-0 w-full mb-5 h-full justify-center">
            <h1 className='text-3xl text-white font-bold'>Ashutosh to-do manager</h1>
          </div>

          <div className="helper gap-5">

            <button
              className={`h-10 w-30 rounded-xl transition-all active:scale-95   shadow-blue-200 font-bold
              ${props.toggleThemeButtonBG}`}
              onClick={props.ToggleTheme}
              aria-label='Toggle theme'
            >
             Theme
            </button>


            <button
              className={`h-10 w-30 rounded-xl transition-all active:scale-95  bg-zinc-700 text-white shadow-blue-200 font-bold`}
              onClick={toggleProggressbar}
              aria-label='gives progress bar of todo'
            >
              more

            </button>

            <button className='bg-red-500 rounded-xl p-5 h-10 flex justify-center items-center transition-all active:scale-100 scale-95 font-bold w-30 ' id='render-btn' name='render-btn' title="This button Deletes All the todo in list." aria-label='Deletes all todo in the list' onClick={DeleteAllTodos} >Delete</button>


          </div>

        </div>

        <div className="h-px w-full mt-2 mb-2 bg-white"></div>

        

        <div className={`justify-center gap-2 md:gap-10 h-full items-center transition-all ease-in-out ${ShowProgressBar ? "flex" : "hidden"}`}>



          <div className='items-center text-2xl'>
            <div className="text-white align-middle w-30 items-center flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">All</div>
            <div className="text-white align-middle w-30 items-center flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">{props.alltodosLength}</div>
          </div>


          <div className='items-center text-2xl'>
            <div className="text-white align-middle w-30 items-center flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">Active</div>
            <div className="text-white align-middle w-30 items-center flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">{props.progress}</div>
          </div>

          <div className='items-center text-2xl'>
            <div className="text-white align-middle w-30 items-center flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">Completed</div>
            <div className="text-white align-middle w-30 items-center flex justify-center transition-all duration-300 hover:scale-105 hover:shadow-xl">{props.completedCount}</div>
          </div>


        </div>

      </nav>
    </header>
  )
}

export default Navbar