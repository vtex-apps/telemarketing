export default session => {
  let result = null

  if (session && !session.loading) {
    const {
      impersonable,
      adminUserEmail,
      impersonate: { profile },
    } = session

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

  return result
}
