import { auth } from "@/config/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { UseLogin } from "../../../package/function/auth/use-login"
import { useRouter } from "next/router"
import { UseGetCartUserUid } from "../../../package/function/cart/use-get-user"
import { Dialog } from "@mui/material"
const userInit = {
  cart: null,
  setCart: cart => {},
  openLoading: false,
  setOpenLoading: openLoading => {}
}
export const UserContext = createContext(userInit)

export default function AuthProvider({ children }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const openLoading = open
  const setOpenLoading = openLoading => {
    setOpen(openLoading)
  }

  const [currentCart, setCurrentCart] = useState(null)
  const cart = currentCart
  const setCart = cart => {
    setCurrentCart(cart)
  }
  const handleChange = async currentUser => {
    try {
      if (currentUser !== null) {
        const user = await UseLogin({ userUid: currentUser.uid })
        if (user.data?.userRole === 1) router.push("/admin")
        if (user.data !== null) {
          setOpenLoading(true)
          const data = await UseGetCartUserUid({
            userUid: currentUser.uid
          })
          setCart(data.data)
        }
      } else {
        setCart(null)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setOpenLoading(false)
    }
  }
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, currentUser => {
      handleChange(currentUser)
    })
    return () => {
      unSubscribe()
    }
  }, [])
  return (
    <UserContext.Provider
      value={{ cart, setCart, openLoading, setOpenLoading }}
    >
      <Dialog open={open} />
      {children}
    </UserContext.Provider>
  )
}
