# Usamos una imagen base con Node.js preinstalado
FROM node:18 AS build

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos el package.json y package-lock.json (o yarn.lock)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación
RUN npm run build

# Usamos una imagen base más ligera para servir la aplicación
FROM nginx:alpine

# Copiamos los archivos construidos desde el contenedor de build
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# Comando para iniciar Nginx en el contenedor
CMD ["nginx", "-g", "daemon off;"]
