# my-vue-practice

Preview here: 

https://4c8c5a776c404c68b4c65954152bd591.vfs.cloud9.us-east-2.amazonaws.com

not serve anytime(because in Cloud9 free project )
不一定會隨時在線(Cloud9免費方案閒置一段時間會進入休眠)

## How to serve

### Install Yarn: https://www.yarnpkg.com/en/docs/install#debian-stable

### Install Nodejs: https://github.com/nodesource/distributions
```Bash
sudo apt-get install python-software-properties
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install nodejs
```
### Use Gulp to serve

```
cd my-vue-practice

rm -r node_modules
yarn install
yarn global add gulp-cli (or npm install -g gulp-cli)
```

```gulp watch```

or

```gulp serve```

