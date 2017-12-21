export default ({ listOfPermissions, store, prefetch }) => {
  const connect = (fn) => (nextState, replaceState) => fn(store, nextState, replaceState)

  function onEnterChain(...listOfOnEnters) {
    return (nextState, replace, onEnterCb) => {
      let redirected = false
      const wrappedReplace = (...args) => {
        replace(...args)
        redirected = true
      }
      async.eachSeries(listOfOnEnters, (onEnter, callback) => {
        if (!redirected) {
          const result = onEnter(store, nextState, wrappedReplace)
          if (isPromise(result)) return result.then(() => callback(), callback)
        }
        callback()
      }, err => {
        if (err) return onEnterCb(err)
        onEnterCb()
        prefetch()
      })
    }
  }

  /*function prefetchIfNeeded() {
    return prefetch().then(() => )
  }*/

  /*function checkPermissions(chainedPermissions) {
    return prefetch().then(() => chainedPermissions)
  }*/

  function enterPermissions() {
    const permissions = listOfPermissions.map(perm => perm.onEnter || perm)
    return connect(onEnterChain(...permissions))
  }

  return (component = (props) => props.children) => ({
    onEnter: enterPermissions(),
    getComponent: () => listOfPermissions.reduceRight(
      (prev, next) => next(prev),
      component
    )
  })
}
