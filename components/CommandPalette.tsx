"use client";

import { Command } from "cmdk";
// cmdk renders these children inside its internal Radix Dialog.Content, so a
// sr-only Title + Description satisfy Radix's a11y requirements (clears the
// dev-only "DialogContent requires a DialogTitle" console error).
import { Title as DialogTitle, Description as DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Briefcase,
  Mail,
  MessageSquare,
  User,
  FolderGit2,
} from "lucide-react";
import { LinkedinIcon } from "@/components/icons/Brand";
import { publishedProjects } from "@/lib/projects";
import { site, emailAddress } from "@/lib/site";
import { DICT, DIR } from "@/lib/i18n/content";
import { useLocale } from "@/lib/i18n/LocaleProvider";

const OPEN_EVENT = "eg:open-command-palette";

const HEADING_CLASS =
  "px-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted";

/** Imperatively open the palette from anywhere (e.g. the header button). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CommandPalette() {
  const router = useRouter();
  const { locale } = useLocale();
  const t = DICT[locale].cmd;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, onOpen);
    };
  }, []);

  function run(action: () => void) {
    setOpen(false);
    action();
  }

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      dir={DIR[locale]}
      label={t.placeholder}
      className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]"
    >
      {/* backdrop — presentational; cmdk handles Esc + outside-click dismissal */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-card shadow-2xl shadow-black/60">
        <DialogTitle className="sr-only">{locale === "he" ? "חלונית פקודות" : "Command palette"}</DialogTitle>
        <DialogDescription className="sr-only">{t.placeholder}</DialogDescription>
        <Command.Input
          placeholder={t.placeholder}
          className="w-full border-b border-border bg-transparent px-5 py-4 text-sm text-foreground outline-none placeholder:text-muted"
        />
        <Command.List className="max-h-[330px] overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted">
            {t.empty}
          </Command.Empty>

          <Command.Group heading={t.navigate} className={HEADING_CLASS}>
            <Item onSelect={() => run(() => router.push("/#work"))} icon={<Briefcase />}>
              {t.work}
            </Item>
            <Item onSelect={() => run(() => router.push("/#about"))} icon={<User />}>
              {t.about}
            </Item>
            <Item onSelect={() => run(() => router.push("/#contact"))} icon={<Mail />}>
              {t.contact}
            </Item>
            <Item
              onSelect={() => run(() => window.dispatchEvent(new Event("eg:open-chat")))}
              icon={<MessageSquare />}
            >
              {t.askAI}
            </Item>
          </Command.Group>

          <Command.Group heading={t.caseStudies} className={HEADING_CLASS}>
            {publishedProjects.map((p) => (
              <Item
                key={p.slug}
                onSelect={() => run(() => router.push(`/work/${p.slug}`))}
                icon={<FolderGit2 />}
              >
                {p.title}
              </Item>
            ))}
          </Command.Group>

          <Command.Group heading={t.links} className={HEADING_CLASS}>
            <Item
              onSelect={() => run(() => navigator.clipboard?.writeText(emailAddress))}
              icon={<Mail />}
            >
              {t.copyEmail}
            </Item>
            <Item
              onSelect={() => run(() => window.open(site.socials.linkedin, "_blank", "noopener,noreferrer"))}
              icon={<LinkedinIcon />}
            >
              {t.linkedin}
            </Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}

function Item({
  children,
  icon,
  onSelect,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  onSelect: () => void;
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted aria-selected:bg-card-2 aria-selected:text-foreground [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-muted aria-selected:[&_svg]:text-accent"
    >
      {icon}
      {children}
    </Command.Item>
  );
}
