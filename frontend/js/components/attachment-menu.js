function AttachmentMenu({ onSelect, onClose }) {
  const options = [
    { type: "image", label: "Image", hint: "PNG, JPG, JPEG" },
    { type: "audio", label: "Audio", hint: "MP3" },
    { type: "video", label: "Video", hint: "MP4, up to 100 MB" },
  ];

  return e(
    "div",
    { className: "attachment-menu" },
    e("p", { className: "attachment-title" }, "Attach a file"),
    options.map((opt) =>
      e(
        "button",
        {
          key: opt.type,
          type: "button",
          className: "attachment-option",
          onClick: () => onSelect(opt.type),
        },
        e("span", { className: "attachment-label" }, opt.label),
        e("span", { className: "attachment-hint" }, opt.hint)
      )
    ),
    e("button", { type: "button", className: "attachment-cancel", onClick: onClose }, "Cancel")
  );
}
