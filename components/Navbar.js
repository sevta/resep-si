import useUser from "hooks/useUser";
import Link from "next/link";
import Router from "next/router";
import { logout } from "services";

export default function Navbar() {
  const { user, mutate } = useUser();

  async function handleLogout() {
    await logout();
    mutate(null);
    Router.replace("/");
  }

  return (
    <div className="flex justify-between items-center">
      <div className="text-3xl font-bold tracking-tighter">Stravelgo.</div>
      <div className="flex items-center justify-center space-x-10 text-sm">
        <Link href="/" passHref>
          <div className="link link-hover text-sm font-medium">home</div>
        </Link>
        <Link href="/template" passHref>
          <div className="link link-hover text-sm font-medium">Template</div>
        </Link>

        <div
          className="link link-hover text-sm font-medium"
          onClick={handleLogout}
        >
          Logout
        </div>
      </div>
    </div>
  );
}
