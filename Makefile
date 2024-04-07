init:
		@pnpm i

start-dev-client:
		@pnpm -F=client build:watch

start-dev-app:
		@pnpm -F=app start

start-dev-server:
		@pnpm -F=api start:dev


.PHONY init start-dev-client start-dev-app start-dev-server