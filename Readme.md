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

- Por ultimo, pondremos el cotenedor en marcha (el ***"--build"*** es opcional, lo utilizaremos para volver a crear la imagen): 
```
sudo docker compose up --build
```

# Documentación del proyecto:

## DOCKER-COMPOSE:
En el [docker-compose](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/blob/master_docker_compose/docker-compose.yml) es el archivo que se encargara de ejecutar cada uno de los servicios que componene la aplicación. En Wishpop hemos configurado los siguientes servicios:
- mongodb
- backend
- frontend
- mongo-express
- loadbalancer_nginx
- prometheus
- grafana

## Contenedor / Servicio [MONGODB](https://github.com/Vicent29/Project-Second_Hand-Express-Mongo-Angular-/tree/master_docker_compose/mongo) :

## Contenedor / Servicio BACKEND :

## Contenedor / Servicio FRONTEND :

## Contenedor / Servicio MONGO-EXPRESS :

## Contenedor / Servicio LOADBALANCER :

## Contenedor / Servicio PROMETHEUS :

## Contenedor / Servicio GRAFANA :


# 🖇 Redirecciones para cada uno de los servicios
- [Backend_Products](http://localhost:3000/api/product) 
- [Backend_Categories](http://localhost:3000/api/category) 
- [Frontend](http://localhost:4200) 
- [Loadbalancer_Backend_Products](http://localhost:8082/api/product) 
- [Loadbalancer_Backend_Categories](http://localhost:8082/api/category) 
- [Loadbalncer_Frontend](http://localhost:8082/)  
- [Mongo-Express](http://localhost:8081)
- [Prometheus](http://localhost:9090)
- [Prometheus Metrics](http://localhost:3000/metrics)
- [Graphana](http://localhost:3500)
- [Dashboard-example_Message_Graphana](http://localhost:3500/d/TcMVUrOVz/dashboard-message?orgId=1)

