export const revalidate = 0;

import { getPaginatedUsers } from '@/actions';
import { Pagination, Title } from '@/components';
import { redirect } from 'next/navigation';
import { UsersTable } from './ui/UsersTable';

interface Props {
    searchParams: Promise<{ page?: string }>
}

export default async function UsersPage({ searchParams }: Props) {

    const pageParam = await searchParams;
    const page = pageParam.page ? parseInt(pageParam.page) : 1;

    //const { ok, orders = [] } = await getOrdersByUser();
    const { ok, users = [], totalPages = 0 } = await getPaginatedUsers({ page });
    // console.log({ ok, orders, totalPages });

    if (!ok) {
        redirect('/auth/login');
    }

    return (
        <>
            <Title title="Mantenimientos de usuarios" />

            <div className="mb-10">
                <UsersTable users={users} />
            </div>

            <Pagination totalPages={totalPages} />
        </>
    );
}