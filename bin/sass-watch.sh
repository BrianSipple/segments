#!/bin/bash

echo 'Starting SASS watch'
sass --watch app/main.scss:app/main.css app/components:app/components
