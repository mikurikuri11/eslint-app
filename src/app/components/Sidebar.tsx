export default function Sidebar() {
  return (
    <div className='bg-custom-blue h-full overflow-y-auto px-5 '>
      <div className='flex-grow'>
        <div className='cursor-pointer flex justify-evenly items-center border mt-2 rounded-md hover:bg-blue-800 duration-150'>
          <span className='text-white p-4 text-2xl'>+</span>
          <h1 className='text-white text-xl font-semibold p-4'>New Chat</h1>
        </div>
        <ul>
          <li className='cursor-pointer border-b p-4 text-slate-100 hover:bg-slate-700 duration-150'>
            Room 1
          </li>
        </ul>
      </div>
    </div>
  )
}
