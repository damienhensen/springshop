import Layout from "@/components/AdminLayout";
import InfoCard from "@/components/admin/infoCard";

export default function Dashboard() {
    return (
        <Layout>
            <h1 className="font-bold text-2xl uppercase mb-8">Dashboard</h1>

            <section className="grid grid-cols-4 gap-8">
                <InfoCard />
                <InfoCard />
                <InfoCard />
                <InfoCard />
            </section>
        </Layout>
    );
}