import React, { useRef, useEffect } from "react"

export const CheckInView = ({ setIsVisible, children }) => {
  const elementRef = useRef(null)
  useEffect(() => {
    const checkIfVisible = () => {
      const element = elementRef.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const isVisible =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
      setIsVisible(isVisible)
    }

    window.addEventListener("scroll", checkIfVisible)
    window.addEventListener("resize", checkIfVisible)

    // Kiểm tra lần đầu khi component được mount
    checkIfVisible()

    // Cleanup listener khi component unmount
    return () => {
      window.removeEventListener("scroll", checkIfVisible)
      window.removeEventListener("resize", checkIfVisible)
    }
  }, [])

  return <div ref={elementRef}>{children}</div>
}