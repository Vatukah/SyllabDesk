import {
  Bars3Icon,
  PencilSquareIcon,
  Square3Stack3DIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import OnlyIcon from "./buttons/onlyIconBtn";

export default function DraggableBar({
  item,
  handleEdit,
  changeOrder,
  handleDelete,
}) {
  const tools = [
    {
      name: "Edit",
      icon: <PencilSquareIcon className="w-6" />,
      action: handleEdit,
    },

    {
      name: "Rearrange",
      icon: <Square3Stack3DIcon className="w-6" />,
      action: changeOrder,
    },

    {
      name: "Delete",
      icon: <TrashIcon className="w-6" />,
      action: handleDelete,
      style : "danger-action"
    },
  ];

  return (
    <div className="w-full px-sm py-xs border border-[var(--bg-blur-color)] hover:shadow-md rounded-md primary-bg flex items-center justify-between gap-sm relative group overflow-hidden">
      <div className="font-semibold text-lg">{`${item?.order}. ${item?.name}`}</div>

      <div className="flex gap-2 absolute -bottom-20 right-0  transition-all duration-300 group-hover:bottom-[50%] group-hover:translate-y-[50%] p-sm">
        {tools.map((t) => (
          <OnlyIcon icon={t.icon} toolTip={t.name} action={t.action} className={t.style} />
        ))}
      </div>
    </div>
  );
}
