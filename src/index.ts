#!/usr/bin/env node
import { Media, parse, Rule, stringify } from 'css';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';
import commandLineArgs from 'command-line-args';
import { existsSync } from 'fs';
interface mainArgs {
    cssFilePath: string;
    containerName: string;
    verbose?: boolean;
    pretty?: boolean;
}

function minifyCss(css: string) {
    return css
        .replace(/\s+/g, ' ')
        .replace(/\s*\{\s*/g, '{')
        .replace(/\s*\}\s*/g, '}');
}

async function parseCss({ cssFilePath, containerName, verbose = false, pretty = false }: mainArgs) {
    const css = await readFile(cssFilePath, 'utf8');
    const obj = parse(css, {});
    if (!obj.stylesheet || obj.stylesheet?.rules.length === 0) {
        throw new Error('No rules found in css file');
    }
    // Loop through rule replacing selectors with prefix
    for (let i = 0; i < obj.stylesheet.rules.length; i++) {
        const rule = obj.stylesheet.rules[i];

        if (rule.type === 'rule') {
            const _rule = rule as Rule;
            if (_rule.selectors) {
                for (let j = 0; j < _rule.selectors.length; j++) {
                    const selector = _rule.selectors[j];
                    if (!selector.includes(containerName)) {
                        if (selector === 'html' || selector === 'body') {
                            // If rule is html or body change to container name
                            if (verbose === true) console.log(`Changing ${selector} to ${containerName}`);
                            _rule.selectors[j] = `${containerName}`;
                        } else if (selector.startsWith(':')) {
                            // If rule is pseudo selector change to container name
                            if (verbose === true) console.log(`Changing ${selector} to ${containerName}${selector}`);
                            _rule.selectors[j] = `${containerName}${selector}`;
                        } else {
                            // If rule is normal selector change to container name
                            if (verbose === true) console.log(`Changing ${selector} to ${containerName} ${selector}`);
                            _rule.selectors[j] = `${containerName} ${selector}`;
                        }
                    }
                }
                // Resave rule
                obj.stylesheet.rules[i] = _rule;
            }
        } else if (rule.type === 'media') {
            // Handle media queries
            const _media = rule as Media;
            if (_media.rules) {
                for (let j = 0; j < _media.rules.length; j++) {
                    const _rule = _media.rules[j] as Rule;
                    if (_rule.selectors) {
                        for (let k = 0; k < _rule.selectors.length; k++) {
                            const selector = _rule.selectors[k];
                            if (!selector.includes(containerName)) {
                                if (selector === 'html' || selector === 'body') {
                                    // If rule is html or body change to container name
                                    if (verbose === true) console.log(`Changing ${selector} to ${containerName}`);
                                    _rule.selectors[k] = `${containerName}`;
                                } else if (selector.startsWith(':')) {
                                    // If rule is pseudo selector change to container name
                                    if (verbose === true)
                                        console.log(`Changing ${selector} to ${containerName}${selector}`);
                                    _rule.selectors[k] = `${containerName}${selector}`;
                                } else {
                                    // If rule is normal selector change to container name
                                    if (verbose === true)
                                        console.log(`Changing ${selector} to ${containerName} ${selector}`);
                                    _rule.selectors[k] = `${containerName} ${selector}`;
                                }
                            }
                        }
                        // Resave rule
                        _media.rules[j] = _rule;
                    }
                }
                // Resave media
                obj.stylesheet.rules[i] = _media;
            }
        }
    }

    return pretty ? stringify(obj) : minifyCss(stringify(obj));
}

const optionDefinitions = [
    { name: 'verbose', alias: 'v', type: Boolean, defaultValue: false },
    { name: 'input', alias: 'i', type: String },
    { name: 'selector', type: String },
    { name: 'output', alias: 'o', type: String },
    { name: 'pretty', type: Boolean, defaultValue: false },
];

async function main() {
    try {
        const args = commandLineArgs(optionDefinitions);
        // Checks
        if (!args.input) {
            console.error('No input file specified');
            process.exit(1);
        }
        if (!args.selector) {
            console.error('No selector specified');
            process.exit(1);
        }
        if (!existsSync(args.input)) {
            console.error(`Input file ${args.input} does not exist`);
            process.exit(1);
        }

        const outputPath = args.output || join(process.cwd(), 'output.css');

        // Write new css file
        await writeFile(
            outputPath,
            await parseCss({
                cssFilePath: args.input,
                containerName: args.selector,
                verbose: args.verbose || false,
                pretty: args.pretty || false,
            }),
        );

        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main();
