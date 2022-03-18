import { Media, parse, Rule, stringify } from 'css';
import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

interface mainArgs {
    cssFilePath: string;
    containerName: string;
}

async function main({ cssFilePath, containerName }: mainArgs) {
    const css = await readFile(cssFilePath, 'utf8');
    const obj = parse(css, {});
    if (!obj.stylesheet || obj.stylesheet?.rules.length === 0) {
        throw new Error('No rules found in css file');
    }
    // Loop through rule replacing selectors with prefix
    for (let i = 0; i < obj.stylesheet.rules.length; i++) {
        let rule = obj.stylesheet.rules[i];

        if (rule.type === 'rule') {
            const _rule = rule as Rule;
            if (_rule.selectors) {
                for (let j = 0; j < _rule.selectors.length; j++) {
                    const selector = _rule.selectors[j];
                    if (!selector.includes(containerName)) {
                        if (selector === 'html' || selector === 'body') {
                            // If rule is html or body change to container name
                            console.log(`Changing ${selector} to ${containerName}`);
                            _rule.selectors[j] = `${containerName}`;
                        } else if (selector.startsWith(':')) {
                            // If rule is pseudo selector change to container name
                            console.log(`Changing ${selector} to ${containerName}${selector}`);
                            _rule.selectors[j] = `${containerName}${selector}`;
                        } else {
                            // If rule is normal selector change to container name
                            console.log(`Changing ${selector} to ${containerName} ${selector}`);
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
                                    console.log(`Changing ${selector} to ${containerName}`);
                                    _rule.selectors[k] = `${containerName}`;
                                } else if (selector.startsWith(':')) {
                                    // If rule is pseudo selector change to container name
                                    console.log(`Changing ${selector} to ${containerName}${selector}`);
                                    _rule.selectors[k] = `${containerName}${selector}`;
                                } else {
                                    // If rule is normal selector change to container name
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

    // Write new css file
    await writeFile(join(__dirname, '../example-modified.css'), stringify(obj));
}

const examplePath = join(__dirname, '../example.css');
main({ cssFilePath: examplePath, containerName: '#app' });
