# VirtualDev Server

## Qu'est-ce que VirtualDev ?

**VirtualDev** est un ensemble de bibliothèques JavaScript qui permet de développer des applications 3D immersives s'exécutant dans des navigateurs modernes.

**VirtualDev-Server** est un ensemble de composants logiciels qui regroupe la bibliothèque VirtualDev ainsi que tous les services logiciels nécessaires pour communiquer avec divers appareils (casque VR, objets connectés). 

## Comment utiliser VirtualDev-Server ?

**VirtualDev-Server** est constitué de plusieurs outils logiciels nécessaires pour communiquer avec son environnement. On retrouve un serveur Web HTTPS (Caddy) pour servir vos pages Web, ainsi qu'un serveur MQTT (Mosquitto) pour dialoguer avec des objets connectés.

Pour faciliter l'installation de VirtualDev-Server sur sa machine, celui-ci est disponible sous forme d'une image Docker, qui sera lancée dans un conteneur sur sa propre machine.

### Prérequis

Pour pouvoir utiliser l'image Docker de VirtualDev-Server, vous devez avoir le logiciel `docker` installé sur votre machine.

> Un excellent site pour apprendre à [Installer Docker sur Linux, Windows et macOS](https://blog.stephane-robert.info/docs/conteneurs/moteurs-conteneurs/docker/installation/).

De plus, un éditeur de code est necessaire pour modifier le code source de votre projet (par exemple [Visual Studio Code](https://code.visualstudio.com/)).

### Récupérer le projet VirtualDev-Server

> Pour récupérer le projet VirtualDev-Server, je conseille l'utilisation de l'outil `git` pour une mise à jour facile et rapide. Pour installer Git sur votre machine, suivre les instructions [ici](https://git-scm.com/download).

- Récupérer le projet VirtualDev-Server soit en le clonant (solution recommandée), soit en téléchargeant le fichier ZIP.

    - Pour cloner le projet, saisir la commande suivante dans un terminal:

    ```bash
    git clone https://github.com/LD2Studio/VirtualDev-Server.git
    ```
    - Pour télécharger le projet, cliquer sur le bouton vert (`<> Code`) sur la page du projet et télécharger le fichier ZIP. Dézipper le fichier.

### Construire l'image de VirtualDev-Server

L'image de VirtualDev-Server n'est pas fournie avec le projet VirtualDev-Server; il faut la construire sur sa machine.

- Lancer **Visual Studio Code** et ouvrir le dossier `VirtualDev-Server/`.
- Ouvrir un terminal dans Visual Studio Code (Menu `Terminal` > `Nouveau Terminal` ou le raccourci `CTRL+J`).
- Dans le terminal, saisir la commande suivante pour construire l'image de VirtualDev-Server:
    ```bash
    docker build -t vdev-server .
    ```
    > Ne pas oublier le `.` à la fin de la commande.
- Vérifier que l'image de VirtualDev-Server a bien été construite.

    ```bash
    docker images
    ```
    > Vous devriez voir l'image de VirtualDev-Server sous le nom `vdev-server`.

### Lancer VirtualDev-Server

Maintenant que votre image est construite, vous pouvez lancer une instance de l'image de VirtualDev-Server (appelée *conteneur*).

- Dans le terminal, saisir la commande suivante:
    ```bash
    docker compose up
    ```
- Ouvrir un navigateur Web et saisir `localhost` dans la barre d'adresse.

- Une page avec plusieurs dossiers apparaît. Le dossier `examples` contient plusieurs exemples de projet pour voir ce que l'on peut faire avec `VirtualDev-Server`. Le dossier `projects` permet de lancer vos projets locaux qui sont placés dans le dossier `virtualdev-server/projects`.

- Pour stopper l'instance de VirtualDev-Server, saisir la commande suivante :
    ```bash
    docker compose down
    ```

### Accéder à VirtualDev-Server depuis une machine extérieure

> **Avertissement** : Les machines extérieures doivent être connectées au même réseau local utilisé par la machine qui exécute le serveur VirtualDev.

Pour pouvoir accéder au serveur VirtualDev depuis une machine extérieure (comme un navigateur d'un casque VR ou un objet connecté), il faut indiquer le nom de votre machine, appelé `HOSTNAME`.

Le nom de votre machine est obtenu de différentes manières suivant votre système d'exploitation :

- Sous Linux, taper dans un terminal `hostname`,
- Sous Windows, taper dans un invité de commande (cmd) `hostname`.
- Sous MacOS, taper dans un terminal `hostname`.

- Créer un fichier nommé `hostname` dans le sous-dossier `virtualdev-server/config`, puis éditer le et saisir le nom de votre machine simplement.

- Quand vous lancer de nouveau votre serveur VirtualDev, celui-ci sera maintenant accessible en tapant l'adresse `<hostname>.local` dans le navigateur de la machine externe.

### Importation de bibliothèques JavaScript

Les bibliothèques JavaScript utilisées dans ce projet (Three.js, MQTT, etc.) sont disponibles dans l'image **vdev-server**, mais elles ne sont pas visibles depuis votre machine et l'éditeur **Visual Studio Code** ne peut pas y accéder pour la complétion de code et la documentation de VirtualDev.

Si vous souhaitez avoir une copie des bibliothèques, exécutez la commande suivante :

```bash
docker cp vdev-server:/home/www/node_modules ./projects
```
