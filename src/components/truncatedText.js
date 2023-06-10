export const truncatedString = (text) => {
    const truncatedText = text.length > 30 ? `${text.slice(0, 30)}...` : text
    return truncatedText
}