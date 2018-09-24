export default session => {
  let result = null

  try {
    if (session && session.getSession && !session.loading) {
      const {
        impersonable,
        adminUserEmail,
        impersonate: { profile },
      } = session.getSession

      result = {
        canImpersonate: impersonable,
        attendantEmail: adminUserEmail,
      }

      if (profile) {
        const { document, firstName, lastName, phone, email } = profile
        result.client = {
          phone,
          email,
          document,
          name: `${firstName} ${lastName}`,
        }
      }
    }
  } catch (error) {
    console.error(error)
  }

  return result
}
