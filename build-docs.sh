#!/bin/bash

# Find all component demo directories.
DEMO_DIRS=$(find src/components -type d -name "demo")

# Collect every component demo directory
# Copy it to /dist/<component>/demo
for demo_dir in $DEMO_DIRS
do
  component_dirname=$(basename "$(dirname "$demo_dir")")
  echo "DEMO Dir: $component_dirname"
  mkdir -p "dist/$component_dirname"
  cp -R "src/components/$component_dirname/demo/." "dist/$component_dirname/."

  # Append component name to COMPONENTS_JSON
  COMPONENTS_JSON+="\"$component_dirname\": {},"
done

# Remove trailing comma from COMPONENTS_JSON
COMPONENTS_JSON=${COMPONENTS_JSON%,}

# Create the final JSON object
COMPONENTS_JSON="{\"components\": {$COMPONENTS_JSON}}"

# Write the JSON object to manifest.json
echo "$COMPONENTS_JSON" > "dist/manifest.json"