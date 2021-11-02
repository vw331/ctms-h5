export const isPicture = path => {
  try {
    const name = path.split('/').pop()
    const suffix = name.split('.').pop()
    return ['jpg', 'png', 'gif', 'jpeg'].includes(suffix.toLowerCase()) 
  }catch(err){
    return false
  }
}