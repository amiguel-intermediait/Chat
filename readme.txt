
#LocalStart

    npm install

    nodemon dist/app.js

    from other console 

    tsc --watch

    -for the fist time run this commands to create the db

        npx sequelize-cli db:migrate

        npx sequelize-cli db:seed:all

#DockerStart

    docker-compose up --build

    -for the fist time run this commands to create the db

        npx sequelize-cli db:migrate

        npx sequelize-cli db:seed:all