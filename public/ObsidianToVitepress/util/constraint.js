import customConfig from '../config';

const defaultConfig = {
    originalDirectoryPath: './public/obsidian',
    targetDirectoryPath: './docs',
    backupDirectoryPath: './backup',
}

const config = {
    ...defaultConfig,
    ...customConfig,
}

const obsidianInternalLinkMatcher = /(\[\[).*(]])/g
const pathMarkdownFileNameMatcher = /(\/).*(.md)/g

export {
    config,

    obsidianInternalLinkMatcher,
    pathMarkdownFileNameMatcher
}