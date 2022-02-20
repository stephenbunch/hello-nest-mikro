#!/usr/bin/env bash

# exit on error
set -o errexit

npm install
npm run build -w web
npm run migrate -w server
