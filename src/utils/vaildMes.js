export const vaildResponse = (response) => {
    if (response && response.data && response.code === 0) {
        return true
    }
    return false
}

export const vaildCodeResponse = (response) => {
    if (response && response.code === 0) {
        return true
    }
    return false
}
