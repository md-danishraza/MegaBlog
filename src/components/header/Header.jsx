import React from "react";
import { useState } from "react";
import Logo from "../Logo";
import Logout from "./Logout";

import Container from "../Container";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { BsMenuButtonWide } from "react-icons/bs";
import { IoClose } from "react-icons/io5";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 shadow bg-[#241b35]">
      <Container>
        <nav className="flex items-center justify-between">
          <div className="mr-4">
            <NavLink to="/">
              <Logo />
            </NavLink>
          </div>
          {/* Menu Button for Small Devices */}
          <button
            className="text-white text-2xl md:hidden "
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <BsMenuButtonWide className="cursor-pointer" />
          </button>

          {/* Navigation Items */}
          <ul
            className={`fixed z-100 top-0 left-0 w-full h-full bg-[#342a45] text-white flex flex-col items-center justify-center space-y-6 transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 md:static md:flex md:flex-row md:justify-end md:space-y-0 md:space-x-4 md:bg-transparent md:translate-x-0`}
          >
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    onClick={() => {
                      setIsMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `inline-block px-6 py-2 duration-200 rounded-full cursor-pointer ${
                        isActive ? "bg-[#6c35de]" : "hover:bg-[#6c35de]"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <Logout />
              </li>
            )}
            <IoClose
              className="md:hidden absolute top-8 right-8 text-3xl cursor-pointer hover:bg-[#6c35de]"
              onClick={() => setIsMenuOpen(false)}
            />
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
