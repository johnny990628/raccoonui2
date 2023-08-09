'use client'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { useDispatch } from 'react-redux'
import { updateSearchQuery } from '@/redux/slices/DicomSearch'
import { useDebouncedCallback } from 'use-debounce'
import { AiOutlineSearch } from 'react-icons/ai'

export default function DICOMSearch() {
    const form = useForm()
    const dispatch = useDispatch()
    const onSubmit = useDebouncedCallback(
        values => {
            dispatch(updateSearchQuery(values))
        },

        500
    )

    return (
        <div>
            <Form {...form}>
                <form
                    onChange={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-4 mb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    <FormField
                        control={form.control}
                        name="PatientID"
                        render={({ field }) => (
                            <FormItem>
                                
                                {/* <AiOutlineSearch /> */}
                                <FormControl>
                                    <Input placeholder="PatientID" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="PatientName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="PatientName" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="Modality"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Modality" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="AccessionNumber"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="AccessionNumber" {...field} />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <Button type="submit" size="sm" className="pb-0">
                        Submit
                    </Button> */}
                </form>
            </Form>
        </div>
    )
}
