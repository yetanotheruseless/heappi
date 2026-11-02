#!/bin/sh
# Bundle Pi Durable for the heap with Bun instead of esbuild (same inputs, same
# concatenation as build.sh), for hosts that have Bun but no npx.
set -e
cd "$(dirname "$0")"
bun build entry.mjs --format=iife --target=browser --minify --outfile=pi-bundle.js --external 'node:*'
cat prelude.js pi-bundle.js pi-glue.js > pi-harness.js
ls -la pi-bundle.js pi-harness.js
