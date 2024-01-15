// components/common/Navbar.tsx
import React from "react";
import Link from "next/link";
const AuthNavbar = () => {
  return (
    <div className="navbar bg-red-600">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">My Website</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
          <li>
            <Link href="/forgotpassword">Forgotpassword</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default AuthNavbar;
