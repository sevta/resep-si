/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useUser from "hooks/useUser";
import Link from "next/link";
import Router from "next/router";
import { logout } from "services";

export default function LayoutAuth({ children }) {
  const { mutate } = useUser();

  async function handleLogout() {
    await logout();
    mutate(null);
    Router.replace("/");
  }

  return (
    <div
      data-theme="emerald"
      className="rounded-lg font-inter min-h-screen shadow bg-base-300 drawer drawer-mobile h-52"
    >
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="flex flex-col drawer-content">
        <label
          htmlFor="my-drawer-2"
          className="mb-4 btn btn-primary drawer-button lg:hidden"
        >
          open menu
        </label>
        <div className="hidden lg:block">
          <TopPanel />
          <div className="mt-24 px-10">{children}</div>
        </div>
        <div className="text-xs text-center lg:hidden">
          Menu can be toggled on mobile size.
          <br />
          Resize the browser to see fixed sidebar on desktop size
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-64 text-sm font-medium bg-base-100 text-base-content shadow-xl">
          <li>
            <a className="text-3xl font-bold tracking-tighter">Stravelgo.</a>
          </li>
          <li>
            <Link href="/" passHref>
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/template" passHref>
              <a>Template</a>
            </Link>
          </li>
          <li>
            <a onClick={handleLogout}>logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

function TopPanel() {
  return (
    <div className="navbar mb-2 shadow-lg shadow-base-content/5 fixed top-0 left-0 w-full z-50 bg-base-100">
      <div className="flex-none hidden lg:flex">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1 hidden px-2 mx-2 lg:flex">
        <span className="text-lg font-bold">daisyUI</span>
      </div>
      <div className="flex-1 lg:flex-none">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-ghost"
          />
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-none">
        <div className="avatar">
          <div className="rounded-full w-10 h-10 m-1">
            <img src="https://i.pravatar.cc/500?img=32" />
          </div>
        </div>
      </div>
    </div>
  );
}
