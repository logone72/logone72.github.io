import fs from 'fs-extra';
import {originalDirectoryPath, targetDirectoryPath} from "./constraints.js";
import {convertFilesInternalLinks, readAllFilePaths} from "./converter.js";



const tester = () => {
    const paths = readAllFilePaths(originalDirectoryPath, []);
    console.log(paths);

    convertFilesInternalLinks(paths)

    // 간단하게 특정 위치의 파일들을 모두 목표 위치로 복사하는 함수
    // fs.copySync(originalDirectoryPath, targetDirectoryPath, {overwrite:true});

    // const files = readFiles(paths);
    // console.log(files);
}

tester();

