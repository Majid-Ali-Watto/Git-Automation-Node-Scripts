export function getUcNumber(a) {
    return a.split('_').filter((part) => /[0-9]/.test(part)).map((m) => Number(m.replace('uc', '')))
}