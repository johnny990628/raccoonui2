'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Button, buttonVariants } from './ui/button'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from './ui/navigation-menu'
import { signIn, signOut, useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { cn } from '../lib/utils'

async function keycloakSessionLogOut() {
    try {
        await fetch(`/api/auth/logout`, { method: 'GET' })
    } catch (err) {
        console.error(err)
    }
}

const Navbar = () => {
    const { data: session, status } = useSession()
    const pathname = usePathname()

    return (
        <div className="fixed top-0 inset-x-0 h-fit z-[10] py-4">
            <div className="container max-w-7xl h-full mx-auto flex item-center justify-between gap-2">
                <div className="flex item-center gap-4">
                    <Link href="/" className="flex gap-2 items-center">
                        <Image
                            src="/logo.svg"
                            alt="logo"
                            width={20}
                            height={20}
                            className="bg-slate-100 rounded-sm p-1 h-8 w-8 sm:h-6 sm:w-6"
                        />
                        <p className="hidden  text-lg font-medium md:block">RACCOON</p>
                    </Link>

                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/image-management" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(navigationMenuTriggerStyle(), pathname === '/image-management' && 'bg-accent')}
                                    >
                                        Image Management
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/ae-title" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={cn(navigationMenuTriggerStyle(), pathname === '/ae-title' && 'bg-accent')}
                                    >
                                        AE Title
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                {/* search bar */}
                {session ? (
                    <div className="flex item-center gap-4">
                        <div className="pt-2">{`${session.user.name}`}</div>
                        <Button
                            onClick={() => keycloakSessionLogOut().then(() => signOut({ callbackUrl: '/' }))}
                            className={buttonVariants({ variant: 'secondary' })}
                        >
                            Log Out
                        </Button>
                    </div>
                ) : (
                    <Link href="/sign-in" className={buttonVariants()}>
                        Sign In
                    </Link>
                )}
            </div>
        </div>
    )
}

export default Navbar
