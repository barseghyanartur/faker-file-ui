# This Makefile contains commands for installing project dependencies,
# running tests, formatting code, and checking code formatting.

.PHONY: install test lint format check-format clean

# Install project dependencies
install:
	npm install

run:
	npm start

# Run the tests
test: install
	npm run cy:test-headless

# Format the code with Prettier
format:
	npx prettier --write .

# Check code formatting with Prettier
check-format: install
	npx prettier --check .

clean:
	rm -rf node_modules
	rm -rf coverage
	rm -rf .nyc_output
	rm -f .eslintcache
	find . -name "*.log" -type f -delete

# Default command (runs install, test, format, and check-format)
all: install test format check-format
