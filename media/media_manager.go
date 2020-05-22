package media

import (
	"fmt"
	"net/http"
)

type MediaManager struct {
	baseLocation string
}

func NewMediaManager(base string) MediaManager {
	return MediaManager{base}
}

func (m MediaManager) ServeMasterM3u8(w http.ResponseWriter, r *http.Request, id string) {
	m3u8File := fmt.Sprintf("%s/storage/%s/hls/%s.m3u8", m.baseLocation, id, id)
	http.ServeFile(w, r, m3u8File)
	w.Header().Set("Content-Type", "application/x-mpegURL")
}

func (m MediaManager) ServeQualityM3u8(w http.ResponseWriter, r *http.Request, id string, qualityManifest string) {
	m3u8File := fmt.Sprintf("%s/storage/%s/hls/%s", m.baseLocation, id, qualityManifest)
	http.ServeFile(w, r, m3u8File)
	w.Header().Set("Content-Type", "application/x-mpegURL")
}

func (m MediaManager) ServeTs(w http.ResponseWriter, r *http.Request, id string, seg string) {
	tsFile := fmt.Sprintf("%s/storage/%s/hls/%s", m.baseLocation, id, seg)
	http.ServeFile(w, r, tsFile)
	w.Header().Set("Content-Type", "video/MP2T")
}

func (m MediaManager) ServerMp3(w http.ResponseWriter, r *http.Request, id string) {
	mp3File := fmt.Sprintf("%s/storage/%s/mp3/%s.mp3", m.baseLocation, id, id)
	http.ServeFile(w, r, mp3File)
	w.Header().Set("Content-Type", "audio/mpeg")
}

func (m MediaManager) ServeTrackCoverPic(w http.ResponseWriter, r *http.Request, id string) {
	coverPic := fmt.Sprintf("%s/tracks_pics/%s", m.baseLocation, id)
	http.ServeFile(w, r, coverPic)
}

func (m MediaManager) ServePlaylistCoverPic(w http.ResponseWriter, r *http.Request, id string) {
	coverPic := fmt.Sprintf("%s/playlists_pics/%s", m.baseLocation, id)
	http.ServeFile(w, r, coverPic)
}
