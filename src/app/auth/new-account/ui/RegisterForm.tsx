"use client";

import Link from "next/link";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import clsx from 'clsx';
import { login, registerUser } from "@/actions";
import { useState } from "react";

type FormInputs = {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export const RegisterForm = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, handleSubmit, formState: { errors }, control } = useForm<FormInputs>();

    const watchPassword = useWatch({ control, name: 'password' }); // Observamos el campo 'password'

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        setErrorMessage('');
        const { name, email, password } = data;
        //console.log({ name, email, password });

        //Server Action
        const resp = await registerUser(name, email, password);
        //console.log({ resp });
        if (!resp.ok) {
            //console.log('hola', resp.message);

            setErrorMessage(resp.message);
            return;
        }

        await login(email.toLowerCase(), password);
        window.location.replace('/');
    }

    return (
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="name">Nombre Completo</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': !!errors.name
                    }
                )}
                type="text"
                {...register('name', { required: true })}
            />
            {errors.name?.type === 'required' && (
                <span className="text-red-500">*El nombre es obligatorio</span>
            )}

            <label htmlFor="email">Correo electrónico</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': !!errors.email
                    }
                )}
                type="email"
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email?.type === 'required' && (
                <span className="text-red-500">*El email es obligatorio</span>
            )}
            {errors.email?.type === 'pattern' && (
                <span className="text-red-500">*El email no es válido</span>
            )}


            <label htmlFor="email">Contraseña</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': !!errors.password
                    }
                )}
                type="password"
                {...register('password', { required: true, minLength: 6 })}
            />
            {errors.password?.type === 'required' && (
                <span className="text-red-500">*La contraseña es obligatoria</span>
            )}
            {errors.password?.type === 'minLength' && (
                <span className="text-red-500">*La contraseña debe tener al menos 6 caracteres</span>
            )}

            <label htmlFor="confirmPassword">Confirmar Contraseña</label>
            <input
                className={clsx(
                    "px-5 py-2 border bg-gray-200 rounded mb-5",
                    {
                        'border-red-500': !!errors.confirmPassword
                    }
                )}
                type="password"
                {...register('confirmPassword', {
                    required: "*Confirma tu contraseña", // Mensaje personalizado
                    validate: (value) =>
                        value === watchPassword || "Las contraseñas no coinciden", // Validación directa
                })}
            />
            {errors.confirmPassword && (
                <span className="text-red-500">{errors.confirmPassword.message}</span>
            )}

            <span className="text-red-500">{errorMessage}</span>

            <button
                type="submit"
                className="btn-primary">
                Crear Cuenta
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/login"
                className="btn-secondary text-center">
                Ingresar
            </Link>

        </form>
    )
}
