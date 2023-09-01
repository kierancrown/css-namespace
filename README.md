# CSS Namespace

This utility takes a css file (input) and prefixes (namespaces) the css rules with a selector.

## Why

I was trying to contain the Tailwind CSS library styles within a container. I couldn't see a easy way to prepend every css rule with my `#app` selector. So I decided to write this small utility to get the job done.

## Running

You can run this by either installing this package as a dev dependency or by using npx.

### Install as a dev dependency

```bash
npm install --save-dev css-container
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
