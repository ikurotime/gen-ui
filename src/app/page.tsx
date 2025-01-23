import MainInput from './(home)/components/main-input'

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-4'>
      <h1 className='text-4xl font-bold mb-8'>Hello there</h1>
      <MainInput />
    </div>
  )
}
