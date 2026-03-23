import { getAllDocs } from "@/lib/docs";
import SearchDialog from "./SearchDialog";

export default function DocsSearch() {
  const docs = getAllDocs().map(doc => ({ slug: doc.slug, meta: doc.meta }));
  return <SearchDialog docs={docs} />;
}
