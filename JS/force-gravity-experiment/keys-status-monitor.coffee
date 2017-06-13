keysStatusMonitor = (keysMap) ->
  keysState = {}
  keysState[v] = false for k, v of keysMap

  window.addEventListener  'keydown', (event) ->
    key = keysMap[event.keyCode]
    if key and not keysState[key]
      console.log('press down ->', key)
      keysState[key] = true
    
  window.addEventListener  'keyup', (event) ->
    key = keysMap[event.keyCode]
    if key and keysState[key]
      console.log('press up ->', key)
      keysState[key] = false

  return keysState

exports = window unless exports
exports.keysStatusMonitor = keysStatusMonitor