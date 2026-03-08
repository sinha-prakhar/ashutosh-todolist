"use client"

import { useState } from "react";
import { motion } from "motion/react";



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



        <motion.div
          layout
          initial={{
            scale: 0.00,

          }}
          animate="visible"
          exit="exit"
          whileInView={{
            scale: 1.02
          }}

          className={`justify-center gap-5 md:gap-10 h-full items-center  ${ShowProgressBar ? "flex opacity-100 translate-y-0 scale-100 transition ease-in transform duration-1000" : "hidden opacity-0 -translate-y-4 scale-95 "}`}>

          <div className='items-center text-2xl'>
            <div className="text-white align-center overflow-hidden m-0 p-0 items-center flex justify-center hover:scale-105 hover:shadow-xl font-[2px]">All</div>
            <div className="text-white align-center overflow-hidden m-0 p-0 items-center flex justify-center hover:scale-105 hover:shadow-xl font-[2px]">{props.alltodosLength}</div>
          </div>

          <div className='items-center text-2xl border-r-2 border-l-2 p-2 border-white w-30'>
            <div className="text-white align-center overflow-hidden m-0 p-0 items-center flex justify-center hover:scale-105 hover:shadow-xl font-[2px]">Active</div>
            <div className="text-white align-center overflow-hidden m-0 p-0 items-center flex justify-center hover:scale-105 hover:shadow-xl font-[2px]">{props.progress}</div>
          </div>

          <div className='items-center text-2xl'>
            <div className="text-white align-center overflow-hidden m-0 p-0 items-center flex justify-center hover:scale-105 hover:shadow-xl font-[2px]">Completed</div>
            <div className="text-white align-center overflow-hidden m-0 p-0 items-center flex justify-center hover:scale-105 hover:shadow-xl font-[2px]">{props.completedCount}</div>
          </div>


        </motion.div>

      </nav>
    </header>
  )
}

export default Navbar