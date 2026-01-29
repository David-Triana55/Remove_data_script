# Scripts SQL para limpieza de datos

## Archivos de scripts

Los scripts SQL se encuentran en la carpeta `scripts/`:

* **`removeAuth.sql`** → Elimina datos relacionados con autenticación
* **`removeAdminManagement.sql`** → Elimina datos de gestión administrativa

---

## Ejecución de scripts con Docker Compose

### Prerrequisitos

Asegúrate de tener configurado el archivo `.env` con las variables de entorno que están como `.env.example`.

### Ejecutar limpieza de datos

```bash
docker compose run --rm clean-db
```

Este comando:
1. Levanta un contenedor temporal con PostgreSQL Client
2. Conecta a la base de datos configurada
3. Ejecuta los scripts SQL de limpieza
4. Elimina el contenedor automáticamente al terminar


## Modificar los scripts

Puedes editar los archivos `.sql` en la carpeta `scripts/` para personalizar las operaciones de limpieza según las necesidades específicas.

