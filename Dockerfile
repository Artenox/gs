# Basis-Image auswählen
FROM nginx:latest

# Arbeitsverzeichnis festlegen
WORKDIR /usr/share/nginx/html

# Kopieren Sie den Inhalt Ihrer Website in das Arbeitsverzeichnis
COPY !(*Dockerfile|*.yml|*.git*|.vscode*) .

# Port freigeben
EXPOSE 80