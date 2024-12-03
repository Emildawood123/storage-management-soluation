'use client';
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter } from "next/navigation";
const Sort = () => {
    
    const pathname = usePathname()
    const router = useRouter()
    const sortTypes = [
  {
    label: "Date created (newest)",
    value: "$createdAt-desc",
  },
  {
    label: "Created Date (oldest)",
    value: "$createdAt-asc",
  },
  {
    label: "Name (A-Z)",
    value: "name-asc",
  },
  {
    label: "Name (Z-A)",
    value: "name-desc",
  },
  {
    label: "Size (Highest)",
    value: "size-desc",
  },
  {
    label: "Size (Lowest)",
    value: "size-asc",
  },
];
    const handleClick = (value: string) => {
        router.push(`${pathname}?sort=${value}`)
    }

    return (
        <Select onValueChange={handleClick} defaultValue={ sortTypes[0].value}>
  <SelectTrigger className="sort-select">
    <SelectValue placeholder={ sortTypes[0].value} />
  </SelectTrigger>
    <SelectContent className="sort-select-content">
                {sortTypes.map((item) => {
                    return (
                        <SelectItem value={ item.value} className="shad-select-item" key={item.label}>{item.label}</SelectItem>
                    )
                })}            

  </SelectContent>
</Select>

    )
}
export default Sort
