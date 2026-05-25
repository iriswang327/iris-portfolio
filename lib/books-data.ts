export type BookStatus = "currently-reading" | "to-be-read" | "pretty-good";

export type BookFilter = "all" | BookStatus;

export interface BookItem {
  title: string;
  author: string;
  status: BookStatus;
  /** Open Library ISBN-13 for cover art */
  isbn?: string;
  /** Local cover in /public/books/ — overrides Open Library when set */
  coverSrc?: string;
  wash: string;
  accent: string;
}

/** Drop cover JPGs here. See public/books/COVERS.txt for the checklist. */
export const LOCAL_BOOK_COVERS_DIR = "/books";

export const BOOK_FILTERS: { id: BookFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "currently-reading", label: "Reading" },
  { id: "to-be-read", label: "To read" },
  { id: "pretty-good", label: "Favorites" },
];

/** Section order when showing the full library */
export const BOOK_STATUS_SECTIONS: { id: BookStatus; label: string }[] = [
  { id: "currently-reading", label: "Reading" },
  { id: "to-be-read", label: "To read" },
  { id: "pretty-good", label: "Favorites" },
];

export const BOOK_SUGGESTION_COPY: Record<
  BookStatus,
  { title: string; lede: string; placeholder: string }
> = {
  "currently-reading": {
    title: "What should I pick up next?",
    lede: "Drop a title — I'll add it to my reading stack.",
    placeholder: "Book title",
  },
  "to-be-read": {
    title: "Add to my stack",
    lede: "Something I should queue up? Tell me.",
    placeholder: "Book title",
  },
  "pretty-good": {
    title: "A favorite I should know?",
    lede: "If you'd press this into someone's hands, I want to hear it.",
    placeholder: "Book title",
  },
};

export const BOOK_SUGGESTION_EMAIL = "iriswang32@gmail.com";

export const ABOUT_BOOKS: BookItem[] = [
  {
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    status: "currently-reading",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/crime-and-punishment.jpg`,
    isbn: "9780486415871",
    wash: "#F5EBC8",
    accent: "#E8D498",
  },
  {
    title: "East of Eden",
    author: "John Steinbeck",
    status: "currently-reading",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/east-of-eden.jpg`,
    isbn: "9780141185071",
    wash: "#FFE0C8",
    accent: "#FFBF94",
  },
  {
    title: "A Tree Grows in Brooklyn",
    author: "Betty Smith",
    status: "currently-reading",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/a-tree-grows-in-brooklyn.jpg`,
    isbn: "9780060736262",
    wash: "#D8E8D4",
    accent: "#98C098",
  },
  {
    title: "Sunburn",
    author: "Laura Lippman",
    status: "to-be-read",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/sunburn.jpg`,
    wash: "#F8D8C8",
    accent: "#E8A888",
  },
  {
    title: "Yellowface",
    author: "R.F. Kuang",
    status: "to-be-read",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/yellowface.jpg`,
    wash: "#FFF8DC",
    accent: "#F0E080",
  },
  {
    title: "Madonna in a Fur Coat",
    author: "Sabahattin Ali",
    status: "to-be-read",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/madonna-in-a-fur-coat.jpg`,
    wash: "#E8E8EA",
    accent: "#B0B0B8",
  },
  {
    title: "I Want You to Be Happy",
    author: "Jem Calder",
    status: "to-be-read",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/i-want-you-to-be-happy.jpg`,
    wash: "#F8D8E8",
    accent: "#ECB8D4",
  },
  {
    title: "Babel",
    author: "R.F. Kuang",
    status: "to-be-read",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/babel.jpg`,
    wash: "#E8E8EA",
    accent: "#B8B8BE",
  },
  {
    title: "The Goldfinch",
    author: "Donna Tartt",
    status: "pretty-good",
    isbn: "9780316055437",
    wash: "#C8E4F0",
    accent: "#90C8E0",
  },
  {
    title: "Recursion",
    author: "Blake Crouch",
    status: "pretty-good",
    isbn: "9781524759780",
    wash: "#F5EAC8",
    accent: "#E8D080",
  },
  {
    title: "Tomorrow, and Tomorrow, and Tomorrow",
    author: "Gabrielle Zevin",
    status: "pretty-good",
    isbn: "9780593321201",
    wash: "#FADCE8",
    accent: "#A78BFA",
  },
  {
    title: "Normal People",
    author: "Sally Rooney",
    status: "pretty-good",
    coverSrc: `${LOCAL_BOOK_COVERS_DIR}/normal-people.jpg`,
    isbn: "9780571334650",
    wash: "#D8E4D4",
    accent: "#98B898",
  },
];

/** Open Library Covers API — free, no key required */
export function openLibraryCoverUrl(isbn: string, size: "S" | "M" | "L" = "M"): string {
  return `https://covers.openlibrary.org/b/isbn/${isbn}-${size}.jpg`;
}
