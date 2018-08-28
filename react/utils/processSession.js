export default session => {
  const {
    adminUserEmail,
    impersonate: { storeUserId, storeUserEmail },
    impersonable,
    profile: { document, firstName, lastName, phone },
  } = session

  return {
    logged: storeUserId ? true : false,
    canImpersonate: impersonable,
    clientDocument: document || '',
    clientEmail: storeUserEmail || '',
    clientName: (firstName && `${firstName} ${lastName}`) || '',
    clientPhone: phone || '',
    attendantEmail: adminUserEmail,
  }
}
