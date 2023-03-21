import fs from 'fs';
import fse from 'fs-extra';
import {backupDirectoryPath, obsidianInternalLinkMatcher, originalDirectoryPath} from "./constraints.js";

const tc = (str, title= '') => {
    console.log(`/--------${title}------/ start`)
    console.log(str)
    console.log(`/--------${title}------/ end`)
}

/**
 * 특정 디렉토리 하위의 모든 파일 경로들을 두번쨰 인자로 넘기는 배열에 담는 함수
 * @param {string} _dirPath
 * @param {string[] | []} _filePathArr
 * @return {*}
 */
const readAllFilePaths = (_dirPath, _filePathArr) => {
    try {
        const filenames = fs.readdirSync(_dirPath, {withFileTypes: true})

        filenames.forEach((_file) => {
            if (!_file instanceof fs.Dirent)
                return;

            const currentPath = `${_dirPath}/${_file.name}`

            if (_file.isFile())
                _filePathArr.push(currentPath)
            else if (_file.isDirectory())
                readAllFilePaths(currentPath, _filePathArr)
        })

        return _filePathArr;
    } catch (e) {
        console.error(e)
    }
}

/**
 * 주어진 path의 모든 파일을 utf8로 포맷팅 형태로 읽어오는 함수
 * @param {FilePath[]} _paths
 * @return {string[]}
 */
const readFiles = (_paths) => {
    const mapper = _path => fs.readFileSync(_path, "utf8")

    return _paths.map(mapper)
}

/**
 * @typedef ObsidianInternalLink
 * @type {string}
 */

/**
 * @typedef VitepressInternalLink
 * @type {string}
 */

/**
 * @typedef FilePath
 * @type {string}
 */

/**
 * @typedef VitepressPath
 * @type {string}
 */

/**
 *
 * @param {FilePath[]} filePaths
 * @return {VitepressPath[]}
 */
const convertFilePathToVitepressPath = (filePaths) => {
    return filePaths.map(filePath => {
        return filePath.replace(originalDirectoryPath, '')
    })
}

/**
 *
 * @param {ObsidianInternalLink[]} obsidianInternalLinks
 * @param {VitepressPath[]} paths
 * @return {Map<ObsidianInternalLink,VitepressInternalLink>}
 */
const getObsidianToVitepressInternalLinkMap = (obsidianInternalLinks, paths) => {
    const internalLinkMap = new Map();

    obsidianInternalLinks.forEach(obsidianLink => {
        try {
            const fileName = obsidianLink.replace('[[', '').replace(']]', '');
            const matchedPath = paths.find(path => path.includes(fileName));

            tc(fileName, 'fileName')
            tc(matchedPath, 'matchedPath')

            if (!matchedPath || !fileName)
                throw null;

            const vitepressLikeInternalLink = `[${fileName}](${matchedPath})`

            internalLinkMap.set(obsidianLink, vitepressLikeInternalLink)
        } catch (e) {
            internalLinkMap.set(obsidianLink, '')
        }
    })

    tc(internalLinkMap, 'result getObsidianToVitepressInternalLinkMap')
    return internalLinkMap
}

/**
 *
 * @param {string[]} files
 * @return {ObsidianInternalLink[]}
 */
const getAllObsidianInternalLinks = (files) => {
    const obsidianInternalLinks = new Set();

    files.forEach(file => {
        const matchedStrings = file.match(obsidianInternalLinkMatcher)
        matchedStrings.forEach(match => obsidianInternalLinks.add(match))
    })

    return Array.from(obsidianInternalLinks).filter(string => !!string);
}

/**
 *
 * @param {string} file
 * @param {Map<ObsidianInternalLink,VitepressInternalLink>} obsidianToVitepressMap
 */
const replaceInternalLinks = (file, obsidianToVitepressMap) => {
    let replacedFile = file;

    const matches = file.match(obsidianInternalLinkMatcher)

    if (!matches)
        return;

    matches.forEach(match => {
        const vitepressInternalLink = obsidianToVitepressMap.get(match);

        replacedFile = replacedFile.replaceAll(match, vitepressInternalLink)
    })

    return replacedFile;
}

/**
 *
 * @param {FilePath} _paths
 */
const convertFilesInternalLinks = (_paths) => {
    const paths = _paths;
    const files = readFiles(paths);

    // 모든 옵시디언 내부 경로 문자열을 찾는다
    const obsidianInternalLinks = getAllObsidianInternalLinks(files)

    // 모든 기존 파일의 경로를 vitepress 절대 경로에 맞게 변환한다.
    const vitepressPath = convertFilePathToVitepressPath(paths);

    // tc(obsidianInternalLinks, 'obsidianInternalLinks');
    // tc(paths, 'paths');
    // tc(vitepressPath, 'vitepressPath')

    // 기존 옵시디언 내부 경로문자열을 vitepress 내부경로 문자열과 매핑한다.
    const linkMap = getObsidianToVitepressInternalLinkMap(obsidianInternalLinks, vitepressPath)

    tc(linkMap, 'linkMap');

    // 모든 파일들의 내부 경로를 변환한다.
     const newFiles = files.map(file => {
        const newFile = replaceInternalLinks(file, linkMap)
        tc(newFile, 'newFile')

        return newFile
    })

    // 원하는 위치에 변환된 파일들을 붙혀넣는다.

    // 목표 1. 변환된 파일들을 원하는 위치에 붙혀넣는다.
}

const backupFiles = (_path) => {
    fse.copySync(_path, backupDirectoryPath, {overwrite: true});
}

const restoreBackup = (_path) => {
    if (fs.existsSync(backupDirectoryPath))
        fse.copySync(backupDirectoryPath, _path, {overwrite: true});
}

export {
    readAllFilePaths,
    readFiles,
    convertFilesInternalLinks,

    backupFiles,
    restoreBackup
}



