#!/bin/bash

cd /root/JA-FE

#删除原产物
rm -rf dist
#生成新产物
vite build
#删除nginx产物
rm -rf /www/JA-FE/dist
#复制新产物到nginx
cp -rf dist/ /www/JA-FE