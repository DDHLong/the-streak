import { Badge } from "../../common/Badge/Badge";

const collection: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function CollectionGallery() {
  return (
    <>
      <div className="columns-3 gap-8">
        {collection.map((c, i) => {
          return (
            <div
              className="h-[120px] w-full rounded bg-zinc-500 break-inside-avoid mb-4 p-4 text-white"
              key={i}
            >
              <h3>Unit {c}</h3>
              <Badge className="bg-slate-300 text-black">32 terms</Badge>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default CollectionGallery;
