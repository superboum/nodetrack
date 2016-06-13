nodetrack
=========

![A screenshot of NodeTrack](http://dufour.tk/~quentin/img/nodetrack.png)

A quick'n'dirty torrent tracker, mainly used to share files faster during a LAN party.

Installation
-------------

Installation steps will be provided for debian stable, **run as root** :

```
curl -sL https://deb.nodesource.com/setup_4.x | bash -
apt-get install -y nodejs build-essential
```

You can find instruction to install Node.JS for other platform [on the official website](https://nodejs.org/en/download/package-manager).

Check that your installed version is superior to 0.12.0 :

```
node -v
```

*If your system can't find the command `node`, it might be because it's installed as `nodejs`. You may encounter some problem with npm if your command is not named node. You can add a symlink (as root) : `ln -s /usr/bin/nodejs /usr/bin/node` or use a cleaner approach with the tool update-alternatives, a package named node-legacy or whatever you can imagine*.

Now, you can install and configure nodetrack :

```bash
git clone https://github.com/superboum/nodetrack
cd nodetrack
npm install
cp config.sample.json config.json
```

Now you can edit config.json to fit your needs, the default configuration should be :

```
{
    "interface_port": 80,
    "tracker_port": 6969,
    "hostname": "tracker.deuxfleurs.fr"
}
```

 * `hostname` is your torrent tracker hostname. It's only used to display torrent tracker but will not be used internally. Could be what you want, even an IP address.
 * `interface_port` corresponds to the web interface port. If you change it to 3000, you'll access your torrent tracker interface by using `http://my.hostname.com:3000`.
 * `tracker_port` corresponds to the tracker port. It will be used by your torrent software.

*Please note that if you set a port below 1024 (which is the case in the default configuration file), you will have to run this app with administrator rights (as root or with sudo).*

Once set, you can run the application :

```
node --harmony app.js
```

And now your app should be live !
