#!/bin/bash

cd /root/JA-FE
branch=${1:-main}
#更新仓库
git reset --hard HEAD
git checkout $branch
git pull
#安装包
npm install
#删除原产物
rm -rf dist
#生成新产物
vite build
# 进行brotli压缩
#find dist -type f \( -iname '*.js' -o -iname '*.css' -o -iname '*.html' \) -exec zopfli --iterations=200 {} \;
find dist -type f \( -iname '*.js' -o -iname '*.css' -o -iname '*.html' \) -exec brotli -q 11 {} \;

#删除nginx产物
rm -rf /www/JA-FE/dist
#复制新产物到nginx
cp -rf dist/ /www/JA-FE
