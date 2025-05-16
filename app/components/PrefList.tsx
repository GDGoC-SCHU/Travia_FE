import { ReactNode } from "react";
import { Badge } from "./ui/badge";

export default function PrefList({ icon, value, type, list }: {
  readonly icon?: ReactNode,
  value?: string,
  type: string,
  list?: {
    readonly icon: ReactNode,
    value: string,    
  }[]
}) {
  if (list) {
    return (
      <li className="flex flex-col gap-2">
        <span className="text-xl">{type}</span>
        {list.map((item, idx) => (
          <Badge className="text-lg flex-wrap" key={idx} variant="outline">
            {item.icon}
            <span className="text-wrap">{item.value}</span>
          </Badge>
        ))}
      </li>
    )
  } else {
      return (
        <li className="flex flex-col gap-1">
          <span className="text-xl">{type}</span>
          <Badge className="text-lg flex-wrap" variant="outline">
            {icon}
            <span className="text-wrap">{value}</span>
          </Badge>
        </li>
      )
  }  
}