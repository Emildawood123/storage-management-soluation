"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
const Sidebar = ({ fullName, email }: {fullName: string, email: string}) => {
    
    const pathname = usePathname()
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

const actionsDropdownItems = [
  {
    label: 'Rename',
    icon: '/assets/icons/edit.svg',
    value: 'rename',
  },
  {
    label: 'Details',
    icon: '/assets/icons/info.svg',
    value: 'details',
  },
  {
    label: 'Share',
    icon: '/assets/icons/share.svg',
    value: 'share',
  },
  {
    label: 'Download',
    icon: '/assets/icons/download.svg',
    value: 'download',
  },
  {
    label: 'Delete',
    icon: '/assets/icons/delete.svg',
    value: 'delete',
  },
];

const sortTypes = [
  {
    label: 'Date created (newest)',
    value: '$createdAt-desc',
  },
  {
    label: 'Created Date (oldest)',
    value: '$createdAt-asc',
  },
  {
    label: 'Name (A-Z)',
    value: 'name-asc',
  },
  {
    label: 'Name (Z-A)',
    value: 'name-desc',
  },
  {
    label: 'Size (Highest)',
    value: 'size-desc',
  },
  {
    label: 'Size (Lowest)',
    value: 'size-asc',
  },
    ];
    return (
        <aside className="sidebar">
            <Link href='/'>
                <Image className="hidden h-auto lg:block" src="/assets/icons/logo-full-brand.svg" alt="" width={160} height={50} />
                <Image className="lg:hidden" src="/assets/icons/logo-brand.svg" alt="" width={52} height={52}/>
            </Link>
            <nav className="sidebar-nav">
                <ul className="flex flex-1 flex-col gap-6">
                    {paths.map((e) => { 
                        return <Link className="lg:w-full" key={e.name} href={e.url} >
                            <li className={cn("sidebar-nav-item", pathname === e.url && 'shad-active')}>
                                <Image src={e.icon} alt="" width={24} height={24} className={ cn("nav-icon",e.url && 'shad-active')} />
                                <p className="hidden lg:block">{e.name}</p>
                            </li>
                        </Link>
                    })}
                    
                </ul>
            </nav>
            <Image className="w-full" alt="" width={506} height={418} src='/assets/images/files-2.png' />
            <div className="sidebar-user-info">
                <Image src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"width={44}height={44} alt="" className="sidebar-user-avatar"/>
            </div>
            <div className="hidden lg:block">
                <p className="subtitle-2 capitalize">
                    {fullName}    
                </p>
                <p className="caption">
                    { email }
                </p>
            </div>
        </aside>
    )
}
export default Sidebar
