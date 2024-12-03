import React from "react";
import Sidebar from "../components/sidebar";
import MobileNavigationBar from "../components/Navigationbar";
import Header from "../components/header";
import { getCurrentUser } from "@/lib/user.actions";
import { redirect } from "next/navigation";
export const dynamic = 'force-dynamic'
const Layout = async ({ children }: { children: React.ReactNode }) => {
    const currentUser = await getCurrentUser()
    if (!currentUser) return redirect('/sign-in')
    return (
        <main className="flex h-screen">
            <Sidebar fullName={currentUser.fullName} email={currentUser.email } />
            <section className="flex h-full flex-1 flex-col">
                <MobileNavigationBar accountId={currentUser.accountId} ownerId={ currentUser.ownerId} fullName={currentUser.fullName} email={currentUser.email }/>
                <Header userId={currentUser.$id} accountId={currentUser.accountId} />
                <div className="main-content">{ children }</div>
            </section>
        </main>
    )
}
export default  Layout
