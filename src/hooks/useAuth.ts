import { useSession } from "next-auth/react"

export default function useAuth() {
  const { data: session } = useSession()
  let isLoggedIn: boolean = false
  let id: string = ""

  if (session) {
    isLoggedIn = true
    id = session.id
  }

  return {
    isLoggedIn,
    id
  }
}