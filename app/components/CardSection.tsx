import { ReactNode } from "react";
import { Card } from "./ui/card";

export default function CardSection({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <Card className="rounded-lg bg-white border-slate-400 border-1 my-2 p-4 grow">
            {children}
        </Card>
    )
}