import { useState, useEffect, Fragment } from 'react';
import './products.css';
import { IoIosArrowBack, IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { CiHeart } from 'react-icons/ci';
import { DropDown } from '../components';
import { useMediaQuery } from 'react-responsive';
const Checkbox = ({ checked, onToggle, className, size }) => {
    return (
        <button className={`checkbox ${className}`} onClick={onToggle} style={{ backgroundColor: checked ? '#4d4d4d' : 'transparent' }}>
            {checked && <TiTick size={size} color='white' />}
        </button>
    )
}

const Product = ({ product, loading }) => {
    return (<div className='product'>
        <div className='img-container'>
            <span className='product-specials'></span>
            <span className='out-of-stock'></span>
            <img src={product.image} alt={`product-image-${product.title}`} />
        </div>
        <div className="product-options">
            <div>
                <span className="title">{product.title}</span>
                <span className="description"> <a href="#">Sign in</a> or Create an account to see pricing</span>
            </div>
            <button className="like-product"><CiHeart /></button>
        </div>
    </div>)
}

const ProductPannel = ({ products, loading, className, isHidden }) => {
    const isAdjustable = useMediaQuery({ maxWidth: 800 })
    return (
        <div className={`${className}`} style={{ gridTemplateColumns: (isHidden && isAdjustable) ? 'repeat(4, 1fr)' : 'repeat(3, 1fr)' }}>
            {loading ? (
                <div>Loading...</div>
            ) : (
                products.map((product) => <Product key={product.id} product={product} loading={loading} />)
            )}
        </div>
    );
};

const Products = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hideFilter, setHideFilter] = useState(isMobile ? true : false);
    const [isCustomizable, setIsCustomizable] = useState(false);
    const [openedOption, setOpenedOption] = useState({
        ideal_for: false,
        occasion: false,
        work: false,
        fabric: false,
        segment: false,
        suitable_for: false,
        raw_materials: false,
        pattern: false,
    });
    const [selectedOptions, setSelectedOptions] = useState({
        ideal_for: ['Women'],
        occasion: ['All'],
        work: ['All'],
        fabric: ['All'],
        segment: ['All'],
        suitable_for: ['All'],
        raw_materials: ['All'],
        pattern: ['All'],
    });
    const handleOptionToggle = (id) => {
        setOpenedOption((prev) => ({ ...prev, [id]: !prev[id] }));
    };
    const handleOptionCheckBoxToggle = (optionId, value) => {
        if (selectedOptions[optionId].some(val => val === value)) {
            setSelectedOptions((prev) => {
                if (prev[optionId].length <= 1) {
                    return { ...prev, [optionId]: ['All'] };
                } else {
                    return {
                        ...prev,
                        [optionId]: prev[optionId].filter((val) => val !== value && val !== 'All'),
                    };
                }
            })
        } else {
            setSelectedOptions((prev) => ({
                ...prev,
                [optionId]: prev[optionId]?.filter((val) => val !== 'All')?.concat([value]),
            }))
        }
    }
    const customizableOptions = [
        { id: 'ideal_for', type: 'IDEAL FOR', options: ['All', 'Men', 'Women', 'Kids'] },
        { id: 'occasion', type: 'OCCASION', options: ['All', 'Casual', 'Formal', 'Party'] },
        { id: 'work', type: 'WORK', options: ['All', 'Office', 'Outdoor', 'Sports'] },
        { id: 'fabric', type: 'FABRIC', options: ['All', 'Cotton', 'Silk', 'Polyester'] },
        { id: 'segment', type: 'SEGMENT', options: ['All', 'Premium', 'Mid-range', 'Budget'] },
        { id: 'suitable_for', type: 'SUITABLE FOR', options: ['All', 'Adults', 'Teenagers', 'Children'] },
        { id: 'raw_materials', type: 'RAW MATERIALS', options: ['All', 'Leather', 'Textile', 'Synthetic'] },
        { id: 'pattern', type: 'PATTERN', options: ['All', 'Solid', 'Printed', 'Striped'] }
    ];

    const category = ['recommended', 'newest first', 'popular', 'price: low to high', 'price: high to low'];
    const [selectedCategory, setSelectedCategory] = useState(category[0]);


    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                console.log(data);
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);
    return (
        <div className='products-page'>
            {isMobile &&
                <div className='route'>
                    <a href="#" style={{ color: "#BFC8CD" }}>HOME</a>
                    <span style={{ borderRight: "solid 1px #252020", height: "12px" }}></span>
                    <a href="#" style={{ color: "#252020" }}>SHOP</a>
                </div>}
            <div className="hero-section">
                <h1>Discover our Products</h1>
                <p>Lorem ipsum dolor sit amet consectetur. Amet est posuere rhoncus scelerisque. Dolor integer scelerisque nibh amet mi ut elementum dolor.</p>
            </div>
            <div className="products-section">
                <div className='information-tab'>
                    {!isMobile && <span>{0} ITEMS</span>}
                    <button style={{ fontFamily: `"Times New Roman",Times,serif` }} onClick={() => { setHideFilter((prev) => !prev); }} >
                        {!isMobile && <span>{hideFilter ? <IoIosArrowForward /> : <IoIosArrowBack />}</span>}
                        <span style={isMobile ? { textDecoration: "none", border: "none", fontSize: "18px", fontWeight: "700", textTransform: "uppercase", color: "#252020" } : undefined}>
                            {hideFilter ? 'SHOW' : 'HIDE'} FILTER
                        </span>
                    </button>
                    <DropDown className='category-selector' options={category} selectedOption={selectedCategory} onSelect={setSelectedCategory} />
                </div>
                <div className='display-pannel'>
                    {!hideFilter && <div className='filter-tab'>
                        <div className='customizable'>
                            <Checkbox className='customizable-checkbox' size={18} checked={isCustomizable} onToggle={() => { setIsCustomizable((prev) => !prev); }} />
                            <label htmlFor="customizable">Customizable</label>
                        </div>
                        <hr />
                        {customizableOptions.map((option) => (
                            <Fragment key={option.id + 'filter'}>
                                <div className='options'>
                                    <div className='option-header'><span>{option.type}</span> <button onClick={() => { handleOptionToggle(option.id); }}><IoIosArrowDown style={{ transform: openedOption[option.id] ? "rotate(180deg)" : "none" }} /></button></div>
                                    <div className='option-selector'>{selectedOptions[option.id].map(value => <span key={value + 'selected'}>{value}</span>)}</div>
                                    {openedOption[option.id] && <div className={`option-values ${openedOption[option.id] ? 'open' : ''}`}>
                                        <button onClick={() => { setSelectedOptions(prev => ({ ...prev, [option.id]: ['All'] })) }}>Unselect all</button>
                                        {option.options.filter(value => value !== 'All').map((value) => (
                                            <div className='option-value' key={option.id + value}> <Checkbox className='options-checkbox' size={18} checked={selectedOptions[option.id].some((val) => val === value)} onToggle={() => { handleOptionCheckBoxToggle(option.id, value) }} /><span>{value}</span></div>
                                        ))}
                                    </div>}
                                </div>
                                <hr />
                            </Fragment>
                        ))}
                    </div>}
                    <div className='product-pannel-container'>
                        <ProductPannel products={products} loading={loading} className="product-pannel" isHidden={hideFilter} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;
