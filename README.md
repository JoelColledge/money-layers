# money-layers
[![Build Status](https://secure.travis-ci.org/JoelColledge/money-layers.png?branch=master)](https://travis-ci.org/JoelColledge/money-layers)
[![Coverage Status](https://coveralls.io/repos/JoelColledge/money-layers/badge.svg?branch=master)](https://coveralls.io/r/JoelColledge/money-layers/?branch=master)

## Development

    nvm use node v12.8.0
    npm install
    docker-compose up
    USERNAME=user PASSWORD=pass npm run dev
    http://localhost:4200

## Production

    # git clone
    npm install --production

## Heroku deployment

    heroku login
    git push heroku master
