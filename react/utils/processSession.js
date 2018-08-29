export default session => {
  const {
    impersonable,
    adminUserEmail,
    impersonate: { profile },
  } = session

  const result = {
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

  return result
}
