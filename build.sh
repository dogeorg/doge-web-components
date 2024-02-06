#!/bin/bash

# requires rollup@4.9.5
# npm install -g rollup@5.9.5

# Clear up
rm -rf dist
mkdir -p dist/lib

# Find all JavaScript files within src/components directory
JS_FILES=$(find src/components -type f -name "*.js")

# For each file, compile via rollup, outputting as individual JS modules.
for file in $JS_FILES
do
   filename=$(basename "$file")
   echo "File: $filename"
   rollup --input "$file" --file "dist/$filename" --format "es"
done

# Copy the static files to the dist directory.
cp src/index.html dist/index.html
cp -R src/lib/ dist/lib
cp -R resources dist/
cp -R example dist/