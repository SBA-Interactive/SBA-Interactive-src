#!/usr/bin/env bash
bun run build &&
cp -r ./dist/* ../sba-interactive/ &&
cd ../sba-interactive &&
git add . &&
git commit -m "Update $@" &&
git push -u origin main &
cd ../us