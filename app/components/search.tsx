'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { getFiles } from "@/lib/files.actions";
import Thumbnail from "./thumbnail";
import { Models } from "node-appwrite";
import { useDebounce } from 'use-debounce';
import FormattedDateTime from "./FormattedDateTime";
const Search = () => {
    const router = useRouter()
    const pathname = usePathname();

    const [query, setQuery] = useState('')
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get("query") || ""
    const [result, setResult] = useState<Models.Document[]>([])
    const [open, setOpen] = useState(false)
    const [debounded] = useDebounce(query, 300);
    const handleClickItem = (file: Models.Document) => {
        setOpen(false)
        setResult([])
        router.push(`/${file.type === 'video' ? 'media': file.type + 's'}?query=${query}`)
    }
    useEffect(() => {
        const fetchFiles = async () => {
            if (debounded.length === 0) {
                setOpen(false)
                setResult([])
                return router.push(pathname.replace(searchParams.toString(), ""))
            }
            const files = await getFiles({searchText: debounded, types: []})
            setResult(files.documents)
            setOpen(true)

        } 
        fetchFiles()
    }, [debounded])
    useEffect(() => {
        if (!searchQuery) {
            setQuery("")
        }
    }, [searchQuery])
    return (
        <div className="search">
            <div className="search-input-wrapper">
                <Image src="/assets/icons/search.svg" alt="search" width={24} height={24} />
                <input value={query} className="search-input" onChange={(e) => setQuery(e.target.value)} />
                {open && (
                    <ul className="search-result">
                        {result.length > 0 ? (
                            result.map((file) => (
                                <li onClick={() => handleClickItem(file)} className="flex items-center justify-between" key={file.$id} >
                                    <p className="subtitle-2 line-clamp-1 text-light-100">{file.name}</p>
                                    <div className="flex cursor-pointer items-center  gap-4">
                                        <Thumbnail extension={file.extension} type={file.type } url={file.url} className="size-9 min-w-9"/>
                                    </div>
                                    <FormattedDateTime date={ file.$createdAt }  className="caption line-clamp-1 text-light-100"/>
                                </li>
                            ))
                        ) : <p className="empty-result">No files found</p>
                        }
                    </ul>
                )}
            </div>
        </div>
    )
}
export default Search
