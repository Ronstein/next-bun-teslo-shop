'use server';

import { signIn } from '@/auth';
// import { sleep } from '@/utils';
import { AuthError } from 'next-auth';

// ...

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        //console.log({ formData: Object.fromEntries(formData) });
        // await sleep(2);
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirect: false,
        });
        return 'Success'
    } catch (error) {
        //console.log(error);
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export const login = async (email: string, password: string) => {
    try {
        await signIn('credentials', { email, password });
        return { ok: true };
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo iniciar Sessión',
        }
    }
}