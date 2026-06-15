import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function GiftsHampersRow() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(1);

  // Mock Data: 6 beautiful items representing your store items
  const products = [
    { id: 1, name: "Fairy Birthday Hamper", price: "2,499.00", img: "/gift1.jpeg" },
    { id: 2, name: "Angelic Gift Hamper", price: "1,449.00", img: "/gift2.jpeg" },
    { id: 3, name: "Premium Velvet Scrunchie Box", price: "599.00", img: "/gift3.jpeg" },
    { id: 4, name: "Handmade Keepsake Journal", price: "899.00", img: "/gift4.jpeg" },
    { id: 5, name: "Custom Satin Ribbon Pack", price: "349.00", img: "/gift5.jpeg" },
    { id: 6, name: "Luxury Blossom Gift Set", price: "1,999.00", img: "/gift6.jpeg" }
  ];

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await fetch(
  //         "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec?sheet=Products"
  //       );

  //       const data = await res.json();

  //       setProducts(data);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  const totalPages = products.length;

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 310;
      const currentScroll = scrollRef.current.scrollLeft;

      let targetScroll = direction === "next"
        ? currentScroll + cardWidth
        : currentScroll - cardWidth;

      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: "smooth"
      });

      setCurrentIndex((prev) => {
        if (direction === "next") {
          return prev < totalPages ? prev + 1 : prev;
        } else {
          return prev > 1 ? prev - 1 : prev;
        }
      });
    }
  };

  return (
    <section className="w-full max-w-[1340px] mx-auto px-[40px] py-[60px] bg-[#F9F5E0]">
      {/* Header Section */}
      <div className="mb-[30px] text-left">
        <h2 className="font-serif text-[32px] font-medium text-[#1a1a1a] mb-[6px]">
          Gifts and Hampers (most trending)
        </h2>
        <p className="text-sm text-[#767676] font-light">
          Pre-made gift hampers for you
        </p>
      </div>

      {/* Main Scroll Container */}
      <div className="w-full overflow-hidden relative">
        <div
          className="flex gap-[24px] overflow-x-auto scroll-smooth pb-[15px] scrollbar-hide"
          ref={scrollRef}
        >
          {products.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[285px] flex flex-col group"
            >
              <div className="w-full h-[285px] bg-[#fcf9f7] overflow-hidden rounded-[4px] mb-[14px]">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="text-sm font-normal text-[#222222] mb-[6px] capitalize">
                {item.name}
              </h3>
              <p className="text-sm font-medium text-[#7A0016] mb-[14px]">
                Rs. {item.price}
              </p>
              <button
                className="w-full bg-transparent text-[#222222] border border-[#222222] py-[10px] text-[13px] rounded-full cursor-pointer transition-all duration-200 !hover:text-white hover:bg-[#7A0016] hover:border-[#7A0016] "
                onClick={() => navigate(`/product/${item.id}`)}
              >
                Choose options
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col items-center justify-center gap-[20px] mt-[35px]">
        <div className="flex items-center gap-[20px]">
          <button
            className="bg-none border-none text-[18px] text-[#222222] cursor-pointer transition-colors duration-200 p-[5px] disabled:text-[#cccccc] disabled:cursor-not-allowed"
            onClick={() => handleScroll("prev")}
            disabled={currentIndex === 1}
          >
            ←
          </button>

          <span className="text-[13px] tracking-[1px] text-[#555555] font-medium">
            {currentIndex} / {totalPages}
          </span>

          <button
            className="bg-none border-none text-[18px] text-[#222222] cursor-pointer transition-colors duration-200 p-[5px] disabled:text-[#cccccc] disabled:cursor-not-allowed"
            onClick={() => handleScroll("next")}
            disabled={currentIndex === totalPages}
          >
            →
          </button>
        </div>

        <button
          className="bg-[#111111] border-none px-[45px] py-[12px] text-[12px] font-semibold uppercase tracking-[1.5px] rounded-full cursor-pointer transition-colors duration-200 hover:bg-[#7A0016]"
          style={{ color: 'white' }}
          onClick={() => navigate("/products?category=curated-hampers")}
        >
          View all
        </button>
      </div>
    </section>
  );
}