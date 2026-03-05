"use client"

type Theme = {
    NavbarTheme: string,
    backgroundTheme: string,
}



const Navbar = (props: any) => {



  const DeleteAllTodos = () => {
   const isCoferm =  confirm("Do you want to delete All your Todos");

   if(isCoferm == true ){
    localStorage.removeItem("todos");
    window.location.reload();
   }
}


    let theme:Theme = {
      NavbarTheme: "bg-zinc-800",
      backgroundTheme: "bg-white",
    }

  return (
    <header>
       <nav className={`flex flex-col md:flex-row h-auto md:h-40 items-center justify-between w-full ${props.Theme} p-4`}>
        <div className="flex justify-center items-center w-full h-full mb-5">
        <h1 className='text-3xl text-white font-bold underline'>Ashutosh your todo manager</h1>
        </div>
        <div className="flex justify-end items-center">
        <button className='bg-red-500 mr-14 rounded-xl p-5 h-10 flex justify-center items-center transition-all active:scale-100 scale-95 font-bold' id='render-btn' name='render-btn' title="This button Deletes All the todo in list " onClick={DeleteAllTodos} >Delete All todos</button>
        </div>
      </nav>
    </header>
  )
}

export default Navbar