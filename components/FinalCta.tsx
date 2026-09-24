"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SITE, whatsappHref } from "@/lib/site";
import Reveal from "./Reveal";
import InquiryForm from "./InquiryForm";

export default function FinalCta() {
  const t = useTranslations("finalCta");
  const tContact = useTranslations("contact");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = () => setOpen(window.location.hash === "#contact");
    sync();
    window.addEventListener("hashchange", sync);
    window.addEventListener("popstate", sync);
    window.addEventListener("metek:lazy-reveal", sync);
    return () => {
      window.removeEventListener("hashchange", sync);
      window.removeEventListener("popstate", sync);
      window.removeEventListener("metek:lazy-reveal", sync);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => {
      document
        .querySelector<HTMLInputElement>("#final-cta-form input[name='name']")
        ?.focus();
    }, 80);
    return () => window.clearTimeout(timer);
  }, [open]);

  function openForm() {
    setOpen(true);
    const url = new URL(window.location.href);
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}#contact`,
    );
  }

  return (
    <section
      id="contact"
      className="scroll-mt-[var(--nav-offset)] overflow-hidden bg-band px-5 pb-[calc(4rem+var(--safe-bottom))] pt-14 text-band-fg md:px-10 md:pb-20 md:pt-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-12 gap-x-5 border-t border-band-fg/20 pt-6 md:gap-x-6 md:pt-8">
          <Reveal className="col-span-12 md:col-span-9">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-band-fg/55">
              {t("label")}
            </p>
            <h2 className="mt-8 max-w-[12ch] font-display type-display text-[clamp(1.15rem,6.5vw,9.5rem)] sm:text-[clamp(3.3rem,9.6vw,8.6rem)] leading-[1.4] tracking-[-0.055em]">
              {t("title")}
            </h2>
          </Reveal>
          <Reveal
            delay={80}
            className="col-span-10 col-start-3 mt-9 md:col-span-3 md:col-start-10 md:mt-12"
          >
            <p className="max-w-[40ch] text-[15px] leading-[1.7] text-band-fg/62">
              {t("blurb")}
            </p>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="final-cta-form"
              onClick={openForm}
              className="group mt-9 inline-flex min-h-12 items-center gap-5 border-b border-band-fg/45 text-sm font-bold text-band-fg transition-colors hover:border-band-fg"
            >
              {t("cta")}
              <span
                aria-hidden
                className="transition-transform group-hover:translate-x-1"
              >
                ↗
              </span>
            </button>
            {!open ? (
              <a
                href={whatsappHref(t("whatsappPrefill"))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 -mb-1.5 block w-fit py-1.5 text-xs text-band-fg/62 underline underline-offset-4 transition-colors hover:text-band-fg"
              >
                {t("whatsapp")}
              </a>
            ) : null}
          </Reveal>
        </div>

        <div
          id="final-cta-form"
          hidden={!open}
          className="mt-14 border-t border-band-fg/20 pt-8 md:mt-20 md:pt-10"
        >
          <InquiryForm />
        </div>

        <noscript>
          <p className="mt-16 border-t border-band-fg/20 pt-8 text-sm text-band-fg/60">
            <a
              href={`mailto:${SITE.email}`}
              className="underline underline-offset-4"
            >
              {tContact("emailCta")}
            </a>
          </p>
        </noscript>
      </div>
    </section>
  );
}
