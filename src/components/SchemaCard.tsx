'use client';

type Props = {
  schema: string;
  schemaId?: string;
};

export function SchemaCard({ schema, schemaId }: Props) {
  const fields = schema
    .split(",")
    .map((row) => row.trim())
    .filter(Boolean);

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-white/15 bg-slate-950/60 p-6 text-white shadow-[0_25px_70px_rgba(2,6,23,0.85)]">
      <div className="absolute inset-0 opacity-60 blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-400/10 via-transparent to-cyan-400/10" />
      </div>
      <div className="relative">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Active schema
            </p>
            <h3 className="text-2xl font-semibold">Somnia Data Model</h3>
          </div>
          {schemaId && (
            <span className="max-w-[220px] truncate rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] text-white/80">
              {schemaId}
            </span>
          )}
        </header>
        <div className="mt-6 grid gap-3">
          {fields.map((row, index) => (
            <div
              key={row}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-emerald-100"
            >
              <span className="text-white/70">{row}</span>
              <span className="text-xs uppercase tracking-[0.3em] text-white/40">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-white/60">
          Update `SOMNIA_DEFAULT_SCHEMA` to change the structure.
        </p>
      </div>
    </section>
  );
}

