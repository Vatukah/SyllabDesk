import { BookmarkIcon } from "@heroicons/react/24/solid"
export default function Bookmark({name,link}){

    return(
        <a href={link} className="flex items-center gap-xs grow-0 shrink-0 p-xs  w-fit rounded-md primary-bg shadow-md cursor-pointer border border-[rgba(var(--accent-light),1)]">
 <div className="p-xs primary-bg-dark rounded-full grow-0 shrink-0"> <BookmarkIcon className="w-4 text-accent"/></div>
          <div className="grow-0 shrink-0">{name}</div>
        </a>
    )
}