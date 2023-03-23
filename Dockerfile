# Basis-Image auswählen
FROM nginx:latest

# Arbeitsverzeichnis festlegen
WORKDIR /usr/share/nginx/html

# Kopieren Sie den Inhalt Ihrer Website in das Arbeitsverzeichnis
COPY . .

# Port freigeben
EXPOSE 80