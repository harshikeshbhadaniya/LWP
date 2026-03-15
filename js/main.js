/* Laxmi Engineering Works - shared JS (vanilla) */

(() => {
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const $ = (sel, root = document) => root.querySelector(sel);

  // --- Mobile navbar toggle (works on every page) ---
  const navToggle = $("#navToggle");
  const navMenu = $("#navMenu");
  if (navToggle && navMenu) {
    const setOpen = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navMenu.classList.toggle("hidden", !open);
    };

    setOpen(false);
    navToggle.addEventListener("click", () => {
      const open = navToggle.getAttribute("aria-expanded") === "true";
      setOpen(!open);
    });

    // Close on link click (mobile)
    $$("#navMenu a").forEach((a) =>
      a.addEventListener("click", () => setOpen(false))
    );
  }

  // --- Carousel (Home page only, if present) ---
  const carousel = $("#carousel");
  if (carousel) {
    const slides = $$(".carousel-slide", carousel);
    const prevBtn = $("#carouselPrev");
    const nextBtn = $("#carouselNext");
    const dotsWrap = $("#carouselDots");

    let active = 0;
    let timer = null;
    let isHovering = false;
    let touchStartX = null;

    const render = (idx) => {
      active = (idx + slides.length) % slides.length;
      slides.forEach((s, i) => {
        const on = i === active;
        s.classList.toggle("opacity-0", !on);
        s.classList.toggle("opacity-100", on);
        s.setAttribute("aria-hidden", String(!on));
      });

      if (dotsWrap) {
        $$("#carouselDots button").forEach((b, i) => {
          b.classList.toggle("bg-white", i === active);
          b.classList.toggle("bg-white/40", i !== active);
          b.setAttribute("aria-current", i === active ? "true" : "false");
        });
      }
    };

    const start = () => {
      if (timer) clearInterval(timer);
      timer = setInterval(() => {
        if (!isHovering) render(active + 1);
      }, 4500);
    };

    // Build dots
    if (dotsWrap && slides.length > 1) {
      dotsWrap.innerHTML = slides
        .map(
          (_, i) =>
            `<button type="button" class="h-2.5 w-2.5 rounded-full bg-white/40 transition" aria-label="Go to slide ${
              i + 1
            }"></button>`
        )
        .join("");
      $$("#carouselDots button").forEach((b, i) =>
        b.addEventListener("click", () => render(i))
      );
    }

    prevBtn?.addEventListener("click", () => render(active - 1));
    nextBtn?.addEventListener("click", () => render(active + 1));

    carousel.addEventListener("mouseenter", () => (isHovering = true));
    carousel.addEventListener("mouseleave", () => (isHovering = false));

    // Basic swipe support
    carousel.addEventListener("touchstart", (e) => {
      touchStartX = e.touches?.[0]?.clientX ?? null;
    });
    carousel.addEventListener("touchend", (e) => {
      const endX = e.changedTouches?.[0]?.clientX ?? null;
      if (touchStartX == null || endX == null) return;
      const dx = endX - touchStartX;
      if (Math.abs(dx) < 40) return;
      render(dx > 0 ? active - 1 : active + 1);
      touchStartX = null;
    });

    render(0);
    start();
  }

  // --- Inquiry form validation (Inquiry page only, if present) ---
  const inquiryForm = $("#inquiryForm");
  if (inquiryForm) {
    const fields = {
      name: $("#inqName"),
      email: $("#inqEmail"),
      mobile: $("#inqMobile"),
      message: $("#inqMessage"),
    };

    const errors = {
      name: $("#errName"),
      email: $("#errEmail"),
      mobile: $("#errMobile"),
      message: $("#errMessage"),
      form: $("#errForm"),
    };

    const setErr = (key, msg) => {
      if (!errors[key]) return;
      errors[key].textContent = msg || "";
      errors[key].classList.toggle("hidden", !msg);
    };

    const trim = (v) => (v ?? "").toString().trim();

    const validators = {
      name: (v) => {
        const s = trim(v);
        if (!s) return "Name is required.";
        if (s.length < 2) return "Please enter a valid name.";
        return "";
      },
      email: (v) => {
        const s = trim(v);
        if (!s) return "Email ID is required.";
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(s);
        if (!ok) return "Please enter a valid email ID.";
        return "";
      },
      mobile: (v) => {
        const s = trim(v);
        if (!s) return "Mobile number is required.";
        const digits = s.replace(/[^\d]/g, "");
        if (digits.length < 10 || digits.length > 15)
          return "Mobile number should be 10–15 digits.";
        return "";
      },
      message: (v) => {
        const s = trim(v);
        if (!s) return "Message is required.";
        if (s.length < 10) return "Please add a bit more detail (min 10 chars).";
        return "";
      },
    };

    const validateAll = () => {
      let ok = true;
      setErr("form", "");
      for (const k of Object.keys(fields)) {
        const msg = validators[k](fields[k]?.value);
        setErr(k, msg);
        if (msg) ok = false;
      }
      return ok;
    };

    // Live validation
    Object.entries(fields).forEach(([k, el]) => {
      if (!el) return;
      el.addEventListener("input", () => setErr(k, validators[k](el.value)));
      el.addEventListener("blur", () => setErr(k, validators[k](el.value)));
    });

    inquiryForm.addEventListener("submit", (e) => {
      if (!validateAll()) {
        e.preventDefault();
        setErr("form", "Please fix the highlighted fields and try again.");
        // Focus first invalid
        const firstKey = Object.keys(fields).find(
          (k) => !errors[k]?.classList.contains("hidden")
        );
        fields[firstKey]?.focus?.();
        return;
      }

      // This is a static site; prevent accidental navigation if action not set.
      if (!inquiryForm.getAttribute("action")) {
        e.preventDefault();
        setErr(
          "form",
          "Form looks good. Connect this form to your backend/email service to receive inquiries."
        );
      }
    });
  }
})();

