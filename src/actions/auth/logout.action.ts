//'use server';

import { signOut } from "next-auth/react";

//import { signOut } from "@/auth";

export const logout = async () => {
    await signOut({
        redirectTo: '/',
        // redirect: true,
    });
}