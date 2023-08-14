
## Drones

  

[[_TOC_]]

  

---

  

:scroll: **START**

  
  

### Introduction

  

There is a major new technology that is destined to be a disruptive force in the field of transportation: **the drone**. Just as the mobile phone allowed developing countries to leapfrog older technologies for personal communication, the drone has the potential to leapfrog traditional transportation infrastructure.

  

Useful drone functions include delivery of small items that are (urgently) needed in locations with difficult access.

  

---

  

### Task description

  

We have a fleet of **10 drones**. A drone is capable of carrying devices, other than cameras, and capable of delivering small loads. For our use case **the load is medications**.

  

A **Drone** has:

- serial number (100 characters max);

- model (Lightweight, Middleweight, Cruiserweight, Heavyweight);

- weight limit (500gr max);

- battery capacity (percentage);

- state (IDLE, LOADING, LOADED, DELIVERING, DELIVERED, RETURNING).

  

Each **Medication** has:

- name (allowed only letters, numbers, ‘-‘, ‘_’);

- weight;

- code (allowed only upper case letters, underscore and numbers);

- image (picture of the medication case).

  

Develop a service via REST API that allows clients to communicate with the drones (i.e. **dispatch controller**). The specific communicaiton with the drone is outside the scope of this task.

  

The service should allow:

- registering a drone;

- loading a drone with medication items;

- checking loaded medication items for a given drone;

- checking available drones for loading;

- check drone battery level for a given drone;

  

> Feel free to make assumptions for the design approach.

  

---

  

### Requirements

  

While implementing your solution **please take care of the following requirements**:

  

#### Functional requirements

  

- There is no need for UI;

- Prevent the drone from being loaded with more weight that it can carry;

- Prevent the drone from being in LOADING state if the battery level is **below 25%**;

- Introduce a periodic task to check drones battery levels and create history/audit event log for this.

  

---

  

#### Non-functional requirements

  

- Input/output data must be in JSON format;

- Your project must be buildable and runnable;

- Your project must have a README file with build/run/test instructions (use DB that can be run locally, e.g. in-memory, via container);

- Any data required by the application to run (e.g. reference tables, dummy data) must be preloaded in the database;

- Unit tests;

- Use a framework of your choice, but popular, up-to-date, and long-term support versions are recommended.

  

---

  

:scroll: **END**

### Get started

1. Please clone the repo
	```bash
	git clone ...
	```
2. Install all modules
	```bash
	npm install
	```
3. Create env files (.env, .env.develop, .env.test)
	```bash
	APP_NAME=Drone
	DB_DRIVER=sqlite
	DB_NAME=:memory:
	DB_SYNC=true
	DB_HOST=
	DB_PORT=
	DB_USERNAME=
	DB_PASSWORD=
	ALLOW_ORIGIN=*
	```
5. Run application
	```bash
	# NODE_ENV can be "development", "production" or "test".
	NODE_ENV=... npm start
	```
	or you can deploy in docker
	```bash
	docker-compose up -d
	```

### Run tests
1. Run unit tests:
	```
	npm run test
	```
1. Run e2e tests:
	```
	npm run test:e2e
	```
### Explore Api
Go to [http://localhost:3000/docs](http://localhost:3000/docs) in your browser.

### What did i use?
1. [https://nestjs.com/](https://nestjs.com/)
	* [https://opencollective.com/**nest**](https://opencollective.com/nest)
2. [https://typeorm.io/](https://typeorm.io/)
	* [opencollective.com/**typeorm**](https://opencollective.com/typeorm) 
3. [https://jestjs.io/](https://jestjs.io/)
	* [opencollective.com/**jest**](https://opencollective.com/jest)
5. [https://joi.dev/](https://joi.dev/)
6. [https://swagger.io/](https://swagger.io/)
7. [https://www.docker.com/](https://www.docker.com/)
8. [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

All these technologies are widely used by the community.