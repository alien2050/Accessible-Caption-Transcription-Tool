(function () {
  // ---- CONFIG --------------------------------------------------------------
  const DEFAULT_VARS = {
    // Fonts
    "--font-family-base": "Arial, sans-serif",
    "--font-size-root": "16pt",
    "--font-size-controls": "1rem",
    "--font-size-spotlight": "1.2rem",
    "--font-size-history": "1rem",
    "--line-height-base": "1.5",
    "--line-height-spotlight": "1.3",
    "--spotlight-font-weight": "bold",
    "--spotlight-text-align": "center",
    "--spotlight-text-transform": "none",
    "--spotlight-font-style": "normal", // normal | italic
    "--spotlight-font-variant": "normal", // normal | small-caps
    "--spotlight-text-decoration": "none", // none | underline
    "--underline-offset": "2px",
    "--select-font-size": "18pt",
    "--radius-pill": "20px",
    // Colors
    "--color-bg": "#05070c",
    "--color-text": "#f5f5f5",
    "--color-border": "#252b3a",
    "--color-spotlight-bg": "#151925",
    "--color-spotlight-font": "#FFFFFF",
    "--color-history-bg": "#0e111a",
    "--select-font-color": "#FFFFFF",
    "--select-fill": "#000000",
    "--select-border": "#ffffffff",
    "--color-primary": "#00c853",
    "--color-primary-text": "#021016",
    "--color-listening": "#ff1744",

    "--color-status-dot-idle": "#616161",
    "--color-status-dot-active": "#00e676",
    "--color-status-dot-error": "#ff5252",
    "--status-pulse-mode": "on",
    "--color-history-text": "#d0d0d0",
    "--color-focus-outline": "#5c6bc0",
  };

  const VAR_META = {
    "--color-bg": { label: "Background", group: "Page" },
    "--color-text": { label: "Font", group: "Page" },
    "--color-border": { label: "Border", group: "Page" },

    "--color-spotlight-bg": {
      label: "Background",
      group: "Captions",
    },
    "--color-spotlight-font": {
      label: "Font",
      group: "Captions",
    },
    "--spotlight-font-weight": {
      label: "Font Weight",
      group: "Captions",
      type: "select",
      options: ["normal", "bold"],
    },
    "--spotlight-text-align": {
      label: "Alignment",
      group: "Captions",
      type: "select",
      options: ["left", "center", "right", "justify"],
    },
    "--spotlight-text-transform": {
      label: "Text Case",
      group: "Captions",
      type: "select",
      options: ["none", "uppercase", "lowercase", "capitalize"],
    },
    "--spotlight-font-style": {
      label: "Italic",
      group: "Captions",
      type: "select",
      options: ["normal", "italic"],
    },
    "--spotlight-font-variant": {
      label: "Small Caps",
      group: "Captions",
      type: "select",
      options: ["normal", "small-caps"],
    },
    "--spotlight-text-decoration": {
      label: "Underline",
      group: "Captions",
      type: "select",
      options: ["none", "underline"],
    },

    "--color-history-bg": { label: "Background", group: "Transcript" },
    "--color-history-text": { label: "Font", group: "Transcript" },

    "--color-primary": { label: "Primary Button", group: "Buttons" },
    "--color-primary-text": { label: "Primary Text", group: "Buttons" },
    "--color-listening": { label: "Listening Button", group: "Buttons" },

    "--color-status-dot-idle": {
      label: "Status Dot (Idle)",
      group: "Status",
    },
    "--color-status-dot-active": {
      label: "Status Dot (Active)",
      group: "Status",
    },
    "--color-status-dot-error": {
      label: "Status Dot (Error)",
      group: "Status",
    },
    "--status-pulse-mode": {
      label: "Pulse Animation",
      group: "Status",
      type: "select",
      options: ["on", "off"],
    },

    "--color-focus-outline": { label: "Focus Outline", group: "Page" },

    "--select-font-color": {
      label: "Font",
      group: "Menu",
    },
    "--select-fill": {
      label: "Background",
      group: "Menu",
    },
    "--select-border": {
      label: "Border",
      group: "Menu",
    },

    "--radius-pill": {
      label: "Corners",
      group: "Buttons",
      type: "select",
      options: ["0px", "2px", "4px", "6px", "8px", "10px", "12px"],
    },
    // Fonts
    "--font-family-base": {
      label: "Font Family",
      group: "Page",
      type: "select",
      options: [
        // Sans-serif families
        "Arial, sans-serif",
        '"Helvetica Neue", Helvetica, Arial, sans-serif',
        '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        '"Open Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        '"Roboto", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        "Verdana, Geneva, sans-serif",
        "Tahoma, Geneva, sans-serif",
        '"Trebuchet MS", Helvetica, sans-serif',
        "Impact, Charcoal, sans-serif",
        '"Arial Black", Gadget, sans-serif',
        '"Lucida Sans Unicode", "Lucida Grande", sans-serif',

        // Serif families
        '"Times New Roman", Times, serif',
        'Georgia, "Times New Roman", Times, serif',
        'Garamond, "Times New Roman", Times, serif',
        '"Palatino Linotype", "Book Antiqua", Palatino, serif',
        '"Lucida Bright", "Lucidabright", "Lucida Serif", Lucida, serif',

        // Monospace
        '"Courier New", Courier, monospace',
        '"Lucida Console", Monaco, monospace',

        // Fun but still common
        '"Comic Sans MS", cursive, sans-serif',

        // System / generic stacks
        'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        "sans-serif",
        "serif",
        "monospace",

        '"OpenDyslexic", Arial, sans-serif',
      ],
    },

    "--font-size-root": {
      label: "Font Size",
      group: "Page",
      type: "select",
      options: [
        "14pt",
        "15pt",
        "16pt",
        "17pt",
        "18pt",
        "19pt",
        "20pt",
        "21pt",
        "22pt",
        "23pt",
        "24pt",
        "25pt",
      ],
    },
    "--font-size-spotlight": {
      label: "Caption Size",
      group: "Captions",
      type: "select",
      options: [
        "14pt",
        "15pt",
        "16pt",
        "17pt",
        "18pt",
        "19pt",
        "20pt",
        "21pt",
        "22pt",
        "23pt",
        "24pt",
        "25pt",
      ],
    },
    "--font-size-controls": {
      label: "Button Text Size",
      group: "Buttons",
      type: "select",
      options: [
        "14pt",
        "15pt",
        "16pt",
        "17pt",
        "18pt",
        "19pt",
        "20pt",
        "21pt",
        "22pt",
        "23pt",
        "24pt",
        "25pt",
      ],
    },
    "--select-font-size": {
      label: "Font Size",
      group: "Menu",
      type: "select",
      options: [
        "14pt",
        "15pt",
        "16pt",
        "17pt",
        "18pt",
        "19pt",
        "20pt",
        "21pt",
        "22pt",
        "23pt",
        "24pt",
        "25pt",
      ],
    },
    "--font-size-history": {
      label: "Transcript Size",
      group: "Transcript",
      type: "select",
      options: [
        "14pt",
        "15pt",
        "16pt",
        "17pt",
        "18pt",
        "19pt",
        "20pt",
        "21pt",
        "22pt",
        "23pt",
        "24pt",
        "25pt",
      ],
    },
    "--line-height-base": {
      label: "Line Space",
      group: "Transcript",
      type: "select",
      options: ["1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"],
    },
    "--line-height-spotlight": {
      label: "Line Space",
      group: "Captions",
      type: "select",
      options: ["1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"],
    },
    "--underline-offset": {
      label: "Underline Offset",
      group: "Captions",
      type: "select",
      options: ["2px", "3px", "4px", "5px", "6px", "7px", "8px"],
    },
  };

  const GROUP_ORDER = [
    "Page",
    "Captions",
    "Transcript",
    "Buttons",
    "Menu",
    "Status",
    "Unsupported",
    "Focus",
    "Fonts",
  ];

  const STORAGE_KEY = "assistant-theme-vars";
  const PANEL_OPEN_KEY = "assistant-theme-panel-open";
  const CONTAINER_SELECTOR = "#theme-controls";

  // NEW: presets storage keys and factory themes -----------------------------
  const PRESETS_KEY = "assistant-theme-presets";

  const FACTORY_THEMES = window.ASSISTANT_FACTORY_THEMES || {};

  // ---- HELPERS -------------------------------------------------------------
  const $ = (sel, el = document) => el.querySelector(sel);
  const el = (tag, props = {}, ...children) => {
    const n = document.createElement(tag);
    Object.assign(n, props);
    for (const c of children) n.append(c);
    return n;
  };
  const idForVar = (name) =>
    `theme-${name.replace(/^--/, "").replace(/[^a-z0-9]+/gi, "-")}`;

  function ensureOption(select, value) {
    if (value == null) return;
    const exists = Array.from(select.options).some((o) => o.value === value);
    if (!exists) select.append(el("option", { value, textContent: value }));
  }

  function loadSaved() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
      return {};
    }
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vars));
  }

  function getFactoryPreset(name) {
    for (const groupKey of Object.keys(FACTORY_THEMES)) {
      const group = FACTORY_THEMES[groupKey];
      if (group && group.themes && group.themes[name]) {
        return group.themes[name];
      }
    }
    return null;
  }

  // NEW: presets helpers -----------------------------------------------------
  function loadUserPresets() {
    try {
      return JSON.parse(localStorage.getItem(PRESETS_KEY)) || {};
    } catch {
      return {};
    }
  }
  function saveUserPresets() {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(userPresets));
  }

  function applyToRoot() {
    const root = document.documentElement;
    for (const [k, v] of Object.entries(vars)) {
      root.style.setProperty(k, v);
    }
    const pulseMode = vars["--status-pulse-mode"] || "on";
    root.setAttribute("data-status-pulse", pulseMode);
  }

  // ---- STATE ---------------------------------------------------------------
  let vars = { ...DEFAULT_VARS, ...loadSaved() };
  let userPresets = loadUserPresets();

  // ---- UI ------------------------------------------------------------------
  function makeRow(varName) {
    const meta = VAR_META[varName] || {};
    const friendly = meta.label || varName;
    const type = meta.type || "color";

    const wrap = el("div");
    wrap.dataset.var = varName;
    wrap.dataset.group = meta.group || "Misc";
    wrap.style.display = "grid";
    wrap.style.gridTemplateColumns = "minmax(12rem, 18rem) 1fr";
    wrap.style.alignItems = "center";
    wrap.style.gap = "0.5rem";
    wrap.style.margin = "0.25rem 0";

    const id = idForVar(varName);
    const label = el("label", { textContent: friendly, htmlFor: id });

    if (type === "select") {
      const select = el("select", { id });

      const fontLabelFromValue = (v) => {
        if (!v) return v;
        v = v.trim();
        let first = v.split(",")[0].trim();
        if (
          (first.startsWith('"') && first.endsWith('"')) ||
          (first.startsWith("'") && first.endsWith("'"))
        ) {
          first = first.slice(1, -1);
        }
        if (first === "sans-serif") return "Sans Serif";
        if (first === "serif") return "Serif";
        if (first === "monospace") return "Monospace";
        if (first === "system-ui") return "System UI";
        return first;
      };

      (meta.options || []).forEach((opt) => {
        const text =
          varName === "--font-family-base" ? fontLabelFromValue(opt) : opt;
        select.append(el("option", { value: opt, textContent: text }));
      });

      ensureOption(select, vars[varName]);
      select.value = vars[varName];
      select.addEventListener("change", () => {
        vars[varName] = select.value;
        applyToRoot();
        save();
      });
      wrap.append(label, select);
      return wrap;
    }

    const input = el("input", {
      type: "color",
      id,
      value: vars[varName] || "#000000",
    });
    input.addEventListener("input", () => {
      vars[varName] = input.value;
      applyToRoot();
      save();
    });
    wrap.append(label, input);
    return wrap;
  }

  function buildUI() {
    const mount = $(CONTAINER_SELECTOR);
    if (!mount) return;

    mount.innerHTML = "";

    const title = el("h3", { textContent: "Theme: Colors & Fonts" });
    title.style.marginBottom = "0.5rem";
    mount.append(title);

    const desc = el("span", {
      textContent: "Adjust page colors and typography.",
    });

    desc.style.marginBottom = "0.75rem";
    desc.style.opacity = "0.8";
    mount.append(desc);

    const groups = {};
    Object.keys(vars).forEach((varName) => {
      const g = (VAR_META[varName] && VAR_META[varName].group) || "Misc";
      (groups[g] ||= []).push(varName);
    });

    const orderedGroups = Object.keys(groups).sort((a, b) => {
      const ia = GROUP_ORDER.indexOf(a);
      const ib = GROUP_ORDER.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    });

    orderedGroups.forEach((groupName) => {
      const details = el("details");
      details.className = "theme-group";
      details.style.margin = "0.5rem 0";

      const summary = el("summary", { textContent: groupName });
      summary.style.cursor = "pointer";
      summary.style.fontWeight = "600";
      summary.style.padding = "0.25rem 0";
      details.append(summary);

      const list = el("div");
      list.style.padding = "0.25rem 0 0.5rem";

      groups[groupName].forEach((varName) => {
        list.append(makeRow(varName));
      });

      details.append(list);
      mount.append(details);
    });

    const btnRow = el("div");
    btnRow.style.marginTop = "0.75rem";
    btnRow.style.display = "flex";
    btnRow.style.flexDirection = "column";
    btnRow.style.gap = "0.75rem";

    const resetBtn = el("button", {
      type: "button",
      textContent: "Reset theme to defaults",
    });
    resetBtn.style.cursor = "pointer";

    resetBtn.onclick = () => {
      vars = { ...DEFAULT_VARS };
      applyToRoot();
      save();
      buildUI();
    };

    btnRow.append(resetBtn);

    // NEW: preset UI ---------------------------------------------------------
    const presetsWrap = el("div");
    presetsWrap.style.borderTop = "1px solid #333";
    presetsWrap.style.paddingTop = "0.5rem";
    presetsWrap.style.display = "flex";
    presetsWrap.style.flexDirection = "column";
    presetsWrap.style.gap = "0.4rem";

    const presetsTitle = el("div", {
      textContent: "Presets",
    });

    presetsTitle.style.opacity = "0.8";
    presetsWrap.append(presetsTitle);

    const selectRow = el("div");
    selectRow.style.display = "flex";
    selectRow.style.gap = "0.35rem";

    const presetSelect = el("select", {
      ariaLabel: "Choose theme preset",
    });
    presetSelect.style.flex = "1";

    // helper to populate select
    function refreshPresetSelect(selectedName) {
      presetSelect.innerHTML = "";
      // Placeholder option
      const placeholder = el("option", {
        value: "",
        textContent: "Select a preset…",
      });
      placeholder.disabled = true;
      placeholder.selected = !selectedName;
      presetSelect.append(placeholder);
      // Factory groups → optgroups
      Object.keys(FACTORY_THEMES).forEach((groupKey) => {
        const group = FACTORY_THEMES[groupKey];
        if (!group || !group.themes) return;
        const og = el("optgroup", {
          label: group.label || groupKey,
        });
        Object.keys(group.themes).forEach((name) => {
          og.append(el("option", { value: name, textContent: name }));
        });
        presetSelect.append(og);
      });

      // User presets under their own optgroup
      const userNames = Object.keys(userPresets);
      if (userNames.length) {
        const og = el("optgroup", { label: "Saved" });
        userNames.forEach((name) => {
          og.append(el("option", { value: name, textContent: name }));
        });
        presetSelect.append(og);
      }

      if (selectedName) {
        presetSelect.value = selectedName;
      }
    }

    refreshPresetSelect();

    presetSelect.addEventListener("change", () => {
      const name = presetSelect.value;
      if (!name) return;

      const factoryPreset = getFactoryPreset(name);
      const userPreset = userPresets[name];
      const chosen = factoryPreset || userPreset;
      if (!chosen) return;

      vars = { ...DEFAULT_VARS, ...chosen };
      applyToRoot();
      save();
      buildUI();
    });

    selectRow.append(presetSelect);
    presetsWrap.append(selectRow);

    const saveRow = el("div");
    saveRow.style.display = "flex";
    saveRow.style.gap = "0.35rem";
    saveRow.className = "save-preset";

    const nameInput = el("input", {
      type: "text",
      placeholder: "Preset name",
      ariaLabel: "Preset name",
    });
    nameInput.style.flex = "1";

    const savePresetBtn = el("button", {
      type: "button",
      textContent: "Save preset",
    });
    savePresetBtn.style.padding = "0.25rem 0.6rem";
    savePresetBtn.style.cursor = "pointer";

    savePresetBtn.onclick = () => {
      const name = nameInput.value.trim();
      if (!name) return;
      userPresets[name] = { ...vars };
      saveUserPresets();
      refreshPresetSelect(name);
    };

    saveRow.append(nameInput, savePresetBtn);
    presetsWrap.append(saveRow);

    // import/export row -----------------------------------------------
    const ioRow = el("div");
    ioRow.style.display = "flex";
    ioRow.style.gap = "0.8rem";

    const exportBtn = el("button", {
      type: "button",
      textContent: "Export presets",
    });
    exportBtn.style.padding = "0.25rem 0.6rem";
    exportBtn.style.cursor = "pointer";

    exportBtn.onclick = () => {
      const dataStr = JSON.stringify(userPresets, null, 2);
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "assistant-theme-presets.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    };

    const importBtn = el("button", {
      type: "button",
      textContent: "Import presets",
    });
    importBtn.style.padding = "0.25rem 0.6rem";
    importBtn.style.cursor = "pointer";

    const fileInput = el("input", {
      type: "file",
      accept: "application/json",
      style: "display:none",
    });

    importBtn.onclick = () => {
      fileInput.click();
    };

    fileInput.addEventListener("change", () => {
      const file = fileInput.files && fileInput.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          if (typeof imported !== "object" || imported === null) {
            throw new Error("Invalid JSON format");
          }
          // Merge presets (import wins on conflicts)
          userPresets = { ...userPresets, ...imported };
          saveUserPresets();
          refreshPresetSelect();
        } catch (err) {
          console.error("Failed to import presets", err);
        } finally {
          fileInput.value = "";
        }
      };
      reader.readAsText(file);
    });

    ioRow.append(exportBtn, importBtn, fileInput);
    presetsWrap.append(ioRow);

    btnRow.append(presetsWrap);
    mount.append(btnRow);
  }

  // ---- PANEL TOGGLE (off-canvas, accessible) -------------------------------
  function setupPanelToggle() {
    const panel = document.getElementById("theme-panel");
    const toggleBtn = document.getElementById("theme-toggle");
    if (!panel || !toggleBtn) return;

    const LABEL_SHOW = toggleBtn.dataset.labelShow || "Show theme";
    const LABEL_HIDE = toggleBtn.dataset.labelHide || "Hide theme";

    const storedOpen = JSON.parse(
      localStorage.getItem(PANEL_OPEN_KEY) ?? "false"
    );

    function setOpen(open) {
      panel.dataset.open = open ? "true" : "false";
      toggleBtn.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));

      toggleBtn.textContent = open ? LABEL_HIDE : LABEL_SHOW;

      if ("inert" in panel) {
        panel.inert = !open;
      }
      localStorage.setItem(PANEL_OPEN_KEY, JSON.stringify(open));

      // --- move the toggle button with the panel ---
      const panelRect = panel.getBoundingClientRect();
      const offset = open ? panelRect.width : 0;
      toggleBtn.style.transform = `translateX(${offset}px)`;
      // ---------------------------------------------

      if (open) {
        const firstFocusable = panel.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (firstFocusable) firstFocusable.focus();
      } else {
        toggleBtn.focus();
      }
    }

    setOpen(storedOpen);

    toggleBtn.addEventListener("click", () => {
      const isOpen = panel.dataset.open === "true";
      setOpen(!isOpen);
    });

    panel.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
      }
    });
  }

  // ---- BOOT ---------------------------------------------------------------
  function init() {
    applyToRoot();
    buildUI();
    setupPanelToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
