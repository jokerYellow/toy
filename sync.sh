#! /bin/sh
npm run build
scp -r build/*  www@106.54.160.193:/home/www/wall/
