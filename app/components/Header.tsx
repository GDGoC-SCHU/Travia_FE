import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"  
import { Link } from "@tanstack/react-router"
import { Code } from "lucide-react"

export default function Header() {
    return (
        <NavigationMenu className="flex justify-between max-w-full p-4 bg-slate-50 shadow-md">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/" className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600">
                        🌏 Travia
                    </Link>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link to="/history" className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600">
                        History
                    </Link>
                    <Link to="/login" className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600">
                        Login
                    </Link>
                    {/* <a href="https://github.com/GDGoC-SCHU/Travia_FE" target="_blank" className="rounded-xl p-2 hover:bg-slate-100 block">
                        <Code />
                    </a> */}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}