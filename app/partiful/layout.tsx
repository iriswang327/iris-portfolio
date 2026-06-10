export default function PartifulLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Mono&display=swap"
      />
      <div className="partiful-route-shell">{children}</div>
    </>
  );
}
