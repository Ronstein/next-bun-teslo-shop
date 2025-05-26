import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { z } from "zod";
// import prisma from "./lib/prisma";
// import bcryptjs from 'bcryptjs';
import authConfig from "./auth.config";

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [
//         Credentials({
//             async authorize(credentials) {
//                 const parsedCredentials = z
//                     .object({ email: z.string().email(), password: z.string().min(6) })
//                     .safeParse(credentials);

//                 if (!parsedCredentials.success) return null;

//                 const { email, password } = parsedCredentials.data;
//                 // console.log({ email, password });

//                 //Buscar correo
//                 const user = await prisma.user
//                     .findUnique({ where: { email: email.toLowerCase() } });

//                 if (!user) return null;
//                 //authenticar las contraseñas
//                 if (!bcryptjs.compareSync(password, user.password)) return null;
//                 //regresar un usuario sin password
//                 const { password: _, ...rest } = user;
//                 // console.log({ rest });

//                 return rest;
//             },
//         }),
//     ],
//     pages: {
//         signIn: '/auth/login',
//         newUser: '/auth/new-account',
//     },
//     callbacks: {
//         authorized({ auth, request: { nextUrl } }) {
//             const isLoggedIn = !!auth?.user;
//             //console.log({ auth });

//             // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
//             // if (isOnDashboard) {
//             //     if (isLoggedIn) return true;
//             //     return false;
//             // } else if (isLoggedIn) {
//             //     return Response.redirect(new URL('/dashboard', nextUrl));
//             // }
//             return true;
//         },
//         jwt({ token, user }) {
//             //console.log({ token, user });
//             if (user) {
//                 token.data = user;
//             }
//             return token;
//         },
//         async session({ session, token, user }) {
//             //console.log({ session, token, user });
//             session.user = token.data as any;
//             return session;
//         }
//     }
// })

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
})