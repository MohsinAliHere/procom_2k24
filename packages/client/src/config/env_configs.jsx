const env_variables = import.meta.env

const {VITE_APP_API_URL} = env_variables

console.log(VITE_APP_API_URL)


export {
    VITE_APP_API_URL
}