import classNames from "classnames";
import useUser from "../hooks/useUser";
import Navbar from "./Navbar";

export default function Layout({ className, children }) {
  const { user } = useUser();

  return (
    <div
      data-theme="emerald"
      className={classNames(
        "font-inter p-10 w-full min-h-screen bg-base-200 text-base-content",
        className
      )}
    >
      {user && <Navbar />}
      <div className="mt-10">{children}</div>
    </div>
  );
}
