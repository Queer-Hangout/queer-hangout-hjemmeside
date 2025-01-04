"use client";

import { useState, useRef, ReactNode } from "react";
import { LabelAriaProps, useLabel } from "react-aria";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from "react-aria-components";
import { FaAngleDown } from "react-icons/fa";

interface Option<T> {
  value: T;
  label: string;
}

interface SelectorProps<T> extends LabelAriaProps {
  innerLabel?: ReactNode;
  options: Option<T>[];
  defaultValue?: T;
  onSelect?: (event: { value: T; label: string }) => void;
  classes?: {
    select?: string;
    label?: string;
    option?: string;
    selectedOption?: string;
    button?: string;
    listBox?: string;
    popover?: string;
  };
}

export default function Selector<T>(props: SelectorProps<T>) {
  const { labelProps, fieldProps } = useLabel(props);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <Select
      {...fieldProps}
      ref={containerRef}
      defaultSelectedKey={props.options.findIndex(
        (option) => option.value == props.defaultValue
      )}
      className={`flex flex-row ${props.classes?.select || ""}`}
      onOpenChange={(open) => setIsOpen(open)}
      onSelectionChange={(key) =>
        props.onSelect ? props.onSelect(props.options[key as number]) : null
      }
    >
      {props.label ? (
        <Label
          className={`!h-full ${props.classes?.label || ""}`}
          {...labelProps}
        >
          {props.label}
        </Label>
      ) : null}
      <Button
        ref={buttonRef}
        className={`flex flex-row justify-between flex-grow rounded px-4 py-2 items-center bg-slate-800 text-white
          ${isOpen ? "rounded-b-none" : ""}
          ${props.classes?.button || ""}`}
      >
        {props.innerLabel || null}
        <SelectValue
          className={`flex !h-full w-full text-left ${
            props.classes?.selectedOption || ""
          }`}
        />
        <FaAngleDown
          className={`${
            isOpen ? "animate-flip-vertical" : "animate-flip-vertical-reverse"
          }`}
          size={15}
        />
      </Button>
      <Popover
        className={`flex flex-col absolute text-right bg-slate-800 text-white rounded-b ${
          props.classes?.popover || ""
        } ${isOpen ? "animate-fade-in" : "animate-fade-out"}`}
      >
        <div className="relative flex top-full">
          <ListBox
            className={`flex flex-col rounded-b ${
              props.classes?.listBox || ""
            }`}
            style={{
              minWidth: `${buttonRef.current?.offsetWidth}px`,
            }}
          >
            {props.options.map((option, index) => (
              <ListBoxItem
                id={index}
                key={option.label}
                textValue={option.label}
                className={`py-2 px-4 w-full ${props?.classes?.option || ""}`}
              >
                {option.label}
              </ListBoxItem>
            ))}
          </ListBox>
        </div>
      </Popover>
    </Select>
  );
}
