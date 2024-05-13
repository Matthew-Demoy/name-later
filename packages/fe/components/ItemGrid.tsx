import GridItem, { SKU } from "./Item";


interface ItemGridProps {
    items: SKU[]
}
const ItemGrid = (props : ItemGridProps) => {

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {props.items.map((item) => (
                <GridItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ItemGrid;