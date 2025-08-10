import Image from 'next/image'
import { cn } from '@/lib/utils'

const Logo = () => {
  return (
    <div className="hidden md:flex items-center gap-x-2">
        <Image 
        src="/logo_dark.svg"
        height="50"
        width="120"
        alt='logo'
        className='dark:hidden'
        />
        <Image 
        src="/logo_light.svg"
        height="50"
        width="120"
        alt='logo'
        className='hidden dark:block'
        />
    </div>
  )
}

export default Logo