import Link from 'next/link'

export default function Header() {
  return (
    <header className='flex items-center justify-between px-12 py-8'>
      <Link href='/' className='text-2xl font-extrabold tracking-tighter'>
        Is is GPT-3?
      </Link>
    </header>
  )
}
