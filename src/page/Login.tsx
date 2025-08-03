import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2, Lock, User, UserX, Waves } from 'lucide-react'
import { useLogin } from '@/service/AuthService'
import { useState } from 'react'

const loginSchema = z.object({
    email: z.string().min(1, "Email obbligatoria").email("Email non valida"),
    password: z.string().min(3, "Minimo 3 caratteri")
})

type LoginFormData = z.infer<typeof loginSchema>

const Login = () => {
    const login = useLogin()
    const [invalidCredential, setInvalidCredential] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })


    const onSubmit = async (data: LoginFormData) => {
        try {
            await login(data)
        } catch {
            setInvalidCredential(true)
        } finally {
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full">
                            <Waves className="h-8 w-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">Chalet Admin</h1>
                    <p className="text-gray-600 mt-2">Accedi al pannello di controllo</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Card className='bg-gradient-to-br from-blue-50 to-cyan-50 border-[1.5px] border-blue-100 shadow-lg'>
                        <CardHeader>
                            <CardTitle>Accesso Amministratore</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>

                            <div className='space-y-2'>
                                <Label>Email</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="example@gmail.com"
                                        className="pl-10 rounded-xl border-[1.5px] border-blue-100"
                                        {...register("email")}
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            <div className='space-y-2'>
                                <Label>Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-[10px] h-4 w-4 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="************"
                                        autoComplete="new-password"
                                        className="pl-10 rounded-xl border-[1.5px] border-blue-100"
                                        {...register("password")}
                                    />
                                </div>
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {invalidCredential && 
                            <div className='flex gap-2 items-center justify-center mt-6'>
                                <UserX className='text-red-400'/>
                                <h1 className='text-red-400'>Credenziali non valide</h1>
                            </div>    
                            }

                        </CardContent>
                        <CardFooter>
                            <Button disabled={isSubmitting} type="submit" className='w-full bg-blue-500 hover:bg-blue-600 rounded-xl cursor-pointer'>
                                {isSubmitting ? (
                                    <div className='flex gap-1 items-center'>
                                        <h1>Login</h1>
                                        <Loader2 className="h-[100px] w-[100px] animate-spin text-white" />
                                    </div>
                                ) : (
                                    "Accedi"
                                )}
                            </Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    )
}

export default Login