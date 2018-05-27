
export function capitalize(str) {
  if(str.length > 0) return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function humanize(word, { capitalize:capt=true }={}) {
  if(word.length < 1) return word
  word = word.replace(/^_/, ``)
  word = word.replace(/_id$/, ``)
  word = word.replace(/(\s+|_)/g, ` `)
  word = word.trim()
  if (capt) word = capitalize(word)
  return word
}

export function titleize(str) {
  if(str.length < 1) return str
  return humanize(str).split(` `).map(word => capitalize(word)).join(` `)
}

export const truncate = (text, { omission=`...`, length: truncateAt=20, separator }={}) => {
  if(text.length < 1) return text
  const maximumLength = truncateAt - omission.length
  const stop = separator
    ? text.lastIndexOf(separator, maximumLength) || maximumLength
    : maximumLength
  return `${text.substring(0, stop)}${omission}`
}


function camelCase(str, upperCaseFirstLetter=true) {
    if(str.length < 1) return str
		if (upperCaseFirstLetter) str = capitalize(str)
    return str.replace(/[_.-](\w|$)/g, function (_,x) {
        return x.toUpperCase();
    });
}

export function pluralize(count_or_word, single_word, plural_word) {
  if (single_word===undefined) return pl(count_or_word)

  const count = count_or_word
  let word = count === 1 || /^1(\.0+)?$/.test(count) ? single_word : plural_word || pl(single_word)
  return `${count || 0} ${word}`
}