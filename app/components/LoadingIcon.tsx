import { LoaderCircle } from "lucide-react";

export default function LoadingIcon(props: { ref: React.RefObject<SVGSVGElement> }) {
    return (
        <LoaderCircle color={"oklch(0.609 0.126 221.723)"} className="min-w-8" size={48} ref={props.ref} />
    )
}