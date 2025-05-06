export default function Title(props: { type: "h1" | "p", text: string, name?: string }) {
    return (
        <section className="rounded-tl-lg rounded-br-lg bg-white w-full lg:w-64 p-4 border-slate-400 border-2">
            {props.name ? (
                <p className="text-2xl mb-2">
                    <span className="text-base block">안녕하세요,</span>
                    <span className="text-cyan-600 me-0.5">{props.name}</span>
                    님!
                </p>
            ):(
                <p>
                    <span className="text-xl block">당신의 여행 플래너,</span>
                    <span className="text-2xl flex align-bottom gap-0.5">
                        <span className="text-cyan-600 text-3xl">Travia</span>
                        <span className="leading-10.5">입니다.</span>
                    </span>
                </p>
            )}
            {props.type === "h1" ? (
                <h1 className="text-xl break-keep">{props.text}</h1>
            ): (
                <p className="break-keep">{props.text}</p>
            )}
        </section>
    )
}