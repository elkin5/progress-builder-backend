# Usa la imagen base de Node.js oficial
FROM node:20 AS build

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package*.json webpack.config.js ./

# Instala las dependencias incluyendo las de desarrollo
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Compila la aplicación con Webpack
RUN npm run build

# Segunda fase: Crear una imagen mínima para producción
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo los archivos necesarios desde la imagen de compilación
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./

# Instala solo las dependencias de producción
RUN npm install --production

# Expone el puerto en el que la aplicación escuchará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/bundle.js"]