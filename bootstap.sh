#!/bin/bash

cd /root/JA-FE

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