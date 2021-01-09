export const bindWithFalse = (fun: (status: false) => void): (() => void) => {
    return fun.bind(null, false)
}

export const bindWithTrue = (fun: (status: true) => void): (() => void) => {
    return fun.bind(null, true)
}

export default {
    bindWithFalse,
    bindWithTrue
}
