export default function FormSection({ children, title }) {
    return (
        <section className="flex flex-col gap-4 p-4 bg-white rounded-md shadow">
            {(title) && <h2 className="font-bold uppercase text-lg">{title}</h2>}

            <div className="flex gap-4">
                {children}
            </div>
        </section>
    )
}