import React from "react"
import HeaderLogo from "./header-logo"
import { Navbar } from "@material-tailwind/react"
import Menu from "./menu"

export default function Header() {
  return (
    <header className="flex flex-row h-36 min-w-screen w-full bg-slate-800">
      <Navbar className="bg-transparent flex flex-row justify-between lg:px-16 sm:px-4 px-4 min-w-full">
        <HeaderLogo className="my-auto" />
        <Menu />
      </Navbar>
    </header>
  )
}
