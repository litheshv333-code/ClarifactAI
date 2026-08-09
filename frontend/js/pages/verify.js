const MAX_SIZE = 100 * 1024 * 1024;
const ALLOWED = {
  image: ["png", "jpg", "jpeg"],
  audio: ["mp3"],
  video: ["mp4"],
};
const STATUS_META = {
  SUPPORTED: "Supported by the available signals.",
  REFUTED: "Contradicted by the available signals.",
  MISLEADING: "Presented in a potentially misleading way.",
  UNVERIFIED: "Not enough signal to verify either way.",
};

function VerifyPage() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  function selectFile(chosen, type) {
    if (!chosen) return;

    const ext = chosen.name.split(".").pop().toLowerCase();
    if (!ALLOWED[type].includes(ext)) {
      setError(`Unsupported file type. Allowed: ${ALLOWED[type].join(", ").toUpperCase()}.`);
      setFile(null);
      setFileType(null);
      return;
    }
    if (chosen.size > MAX_SIZE) {
      setError("File is too large. Maximum size is 100 MB.");
      setFile(null);
      setFileType(null);
      return;
    }

    const preview = URL.createObjectURL(chosen);
    if (file && file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile({ ...chosen, preview });
    setFileType(type);
    setError(null);
    setResult(null);
  }

  function removeFile() {
    if (file && file.preview) {
      URL.revokeObjectURL(file.preview);
    }
    setFile(null);
    setFileType(null);
  }

  function handleTextChange(value) {
    setText(value);
    setError(null);
    if (value.trim() && file) removeFile();
  }

  async function handleSubmit() {
    if (loading) return;
    setError(null);

    if (!text.trim() && !file) {
      setError("Please enter some text or attach a file.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const data = file
        ? await uploadFile(`/analyze/${fileType}`, file)
        : await analyzeText(text);
      setResult(data);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    removeFile();
    setText("");
    setError(null);
    setResult(null);
    setLoading(false);
  }

  return e(
    "div",
    { className: "page verify-page" },
    e(
      "div",
      { className: "container narrow" },
      e(
        "header",
        { className: "page-head" },
        e("h1", { className: "page-title" }, "VERIFY CONTENT"),
        e(
          "p",
          { className: "page-subtitle" },
          "Submit text, image, audio or video and receive a credibility assessment."
        )
      ),
      e(VerifyInput, {
        text,
        onTextChange: handleTextChange,
        file,
        fileType,
        onFileSelect: selectFile,
        onRemoveFile: removeFile,
        loading,
        onSubmit: handleSubmit,
      }),
      error && e("div", { className: "error-box", role: "alert" }, error),
      loading && e(LoadingState),
      !loading && result && e(ResultDisplay, { result, resultRef, resetAll })
    )
  );
}

function ResultDisplay({ result, resultRef, resetAll }) {
  const summaryItems = result.summary || [];
  const claims = result.claims || [];
  const evidence = result.evidence || [];

  return e(
    "div",
    { className: "results", ref: resultRef },
    e(ScoreCard, {
      score: result.credibility_score || 0,
      verdict: result.verdict || "Unknown",
      confidence: result.confidence || 0,
    }),
    e(
      "section",
      { className: "result-section reveal" },
      e("h2", { className: "result-heading" }, "Claim Analysis"),
      claims.map((claim, i) =>
        e(
          "div",
          { key: i },
          e(ClaimCard, { claim }),
          e(
            "p",
            { className: "claim-status-note" },
            STATUS_META[claim.status] || claim.status || "Review the available evidence."
          )
        )
      )
    ),
    e(
      "section",
      { className: "result-section reveal" },
      e("h2", { className: "result-heading" }, "Promotion & Advertisement Analysis"),
      e(PromotionCard, { promotion: result.promotion || {} })
    ),
    e(
      "section",
      { className: "result-section reveal" },
      e("h2", { className: "result-heading" }, "Why This Score?"),
      e(
        "ul",
        { className: "summary-list" },
        summaryItems.map((item) => {
          const isWarning =
            item.includes("additional") ||
            item.includes("misleading signals were identified") ||
            item.includes("Potential promotional");
          return e(
            "li",
            { key: item, className: `summary-item ${isWarning ? "warn" : "ok"}` },
            e("span", { className: "summary-icon" }, isWarning ? "⚠" : "✓"),
            item
          );
        })
      )
    ),
    e(
      "section",
      { className: "result-section reveal" },
      e("h2", { className: "result-heading" }, "Evidence"),
      e("p", { className: "result-note" }, "Demo evidence for interface demonstration only."),
      e(
        "div",
        { className: "evidence-grid" },
        evidence.map((item, i) => e(EvidenceCard, { key: i, evidence: item }))
      )
    ),
    e(
      "div",
      { className: "result-actions" },
      e(
        "button",
        { className: "btn btn-accent", onClick: resetAll },
        "Analyze Another"
      ),
      e("a", { href: "#/", className: "btn btn-ghost" }, "Back to Home")
    )
  );
}
