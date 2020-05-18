package media

import (
	"net/http"

	"github.com/gorilla/mux"

	"github.com/777777miSSU7777777/go-ass/middleware"
)

func NewMediaRouter(r *mux.Router, api MediaAPI) http.Handler {
	s := r.PathPrefix("/media").Subrouter()
	s.Use(middleware.AllowCorsMiddleware)

	s.Methods("GET").Path("/{id}/stream/").HandlerFunc(api.Stream)
	s.Methods("GET").Path("/{id}/stream/{quality_manifest}").HandlerFunc(api.Stream)
	s.Methods("GET").Path("/{id}/stream/{seg:seg[0-9]+_(?:64k|?:96k|?:128k|?:192k).ts}").HandlerFunc(api.Stream)
	s.Methods("GET").Path("/{id}/download").HandlerFunc(api.Download)
	s.Methods("GET").Path("/cover-pics/track/{id}").HandlerFunc(api.ServeTrackCoverPic)
	s.Methods("GET").Path("/cover-pics/playlist/{id}").HandlerFunc(api.ServePlaylistCoverPic)

	return r
}
