module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "profile/" // 如果是个人页面，设置为 '/'
      : "/",
};
