import Layout from "@/components/admin/layout";
import InfoCard from "@/components/admin/infoCard";

const Dashboard = () => {
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

export default Dashboard;