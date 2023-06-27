const CONFIG = {}
Object.keys(import.meta.env).forEach(key => {
  const matches = /(VITE)_(.*)/.exec(key)

  if (matches) {
    const configKey = matches[2]

    CONFIG[configKey] = import.meta.env[key]
  }
})

export default CONFIG
