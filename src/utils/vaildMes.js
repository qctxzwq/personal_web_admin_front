export const vaildResponse = (response) => {
    if (response && response.data && response.code === 0) {
        return true
    }
    return false
}
