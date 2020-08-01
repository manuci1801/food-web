const clearToken = (isAdmin) => {
  localStorage.removeItem('token')
  if (isAdmin)
    window.location.href = '/admin/login'
  else
    window.location.href = '/login'
}

export default clearToken