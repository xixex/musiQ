package api

type AddTrackRequest struct {
	Author    string `json:"author"`
	Title     string `json:"title"`
	AudioFile string `json:"audio_file"`
	CoverPic  string `json:"cover_pic"`
}

type GetTrackByIDRequest struct{}

type UpdateTrackByIDRequest struct {
	Author string `json:"author"`
	Title  string `json:"title"`
}

type DeleteTrackByIDRequest struct{}

type SignUpRequest struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Password string `json:"password"`
}

type SignInRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type RefreshTokenRequest struct {
	RefreshToken string `json:"refresh_token"`
}

type SignOutRequest RefreshTokenRequest

type AddTrackToUserTrackListRequest struct {
	TrackID string `json:"trackID"`
}

type RemoveTrackFromUserTrackListRequest AddTrackToUserTrackListRequest

type GetUserTrackListRequest struct{}

type GetAllPlaylistsRequest struct{}

type GetUserPlaylists struct{}

type GetPlaylistByIDRequest struct{}

type DeletePlaylistByIDRequest struct{}

type CreateNewPlaylistRequest struct {
	Title     string   `json:"title"`
	TrackList []string `json:"tracklist"`
	CoverPic  string   `json:"cover_pic"`
}

type AddTracksToPlaylistRequest struct {
	TrackList []string `json:"tracklist"`
}

type RemoveTracksFromPlaylistRequest AddTracksToPlaylistRequest
