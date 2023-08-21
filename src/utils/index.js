export const truncatedString = (text) => {
    const truncatedText = text.length > 25 ? `${text.slice(0, 30)}...` : text
    return truncatedText
}

export const getPlanType = (str) => {
    const regex = /×\s([^(\s]+)/
    const match = str?.match(regex)
    const extractedPlanName = match ? match[1] : ''
    return extractedPlanName
}