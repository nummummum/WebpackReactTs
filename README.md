# Webpack 초기 설정 : React + TS

## 필자가 주로쓰는 npm i 환경 (react,redux toolkit, scss, ts, webpack antd)

npm i react-router-dom redux react-redux @reduxjs/toolkit redux-saga redux-devtools-extension redux-actions sass-loader sass antd @ant-design/icons

npm i --save typescript @types/node @types/react @types/react-dom @types/jest less less-loader

npm i --save-dev @types/react-router-dom @types/react-redux @types/redux-actions webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader sass-loader sass mini-css-extract-plugin clean-webpack-plugin webpack-merge bable-loader @babel/core @babel/preset-env @babel/preset-react

### 기본 프로젝트 구조

> project <br/>
> ├─ config<br/>
> │ ├─webpack.common.js<br/>
> │ ├─webpack.dev.js<br/>
> │ └─webpack.prod.js<br/>
> ├─ node_modules <br/>
> ├─ public<br/>
> │ └─index.html<br/>
> ├─ src <br/>
> │ ├─App.tsx<br/>
> │ └─index.tsx<br/>
> ├─ .babelrc<br/>
> ├─ package.json<br/>
> └─ tsconfig.json<br/>

### 기본 구조 설명

config : webpack 파일들을 관리한다. webpack의 common, dev, prod는 webpack의 merge기능을 사용하여 개발용과 prod를 구별한다.

.babelrc는 preset등을 설정한다. JSX와 TSX로 작성된 코드를 createElement 함수를 이용한 코드로 변환시켜준다.
<br/>
<br/>
<br/>
webpack.common.js

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      showErrors: true,
    }),
    new webpack.ProvidePlugin({
      React: "react",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src/"),
    },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
```

<br/>
webpack.dev.js

```js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
});
```

<br/>
webpack.prod.js

```js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "./",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new CleanWebpackPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
```

<br/>
package.json 빌드설정

```js
"scripts": {
    "start": "webpack-dev-server --config config/webpack.dev.js",
    "prebuild": "rimraf dist",
    "build": "webpack --config config/webpack.prod.js",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
```

<br/>
tsconfig.json

```js
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "outDir": "./dist",
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}

```

##
