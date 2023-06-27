"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, ReactNode, useRef } from "react";

const Modal = ({ children }: { children: ReactNode }) => {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === overlay.current) {
      router.back();
    }
  };
  const handleClose = (e: MouseEvent) => {
    e.stopPropagation();
    router.back();
  };
  return (
    <div ref={overlay} className="modal" onClick={handleClickOutside}>
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-0 right-0 p-2 m-2"
      >
        <Image src="/close.svg" alt="Close" width={17} height={17} />
      </button>

      <div ref={wrapper} className="modal_wrapper">
        {children}
      </div>
    </div>
  );
};

export default Modal;
