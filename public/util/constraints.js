const originalDirectoryPath = './public/obsidian'
const targetDirectoryPath = './docs'
const backupDirectoryPath = './backup'

const obsidianInternalLinkMatcher = /(\[\[).*(]])/g
const pathMarkdownFileNameMatcher = /(\/).*(.md)/g

export {
    originalDirectoryPath,
    targetDirectoryPath,
    backupDirectoryPath,

    obsidianInternalLinkMatcher,
    pathMarkdownFileNameMatcher
}