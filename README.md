[![Node.js CI](https://github.com/WillemJiang/Insight/actions/workflows/build.yml/badge.svg?branch=main)](https://github.com/WillemJiang/Insight/actions/workflows/build.yml)

# Insight
This repo provides tools to show the project states of ASF. 

## How does it work

* ASF publish the projects and committees information [here](https://whimsy.apache.org/public/). 
* We can also access the ASF repo development status from Github repo and `https://oss.x-lab.info/repo_detail/apache/${PROJEDT_REPO_NAME}.json`.

Then we can process these data for better data visualization with Apache echarts. 

## Preparations for project start-up
1. [Install Python3](https://realpython.com/installing-python/) 
2. Install the required library
```
   pip install -r script/requirements.txt 
```
4. Please run the below command in the root of repo to prepare the data for the frontend to render.
  * Running spider.py to grab the Github related data
```
   python script/stats.py 
```
  * Running the stats.py to collect the commitee information from github
```
   python script/stats.py 
```
5. [Install Node](https://nodejs.dev/en/learn/how-to-install-nodejs/)

## Frontend Data visialization 

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


### Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
