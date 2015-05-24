PATH  := node_modules/.bin:$(PATH)
SHELL := /bin/bash

.PHONY: setup main

setup:
	npm install
	@echo "Git hooks..."
	@ln -s -f ../../hooks/pre-commit .git/hooks/pre-commit
	@chmod +x .git/hooks/pre-commit

dev: setup
	@babel src/ -d build -w

build: setup
	@babel src/ -d build
	@webpack

main: build
