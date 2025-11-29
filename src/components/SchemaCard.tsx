'use client';

type Props = {
  schema: string;
  schemaId?: string;
};

export function SchemaCard({ schema, schemaId }: Props) {
  return (
    <section className="rounded-3xl border border-white/15 bg-gradient-to-br from-white/10 to-white/5 p-6 text-white shadow-2xl shadow-black/30">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-white/60">
            Active schema
          </p>
          <h3 className="text-xl font-semibold">Somnia Data Model</h3>
        </div>
        {schemaId && (
          <span className="max-w-[180px] truncate rounded-full bg-white/10 px-3 py-1 text-[11px] text-white/80">
            {schemaId}
          </span>
        )}
      </header>
      <pre className="mt-4 rounded-2xl bg-black/40 p-4 text-sm leading-relaxed text-emerald-100">
        {schema.split(",").map((row) => (
          <div key={row.trim()}>{row.trim()}</div>
        ))}
      </pre>
      <p className="mt-3 text-xs text-white/60">
        Update `SOMNIA_DEFAULT_SCHEMA` to change the structure.
      </p>
    </section>
  );
}

