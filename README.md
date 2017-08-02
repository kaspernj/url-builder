# UrlBuilder

## Usage

Start by making a new object with any given URL

```js
var urlb = new UrlBuilder.new(window.location.href)
```

### Manipulate a query parameter

```js
urlb.queryParameters["someParameter"] = "newValue"
```

### Generate a new URL

```js
urlb.generateFullUrl() #=> "http://localhost:3000/?someParameter=newValue"
```

### Generate the path with query parameters

```js
urlb.pathWithQueryParameters #=> "/?someParameter=newValue"
```
