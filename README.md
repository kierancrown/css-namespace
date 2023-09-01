# CSS Container

This utility takes a css file (input) and prefixes (contains) the css rules with a selector

## Why
I was trying to contain the Tailwind CSS library within a container. I couldn't see a easy way to prepend every css rule with my `#app` selector. So I decided to write this small utility to get the job done.

## Running
Clone this project and run `yarn` or `npm i`. Then run the program with `node`.

### Command Line Args
| Argument   | Alias | Type     | Default Value | Description                                      |
|------------|-------|----------|---------------|--------------------------------------------------|
| verbose    | v     | Boolean  | false         | Enable verbose mode for detailed output.         |
| input      | i     | String   |               | Specify the input file or data source.           |
| selector   | s     | String   |               | Define a selector for filtering data.            |
| output     | o     | String   |               | Specify the output file or destination.          |
| overwrite  | w     | Boolean  | false         | Overwrite the original css file                  |
| pretty     |       | Boolean  | false         | Enable pretty formatting for the output data.    |
