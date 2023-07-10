'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useForm } from 'react-hook-form'

const UserAuthForm = ({ className, ...props }) => {
    const form = useForm()
    async function onSubmit(values) {
        console.log(values)
    }
    return (
        <div className={cn('flex justify-center', className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UserAuthForm
