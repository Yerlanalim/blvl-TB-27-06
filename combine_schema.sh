#!/bin/bash

# Start with the base schema file
cat prisma/schema/schema.prisma > prisma/schema.prisma

# Append all model files (excluding the base schema file)
for file in prisma/schema/*.prisma; do
  if [ "$(basename "$file")" != "schema.prisma" ]; then
    echo "" >> prisma/schema.prisma
    echo "// ===== From $(basename "$file") =====" >> prisma/schema.prisma
    cat "$file" >> prisma/schema.prisma
  fi
done

echo "Schema files combined successfully!"
