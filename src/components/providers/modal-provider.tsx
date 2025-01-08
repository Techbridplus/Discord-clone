"use client";

import React, { useEffect, useState } from "react";



export function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* <Modal /> */}
    </>
  );
}
