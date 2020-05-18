package api

import (
	"encoding/base64"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
)

var FileUploadError = "FILE UPLOAD ERROR"
var FileReadError = "FILE READ ERROR"
var FileWriteError = "FILE WRITE ERROR"
var ParseFormError = "PARSE FORM ERROR"
var HLSError = "HLS ERROR"
var DeleteAudioError = "DELETE AUDIO ERROR"
var FileExtensionError = "FILE EXTENSION ERROR"
var CoverPicFileSizeError = "COVER PIC FILE SIZE ERROR"
var DeleteCoverPicError = "DELETE COVER PIC ERROR"
var AudioFileSizeError = "AUDIO FILE SIZE ERROR"

type FileManager struct {
	baseLocation               string
	mainManifestTemplateString string
}

func NewFileManager(base string) FileManager {
	mainManifestTemplateString := "#EXTM3U\n" +
		"#EXT-X-STREAM-INF:BANDWIDTH=64000\n" +
		"%s_64k.m3u8\n" +
		"#EXT-X-STREAM-INF:BANDWIDTH=96000\n" +
		"%s_96k.m3u8\n" +
		"#EXT-X-STREAM-INF:BANDWIDTH=128000\n" +
		"%s_128k.m3u8\n" +
		"#EXT-X-STREAM-INF:BANDWIDTH=192000\n" +
		"%s_192k.m3u8\n"

	return FileManager{base, mainManifestTemplateString}
}

func (m FileManager) Upload(w http.ResponseWriter, base64audio string, id string) error {
	audioBytes, err := base64.StdEncoding.DecodeString(base64audio)
	if err != nil {
		writeError(w, 400, FileReadError, fmt.Errorf("error while reading file: %v", err))
		return err
	}

	if len(audioBytes) > 20971520 {
		writeError(w, 400, AudioFileSizeError, fmt.Errorf("audio file size error: %v", err))
		return fmt.Errorf("audio file size error: %v", err)
	}

	err = os.MkdirAll(fmt.Sprintf("%s/storage/%s/mp3", m.baseLocation, id), 0755)
	if err != nil {
		writeError(w, 500, FileWriteError, fmt.Errorf("error while writing file: %v", err))
		return err
	}

	file, err := os.Create(fmt.Sprintf("%s/storage/%s/mp3/%s.mp3", m.baseLocation, id, id))
	if err != nil {
		writeError(w, 500, FileWriteError, fmt.Errorf("error while writing file: %v", err))
		return err
	}
	defer file.Close()

	_, err = file.Write(audioBytes)
	if err != nil {
		writeError(w, 500, FileWriteError, fmt.Errorf("error while writing file: %v", err))
		return err
	}

	err = m.transcodeToHLS(id)
	if err != nil {
		writeError(w, 500, HLSError, fmt.Errorf("error while transcoding to hls: %v", err))
		return err
	}

	return nil
}

func (m FileManager) UploadCoverPic(w http.ResponseWriter, r *http.Request, base64pic string, picDst string, id string) error {
	coverPicBytes, err := base64.StdEncoding.DecodeString(base64pic)
	if err != nil {
		writeError(w, 400, FileReadError, fmt.Errorf("error while reading file: %v", err))
		return err
	}

	if len(coverPicBytes) > 307200 {
		writeError(w, 400, CoverPicFileSizeError, fmt.Errorf("cover pic file size error"))
		return fmt.Errorf("cover pic file size error")
	}

	_, err = m.getFileExtensionByMIMEType(coverPicBytes)
	if err != nil {
		writeError(w, 400, FileExtensionError, err)
	}

	file, err := os.Create(fmt.Sprintf("%s/%s/%s", m.baseLocation, picDst, id))
	if err != nil {
		writeError(w, 500, FileWriteError, fmt.Errorf("error while writing file: %v", err))
		return err
	}
	defer file.Close()

	_, err = file.Write(coverPicBytes)
	if err != nil {
		writeError(w, 500, FileWriteError, fmt.Errorf("error while writing file: %v", err))
		return err
	}

	return nil
}

func (m FileManager) getFileExtensionByMIMEType(pic []byte) (string, error) {
	mimeType := http.DetectContentType(pic)
	switch mimeType {
	case "image/jpeg":
		return "jpeg", nil
	case "image/png":
		return "png", nil
	case "image/webp":
		return "webp", nil
	default:
		return "", fmt.Errorf("unknown image extension error")
	}
}

func (m FileManager) transcodeToHLS(id string) error {
	err := os.MkdirAll(fmt.Sprintf("%s/storage/%s/hls", m.baseLocation, id), 0755)
	if err != nil {
		return err
	}

	cmd := exec.Command("ffmpeg",
		"-i", fmt.Sprintf("%s/storage/%s/mp3/%s.mp3", m.baseLocation, id, id),

		"-vn", "-ac", "2", "-acodec", "libmp3lame", "-b:a", "64k", "-map", "0:a:0",
		"-hls_playlist_type", "vod", "-hls_time", "5", "-hls_segment_filename",
		fmt.Sprintf("%s/storage/%s/hls/seg%s_64k.ts", m.baseLocation, id, "%02d"), fmt.Sprintf("%s/storage/%s/hls/%s_64k.m3u8", m.baseLocation, id, id),

		"-vn", "-ac", "2", "-acodec", "libmp3lame", "-b:a", "96k", "-map", "0:a:0",
		"-hls_playlist_type", "vod", "-hls_time", "5", "-hls_segment_filename",
		fmt.Sprintf("%s/storage/%s/hls/seg%s_96k.ts", m.baseLocation, id, "%02d"), fmt.Sprintf("%s/storage/%s/hls/%s_96k.m3u8", m.baseLocation, id, id),

		"-vn", "-ac", "2", "-acodec", "libmp3lame", "-b:a", "128k", "-map", "0:a:0",
		"-hls_playlist_type", "vod", "-hls_time", "5", "-hls_segment_filename",
		fmt.Sprintf("%s/storage/%s/hls/seg%s_128k.ts", m.baseLocation, id, "%02d"), fmt.Sprintf("%s/storage/%s/hls/%s_128k.m3u8", m.baseLocation, id, id),

		"-vn", "-ac", "2", "-acodec", "libmp3lame", "-b:a", "192k", "-map", "0:a:0",
		"-hls_playlist_type", "vod", "-hls_time", "5", "-hls_segment_filename",
		fmt.Sprintf("%s/storage/%s/hls/seg%s_192k.ts", m.baseLocation, id, "%02d"), fmt.Sprintf("%s/storage/%s/hls/%s_192k.m3u8", m.baseLocation, id, id))

	err = cmd.Run()
	if err != nil {
		return err
	}

	mainManifestContent := []byte(fmt.Sprintf(m.mainManifestTemplateString, id, id, id, id))
	err = ioutil.WriteFile(fmt.Sprintf("%s/storage/%s/hls/%s.m3u8", m.baseLocation, id, id), mainManifestContent, 0755)
	if err != nil {
		return err
	}

	return nil
}

func (m FileManager) Delete(w http.ResponseWriter, id string) error {
	err := os.RemoveAll(fmt.Sprintf("%s/storage/%s", m.baseLocation, id))
	if err != nil {
		writeError(w, 400, DeleteAudioError, fmt.Errorf("error while deleting audio: %v", err))
		return err
	}

	return nil
}

func (m FileManager) DeleteCoverPic(w http.ResponseWriter, picLoc string, id string) error {
	err := os.Remove(fmt.Sprintf("%s/%s/%s", m.baseLocation, picLoc, id))
	if err != nil {
		writeError(w, 400, DeleteCoverPicError, fmt.Errorf("error while deleting cover pic: %v", err))
		return err
	}

	return nil
}
