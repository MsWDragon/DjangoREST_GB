#!/bin/sh
# wait-for-postgres.sh
set -e
host="$1"
shift
until PGPASSWORD="todoapp_pass" psql -h "$host" -d "todo" -U "todoapp_login" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done
>&2 echo "Postgres is up - executing command"
exec "$@"
