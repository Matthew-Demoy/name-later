export interface SKU {
    id: string;
    title: string;
    author: string;
    price: number;
    inventory: number;
    image: string;
    description : string
    // original price, sale percentage
    // paperback, hardover, ebook
    // Series id
    // Best Seller, new arrival,
}

interface GridItemProps {
    item: SKU
}

const GridItem = (props: GridItemProps) => {
    const { id, title, author, price, inventory, image } = props.item
    return (
        <div className="flex flex-col  m-2">
            <img className="object-cover" src={image} alt={title} />
            <div className="flex flex-col">
                <span>{title}</span>
                <a>By {author}</a>
                <span>{price}$</span>
                <span>{inventory > 0 ? 'In Stock' : 'Out of Stock'}</span>
            </div>
        </div>
    )
}

export default GridItem;