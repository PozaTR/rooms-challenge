module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/styles/_config.scss";`
      }
    }
  }
}
