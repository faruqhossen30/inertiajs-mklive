import DashbardCard from '@/Components/Dashboard/DashbardCard';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />


            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">

                <DashbardCard title="100" subtitle="Just for test" />
                <DashbardCard title="100" subtitle="Just for test" />
                <DashbardCard title="100" subtitle="Just for test" />
                <DashbardCard title="100" subtitle="Just for test" />
                <DashbardCard title="100" subtitle="Just for test" />
                <DashbardCard title="100" subtitle="Just for test" />


            </div>

        </AuthenticatedLayout>
    );
}
