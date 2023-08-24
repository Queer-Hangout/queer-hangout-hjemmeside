import React from "react"
import { IoChevronDownSharp, IoChevronUpSharp } from "react-icons/io5"

export default function AccordionArrow({ isOpen }) {
  const Icon = props =>
    isOpen ? <IoChevronUpSharp {...props} /> : <IoChevronDownSharp {...props} />
  return (
    <div className="flex h-full my-auto" aria-hidden="true">
      <Icon
        size={25}
        style={{
          margin: "auto",
        }}
      />
    </div>
  )
}
