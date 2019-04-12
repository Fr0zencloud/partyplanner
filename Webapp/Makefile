install:
	@echo Install AdonisJS Globally
	@npm i -g @adonisjs/cli
	@echo Install Installing Node Packages
	@npm install

test:
	nyc --all adonis test

start-dev:
	@adonis serve --dev

prod-update:
	service partyplanner stop
	git pull
	@npm install || true
	service partyplanner start
