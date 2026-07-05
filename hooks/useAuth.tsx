import { useRouter } from 'next/router'
import { createContext, useContext, useMemo, useState } from 'react'

interface IUser {
  uid: string
}

interface IAuth {
  user: IUser | null
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
  loading: boolean
}

const AuthContext = createContext<IAuth>({
  user: null,
  signUp: async () => {},
  signIn: async () => {},
  logout: async () => {},
  error: null,
  loading: false,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const [loading] = useState(false)
  const [error] = useState<string | null>(null)

  // Temporary Phase 1 placeholder.
  // This will become Nebula Device Identity in Milestone 1.3.
const [user, setUser] = useState<IUser | null>({
  uid: "temporary-device",
})

  const signUp = async () => {
    router.push("/")
  }

  const signIn = async () => {
    router.push("/")
  }

  const logout = async () => {
    setUser(null)
    router.push("/login")
  }

  const value = useMemo(
    () => ({
      user,
      signUp,
      signIn,
      logout,
      error,
      loading,
    }),
    [user, loading, error]
  )

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
