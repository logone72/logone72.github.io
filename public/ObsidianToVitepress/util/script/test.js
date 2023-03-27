import {config} from "../constraint.js";
import Lavencha from "../lavencha.js";
import createSidebarConfig from "../sidebar.js";
import fs from "fs";

const tc = (str, title = '') => {
    console.log(`/--------${title}------/ start`)
    console.log(str)
    console.log(`/--------${title}------/ end`)
}

const test = () => {

    const lavencha = new Lavencha(config.originalDirectoryPath)

    // tc(lavencha.original)
    // tc(lavencha.cache)

    lavencha.executeConversion();
    // tc(lavencha.converted)

    const sidebarConfig = createSidebarConfig(config.originalDirectoryPath)

    fs.writeFileSync(`${config.targetDirectoryPath}/.vitepress/sidebarConfig.json`, sidebarConfig);
}

test();