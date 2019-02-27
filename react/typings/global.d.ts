interface Session {
  loading: boolean
  refetch: () => void
  getSession: {
    adminUserEmail: string
    adminUserId: string
    impersonable: boolean
    profile: Profile
    impersonate: {
      storeUserId: string
      storeUserEmail: string
      profile: Profile
    }
  }
}

interface ProcessedSession {
  attendantEmail: string
  canImpersonate: boolean
  client?: Client
}

interface Profile {
  document: string
  phone: string
  firstName: string
  lastName: string
  email: string
}

interface Client {
  document: string
  phone: string
  name: string
  email: string
}
