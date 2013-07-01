MOCHA_OPTS= --check-leaks -t 4000
REPORTER = dot

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(MOCHA_OPTS) \
		test/*.js

.PHONY: test
