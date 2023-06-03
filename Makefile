# This Makefile contains commands for installing project dependencies,
# running tests, formatting code, and checking code formatting.

# Install project dependencies
install:
	npm install

run:
	npm start

# Run the tests
test:
	npm run cy:test-headless

# Format the code with Prettier
format:
	npx prettier --write .

# Check code formatting with Prettier
check-format:
	npx prettier --check .

# Default command (runs install, test, format, and check-format)
all: install test format check-format
