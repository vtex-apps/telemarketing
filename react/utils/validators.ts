/**
 * @export
 * @description regex to format document
 * @param {string} text - CPF or CNPJ
 * @returns text formatted
 */
export function formatDocument(text: string) {
    text = text.replace(/\D/g, '')
  
    if (text.length <= 11) {
      text = text.replace(/(\d{3})(\d)/, '$1.$2')
      text = text.replace(/(\d{3})(\d)/, '$1.$2')
      text = text.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    } else {
      text = text.replace(/^(\d{2})(\d)/, '$1.$2')
      text = text.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      text = text.replace(/\.(\d{3})(\d)/, '.$1/$2')
      text = text.replace(/(\d{4})(\d)/, '$1-$2')
    }
  
    if (text.length > 18) {
      text = text.substring(0, text.length - 1)
    }
  
    return text
  }