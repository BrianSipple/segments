#!/bin/bash

sass app/main.scss app/main.css
autoprefixer app/main.css

echo 'Sass and Autoprefixer tasks complete'
exit 0
