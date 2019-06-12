This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

### `npm test`

### `npm run build`

### `npm run eject`

## 过程
- 遍历当前网页的DOM结构，收集所有DOM树上每个节点的元素信息及相应样式，渲染出canvas图像。这个遍历和渲染操作封装在脚本文件html2canvas.js里
- 利用一个开源的JavaScript库，jsPDF，在浏览器端用JavaScript生成PDF文件。

