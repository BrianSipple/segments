#!/bin/bash

echo 'Starting SASS watch'
node-sass --watch --recursive app/components --output app/components
