package main

import (
	"encoding/json"
	"net/http"
	"strings"

	"github.com/rs/cors" // CORS is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served
)

// Default to wave emoji
var currentEmoji string = "👋"

// Define a whitelist of common positive/friendly emojis
var emojiWhitelist string = "😀😄😊🤩👋🙏✨💻👾"

// Define a struct to represent the request body for setting the emoji
type EmojiRequest struct {
	Emoji string `json:"emoji"`
}

func main() {
	// Use CORS middleware
	handler := cors.Default().Handler(http.DefaultServeMux)

	// Define routes
	http.HandleFunc("/get-emoji", GetEmojiHandler)
	http.HandleFunc("/set-emoji", SetEmojiHandler)
	http.HandleFunc("/get-emoji-whitelist", GetEmojiWhiteListHandler)

	// Start server on port 8080
	port := ":8080"
	println("Server is running on", port)

	// Listen and serve using the CORS middleware handler
	http.ListenAndServe(port, handler)
}

// #region Handlers

// GetEmojiHandler returns the current emoji
func GetEmojiHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{"emoji": currentEmoji}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// SetEmojiHandler sets the current emoji to the emoji specified in the request body if it is whitelisted
func SetEmojiHandler(w http.ResponseWriter, r *http.Request) {
	var request EmojiRequest
	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	var retEmoji = isValidEmoji(request.Emoji)
	if retEmoji == -1 {
		http.Error(w, "Invalid emoji: must be a singular emoji", http.StatusBadRequest)
		return
	}
	if retEmoji == -2 {
		http.Error(w, "Invalid emoji "+request.Emoji+" : must be in whitelist", http.StatusBadRequest)
		return
	}

	currentEmoji = request.Emoji

	response := map[string]string{"message": "Emoji updated successfully"}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

// GetEmojiWhiteListHandler returns the current emoji whitelist
func GetEmojiWhiteListHandler(w http.ResponseWriter, r *http.Request) {
	response := map[string]string{"emojiWhitelist": emojiWhitelist}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
// #endregion

// helper funciton for determining if the emoji is valid
func isValidEmoji(emoji string) int {

	// check if the length of the emoji is 1
	if len([]rune(emoji)) != 1 { // len([]rune(emoji)) returns the number of characters in the string, required as emojis don't have a fixed length
		return -1
	}

	// Check if the emoji is in the whitelist
	if !strings.Contains(emojiWhitelist, emoji) {
		return -2
	}

	return 0
}
