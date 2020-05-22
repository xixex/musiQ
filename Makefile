.PHONY: fmt
fmt:
	goimports -w ./

.PHONY: build
build:
	go build

.PHONY: run
run: 
	[ -d $(HOME)/.goass/storage ] || mkdir -p $(HOME)/.goass/storage
	[ -d $(HOME)/.goass/tracks_pics ] || mkdir -p $(HOME)/.goass/tracks_pics
	[ -d $(HOME)/.goass/playlists_pics] || mkdir -p $(HOME)/.goass/playlists_pics
	docker-compose up --build