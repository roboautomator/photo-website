install:
	@echo "Installing dependencies" \
		&& CI=true npm ci \
		&& echo "Finished installing dependencies" \
		|| echo "Failed to install dependencies"

test:
	@echo "Running unit tests" \
		&& CI=true npm test -- --coverage \
		&& echo "Finished running unit tests" \
		|| echo "One or more test failures"

integration:
	@echo "Running Cypress tests" \
		&& npm run integration \
		&& echo "Finished running Cypress tests" \
		|| echo "One or more Cypress test failures"

build:
	@echo "Building for production" \
		&& CI=true npm run build \
		&& echo "Finished building for production" \
		|| echo "Building failed"

current_version:
	@echo "$$(awk -F \" '/"version": ".+"/ { print $$4; exit; }' package.json).$${GITHUB_RUN_NUMBER:-0}.$$(git rev-parse --short HEAD)"
