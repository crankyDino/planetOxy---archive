// const cssnano = require("cssnano");
// const autoprefixer = require("autoprefixer");
// const uncss = require("postcss-uncss");
import cssnano from "cssnano";
import autoprefixer from "autoprefixer";
import uncss from "postcss-uncss";

const plugins = {
  plugins: [
    cssnano({
      preset: "default",
    }),
    autoprefixer({
      browsers: ["last 2 versions", "> 5%"],
    }),
    uncss({
      html: ["./*.html"],
    }),
  ],
};

export default plugins;
