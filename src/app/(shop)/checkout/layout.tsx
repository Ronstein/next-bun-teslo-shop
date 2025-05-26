import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({
    children
}: {
    children: React.ReactNode;
}) {
    //console.log('hola');
    const session = await auth();
    if (!session?.user) {
        redirect('/auth/login?redirectTo=/checkout/address');
        //redirect('/');
    }
    return (
        <>
            {children}
        </>
    );
}