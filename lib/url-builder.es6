class UrlBuilder {
  constructor (url) {
    this.parseUrlFromString(url) if url
  }

  parseHostAndPortFromUrl() {
    if (match = this.matchAndRemove(/^([A-z\d-\.]+)(|:(\d+))($|\/)/)) {
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
    if (match = this.matchAndRemove(/^([^\?]+)/)) {
      this.path = "/" + match[1]
    } else {
      this.path = ""
    }
  }

  parseProtocolFromUrl() {
    if (match = this.matchAndRemove(/^(.+?):\/\//)) {
      this.protocol = match[1]
    }
  }

  parseQueryParametersFromUrl() {
    this.queryParameters = {}

    if (this.matchAndRemove(/^\?/)) {
      pairs = @url.split("&")

      for(pair in pairs) {
        if (match = pair.match(/^(.+?)=(.+)$/)) {
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
    url = this.protocol + "://" + this.host

    if (this.portSpecified) {
      url += ":" + this.port
    }

    url += "/" + this.path

    if (this.hasQueryParameters()) {
      url += "?"
      url += this.queryParametersAsString()
    }

    return url
  }

  pathWithQueryParameters() {
    generatedPath = this.path

    if (this.hasQueryParameters()) {
      generatedPath += "?"
      generatedPath += this.queryParametersAsString()
    }

    return generatedPath
  }

  matchAndRemove(regex) {
    if (match = this.url.match(regex)) {
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
    queryParametersString = ""
    first = true

    for(key in this.queryParameters) {
      value = this.queryParameters[key]

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
