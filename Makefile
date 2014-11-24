PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

client:
	browserify client.js > destiny.js

minify:
	uglifyjs destiny.js > destiny.min.js

build: client minify
