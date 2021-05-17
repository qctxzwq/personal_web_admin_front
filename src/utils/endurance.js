// 数据持久化(localstorage)
export const EnduranceToLocal = (name, data) => {
    localStorage.setItem(name, JSON.stringify(data))
}

// 获取数据(localstorage)
export const GetEnduranceToLocal = (name) => {
    let result = localStorage.getItem(name)
    return JSON.parse(result)
}

// 删除(localstorage)
export const DelEnduranceToLocal = (name) => {
    localStorage.removeItem(name)
}

// 数据持久化(session)
export const EnduranceToSession = (name, data) => {
    sessionStorage.setItem(name, JSON.stringify(data))
}

// 获取数据(session)
export const GetEnduranceToSession = (name) => {
    let result = sessionStorage.getItem(name)
    return JSON.parse(result)
}

// 删除(session)
export const DelEnduranceToSession = (name) => {
    sessionStorage.removeItem(name)
}