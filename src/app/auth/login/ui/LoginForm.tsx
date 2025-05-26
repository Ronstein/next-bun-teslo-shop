"use client";
import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link"
import { useActionState, useEffect } from "react";
import { IoInformationOutline } from "react-icons/io5";

export const LoginForm = () => {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    );
    //console.log({ formAction });

    useEffect(() => {
        if (errorMessage === 'Success') {
            //redireccion
            window.location.replace('/');
        }
    }, [errorMessage])


    return (
        <form action={formAction} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                name="email"
                type="email" />


            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                name="password"
                type="password" />


            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
                {errorMessage && (
                    <div className="flex flex-row mb-2">
                        <IoInformationOutline className={clsx(
                            "h-5 w-5",
                            {
                                "text-green-700": errorMessage === 'Success',
                                "text-red-500": errorMessage !== 'Success',
                            }
                        )} />
                        <p className={clsx(
                            "text-sm",
                            {
                                "text-green-700": errorMessage === 'Success',
                                "text-red-500": errorMessage !== 'Success',
                            }
                        )}>{errorMessage}</p>
                    </div>
                )}
            </div>

            <button
                type='submit'
                className={clsx({
                    "btn-primary": !isPending,
                    "btn-disabled": isPending,
                })}
                disabled={isPending}
            >
                Ingresar
            </button>


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}
