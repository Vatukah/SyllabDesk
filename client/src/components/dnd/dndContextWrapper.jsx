import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';


export default function DndContextWrapper({ children, handleDragEnd }) {
  
  const sensors = useSensors(useSensor(TouchSensor), useSensor(KeyboardSensor), useSensor(PointerSensor));

  
  return (
    <DndContext collisionDetection={closestCenter} sensors={sensors} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
      {children}
    </DndContext>
  );
}
