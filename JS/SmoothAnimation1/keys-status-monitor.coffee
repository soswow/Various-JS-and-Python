keysStatusMonitor = (keysMap) ->
  keysState = {}
  keysState[v] = false for k, v of keysMap

  window.addEventListener  'keydown', (event) ->
    key = keysMap[event.keyCode]
    unless keysState[key]
      keysState[key] = true if key
    
  window.addEventListener  'keyup', (event) ->
    key = keysMap[event.keyCode]
    if keysState[key]
      keysState[key] = false if key  

  return keysState

exports = window unless exports
exports.keysStatusMonitor = keysStatusMonitor