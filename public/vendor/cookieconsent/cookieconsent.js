(function () {
  const STORAGE_KEY = "cc-consent-v1";

  const baseDenied = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    personalization_storage: "denied",
    security_storage: "granted",
  };

  const baseGranted = {
    ad_storage: "granted",
    ad_user_data: "granted",
    ad_personalization: "granted",
    analytics_storage: "granted",
    functionality_storage: "granted",
    personalization_storage: "granted",
    security_storage: "granted",
  };

  const prefersNoTracking =
    (typeof navigator !== "undefined" &&
      (navigator.globalPrivacyControl === true ||
        navigator.doNotTrack === "1")) ||
    (typeof window !== "undefined" && window.doNotTrack === "1");

  function ensureGtag() {
    if (typeof window === "undefined") return;
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function () {
        window.dataLayer.push(arguments);
      };
    }
  }

  function readStored() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  function persist(consent) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    } catch {
      /* ignore */
    }
  }

  function applyConsent(consent, isDefault = false) {
    ensureGtag();
    const mode = isDefault ? "default" : "update";
    window.gtag("consent", mode, consent);
  }

  function currentLocale() {
    if (typeof document === "undefined") return "en";
    const lang = document.documentElement.lang || document.documentElement.dataset.locale;
    return lang && lang.startsWith("fr") ? "fr" : "en";
  }

  function translations() {
    const fr = {
      title: "Cookies & mesures",
      body:
        "Nous utilisons Google Analytics uniquement après votre accord pour améliorer l’expérience. Aucune publicité.",
      accept: "Tout accepter",
      reject: "Tout refuser",
      link: "En savoir plus",
    };
    const en = {
      title: "Cookies & analytics",
      body:
        "We use Google Analytics only after you consent, to improve the product. No ads.",
      accept: "Accept all",
      reject: "Reject all",
      link: "Learn more",
    };
    return currentLocale() === "fr" ? fr : en;
  }

  function buildBanner(consentState, setState) {
    let t = translations();
    const backdrop = document.createElement("div");
    backdrop.className = "cc-backdrop";
    backdrop.style.display = "none";

    const banner = document.createElement("div");
    banner.className = "cc-banner";
    banner.style.display = "none";

    const title = document.createElement("h4");
    title.textContent = t.title;
    const body = document.createElement("p");
    body.textContent = t.body;

    const link = document.createElement("a");
    link.href = "/privacy";
    link.target = "_self";
    link.className = "cc-link";
    link.textContent = t.link;

    const actions = document.createElement("div");
    actions.className = "cc-actions";

    const accept = document.createElement("button");
    accept.className = "cc-btn primary";
    accept.type = "button";
    accept.textContent = t.accept;
    accept.onclick = function (e) {
      e.stopPropagation();
      const next = { ...consentState(), ...baseGranted };
      persist(next);
      applyConsent(next);
      hide();
    };

    const reject = document.createElement("button");
    reject.className = "cc-btn secondary";
    reject.type = "button";
    reject.textContent = t.reject;
    reject.onclick = function (e) {
      e.stopPropagation();
      const next = { ...consentState(), ...baseDenied };
      persist(next);
      applyConsent(next);
      hide();
    };

    actions.appendChild(accept);
    actions.appendChild(reject);

    banner.appendChild(title);
    banner.appendChild(body);
    banner.appendChild(link);
    banner.appendChild(actions);

    document.body.appendChild(backdrop);
    document.body.appendChild(banner);

    function show() {
      backdrop.style.display = "block";
      banner.style.display = "flex";
    }

    function hide() {
      backdrop.style.display = "none";
      banner.style.display = "none";
    }

    function updateLocale() {
      const next = translations();
      t = next;
      title.textContent = t.title;
      body.textContent = t.body;
      link.textContent = t.link;
      accept.textContent = t.accept;
      reject.textContent = t.reject;
    }

    return { show, hide, updateLocale };
  }

  function init() {
    if (typeof document === "undefined") return;

    const stored = readStored();
    const initial =
      prefersNoTracking && !stored ? baseDenied : stored || baseDenied;

    ensureGtag();
    applyConsent(initial, true);

    let state = initial;
    const getState = () => state;
    const { show, hide, updateLocale } = buildBanner(() => state, (next) => (state = next));

    window.cookieconsent = {
      show,
      hide,
      updateLocale,
      reset() {
        persist(baseDenied);
        state = baseDenied;
        applyConsent(state);
        show();
      },
    };

    if (!stored && !prefersNoTracking) {
      show();
    }
  }

  if (document.readyState === "complete" || document.readyState === "interactive") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  }
})();
