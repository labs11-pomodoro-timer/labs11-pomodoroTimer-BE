



# Focus Timer backend server README

* [Getting Started](#getting-started)
* [Prerequisites](#prerequesites)
* [Installing](#installing)
* [API](#api)
* [Deployment](#deployment)
* [Built With](#built-with)
* [Authors](#authors)
* [License](#license)
* [Acknowledgments](#acknowledgments)



## Getting Started

Fork this repository and clone it to your local machine.

Be sure to download the front-end client as well, which can be found [here](https://github.com/labs11-pomodoro-timer/labs11-pomodoroTimer-FE).

### Prerequisites

In order to use this server, you will need to have [node](https://nodejs.org) installed. You can check if node is
installed by typing

```
node -v
```

You will also need to have yarn installed. Installation instructions for yarn can be found [here](https://yarnpkg.com/lang/en/docs/install/).

### Installing

First, 

```
yarn install
```

This will install all of the dependencies you need to run the server.

To run the server locally for testing,

```
yarn server
```

NOTE: There are several places in code containing development URIs that begin with "http://localhost...".
Be sure to switch these URIs from production to development and vice versa by commenting out the appropriate
line of URI information.


## API

Here is an example of the shape of the information that is returned by the internal API.

### GET /users

Example: http://focustimer-labs11.herokuapp.com/api/users/

Example response body:
        [
            {
                "id": 9,
                "firstname": "Mario",
                "lastname": "David",
                "email": "mariomd@nintendo.com",
                "phone": null,
                "timerName": null,
                "timerStart": null,
                "timerEnd": null,
                "premiumUser": false
            },
            {
                "id": 1,
                "firstname": "Leah Cim",
                "lastname": "Rekcah",
                "email": "rekcahlc@qmail.com",
                "phone": null,
                "timerName": null,
                "timerStart": null,
                "timerEnd": null,
                "premiumUser": true
            }
        ]

### GET /users/:email

Example: http://focustimer-labs11.herokuapp.com/api/users/rekcahlc@qmail.com

Response body:

            {
                "id": 1,
                "firstname": "Leah Cim",
                "lastname": "Rekcah",
                "email": "rekcahlc@qmail.com",
                "phone": null,
                "timerName": null,
                "timerStart": null,
                "timerEnd": null,
                "premiumUser": true
            }



### POST /users

Example: Create – POST  http://focustimer-labs11.herokuapp.com/api/users/

NOTE: firstname, lastname, and email are required fields

Request body:

            {
                
                "firstname": "Mario", // required
                "lastname": "David", // required
                "email": "mariomd@nintendo.com", // required
                "phone": null,
                "timerName": null,
                "timerStart": null,
                "timerEnd": null,
                "premiumUser": false
            }


## Deployment

To deploy this back-end to Heroku, inside of this repo's root directory, type

```
heroku run
```

and follow the CLI instructions from there.

## Built With

* [React](http://www.reactjs.org) - The web framework used
* [Yarn](https://www.yarnjs.org) - Dependency Management
* [PostgreSQL](https://www.postgresql.org/) - Database software used

## Authors

You can view the [contributors](https://github.com/labs11-pomodoro-timer/labs11-pomodoroTimer-BE/graphs/contributors) who participated in this project by following this link.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Francesco Cirillo, for the development of the Pomodoro Technique
* The staff of Lambda, especially Joshua Howland, Edd Burke, and Thomas Claydon, for the support and guidance
* The Labs 11 co-hort and the Pomodoro Timer team