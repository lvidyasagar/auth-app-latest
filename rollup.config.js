import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import bundleScss from 'rollup-plugin-bundle-scss';
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import copy from "rollup-plugin-copy";

const packageJson = require("./package.json");

export default [{
    input: "src/index.tsx",
    output: [
        {
            file: packageJson.module,
            format: "esm",
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        bundleScss(),
        url(),
        svgr(),
        copy({ targets: [{ src: 'src/assets', dest: 'dist' }] })
    ],
}
]