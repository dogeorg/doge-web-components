#!/bin/bash

# Build the component manifest file (lists all components with demo directories)
# Write a HTML file that redirects users from fetch.dogecoin.org/<component> to <component>/demo

DIST_COMPONENTS_BASE_DIR="dist"

# Find all component demo directories.
DEMO_DIRS=$(find src/components -type d -name "demo")
for demo_dir in $DEMO_DIRS
do
  # Get the parent directory of the demo, which is the component directory
  component_dir="$(dirname "$demo_dir")"

  # Get the basename of the component directory
  component_dirname=$(basename "$component_dir")

  echo "DEMO Dir: $component_dirname"

  # Define the filename for the component's index.html in the dist directory
  filename="${DIST_COMPONENTS_BASE_DIR}/${component_dirname}/index.html"

  # Write the HTML content to the file
  cat << 'EOF' > "$filename"
<!DOCTYPE html>
<html>
  <head>
    <script type="text/javascript">
    if (!window.location.pathname.endsWith('/')) {
      window.location.href = window.location.pathname + '/demo/';
    }
    </script>
  </head>
<body>
  <!-- Content here -->
</body>
</html>
EOF

  # Append component name to COMPONENTS_JSON
  COMPONENTS_JSON+="\"$component_dirname\": {},"
done

# Remove trailing comma from COMPONENTS_JSON
COMPONENTS_JSON=${COMPONENTS_JSON%,}

# Create the final JSON object
COMPONENTS_JSON="{\"components\": {$COMPONENTS_JSON}}"

# Write the JSON object to manifest.json
echo "$COMPONENTS_JSON" > "${DIST_COMPONENTS_BASE_DIR}/manifest.json"