install:
	@echo Install AdonisJS Globally
	@npm i -g @adonisjs/cli
	@echo Install Installing Node Packages
	@npm install
	@npm install mysql
start-dev:
	@adonis serve --dev