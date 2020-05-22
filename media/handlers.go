package media

import (
	"net/http"

	"github.com/gorilla/mux"
)

type MediaAPI struct {
	m MediaManager
}

func NewMediaAPI(m MediaManager) MediaAPI {
	return MediaAPI{m}
}

func (a MediaAPI) Stream(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	seg, segOk := vars["seg"]
	if !segOk {
		qualityManifest, qualityOk := vars["quality_manifest"]
		if !qualityOk {
			a.m.ServeMasterM3u8(w, r, id)
			return
		}
		a.m.ServeQualityM3u8(w, r, id, qualityManifest)
	} else {
		a.m.ServeTs(w, r, id, seg)
	}
}

func (a MediaAPI) Download(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	a.m.ServerMp3(w, r, id)
}

func (a MediaAPI) ServeTrackCoverPic(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	a.m.ServeTrackCoverPic(w, r, id)
}

func (a MediaAPI) ServePlaylistCoverPic(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]

	a.m.ServePlaylistCoverPic(w, r, id)
}
