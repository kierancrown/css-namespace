# CSS Namespace

This utility takes a css file (input) and prefixes (namespaces) the css rules with a predefined selector.

## Why

I needed to add a selector to every single rule in a large CSS file post build. I couldn't find anything that did what I needed, so I built it!

## Running

You can run this by either installing this package as a dev dependency or by using npx.

### Install as a dev dependency

```bash
npm install --save-dev css-namespace
```

You can then add a script to your package.json file to run the utility.

```json
{
    "scripts": {
        "build-css": "css-namespace -i ./src/styles.css -s #app -w"
    }
}
```

### Using npx

```bash
npx css-container -i ./src/styles.css -s #app -w
```

### Command Line Args

| Argument  | Alias | Type    | Default Value  | Description                                         |
| --------- | ----- | ------- | -------------- | --------------------------------------------------- |
| verbose   | v     | Boolean | false          | Enable verbose mode for detailed output.            |
| input     | i     | String  |                | Specify the input file or data source.              |
| selector  | s     | String  |                | Define a selector for filtering data.               |
| output    | o     | String  | './output.css' | Specify the output file or destination.             |
| overwrite | w     | Boolean | false          | Overwrite the original css file (output is ignored) |
| pretty    |       | Boolean | false          | Enable pretty formatting for the output data.       |
