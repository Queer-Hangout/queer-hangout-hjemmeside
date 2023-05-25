import React, { useState } from "react"
import { Drawer, IconButton } from "@material-tailwind/react"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { RxHamburgerMenu } from "react-icons/rx"
import { Link } from "gatsby"

export default function MobileMenu({ pages }) {
  const [open, setOpen] = useState(false)
  const openDrawer = () => setOpen(true)
  const closeDrawer = () => setOpen(false)
  return (
    <div className="md:hidden flex">
      <IconButton
        id="menu-button"
        title="Menu"
        className="h-8 w-8 min-w-full my-auto"
        aria-haspopup={true}
        aria-controls="menu"
        onClick={open ? closeDrawer : openDrawer}
      >
        {!open ? (
          <RxHamburgerMenu className="h-full w-full" />
        ) : (
          <XMarkIcon className="h-full w-full" />
        )}
      </IconButton>

      <Drawer
        id="menu"
        open={open}
        onClose={closeDrawer}
        className={`${
          open ? "flex" : "hidden"
        } bg-slate-600 z-50 flex-col fixed top-0 left-0`}
        role="menu"
        aria-labelledby="menubutton"
      >
        <div className="flex justify-end mb-6">
          <IconButton
            id="close-menu-button"
            title="Close menu"
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
          >
            <XMarkIcon strokeWidth={2} className="h-8 w-8" />
          </IconButton>
        </div>
        {pages.map(page => (
          <Link
            className="hover:underline text-xl text-center py-4"
            key={page.slug}
            to={page.slug}
          >
            {page.title}
          </Link>
        ))}
      </Drawer>
    </div>
  )
}
