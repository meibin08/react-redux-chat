
class storage {

  constructor(props) {
    this.props = props || {}
    this.source = this.props.source || window.localStorage
  }

  get(key) {
    const data = this.source,
          timeout = data[`${key}__expires__`]

    // 过期失效
    if (new Date().getTime() >= timeout) {
      this.remove(key)
      return;
    }

    const value = data[key]
                ? JSON.parse(data[key])
                : data[key]
    return value
  }

  // 设置缓存
  // timeout：过期时间（分钟）
  set(key, value, timeout) {
    let data = this.source
    data[key] = JSON.stringify(value)
    if (timeout)
      data[`${key}__expires__`] = new Date().getTime() + 1000*60*timeout
    return value
  }

  remove(key) {
    let data = this.source,
        value = data[key]
    delete data[key]
    delete data[`${key}__expires__`]
    return value
  }

}

module.exports = storage