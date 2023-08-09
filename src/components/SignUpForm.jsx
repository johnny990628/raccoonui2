'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'
import { registerUser } from '@/functions/auth/registration'
import { getAccessTokenForRegistration } from '@/functions/auth/token'
import { useToast } from './ui/use-toast'
import { useRouter } from 'next/navigation'

const SignUpForm = ({ className, ...props }) => {
    const form = useForm()
    const { toast } = useToast()
    const { push } = useRouter()
    async function onSubmit(values) {
        const accessToken = await getAccessTokenForRegistration()
        const userData = {
            username: values.username,
            email: values.email,
            enabled: true,
            credentials: [
                {
                    type: 'password',
                    value: values.password,
                },
            ],
        }
        const response = await registerUser({ accessToken, userData })
        if (response.ok) {
            toast({ title: 'Success', description: 'User registration successful.' })
            push('/sign-in')
        } else {
            const errorData = await response.json()
            toast({ title: 'Error', description: 'Error registering the user:' + errorData })
        }
    }

    return (
        <div className={cn('flex justify-center w-full', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="email" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="username" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="password" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="sm" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default SignUpForm
