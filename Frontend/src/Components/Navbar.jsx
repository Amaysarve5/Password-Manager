import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-500 flex items-center justify-around px-4 h-16 text-white'>
      <div className='logo font-bold text-2xl'><span className='text-green-400'>&lt;</span>Pass<span className='text-green-400'>Op/</span> <span className='text-green-400'>&gt;</span></div>
      <button className='flex gap-2 items-center font-bold border border-green-400 px-4 py-1 rounded-full bg-green-300 hover:bg-green-400 hover:text-black ring-1 ring-white'>
        <img src="Icons/github.png" className='w-10' alt="" />GitHub
      </button>
    </nav>
  )
}

export default Navbar