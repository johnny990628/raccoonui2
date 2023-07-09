import Link from 'next/link'
import Image from 'next/image'
import { buttonVariants } from './ui/button'

const Navbar = async () => {
    return (
        <div className="fixed top-0 inset-x-0 h-fit z-[10] py-4">
            <div className="container max-w-7xl h-full mx-auto flex item-center justify-between gap-2">
                <Link href="/" className="flex gap-2 items-center">
                    <Image src="/logo.svg" alt="logo" width={20} height={20} className="h-8 w-8 sm:h-6 sm:w-6" />
                    <p className="hidden  text-sm font-medium md:block">RACCOON</p>
                </Link>

                {/* search bar */}

                <Link href="/sign-in" className={buttonVariants()}>
                    Sign In
                </Link>
            </div>
        </div>
    )
}

export default Navbar
