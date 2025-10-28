# Script para limpieza de datos

## Archivos de configuración

* **`mongo/collections.json`** y **`pg/tables.json`**: eliminan todos los datos de las bases de datos.
* **`mongo/delete-example.json`** y **`pg/delete-example.json`** → ejemplos de eliminación condicional, que se pueden modificar según tus necesidades.

**Nota:**
Por seguridad, el archivo importado en `index.js` de cada tipo de base de datos es **`delete-example.json`**, ya que `collections.json` y `tables.json` borran todas las tablas/colecciones.

Si quieres personalizar la limpieza, edita `delete-example.json` en la carpeta correspondiente y asegúrate de importarlo en `index.js`.

## Ejemplos de configuración

### PostgreSQL `pg/delete-example.json`

En PostgreSQL, los nombres de tablas y columnas son sensibles a mayúsculas/minúsculas.
Por eso deben ir entre comillas escapadas (`\"...\"`).
El campo `where` debe escribirse en SQL nativo.

```json
{
  "name": "\"Users\"", -> nombre de la tabla
  "where": "\"Id\" <> 'd5f11311-5a2d-42a0-a462-b5d52d4ea90b'" -> filtro de SQL
}
```
---

### MongoDB `mongo/delete-example.json`

En MongoDB, el campo `where` debe escribirse en formato de filtros de MongoDB.

```json
{
  "name": "CoursesDomainCopy", -> nombre del documento
  "collections": [
    {
      "name": "CategoryModel", -> nombre de la colección
      "where": { "Name": "Prueba 6" } -> filtro de MongoDB
    }
  ]
}
```

---

## Ejecución del script

El script requiere dos parámetros obligatorios:

* `--db`: tipo de base de datos (`mongo` o `postgres`)
* `--connection`: cadena de conexión a la base de datos

---

### Ejecución con Node.js

Instalación de dependencias:

```bash
npm install
```

#### MongoDB


```bash
node main.js --db=mongo --connection="mongodb://localhost:27017/"
```

#### PostgreSQL

```bash
node main.js --db=postgres --connection="postgres://username:password@localhost:5432/databaseName"
```

---

### Ejecución con Docker

Construcción de la imagen:

   ```bash
   docker build -t mydb .
   ```


#### Ejecución de la imagen MongoDB

```bash
docker run --rm mydb node main.js --db=mongo --connection="mongodb://localhost:27017/"
```

#### Ejecución de la imagen PostgreSQL

```bash
docker run --rm mydb node main.js --db=postgres --connection="postgres://postgres:1234@host:5432/UsersQueries"
```

Cada vez que modifiques los scripts o los JSON, se debe reconstruir la imagen y volver a ejecutar el contenedor.

