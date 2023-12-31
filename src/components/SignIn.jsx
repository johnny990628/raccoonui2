'use client'
import UserAuthForm from '@/components/UserAuthForm'
import Link from 'next/link'
import { Button } from './ui/button'
import { CiLogin } from 'react-icons/ci'
import { signIn } from 'next-auth/react'

const SignIn = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Welcome</h1>
                {/* <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up a Raccoon account and agree to our User Agreement and Privacy Policy.
                </p> */}
            </div>
            {/* <UserAuthForm /> */}
            {/* <Button>
                <FcGoogle className="mr-2" size={20} />
                <p>Google</p>
            </Button> */}
            <Button onClick={() => signIn('keycloak')}>
                <CiLogin className="mr-2" size={20} />
                <p>Sign In</p>
            </Button>
            <p className="px-8 text-center text-sm text-muted-foreground">
                New to Raccoon?{' '}
                <Link href="/sign-up" className="hover:text-brand text-sm underline underline-offset-4">
                    Sign Up
                </Link>
            </p>
        </div>
    )
}

export default SignIn
