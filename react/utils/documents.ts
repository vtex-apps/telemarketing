import { TGetDocument } from "../typings/document"

/**
 * @export
 * @description Get document MDv1
 * @param {TGetDocument} data The data CPF or CNPJ
 * @returns  The e-mail of the user
 */
export async function getDocument(data: TGetDocument) {
  const response = await fetch('/_v/private/cldata', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const { email } = await response.json()

  return email
}

/**
 * @export
 * @description Validate e-mail or documents
 * @param {String} emailOrDocuments E-mail, CPF or CNPJ
 * @returns E-mail of the user
 */
export const getUserEmail = async (emailOrDocuments: string) => {
  if (/^.*@.*\..*$/.test(emailOrDocuments)) {
    return emailOrDocuments
  }
  const documentDigits = emailOrDocuments.replace(/[\/.-]/g, '')

  const item =
    documentDigits.length === 11
      ? { document: documentDigits }
      : { corporateDocument: documentDigits }

  const email = await getDocument(item)

  if (email) {
    return email
  }

  return ''
}
