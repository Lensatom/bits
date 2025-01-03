export const getSavedUsername = () => {
  return localStorage.getItem('username')
}

export const saveUsername = (username: string) => {
  localStorage.setItem('username', username)
}