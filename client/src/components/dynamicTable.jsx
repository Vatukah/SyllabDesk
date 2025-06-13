
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUtility } from "../contexts/providers/utilityProvider";
const Filter = ({ filterText, onFilter, onClear, total ,title }) => {
  return (
    <div className="flex justify-between w-full">
      <div className="text-black">
        Total {title} : <span className="text-accent font-bold">{total}</span>
      </div>
      <div className="flex gap-1">
        <div className="relative">
          <input
            type="text"
            name="filter"
            id="filter"
            className="border border-gray-400 pl-2 py-1 pr-12 rounded-sm text-sm outline-none focus:border-[rgba(var(--accent-light),1)] "
            value={filterText}
            onChange={(e) => onFilter(e.target.value)}
            placeholder="Search by name"
          />{" "}
          {filterText.length > 0 && (
            <button
              className="w-12 h-full hover:bg-[rgba(var(--accent-light),0.5)] hover:cursor-pointer  rounded-sm shrink-0 grow-0 absolute right-0 top-0"
              onClick={onClear}
            >
              <XMarkIcon className="text-accent w-6 h-6 mx-auto" />
            </button>
          )}
        </div>
        <div className="accent-light p-1 rounded-sm text-white  ">
          <FunnelIcon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
export default function DynamicTable({
  title,
  columns,
  data,
  filterText,
  onFilter,
  onClear,
}) {
  const {
    isRightSideBar,
    setIsRightSideBar,
    setRightSideBarView,
    setCurrentUserInfo,
  } = useUtility();

  const handleRowClick = (row, e) => {
    e.stopPropagation();
    const id = row.id;
    setCurrentUserInfo(id);
    setRightSideBarView("userInfo");
    setIsRightSideBar(true);
  };
  return (
    <DataTable
      columns={columns}
      data={data}
      title={title}
      subHeader
      subHeaderComponent={
        <Filter
          onClear={onClear}
          filterText={filterText}
          onFilter={onFilter}
          total={data.length || 0}
          title={title}
        />
      }
      onRowClicked={handleRowClick}
    />
  );
}
