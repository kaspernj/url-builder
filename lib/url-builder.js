class UrlBuilder {
  constructor(url) {
    if (url) {
      this.parseUrlFromString(url)
    }
  }

  parseHostAndPortFromUrl() {
    var match = this.matchAndRemove(/^([A-z\d-\.]+)(|:(\d+))($|\/)/)

    if (match) {
      this.host = match[1]

      if (match[3]) {
        this.port = parseInt(match[3])
        this.portSpecified = true
      } else {
        if (this.protocol == "https") {
          this.port = 443
        } else {
          this.port = 80
        }
      }
    }
  }

  parsePathFromUrl() {
    var match = this.matchAndRemove(/^([^\?]+)/)

    if (match) {
      this.path = "/" + match[1]
    } else {
      this.path = ""
    }
  }

  parseProtocolFromUrl() {
    var match = this.matchAndRemove(/^(.+?):\/\//)

    if (match) {
      this.protocol = match[1]
    }
  }

  parseQueryParametersFromUrl() {
    this.queryParameters = {}

    if (this.matchAndRemove(/^\?/)) {
      var pairs = this.url.split("&")

      for(var pair in pairs) {
        var match = pair.match(/^(.+?)=(.+)$/)
        if (match) {
          this.queryParameters[match[1]] = match[2]
        }
      }
    }
  }

  parseUrlFromString(url) {
    this.url = url

    this.parseProtocolFromUrl()
    this.parseHostAndPortFromUrl()
    this.parsePathFromUrl()
    this.parseQueryParametersFromUrl()
  }

  generateFullUrl() {
    var url = this.protocol + "://" + this.host

    if (this.portSpecified) {
      url += ":" + this.port
    }

    url += this.path

    if (this.hasQueryParameters()) {
      url += "?"
      url += this.queryParametersAsString()
    }

    return url
  }

  pathWithQueryParameters() {
    var generatedPath = this.path

    if (this.hasQueryParameters()) {
      generatedPath += "?"
      generatedPath += this.queryParametersAsString()
    }

    return generatedPath
  }

  matchAndRemove(regex) {
    var match = this.url.match(regex)

    if (match) {
      this.url = this.url.replace(regex, "")
      return match
    } else {
      return false
    }
  }

  // Returns true if any query parameters has been saved
  hasQueryParameters() {
    if (this.queryParameters && Object.keys(this.queryParameters).length > 0) {
      return true
    } else {
      return false
    }
  }

  // Returns a hash containing the query parameters
  queryParameters() {
    this.queryParameters
  }

  queryParametersAsString() {
    var queryParametersString = ""
    var first = true

    for(var key in this.queryParameters) {
      var value = this.queryParameters[key]

      if (first) {
        first = false
      } else {
        queryParametersString += "&"
      }

      queryParametersString += key + "=" + value
    }

    return queryParametersString
  }
}
