"use client";
import { Fade, Slide } from "@mui/material";
import { useState, ReactNode } from "react";
import { Language } from "@/types/language";
import { useRef } from "react";
import { Button } from "react-aria-components";
import { CgMenuGridR } from "react-icons/cg";

export default function Menu({
  children,
  language,
}: {
  children: ReactNode[] | ReactNode;
  language: Language;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function handleChange(e: any) {
    setIsOpen((isOpen) => !isOpen);
  }

  return (
    <div className="flex h-full" ref={containerRef}>
      <Fade in={isOpen}>
        <div
          onClick={handleChange}
          className="absolute top-0 bottom-0 left-0 right-0 min-w-screen w-screen h-screen min-h-screen bg-black/[0.0] -z-20"
        />
      </Fade>
      <div className="my-auto z-10">
        <Button
          aria-haspopup="menu"
          aria-expanded={isOpen}
          aria-controls="main-menu"
          aria-label={
            isOpen
              ? {
                  no: "Lukk meny",
                  en: "Close meny",
                }[language]
              : {
                  no: "Åpne meny",
                  en: "Open menu",
                }[language]
          }
          onPress={handleChange}
          className="*:text-white focus:outline-none flex"
        >
          <CgMenuGridR size={35} />
        </Button>
      </div>
      <Slide direction="down" in={isOpen} container={containerRef.current}>
        <div
          id="main-menu"
          className="absolute flex top-32 lg:top-40 right-0 -z-10 rounded-b"
        >
          {children}
        </div>
      </Slide>
    </div>
  );
}
