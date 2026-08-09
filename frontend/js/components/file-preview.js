function FilePreview({ file, type, onRemove }) {
  const url = file.preview;
  const sizeMb = file.size ? (file.size / (1024 * 1024)).toFixed(1) : "0";

  return e(
    "div",
    { className: "file-preview", "data-type": type },
    type === "image" &&
      e(
        "div",
        { className: "preview-media" },
        e("img", { src: url, alt: "Image preview" })
      ),
    type === "audio" &&
      e(
        "div",
        { className: "preview-audio" },
        e("span", { className: "audio-icon" }, "🎵"),
        e(
          "div",
          { className: "audio-meta" },
          e("span", { className: "preview-filename" }, file.name),
          e("audio", { controls: true, src: url }, "Your browser does not support the audio element.")
        )
      ),
    type === "video" &&
      e(
        Fragment,
        null,
        e(
          "div",
          { className: "preview-media" },
          e("video", { controls: true, src: url }, "Your browser does not support the video element.")
        ),
        e(
          "div",
          { className: "preview-meta" },
          e("span", { className: "preview-filename" }, file.name),
          e("span", { className: "preview-size" }, `${sizeMb} MB`)
        )
      ),
    e("button", { className: "preview-remove", type: "button", onClick: onRemove }, "Remove ✕")
  );
}
