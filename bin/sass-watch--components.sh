#!/bin/bash

echo 'Starting SASS watch for components'

node-sass --watch --recursive app/components --output app/components
