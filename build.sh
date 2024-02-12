#!/bin/bash

# requires rollup@4.9.5
# npm install -g rollup@5.9.5

# Clear up
rm -rf docs
mkdir -p docs/lib

# Find all JavaScript files within src/components directory
JS_FILES=$(find src/components -type f -name "*.js")

# For each file, compile via rollup, outputting as individual JS modules.
for file in $JS_FILES
do
   filename=$(basename "$file")
   echo "File: $filename"
   cp "$file" "docs/$filename"
done

# Write CNAME file
echo "fetch.dogecoin.org" > docs/CNAME
echo "fetch.dogecoin.org" > CNAME

# Copy the static files to the dist directory.
cp src/index.html docs/index.html
cp -R src/lib/ docs/lib
cp -R resources docs/
cp -R example docs/