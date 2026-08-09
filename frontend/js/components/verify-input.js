const MAX_CHARS = 5000;
const ACCEPT = {
  image: "image/png,image/jpeg",
  audio: "audio/mpeg,audio/mp3",
  video: "video/mp4",
};

function VerifyInput({ text, onTextChange, file, fileType, onFileSelect, onRemoveFile, loading, onSubmit }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [text]);

  useEffect(() => {
    if (menuOpen) setMenuOpen(false);
  }, [fileType, text]);

  function pickFile(type) {
    setMenuOpen(false);
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ACCEPT[type];
    input.onchange = (event) => {
      const chosen = event.target.files && event.target.files[0];
      if (chosen) onFileSelect(chosen, type);
    };
    input.click();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    onSubmit();
  }

  const hasContent = text.trim().length > 0 || file !== null;

  return e(
    "form",
    { className: `verify-input ${file ? "with-file" : ""}`, onSubmit: handleSubmit },
    file && e(FilePreview, { file, type: fileType, onRemove: onRemoveFile }),
    e(
      "div",
      { className: "input-row" },
      e("textarea", {
        ref: inputRef,
        className: "verify-textarea",
        placeholder: "What would you like to verify?",
        value: text,
        maxLength: MAX_CHARS,
        disabled: loading || file !== null,
        onChange: (event) => onTextChange(event.target.value),
        rows: 2,
      })
    ),
    e(
      "div",
      { className: "input-footer" },
      e(
        "div",
        { className: "attach-wrap" },
        e(
          "button",
          {
            type: "button",
            className: "btn btn-ghost attach-btn",
            disabled: loading || file !== null,
            onClick: () => setMenuOpen((v) => !v),
          },
          "+ Attach"
        ),
        menuOpen && !file && e(AttachmentMenu, { onSelect: pickFile, onClose: () => setMenuOpen(false) })
      ),
      e(
        "div",
        { className: "input-actions" },
        e("span", { className: "char-counter" }, `${text.length} / ${MAX_CHARS}`),
        e(
          "button",
          {
            type: "submit",
            className: "btn btn-accent send-btn",
            disabled: loading || !hasContent,
          },
          loading ? "Analyzing…" : "Analyze →"
        )
      )
    )
  );
}
