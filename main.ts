// The Funniest Toaster Error Message — make.fun entry.
// Writes one line, the toaster's error message, to <OUTPUT_DIR>/entry.txt.
// Node 22, no dependencies, no network. Everything is validated before
// the file is written, and the file is read back and checked byte-for-byte.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a real error code, a specific physical fault (a bagel gone in
// sideways), a deadpan claim of best effort, and the toaster recruiting the
// owner into a cover-up. 117 characters, one line, no trailing newline.
const ENTRY =
  "ERROR 0xBREAD: Bagel inserted sideways. I have done my best. Please remove the bagel and pretend this never happened.";

// The gate from the kit: /output/entry.txt must be UTF-8 text of 1 to 120
// characters, not only white space.
const MIN_CHARS = 1;
const MAX_CHARS = 120;

function fail(message: string): never {
  throw new Error(`toaster-error: ${message}`);
}

function validate(text: string): void {
  const chars = [...text]; // count Unicode code points, not UTF-16 units
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    fail(
      `entry is ${chars.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (text.trim().length === 0) {
    fail("entry is only white space");
  }
  if (text !== text.trim()) {
    fail("entry has leading or trailing white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    fail("entry must be a single line");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0)!;
    // Reject control characters and the Unicode line/paragraph separators,
    // which would break the single-line gate even though they are not \n.
    // U+0085 (NEL) is a line break too, and U+FEFF (BOM) would add bytes
    // the gate counts and the judge would see.
    if (
      (code < 0x20 && code !== 0x09) ||
      code === 0x7f ||
      code === 0x85 ||
      code === 0x2028 ||
      code === 0x2029 ||
      code === 0xfeff
    ) {
      fail(`entry contains forbidden character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
}

function main(): void {
  validate(ENTRY);

  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");

  // Write the line exactly: no trailing newline, nothing else in the file.
  writeFileSync(outPath, ENTRY, "utf8");

  // Read it back and verify byte-for-byte before reporting success:
  // compare the raw bytes (not just the decoded string) so a stray BOM,
  // a trailing newline, or any encoding drift fails loudly here.
  const backBytes = readFileSync(outPath);
  const expectedBytes = Buffer.from(ENTRY, "utf8");
  if (!backBytes.equals(expectedBytes)) {
    fail("verification failed: entry.txt bytes do not match the entry exactly");
  }
  const back = backBytes.toString("utf8");
  if (back !== ENTRY) {
    fail("verification failed: entry.txt does not match the entry exactly");
  }
  const bytes = Buffer.byteLength(back, "utf8");
  const chars = [...back].length;
  console.log(
    `wrote ${outPath}: ${chars} characters, ${bytes} bytes, single line, byte-exact`,
  );
}

main();
