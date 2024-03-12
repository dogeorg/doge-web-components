#!/bin/bash

# Clear up
rm -rf dist
mkdir -p dist

# Copy all folders and subfolders within src/components to dist, excluding test files
rsync -av --exclude='*test.html' --exclude='*test.js' src/components/ dist/

# For each component, create a file within the root for ease of
# consumption from fetch.dogecoin.org/<component>.js
for dir in src/components/*; do
  if [ -d "$dir" ]; then
      component_name=$(basename "$dir")
      echo "export * from \"./${component_name}/${component_name}.js\"" > "dist/${component_name}.js"
  fi
done

# For each css file, concatinate and create a single file
# for component consumers to include within the <head>
# of their webpage, to reduce flash of unstyled content.
CSS_FILES=$(find src/components -type f -name "*initial.css")
for file in $CSS_FILES
do
   echo "CSS File: $file"
   cat "$file" >> "dist/initial.css"
   echo >> "dist/initial.css" #Adds line
done

# Write CNAME file
echo "fetch.dogecoin.org" > dist/CNAME
echo "fetch.dogecoin.org" > CNAME

# Copy the static files to the dist directory.
cp src/index.html dist/index.html
cp src/index.css dist/index.css
cp -R src/lib dist/lib
cp -R resources dist/
cp -R example dist/

# Write some version data
echo "Commit:$(git log -1 --pretty=format:%h)" >> dist/version.txt
echo "UTC:$(date -u)" >> dist/version.txt

# Run docs script.
./build-docs.sh
