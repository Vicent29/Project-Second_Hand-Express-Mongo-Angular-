# Wishpop - Docker

Produced by [Santi Martínez Albert](https://github.com/santimaal) and [Vicent Esteve Ferre](https://github.com/Vicent29)

# 🤷‍♂️¿Como arrancarlo?

- En primer lugar, debemos de tener docker instalado en nuestro dispositivo:
```
sudo apt-get install docker-engine -y
sudo service docker start
sudo service docker status --> comprobar que esta arrancado
```

- En segundo lugar, nos descargaremos el proyecto entero y dentro del proyecto comprobaremos que estamos dentro de la rama dockerizada (***master_docker_compose***):
```
git clone https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-.git
git branch 
```

- Por último, pondremos el cotenedor en marcha (el ***"--build"*** es opcional, lo utilizaremos para volver a crear la imagen): 
```
sudo docker compose up --build
```

# Documentación del proyecto:

## DOCKER-COMPOSE:
En el [docker-compose](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/docker-compose.yml) es el archivo que se encargará de ejecutar cada uno de los servicios que componenen la aplicación. En Wishpop hemos configurado los siguientes servicios:
- mongodb
- backend
- frontend
- mongo-express
- loadbalancer_nginx
- prometheus
- grafana

## 🔹Contenedor / Servicio [MONGODB](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/mongo) :

- Este servicio se encaragará de la base de datos, para ello configuramos el servivio que parta de una imagen de mongo, el contenedor tendrá el nombre de "mongo_conainer", seguidamente crearemos dos volumenes para copiar la base de datos y el otro para realizar el restore de la base de datos. Por otra parte, le añadiremos el "restart" para que en caso de que tengamos un error se reinicie automaticamente. Por último, añadiremos la "network" para que este en la mimsa red que los otros servicios y se puedan ver entre ellos.
```
#Servicio de Mongo para la base de datos
  mongodb:
    image: mongo
    container_name: mongo_container
    volumes:
      - "./mongo/import.sh:/docker-entrypoint-initdb.d/import.sh"
      - ./mongo/dump/first_proyect_prod:/dump
    restart: always
    networks:
      - practica_net
```
- En restore se realizará en un script, el cual lo podemos encontrar con el nombre de [import.sh](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/mongo/import.sh) dentro de la carpeta de mongo.

## 🔹Contenedor / Servicio [BACKEND](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/backend) :

- En primer lugar, crearemos un [dockerfile_backend](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/backend/dockerfile) el cual estará formado por 2 stage, las cuales partiran de una imagen "node:19-alpine", que tendran una contextura para crear una imagen del backend, la cual utilizaremos más adelante en el [docker-compose](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/docker-compose.yml), hay que añadir que partirá del puerto 3000.

```
# STAGE 1
FROM node:19-alpine AS install
WORKDIR /app
COPY package.json .
RUN npm install

# STAGE 2
FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY package.json .
COPY package-lock.json .
COPY app ./app
COPY server.js .
COPY ./env_example.txt ./.env
RUN apk update && apk add bash
EXPOSE 3000
```

- Este servicio se encargará de generar imagen de la parte backend del proyecto. El servicio se denominará "backend_container", partirá de una imagen creada por su [dockerfile_backend](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/backend/dockerfile) y no se ejecutará hasta que el servicio de "mongodb" este funcionando. Por otra parte, le hemos asignado el puerto 30000:3000, además también hemos añadido el "restart" y la "network" correspondiente como en el servicio anetrior. Por último, cuando el contendor este levantado ejecutará el "npm run dev", el cual arrancará el backend.

```
 #Servivio de backend
  backend:
    build: ./backend
    container_name: backend_container
    depends_on:
      - mongodb
    ports:
      - 3000:3000
    networks:
      - practica_net
    command: npm run dev
    restart: always
```

## 🔹Contenedor / Servicio [FRONTEND](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/frontend) :
- En primer lugar, crearemos un [dockerfile_frontend](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/Dockerfile) el cual estará formado por 2 stage, las cuales partiran de una imagen "node:19-alpine", que tendran una contextura para crear una imagen del backend, la cual utilizaremos más adelante en el [docker-compose](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/docker-compose.yml),hay que añadir que partirá del puerto 4200.
```
# STAGE 1
FROM node:19-alpine AS install
WORKDIR /app
COPY package.json .
RUN ["npm", "install"]

# STAGE 2
FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY . .
RUN apk update && apk add bash
EXPOSE 4200
```
- Este servicio se encargará de generar imagen de la parte frontend del proyecto. El servicio se denominará "frontend_container", partirá de una iamgen creada por su [dockerfile_frontend](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/Dockerfile) y no se ejecutará hasta que el servicio de "backend" este funcionando. Por otra parte, le hemos asignado el puerto 4200:4200, además también hemos añadido el "restart" y la "network" correspondiente como en el servicio anetrior. Por último, cuando el contendor este levantado ejecutará el "npm run start", el cual arrancará el frontend.

```
  #Servicio de frontend
  frontend:
    build: ./frontend
    container_name: frontend_container
    ports:
      - 4200:4200
    command: npm run start
    restart: always
    depends_on:
      - backend
    networks:
      - practica_net
```


## 🔹Contenedor / Servicio [MONGO-EXPRESS](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/mongo) :
- Este servicio se encargará de administrar la base de datos de mongo, de manera más interactiva. Por lo que asignaremos la imagen de "mongo-express", asgnaremos el nombre del contenedor "adminMongo_container", lo asociaremos al puerto 8081:8081 y esperará a que el servico de mongo este funcionando para ejecutarse. Para finalizar, las variables de entornos, le asociaremos la "network" y pondremos el "restart" para que se reinicie automaticamente en caso de error.

```
#Servicio de Mongo con express para monitorizar y administrar la base de datos con una iterface
  mongo-express:
    image: mongo-express
    container_name: adminMongo_container
    depends_on:
      - mongodb
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongo_container
    ports:
      - "8081:8081"
    restart: always
    networks:
      - practica_net
```

## 🔹Contenedor / Servicio [LOADBALANCER](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/loadbalancer) :
- Este servicio se encargará de  implementar un sistema de balanceo de carga/proxy en nuestro página. Partirá de una imagen de nginx, crearemos un volumen en el cual,cogeremos el [archivo de configuración de nginx](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/loadbalancer/nginx.conf) y lo asociaremos a "/etc/nginx/nginx.conf", Por otra parte, le asignaremos el puerto 8082:80 y ejecutará el comando de " nginx -g 'daemon off;'" que se encargará de poner en marcha el servicio. Para finalizar, le añadiremos la "network" y el "restart" automático.

```
#Servicio de Loadbalancer para repartir o administrar la carga 
  loadbalancer_nginx:
    image: nginx
    container_name: loadbalancer
    volumes:
      - "./loadbalancer/nginx.conf:/etc/nginx/nginx.conf"
    networks:
      - practica_net
    ports:
      - "8082:80"
    restart: always
    command: nginx -g 'daemon off;'
```
- Tendremos que modificar en el backend el router ([idex.js](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/backend/app/routes/index.js)) y añadir "/api" 
- Además hemos tenido que modificar todos los "servicies" en el frontend para poder realizar las redirecciones correctamente.
    - [Service Category](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/src/app/core/services/category.service.ts)
    - [Service Comment](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/src/app/core/services/comment.service.ts)
    - [Service Product](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/src/app/core/services/product.service.ts)
    - [Service Profile](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/src/app/core/services/profile.service.ts)
    - [Service User](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/frontend/src/app/core/services/user.service.ts)
     


## 🔹Contenedor / Servicio [PROMETHEUS](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/prometheus) :
- Este servicio se encargará de la monitorización de las metricas, el servicio partirá de una imagen de prometheus:v2.20.1, el cual le asignaremos el nombre de "prometheus_practica" y asociaremos a el puerto 9090:9090. Por otra parte creremos un volumen, el cual tendra le pasará la [configuración de prometheus](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/prometheus/prometheus.yml). Por último, le añadiremos la "network" como a los otros servicios y asignaremos el comando de "--config.file=/etc/prometheus/prometheus.yml" para asignarle el archivo de configuración que hemos nombrado anteriormente.

```
#Servicio de Prometheus para monitorizar las metricas
  prometheus:
    image: prom/prometheus:v2.20.1
    ports:
      - "9090:9090"
    container_name: prometheus_practica
    volumes:
    - "./prometheus/:/etc/prometheus"
    networks:
      - practica_net
    command: --config.file=/etc/prometheus/prometheus.yml
```

## 🔹Contenedor / Servicio [GRAFANA](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/prometheus) :
- Este servicio se encargará de la visualización y el formato de datos métricos del Prometheus.Para ello partiremos de una imagen de grafana:7.1.5, el nombre del contendor "grafana_practica",el cual asociaremos a los puertos 3500:3000. Por otra parte crearemos un volumen el cual se encargará de la [configuración de grafana](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/prometheus/datasources.yml) la cual se encuentra dentro de la carpeta [prometheus](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/prometheus) y otro volumen  creado en el docker-compose myGrafanaVol asociandolo a var/lib/grafana. Seguidamente le idicamos el [archivo .env](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/prometheus/.env) que contiene las variables de entorno, Por ultimo le asignaremos la "network" para la comunicación con los otros servicios y lo cofiguraremos para que se ejecute cuando el servico de "prometheus" funcione correctamente.

```
#Servicio de Grafana, nos permite la visualización y el formato de datos métricos del Prometheus
  grafana:
    image: grafana/grafana:7.1.5
    container_name: grafana_practica
    restart: always
    ports:
      - "3500:3000"
    volumes:
      - ./prometheus/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
      - myGrafanaVol:/var/lib/grafana
    env_file:
      - ./prometheus/.env
    depends_on:
      - prometheus
    networks:
      - practica_net
```
- Para comprobar el uso de grafana, entraemos [aqui]{(http://localhost:3500):
    - Pulsaremos en el ➕ , CREATE, New panel
    - Configuraremos las métricas bajo a la izquierda, por ejemplo seleccionaremos "counterMessageEndpoint"
    - Guardaremos el Dashboard arriba a la derecha.
    - Por último, para comprobar que funciona correctamente, ponemos en otra ventana del navegador "http://localhost:3000/message" o pulsa [aqui](http://localhost:3000/message)
    - Si vuleves al dashboard de grafana deberías de ver una modificación en el gráfico.


# 🖇 Redirecciones para cada uno de los servicios
- [Backend_Products](http://localhost:3000/api/product) 
- [Backend_Categories](http://localhost:3000/api/category) 
- [Frontend](http://localhost:4200) 
- [Loadbalancer_Backend_Products](http://localhost:8082/api/product) 
- [Loadbalancer_Backend_Categories](http://localhost:8082/api/category) 
- [Loadbalncer_Frontend](http://localhost:8082/)  
- [Mongo-Express](http://localhost:8081)
- [Prometheus](http://localhost:9090/targets)
- [Prometheus Metrics](http://localhost:3000/metrics)
- [Graphana](http://localhost:3500)

