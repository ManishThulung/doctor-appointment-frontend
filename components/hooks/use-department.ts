"use client";

import { useEffect, useRef, useState } from "react";

export const useDepartment = () => {
  const [activeNavIndex, setActiveNavIndex] = useState<null | number>(null);

  const cloudPhoneElement: any = useRef();
  const virtualCallCenterElement: any = useRef();
  const massMailingElement: any = useRef();
  const customerServiceElement: any = useRef();
  const smsAutomationElement: any = useRef();
  const functionalityRefs = [
    cloudPhoneElement,
    virtualCallCenterElement,
    massMailingElement,
    customerServiceElement,
    smsAutomationElement,
  ];

  useEffect(() => {
    window.addEventListener("scroll", chooseActiveNavItemIndex);
    return () => {
      window.removeEventListener("scroll", chooseActiveNavItemIndex);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getHeightRange = (element: HTMLElement) =>
    element?.offsetTop + cloudPhoneElement.current?.scrollHeight / 2;

  const chooseActiveNavItemIndex = () => {
    let windowHeight = window?.scrollY;
    const cloudPhoneHeightRange = getHeightRange(cloudPhoneElement?.current);
    const virtualCallCenterHeightRange = getHeightRange(
      virtualCallCenterElement?.current
    );
    const massMailingHeightRange = getHeightRange(massMailingElement?.current);
    const customerServiceHeightRange = getHeightRange(
      customerServiceElement?.current
    );
    const smsAutomationHeightRange = getHeightRange(
      smsAutomationElement?.current
    );

    if (windowHeight < cloudPhoneHeightRange) setActiveNavIndex(0);
    if (
      windowHeight > cloudPhoneHeightRange &&
      windowHeight < virtualCallCenterHeightRange
    )
      setActiveNavIndex(1);
    if (
      windowHeight > virtualCallCenterHeightRange &&
      windowHeight < massMailingHeightRange
    )
      setActiveNavIndex(2);
    if (
      windowHeight > massMailingHeightRange &&
      windowHeight < customerServiceHeightRange
    )
      setActiveNavIndex(3);
    if (
      windowHeight > customerServiceHeightRange &&
      windowHeight < smsAutomationHeightRange
    )
      setActiveNavIndex(4);
  };

  return { activeNavIndex, functionalityRefs };
};
