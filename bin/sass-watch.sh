#!/bin/bash

<<<<<<< HEAD
echo 'Starting SASS watch'
sass --watch app/main.scss:app/main.css app/components:app/components

=======
echo 'Beginning SASS watch'
node-sass --watch --recursive app/components/ --output app/components/

exit 0
>>>>>>> c80683aaeabca85db0038391f196e40a9ffc0aaf
