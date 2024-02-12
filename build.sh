#!/bin/bash

# Clear up
rm -rf dist
mkdir -p dist

# Find all JavaScript files within src/components directory
JS_FILES=$(find src/components -type f -name "*.js")

# For each file, compile via rollup, outputting as individual JS modules.
for file in $JS_FILES
do
   filename=$(basename "$file")
   echo "File: $filename"
   cp "$file" "dist/$filename"
done

# Write CNAME file
echo "fetch.dogecoin.org" > dist/CNAME
echo "fetch.dogecoin.org" > CNAME

# Copy the static files to the dist directory.
cp src/index.html dist/index.html
cp -R src/lib dist/lib
cp -R resources dist/
cp -R example dist/

# Write some version data
echo "Commit:$(git log -1 --pretty=format:%h)" >> dist/version.txt
echo "UTC:$(date -u)" >> dist/version.txt
