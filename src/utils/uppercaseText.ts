export const uppercaseWord = (text: string) =>
  text.charAt(0).toUpperCase() + text.slice(1)

export const uppercaseWholeText = (text: string) => {
  const splitedText = text.split(' ')
  const uppercasedWords = splitedText.map(uppercaseWord)

  return uppercasedWords.join(' ')
}
