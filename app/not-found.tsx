import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <span aria-hidden="true">∅</span>
      <p className="eyebrow">Problem not found</p>
      <h1>This dossier is not in the ledger.</h1>
      <p>
        The problem may have moved, been removed after a status check, or never existed under
        this address.
      </p>
      <Link className="primary-action" href="/#catalog">
        Browse the Prize Problem Ledger <span aria-hidden="true">→</span>
      </Link>
    </main>
  );
}
