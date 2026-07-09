from pathlib import Path
import re

p = Path("pages/movie/[id].tsx")
text = p.read_text()

text = re.sub(
    r'export const getServerSideProps: GetServerSideProps = async \(\{ params \}\) => \{',
    'export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {',
    text,
    count=1
)

pattern = r'const res = await fetch\(\s*`/api/movie/\$\{params\?\.id\}`\s*\);'

replacement = '''const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const host = req.headers.host;
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(
    `${baseUrl}/api/movie/${params?.id}`
  );'''

new_text, n = re.subn(pattern, replacement, text, count=1, flags=re.S)

if n != 1:
    raise SystemExit("Movie fetch statement not found.")

p.write_text(new_text)
print("✅ Movie page fixed.")
