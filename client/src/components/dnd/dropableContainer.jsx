import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableBar from "../draggableBar";
export default function DropableContainer({items, children}){

    return (
        <SortableContext strategy={verticalListSortingStrategy} items={items}>
       {children}
        </SortableContext>
    )
}