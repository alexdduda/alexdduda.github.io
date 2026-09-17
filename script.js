(function () {
  var root = document.documentElement;
  var btn = document.getElementById("theme-toggle");

  function updateLabel() {
    btn.textContent = root.classList.contains("light") ? "dark mode" : "light mode";
  }

  btn.addEventListener("click", function () {
    root.classList.toggle("light");
    localStorage.setItem("theme", root.classList.contains("light") ? "light" : "dark");
    updateLabel();
  });

  updateLabel();
})();

(function () {
  var el = document.getElementById("typed-name");
  if (!el) return;

  var fullText = el.textContent;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  el.textContent = "";
  var i = 0;

  function step() {
    el.textContent = fullText.slice(0, i);
    i++;
    if (i <= fullText.length) setTimeout(step, 90);
  }

  setTimeout(step, 200);
})();

/* Photo lightbox with looping video background */
(function () {
  var lightbox = document.getElementById("lightbox");
  var video = document.getElementById("lightbox-video");
  if (!lightbox || !video) return;

  window.openAlexLightbox = function () {
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    video.currentTime = 0;
    video.play();
  };

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    video.pause();
  }

  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });
})();

/* Live terminal */
(function () {
  var toggleBtn = document.getElementById("terminal-toggle");
  var panel = document.getElementById("terminal-panel");
  var output = document.getElementById("term-output");
  var input = document.getElementById("term-input");
  if (!toggleBtn || !panel || !output || !input) return;

  var opened = false;

  var projectLinks = {
    "mcgill-ai-advisor": "https://github.com/alexdduda/ai-advisor",
    "symbolos": "https://github.com/alexdduda/ai-advisor",
    "ai-auditor": "https://github.com/alexdduda/ai-auditor",
    "plumb": "https://github.com/plumb-dev/plumb",
    "tokenized-treasury-dashboard": "https://github.com/alexdduda/tokenization-dashboard",
    "treasury": "https://github.com/alexdduda/tokenization-dashboard",
    "grantguard": "https://github.com/alexdduda/grantguard"
  };

  function printLine(text, cls) {
    var line = document.createElement("div");
    line.className = "term-line" + (cls ? " " + cls : "");
    line.textContent = text;
    output.appendChild(line);
    output.scrollTop = output.scrollHeight;
  }

  function setTheme(mode) {
    var root = document.documentElement;
    if (mode === "light") root.classList.add("light");
    else if (mode === "dark") root.classList.remove("light");
    else return false;
    localStorage.setItem("theme", mode);
    var themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) themeBtn.textContent = root.classList.contains("light") ? "dark mode" : "light mode";
    return true;
  }

  function runCommand(raw) {
    var cmd = raw.trim();
    if (!cmd) return;
    printLine("guest@alexduda:~$ " + cmd, "echo");

    if (cmd.toLowerCase() === "sudo hire alex") {
      printLine("[sudo] password for guest:");
      setTimeout(function () {
        printLine("permission granted.");
        printLine("opening email...");
        window.location.href = "mailto:alexander.duda@mail.mcgill.ca";
      }, 500);
      return;
    }

    var parts = cmd.split(/\s+/);
    var name = parts[0].toLowerCase();
    var arg = parts.slice(1).join(" ").toLowerCase();

    if (name === "help") {
      printLine("available commands:");
      printLine("  whoami          who is this");
      printLine("  about           short bio");
      printLine("  projects        list projects");
      printLine("  skills          list skills");
      printLine("  education       education info");
      printLine("  contact         ways to reach me");
      printLine("  resume          download my resume as a pdf");
      printLine("  photo           open a photo of me");
      printLine("  open <name>     open a project on github");
      printLine("  theme <mode>    set light or dark");
      printLine("  clear           clear the terminal");
      printLine("  exit            close the terminal");
    } else if (name === "whoami") {
      printLine("Alex Duda. Software Engineer, full-stack and AI-integrated systems.");
    } else if (name === "about") {
      printLine("Computer Science student at McGill who ships real software across the stack: AI platforms, security tooling, blockchain data pipelines, developer tools, and algorithm design.");
      printLine("Detail-obsessed. I finish what I start.");
    } else if (name === "projects" || (name === "ls" && arg.indexOf("project") !== -1)) {
      printLine("mcgill-ai-advisor              Symbolos, McGill's free AI academic advising platform");
      printLine("ai-auditor                     general-purpose LLM output auditing pipeline");
      printLine("plumb                          open-source codebase intelligence tool");
      printLine("tokenized-treasury-dashboard   $9.8B+ tokenized Treasury data pipeline");
      printLine("grantguard                     corruption-resistant grant allocation algorithm");
      printLine("");
      printLine('type "open <name>" to view one on github, e.g. open grantguard');
    } else if (name === "skills" || (name === "cat" && arg.indexOf("skills") !== -1)) {
      printLine("languages: Java, Python, TypeScript/JavaScript, C, SQL, HTML/CSS");
      printLine("frameworks: React, React Native, Node.js, FastAPI, Supabase/PostgreSQL, SQLite, Docker, Git, GitHub Actions, Linux/Unix, REST APIs, Pydantic");
      printLine("ai and data: Claude API integration, prompt engineering, web scraping, data analysis");
    } else if (name === "education" || (name === "cat" && arg.indexOf("education") !== -1)) {
      printLine("McGill University, Faculty of Arts.");
      printLine("B.A., Major in Computer Science, Minor in Anthropology. Sept 2024 to Dec 2027 (expected).");
      printLine("Google Data Analytics Professional Certificate. Aug 2025 to Dec 2025 (expected).");
    } else if (name === "contact") {
      printLine("email: alexander.duda@mail.mcgill.ca");
      printLine("github: github.com/alexdduda");
      printLine("linkedin: linkedin.com/in/alexander-duda");
    } else if (name === "resume") {
      printLine("downloading resume...");
      var link = document.createElement("a");
      link.href = "assets/alex-duda-resume.pdf";
      link.download = "Alex_Duda_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (name === "photo") {
      printLine("opening photo...");
      if (typeof window.openAlexLightbox === "function") window.openAlexLightbox();
    } else if (name === "open") {
      var slug = arg.replace(/\s+/g, "-");
      var url = projectLinks[slug];
      if (url) {
        printLine("opening " + url + " ...");
        window.open(url, "_blank", "noopener");
      } else {
        printLine('no project named "' + arg + '". type "projects" to see the list.');
      }
    } else if (name === "theme") {
      if (arg === "light" || arg === "dark") {
        setTheme(arg);
        printLine("theme set to " + arg + ".");
      } else {
        printLine("usage: theme light | theme dark");
      }
    } else if (name === "clear") {
      output.innerHTML = "";
    } else if (name === "exit" || name === "close") {
      closeTerminal();
    } else {
      printLine('command not found: ' + name + '. type "help" for a list of commands.');
    }
  }

  function openTerminal() {
    opened = true;
    panel.classList.add("open");
    toggleBtn.textContent = "close terminal";
    if (output.children.length === 0) {
      printLine('type "help" to see available commands.');
    }
    input.focus();
  }

  function closeTerminal() {
    opened = false;
    panel.classList.remove("open");
    toggleBtn.textContent = "open terminal";
  }

  toggleBtn.addEventListener("click", function () {
    if (opened) closeTerminal();
    else openTerminal();
  });

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      runCommand(input.value);
      input.value = "";
    } else if (e.key === "Escape") {
      closeTerminal();
    }
  });
})();
