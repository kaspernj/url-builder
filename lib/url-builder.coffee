class window.UrlBuilder
  constructor: (url) ->
    console.log "url: " + url

    this.parseUrlFromString(url) if url

  parseHostAndPortFromUrl: ->
    if match = this.matchAndRemove(/^([A-z\d-\.]+)(|:(\d+))($|\/)/)
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
    if match = this.matchAndRemove(/^([^\?]+)/)
      @path = "/" + match[1]
    else
      @path = ""

  parseProtocolFromUrl: ->
    if match = this.matchAndRemove(/^(.+?):\/\//)
      @protocol = match[1]

  parseQueryParametersFromUrl: ->
    @queryParameters = {}

    if this.matchAndRemove(/^\?/)
      pairs = @url.split("&")

      for pair in pairs
        if match = pair.match(/^(.+?)=(.+)$/)
          @queryParameters[match[1]] = match[2]

  parseUrlFromString: (url) ->
    @url = url

    this.parseProtocolFromUrl()
    this.parseHostAndPortFromUrl()
    this.parsePathFromUrl()
    this.parseQueryParametersFromUrl()

  generateFullUrl: ->
    url = @protocol + "://" + @host

    if @portSpecified
      url += ":" + @port

    url += "/" + @path

    if this.hasQueryParameters()
      url += "?"
      url += this.queryParametersAsString()

    url

  pathWithQueryParameters: ->
    generatedPath = @path

    if this.hasQueryParameters()
      generatedPath += "?"
      generatedPath += this.queryParametersAsString()

    generatedPath

  matchAndRemove: (regex) ->
    if match = @url.match(regex)
      @url = @url.replace(regex, "")
      return match
    else
      return false

  # Returns true if any query parameters has been saved
  hasQueryParameters: ->
    if @queryParameters && Object.keys(@queryParameters).length > 0
      true
    else
      false

  # Returns a hash containing the query parameters
  queryParameters: ->
    @queryParameters

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
