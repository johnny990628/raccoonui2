export const registerUser = async ({ accessToken, userData }) => {
    const registerResponse = await fetch(process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_REGISTER_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData),
    })
    return registerResponse
}
