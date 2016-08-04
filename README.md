# UrlBuilder

## Usage

Start by making a new object with any given URL

```coffeescript
urlb = new UrlBuilder.new(window.location.href)
```

### Manipulate a query parameter

```coffeescript
urlb.queryParameters["someParameter"] = "newValue"
```

### Generate a new URL

```coffeescript
urlb.generateFullUrl() #=> "http://localhost:3000/?someParameter=newValue"
```

### Generate the path with query parameters

```coffeescript
urlb.pathWithQueryParameters #=> "/?someParameter=newValue"
```
