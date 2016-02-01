# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "scotch/box"
    config.vm.network "private_network", ip: "192.168.33.10"
    config.vm.hostname = "scotchbox"
    config.vm.synced_folder "drivel-app._app/client", "/home/vagrant/drivel/app/client", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "drivel-app._app/lib", "/home/vagrant/drivel/app/lib", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "drivel-app._app/packages", "/home/vagrant/drivel/app/packages", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "drivel-app._app/private", "/home/vagrant/drivel/app/private", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "drivel-app._app/public", "/home/vagrant/drivel/app/public", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.synced_folder "drivel-app._app/server", "/home/vagrant/drivel/app/server", :mount_options => ["dmode=777", "fmode=666"]
    config.vm.network "forwarded_port", guest: 3000, host: 3000

    # Optional NFS. Make sure to remove other synced_folder line too
    #config.vm.synced_folder ".", "/var/www", :nfs => { :mount_options => ["dmode=777","fmode=666"] }
end
