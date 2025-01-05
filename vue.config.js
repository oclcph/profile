module.exports = {
  publicPath:
    process.env.NODE_ENV === "production"
      ? "/oclcph.github.io/" // 如果是个人页面，设置为 '/'
      : "/",
};
