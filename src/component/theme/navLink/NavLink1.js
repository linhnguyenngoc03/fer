import Link from "next/link"
import React from "react"

const NavLink1 = ({ url, text }) => {
  return (
    <Link
      style={{
        cursor: "pointer",
        color: "black",
        textDecoration: "none"
      }}
      href={url}
    >
      {text}
    </Link>
  )
}

export default NavLink1
