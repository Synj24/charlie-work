#!/bin/sh
# command is "node charlie", it pipes your arguments into charlie.js (i don't like globally installed CLIs)
# "-"+string = Directory where tasks are stored
# all other parameters are task names

# Task arguments not supported from CLI

node charlie exampleGruntTask exampleNodeTask exampleGulpTask -_charlieWork-examples
