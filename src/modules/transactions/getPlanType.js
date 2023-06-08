export const getPlanType = (str) => {
    const regex = /×\s([^(\s]+)/
    const match = str?.match(regex)
    const extractedPlanName = match ? match[1] : ''
    return extractedPlanName
}