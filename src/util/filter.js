// 隐私处理手机号码
export const encryptionPhone = phone => {
  const result = Array.from(phone);
  result.splice(3, 4, '*', '*', '*', '*')
  return result.join('')
}