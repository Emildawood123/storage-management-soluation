import React from "react";
import Image from "next/image";
const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
    <div className="flex min-h-screen">
        <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
            <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
                <Image src="/assets/icons/logo-full.svg" height={84} width={224} alt="logo" className="h-auto" />
                <div className="space-y-5 text-white">
                    <h1 className="h1">Manage your Files best way</h1>
                    <p className="body-1">
                        this is a place where you can store all your documents
                    </p>
                    </div>
                <Image src="/assets/images/files.png"  height={200} width={200} alt="file" />    
            </div>
            </section>
            <section className="flex flex-1 flex-col  items-center bg-white p-4 py-10 lg:justify-center
            lg:p-10 lg:py-0">
                <div className="lg:hidden mb-16">
                    <Image src="/assets/icons/logo-brand.svg" width={224} height={82} className="h-auto w-[200px] lg:w-[250px]" alt=""/>
                </div>
                {children}
            </section>
        
        </div>
    )
}
export default Layout
