export default {
  title: "saber",
  logo: "S",
  key: 'saber',//配置主键,目前用于存储
  indexTitle: 'Saber Admin',
  clientId: 'saber', // 客户端id
  clientSecret: 'saber_secret', // 客户端密钥
  tenantMode: false, // 是否开启租户模式
  tenantId: "000000", // 管理组租户编号
  captchaMode: true, // 是否开启验证码模式
  lockPage: '/lock',
  tokenTime: 3000,
  tokenHeader: 'Blade-Auth',
}