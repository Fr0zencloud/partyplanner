install:
	@echo Install AdonisJS Globally
	@npm i -g @adonisjs/cli
	@echo Install Installing Node Packages
	@npm install
start-dev:
	@adonis serve --dev

prod-update:
	service partyplanner stop
	git pull
	service partyplanner start
