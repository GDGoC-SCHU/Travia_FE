import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"  
import { Link, ParsedLocation } from "@tanstack/react-router"
import { Store, useStore } from "@tanstack/react-store"
import { Button } from "./ui/button"
import { Session } from "@/routes/__root"

function resetSession(session: Store<Session>) {
    session.setState((state) => {
        return {
            ...state,
            user_id: undefined     
        }
    });
}

export default function Header(props: { session: Store<Session>, uri: ParsedLocation }) {
    const data = useStore(props.session, (state) => {
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

                    {state.user_id ? (
                        <>
                        <Link to="/home" className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600">
                            Home
                        </Link>
                        <Button className="text-xl text-cyan-600" variant="ghost" onClick={(e) => resetSession(props.session)}>
                            Logout
                        </Button>
                        </>
                    ) : (
                        <Link to="/login" search={{ re_uri: `${props.uri.pathname}${props.uri.search}` }} className="rounded-xl p-2 hover:bg-slate-100 text-xl text-cyan-600">
                            Login
                        </Link>
                    )}
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
        )
    })

    return data;
}