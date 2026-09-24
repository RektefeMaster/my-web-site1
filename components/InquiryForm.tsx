"use client";

import { FormEvent, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { SITE, whatsappHref } from "@/lib/site";

export default function InquiryForm() {
  const tContact = useTranslations("contact");
  const locale = useLocale();
  const interests = tContact.raw("interests") as string[];
  const [selected, setSelected] = useState<number[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [errorField, setErrorField] = useState<
    "name" | "email" | "message" | null
  >(null);
  const formRef = useRef<HTMLFormElement>(null);

  function toggleInterest(index: number) {
    setSelected((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const message = String(data.get("message") ?? "").trim();

    if (!cleanName) {
      setStatus("error");
      setErrorField("name");
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="name"]')
        ?.focus();
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      setStatus("error");
      setErrorField("email");
      formRef.current
        ?.querySelector<HTMLInputElement>('input[name="email"]')
        ?.focus();
      return;
    }
    if (message.length < 8) {
      setStatus("error");
      setErrorField("message");
      formRef.current
        ?.querySelector<HTMLTextAreaElement>('textarea[name="message"]')
        ?.focus();
      return;
    }

    setStatus("sent");
    setErrorField(null);
    const body = [
      `${tContact("mailName")}: ${cleanName}`,
      `${tContact("mailEmail")}: ${cleanEmail}`,
      `${tContact("mailInterest")}: ${
        selected.map((index) => interests[index]).filter(Boolean).join(", ") ||
        "·"
      }`,
      "",
      message,
    ].join("\n");
    window.location.assign(whatsappHref(body));
  }

  const fieldClass =
    "w-full border-0 border-b border-band-fg/45 bg-transparent px-0 py-4 text-base text-band-fg outline-none transition-colors placeholder:text-band-fg/55 focus:border-band-fg";

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      className="grid grid-cols-12 gap-x-5 gap-y-12 md:gap-x-6"
    >
      <div className="col-span-12 grid gap-8 md:col-span-5">
        <label className="block">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55">
            01 / {tContact("name")}
          </span>
          <input
            name="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              if (errorField === "name") setErrorField(null);
            }}
            required
            autoComplete="name"
            aria-invalid={errorField === "name" || undefined}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55">
            02 / {tContact("email")}
          </span>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (errorField === "email") setErrorField(null);
            }}
            required
            autoComplete="email"
            inputMode="email"
            aria-invalid={errorField === "email" || undefined}
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55">
            03 / {tContact("messageLabel")}
          </span>
          <textarea
            name="message"
            rows={5}
            required
            minLength={8}
            placeholder={tContact("message")}
            aria-invalid={errorField === "message" || undefined}
            aria-describedby={status === "error" ? "inquiry-form-error" : undefined}
            className={`${fieldClass} resize-y leading-relaxed`}
          />
        </label>
      </div>

      <fieldset className="col-span-12 md:col-span-6 md:col-start-7">
        <legend className="mb-5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-band-fg/55">
          04 / {tContact("interestedIn")}
        </legend>
        <div className="grid border-t border-band-fg/40 sm:grid-cols-2">
          {interests.map((label, index) => {
            const checked = selected.includes(index);
            return (
              <button
                key={`${locale}-${index}`}
                type="button"
                onClick={() => toggleInterest(index)}
                aria-pressed={checked}
                className="group grid min-h-14 grid-cols-[2rem_1fr_auto] items-center gap-3 border-b border-band-fg/40 py-3 text-left text-sm text-band-fg/62 sm:odd:border-r sm:odd:pr-4 sm:even:pl-4"
              >
                <span className="font-mono text-[9px] text-band-fg/55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={checked ? "text-band-fg" : ""}>{label}</span>
                <span
                  aria-hidden
                  className="font-mono text-xs text-band-fg/55"
                >
                  {checked ? "[×]" : "[ ]"}
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="submit"
          className="mt-8 inline-flex min-h-12 w-full items-center justify-between border border-band-fg bg-band-fg px-5 text-sm font-bold text-band transition-[background-color,color] hover:bg-transparent hover:text-band-fg sm:w-auto sm:min-w-64"
        >
          {tContact("send")}
          <span aria-hidden>↗</span>
        </button>

        {status === "sent" ? (
          <p className="mt-4 text-xs text-band-fg/55">{tContact("sentHint")}</p>
        ) : null}
        {status === "error" ? (
          <p
            id="inquiry-form-error"
            role="alert"
            className="mt-4 text-xs text-red-200"
          >
            {errorField === "name"
              ? tContact("errorName")
              : errorField === "email"
                ? tContact("errorEmail")
                : tContact("errorMessage")}
          </p>
        ) : null}
        <a
          href={`mailto:${SITE.email}`}
          className="mt-5 -mb-1.5 block w-fit py-1.5 text-xs text-band-fg/62 underline underline-offset-4 hover:text-band-fg"
        >
          {tContact("emailCta")}
        </a>
      </fieldset>
    </form>
  );
}
