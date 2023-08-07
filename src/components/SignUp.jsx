'use client'
import Link from 'next/link'
import { Button } from './ui/button'
import { FiUserPlus } from 'react-icons/fi'
import { signIn } from 'next-auth/react'
import SignUpForm from './SignUpForm'

const SignIn = () => {
    return (
        <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
                {/* <p className="text-sm max-w-xs mx-auto">
                    By continuing, you are setting up a Raccoon account and agree to our User Agreement and Privacy Policy.
                </p> */}
            </div>
            <SignUpForm />

            {/* <Button onClick={() => signIn('keycloak')}>
                <FiUserPlus className="mr-2" size={20} />
                <p>Sign Up</p>
            </Button> */}
            <p className="px-8 text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/sign-in" className="hover:text-brand text-sm underline underline-offset-4">
                    Sign In
                </Link>
            </p>
        </div>
    )
}

export default SignIn
