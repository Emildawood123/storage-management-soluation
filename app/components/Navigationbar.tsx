"use client";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/user.actions";
interface Props {
    accountId: string,
    ownerId: string,
    fullName: string,
    email: string
}
const MobileNavigationBar = ({ ownerId, accountId, fullName, email }: Props) => {
    const paths = [{
    name: 'Dashboard',
    icon: '/assets/icons/dashboard.svg',
    url: '/',
  },
  {
    name: 'Documents',
    icon: '/assets/icons/documents.svg',
    url: '/documents',
  },
  {
    name: 'Images',
    icon: '/assets/icons/images.svg',
    url: '/images',
  },
  {
    name: 'Media',
    icon: '/assets/icons/video.svg',
    url: '/media',
  },
  {
    name: 'Others',
    icon: '/assets/icons/others.svg',
    url: '/others',
  },
];

    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    return (
        <header className="mobile-header">
            <Image src="/assets/icons/logo-full-brand.svg" alt="" width={120} height={50}/>
        
            <Sheet open={ isOpen } onOpenChange={setIsOpen}>
                <SheetTrigger>
                    <Image src="assets/icons/menu.svg" width={30} height={30} alt=""/>
   </SheetTrigger>
   <SheetContent className="shad-sheet h-screen px-5">
                    <SheetTitle> 
                        <div className="header-user">
                            <Image src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"width={44}height={44} alt="" className="header-user-avatar"/>
                            <div className="sm:hidden lg:block">
                                <p className="subtitle-2 capitalize">{fullName}</p>
                                <p className="caption">{ email }</p>
                            </div>
                        </div>
                        <Separator className="mb-4 bg-light-200/20"/>
                    </SheetTitle>
                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            {paths.map((e) => { 
                        return <Link className="lg:w-full" key={e.name} href={e.url} >
                            <li className={cn("mobile-nav-item", pathname === e.url && 'shad-active')}>
                                <Image src={e.icon} alt="" width={24} height={24} className={ cn("mobile-nav-icon",e.url && 'shad-active')} />
                                <p className="">{e.name}</p>
                            </li>
                        </Link>
                    })}
                        </ul>
                    </nav>
                    <Separator className="my-4 bg-light-200/20" />
                    <div className="flex flex-col justify-center gap-5 p-5">
                        <FileUploader ownerId={ownerId} accountId={accountId}  />
                        <Button type="submit" className="sign-out-button" onClick={async () => await signOutUser()}>
                            Logout
                        <Image src="/assets/icons/logout.svg" alt="" width={24} height={24} className="w-6"/>
                    </Button>
                    </div>
   </SheetContent>
 </Sheet>
</header>
    )
}
export default MobileNavigationBar
