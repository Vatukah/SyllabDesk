import Theme_toggler from "./themeToggler";
import User from "./user";

export default function TopRightBar() {
  return (
    <div className="flex  items-center gap-2">
      <Theme_toggler />
      <User  />
    </div>
  );
}
