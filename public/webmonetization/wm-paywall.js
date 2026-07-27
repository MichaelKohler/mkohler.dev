function getParams() {
  const params = new URLSearchParams(location.search);

  const src = (() => {
    const val = params.get("src");
    if (!val) return null;
    if (val === "local" || val === "prod" || val === "staging") {
      return val;
    }
    const pr = Number(val);
    if (val && typeof pr === "number" && Number.isFinite(pr)) {
      return pr;
    }
    return "staging";
  })();

  const wa = (() => {
    const val = params.get("wa");
    try {
      new URL(val);
      return val;
    } catch {
      return "https://ilp.interledger-test.dev/michaelusd";
    }
  })();

  const price = (() => {
    const val = params.get("price");
    return Number.isFinite(Number(val)) ? val : undefined;
  })();

  return {
    src,
    wa,
    price,
  };
}

/** @param {ReturnType<typeof getParams>['src']} param */
function getSrc(param) {
  switch (param) {
    case "prod":
      return `https://publisher-tools-cdn.webmonetization.workers.dev/paywall.js`;
    case "staging":
      return `https://staging-publisher-tools-cdn.webmonetization.workers.dev/paywall.js`;
    case "local":
      return `http://localhost:5173/paywall.js`;
    default:
      return `https://pr${param}-publisher-tools-cdn.webmonetization.workers.dev/paywall.js`;
  }
}

const params = getParams();

if (params.src) {
  const script = document.createElement("script");
  script.id = "wmt-paywall-init-script";
  script.type = "module";
  script.src = getSrc(params.src);
  script.dataset.walletAddress = params.wa;
  script.dataset.tag = "version1";
  if (params.price) script.dataset.price = params.price;
  document.head.prepend(script);
}

document.addEventListener("DOMContentLoaded", () => {
  const $id = (id) => document.getElementById(id);
  $id("script").textContent = params.src
    ? $id("wmt-paywall-init-script").outerHTML
    : "Paywall script not injected. ?src URL parameter is missing";
  $id("param-src").value = params.src || "";
  $id("param-wa").value = params.wa || "";
  $id("param-price").value = params.price || "";
});
