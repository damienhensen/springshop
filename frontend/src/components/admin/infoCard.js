export default function InfoCard() {
    return (
        <div className="bg-white inline-flex flex-col gap-2 p-4 rounded-md shadow">
            <h3 className="uppercase font-medium text-slate-400">Income</h3>
            <p className="text-2xl font-medium">€74.242</p>
            <p><span className="bg-green-100 text-green-500 rounded px-2 py-0.5 font-bold">3.65%</span> Since last week</p>
        </div>
    )
}