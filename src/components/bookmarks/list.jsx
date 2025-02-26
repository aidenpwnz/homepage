import Item from "components/bookmarks/item";

export default function List({ bookmarks }) {
  return (
    <ul role="list" className="mt-3 flex flex-col">
      {bookmarks.map((bookmark) => (
        <Item key={bookmark.name} bookmark={bookmark} />
      ))}
    </ul>
  );
}
