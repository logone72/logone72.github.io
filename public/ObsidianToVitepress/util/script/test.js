import {config} from "../constraint.js";
import Lavencha from "../lavencha.js";

const tc = (str, title = '') => {
    console.log(`/--------${title}------/ start`)
    console.log(str)
    console.log(`/--------${title}------/ end`)
}

const test = () => {
    const lavencha = new Lavencha(config.testDirectoryPath)

    tc(lavencha.original)
    tc(lavencha.cache)

    lavencha.executeConversion();
    tc(lavencha.converted)
}

test();