import Cryptr from 'cryptr'

export function encrypt(text) {
    const secreKey = process.env.NEXTAUTH_SECRET
    const cryptr = new Cryptr(secreKey)

    const encryptedString = cryptr.encrypt(text)
    return encryptedString
}

export function decrypt(encryptedString) {
    const secreKey = process.env.NEXTAUTH_SECRET
    const cryptr = new Cryptr(secreKey)

    const text = cryptr.decrypt(encryptedString)
    return text
}
