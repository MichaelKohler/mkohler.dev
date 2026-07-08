let totalAmountReceived = 0;

const ts = () => new Date().toLocaleTimeString();
const log = (msg) =>
  logEl.prepend(document.createTextNode(`${ts()}: ${msg}\n`));

const amountEl = document.getElementById("amount");
const logEl = document.getElementById("events-log");

if (!document.createElement("link").relList.supports("monetization")) {
  log("Web Monetization is not supported");
}

document
  .querySelector('link[rel="monetization"]')
  .addEventListener("load", () => {
    log("Load event firedO");
  });

const fmt = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
});

window.addEventListener("monetization", (ev) => {
  console.log(ev);
  const amountSent = ev.amountSent.value;
  const currency = ev.amountSent.currency;
  const amount = Number(amountSent);
  totalAmountReceived = Number(totalAmountReceived) + amount;
  amountEl.textContent = fmt.format(totalAmountReceived);

  log(currency + " " + amountSent);
});
