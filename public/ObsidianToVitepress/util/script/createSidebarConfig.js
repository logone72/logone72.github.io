import fs from "fs";
import {config} from "../constraint.js";
import createSidebarConfig from "../sidebar.js";

const run = () => {
    const sidebarConfig = createSidebarConfig(config.originalDirectoryPath);

    fs.writeFileSync(`${config.targetDirectoryPath}/.vitepress/sidebarConfig.json`, sidebarConfig);
}

run();