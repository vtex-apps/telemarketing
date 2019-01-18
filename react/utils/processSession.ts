export default (session: Session): ProcessedSession | null => {
  try {
    if (session && session.getSession && !session.loading) {
      const {
        impersonable,
        adminUserEmail,
        impersonate: { profile },
      } = session.getSession

      if (profile) {
        const { document, firstName, lastName, phone, email } = profile

        return {
          attendantEmail: adminUserEmail,
          canImpersonate: impersonable,
          client: {
            document,
            email,
            name: `${firstName} ${lastName}`,
            phone,
          },
        }
      } else {
        return {
          attendantEmail: adminUserEmail,
          canImpersonate: impersonable,
        }
      }
    }
  } catch (error) {
    console.error(error)
  }

  return null
}
