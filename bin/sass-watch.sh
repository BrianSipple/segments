#!/bin/bash

echo 'Beginning SASS watch'
node-sass --watch --recursive app/components/ --output app/components/

exit 0