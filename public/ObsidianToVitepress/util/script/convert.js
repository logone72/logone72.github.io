import Lavencha from "../lavencha.js";
import {config} from "../constraint.js";

const run = () => {
    const lavencha = new Lavencha(config.originalDirectoryPath)
    lavencha.executeConversion();
}

run();