class window.UrlBuilder
  parseHostAndPortFromUrl: ->
    if match = this.matchAndRemove(/^([A-z\d-\.]+\.([A-z]+))(|:(\d+))/)
      @host = match[1]

      if match[3]
        @port = parseInt(match[3])
        @portSpecified = true
      else
        if @protocol == "https"
          @port = 443
        else
          @port = 80

  parsePathFromUrl: ->
    if match = this.matchAndRemove(/^\/([^\?]+)/)
      @path = match[1]
    else
      @path = ""

  parseProtocolFromUrl: ->
    if match = this.matchAndRemove(/^(.+?):\/\//)
      @protocol = match[1]
    else
      console.log("Couldnt find protocol from: " + url)

  parseQueryParametersFromUrl: ->
    @queryParameters = {}

    if this.matchAndRemove(/^\?/)
      pairs = @url.split("&")

      for pair in pairs
        if match = pair.match(/^(.+?)=(.+)$/)
          @queryParameters[match[1]] = match[2]

    console.log("queryParametersInParseQueryParametersFromUrl: " + @queryParameters)

  parseUrlAsString: (url) ->
    @url = url

    this.parseProtocolFromUrl()
    this.parseHostAndPortFromUrl()
    this.parsePathFromUrl()
    this.parseQueryParametersFromUrl()

    console.log("queryParametersInParseUrlAsString: " + @queryParameters)
    console.log("Rest of URL: " + @url)
    console.log("FullURL: " + this.generateFullUrl())

  generateFullUrl: ->
    console.log("queryParametersInGenerateFullUrl: " + @queryParameters)
    console.log("protocolInGenerateFullUrl: " + @protocol)

    url = @protocol + "://" + @host

    if @portSpecified
      url += ":" + @port

    url += "/" + @path

    if hasQueryParameters()
      url += "?"
      url += queryParametersAsString()

    url

  hasQueryParameters = ->
    console.log("queryParametersInHasQueryParameters: " + @queryParameters)

    if @queryParameters && Object.keys(@queryParameters).length > 0
      true
    else
      false

  matchAndRemove: (regex) ->
    if match = @url.match(regex)
      @url = @url.replace(regex, "")
      return match
    else
      return false

  queryParametersAsString: ->
    queryParametersString = ""
    first = true

    for key, value of @queryParameters
      if first
        first = false
      else
        queryParametersString += "&"

      queryParametersString += key + "=" + value

    queryParametersString
