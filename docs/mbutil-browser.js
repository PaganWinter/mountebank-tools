class Imposter {
  constructor(options) {
    this.imposter = {}
    this.imposter.name = options.name
    this.imposter.port = options.port
    this.imposter.protocol = options.protocol || 'http'
    if (options.defaultResponse) this.imposter.defaultResponse = options.defaultResponse
    this.imposter.stubs = []
  }
  addStub(stub) {
    this.imposter.stubs.push(stub)
  }
  export() {
    return this.imposter
  }
}

createStub = function(stubData) {
  let stub = {}
  stub.predicates = []
  stub.responses = []

  let pathPattern = stubData.path
  pathPattern = pathPattern.replace(/\{[^}]+\}/g, '[^/]+')
  pathPattern = `^${pathPattern}$`

  // adding predicates
  stub.predicates.push({ 'equals': { 'method': stubData.method } })
  stub.predicates.push({ 'matches': { 'path': pathPattern } })
  if (stubData.request) stub.predicates.push({ 'equals': stubData.request })

  // adding responses
  stubData.responses.forEach(function(response) {
    stub.responses.push({ is: response })
  })
  return stub
}

var mbutil = { Imposter, createStub }
