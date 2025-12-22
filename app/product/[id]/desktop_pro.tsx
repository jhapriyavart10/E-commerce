import { useCart } from '@/app/context/CartContext';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';

const jewelleryImages = [
  '/assets/images/jewellery1.png',
  '/assets/images/jewellery2.png',
  '/assets/images/jewellery3.png',
  '/assets/images/jewellery4.png',
  '/assets/images/jewellery5.png',
  '/assets/images/jewellery6.png',
];

const materialOptions = [
  { name: 'Obsidian', img: '/assets/images/obsidian.png' },
  { name: 'Tiger Eye', img: '/assets/images/tiger eye.png' },
  { name: 'Lapis Lazuli', img: '/assets/images/lapis lazuli-1.png' },
  { name: 'Rose Quartz', img: '/assets/images/rose quartz.png' },
  { name: 'Clear Quartz', img: '/assets/images/clear quartz.png' },
  { name: 'Green Aventurine', img: '/assets/images/green adventurine.png' },
];

export default function ProductPage() {
  const [selectedImage, setSelectedImage] = useState(jewelleryImages[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0].name);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  // const { addToCart } = useCart(); // Uncomment if you want to use cart

  return (
    <>
      <Header />
      <main
        className="min-h-screen bg-[#F6D8AB] text-[#280F0B]"
        style={{ fontFamily: 'Manrope, sans-serif' }}
      >
        {/* SECTION 1 */}
        <section className="px-[72px] pt-12">
          <div className="grid grid-cols-2 gap-16">
            {/* LEFT COLUMN – IMAGES */}
            <div>
              {/* Breadcrumb */}
              <p className="text-sm mb-4 opacity-70">
                <span style={{ fontWeight: 700 }}>Shop</span> / Pendants / Tiger Eye Pendant
              </p>
              {/* Main Image */}
              <div
                className="bg-[#F2EFEA] flex items-center justify-center"
                style={{ width: 640, height: 640 }}
              >
                <Image
                  src={selectedImage}
                  alt="Product"
                  width={640}
                  height={640}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  priority
                />
              </div>
              {/* Thumbnails */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${jewelleryImages.length}, 1fr)`,
                  gap: 5,
                  width: 640, // EXACTLY same as main image
                  marginTop: 16,
                }}
              >

                {jewelleryImages.map((img, idx) => (
                  <div
                    key={img}
                    style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    overflow: 'hidden',
                    borderRadius: 0,
                    border: selectedImage === img ? '2px solid #280F0B' : '1px solid #ccc',
                    cursor: 'pointer',
                  }}

                    onClick={() => setSelectedImage(img)}
                  >
                    <Image
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      width={100}
                      height={100}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN – DETAILS */}
            <div>
              {/* Title */}
              <h1 className="text-4xl font-semibold mb-3 mt-10">
                Sphere Crystal Pendulums
              </h1>

              {/* Rating */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: 223,
                  height: 24,
                  gap: 8,
                  opacity: 1,
                }}
                className="mb-4"
              >
                <div className="flex gap-1 text-yellow-500" style={{ height: 24, alignItems: 'center', fontSize: 24 }}>
                  ★ ★ ★ ★ ★
                </div>
                <button
                onClick={() =>
                    document
                    .getElementById('reviews-section')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
                style={{
                    fontSize: 14,
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    color: '#280F0B',
                }}
                >
                [7 reviews]
                </button>
            
              </div>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: '24px',
                  marginBottom: 16,
                  marginTop: 0,
                  opacity: 0.9,
                }}
              >
                Harness Universal Energy with a Sphere Crystal Pendulum. The sphere represents wholeness, unity, and the infinite flow of universal energy.
              </p>

              <button
                className="uppercase underline mb-6"
                style={{
                  fontWeight: 700,
                  fontSize: 12,
                  color: '#7F3E2F',
                  fontFamily: 'Manrope, sans-serif',
                  letterSpacing: '-0.5%',
                  marginTop: 2,
                }}
                onClick={() => {
                  setOpenAccordion('Description');
                  setTimeout(() => {
                    descriptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 50);
                }}
              >
                Learn more
              </button>

              {/* Price */}
              <div className="text-2xl font-semibold mb-6">
                $35.00 AUD{' '}
                <span className="text-sm font-normal opacity-70">
                  incl. tax
                </span>
              </div>

              {/* Jewellery Material */}
              <div
                className="mb-6"
                style={{
                  border: '1.25px solid #280F0B',
                  width: 565,
                  height: 146,
                  opacity: 1,
                  position: 'relative',
                  padding: '12px 16px 12px 16px',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  borderRadius: 0,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    marginTop: 4,
                    marginBottom: 8,
                    opacity: 1,
                    lineHeight: '18px',
                  }}
                >
                  Jewellery Material
                </p>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 16,
                    alignItems: 'center',
                    width: '100%',
                    maxWidth: '100%',
                  }}
                >
                  {materialOptions.map((option) => (
                    <button
                      key={option.name}
                      onClick={() => setSelectedMaterial(option.name)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: 'fit-content',
                        minWidth: 60,
                        height: 38,
                        borderRadius: 27,
                        border: selectedMaterial === option.name ? '1px solid #6C6AE4' : '1px solid #280F0B66',
                        background: selectedMaterial === option.name ? '#6C6AE4' : '#F6D8AB',
                        color: selectedMaterial === option.name ? '#fff' : '#280F0B',
                        fontFamily: 'Manrope, sans-serif',
                        fontWeight: 400,
                        fontSize: 14,
                        lineHeight: '21px',
                        letterSpacing: '-0.5%',
                        opacity: 1,
                        transition: 'all 0.15s',
                        paddingTop: 8,
                        paddingRight: 16,
                        paddingBottom: 8,
                        paddingLeft: 16,
                        margin: 0,
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 24.09,
                          height: 21.82,
                          borderRadius: 4,
                          background: 'transparent',
                          marginRight: 8,
                          flexShrink: 0,
                          border: 'none',
                          padding: 0,
                        }}
                      >
                        <Image
                          src={option.img}
                          alt={option.name}
                          width={24.09}
                          height={21.82}
                          style={{ objectFit: 'contain' }}
                        />
                      </span>
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 400,
                          fontSize: 14,
                          lineHeight: '21px',
                          letterSpacing: '-0.5%',
                          opacity: 1,
                          marginLeft: 0,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: 120,
                        }}
                      >
                        {option.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA */}
              <div style={{ width: '100%' }}>
                <div
                  className="flex items-center justify-start"
                  style={{
                    width: 116,
                    height: 38,
                    border: '1px solid #280F0B66',
                    borderBottom: 'none',
                    borderRadius: 0,
                    marginBottom: 0,
                    overflow: 'hidden',
                    boxShadow: '0 1px 0 0 #F6D8AB', // visually remove any bottom border if present
                  }}
                >
                  <button
                    className="px-4 py-2"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    style={{ height: '100%' }}
                  >
                    -
                  </button>
                  <span className="px-4" style={{ minWidth: 24, textAlign: 'center' }}>{quantity}</span>
                  <button
                    className="px-4 py-2"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    style={{ height: '100%' }}
                  >
                    +
                  </button>
                </div>
                <button className="w-full bg-[#7A3E2E] text-white py-4 uppercase tracking-wide mb-3" style={{ marginTop: 0 }}>
                  Add to cart
                </button>
              </div>

              <button className="w-full bg-[#4A2CF0] text-white py-4">
                Buy with <span style={{ fontWeight: 700 }}>Shop</span>
              </button>

              {/* Info */}
              <p className="text-sm mt-4 opacity-70 flex items-center gap-2">
                <Image
                  src="/assets/images/truck.jpeg"
                  alt="Truck"
                  width={40}
                  height={40}
                  style={{ display: 'inline-block' }}
                />
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    fontStyle: 'normal',
                    fontSize: 14,
                    lineHeight: '21px', // 150% of 14px
                    letterSpacing: '-0.5%',
                    color: '#280F0B',
                    marginLeft: 8,
                    display: 'inline-block',
                  }}
                >
                  Orders are fulfilled within 24 hours. 3–5 business days delivery average.
                </span>
              </p>

              {/* DESCRIPTION / INFO ACCORDION */}
              {/* DESCRIPTION / INFO ACCORDION */}
              <div style={{ marginTop: 32 }}>
                {[
                  'Description',
                  'How to use',
                  'Product Details',
                  'Ideal for',
                ].map((title: string) => {
                  const isOpen = openAccordion === title;
                  const refProp = title === 'Description' ? { ref: descriptionRef } : {};
                  return (
                    <div
                      key={title}
                      {...refProp}
                      style={{
                        borderBottom: '1px solid rgba(40, 15, 11, 0.3)',
                        paddingTop: 16,
                        paddingBottom: 16,
                      }}
                    >
                      <button
                        onClick={() =>
                          setOpenAccordion(isOpen ? null : title)
                        }
                        style={{
                          width: '100%',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          background: 'none',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          fontFamily: 'Manrope, sans-serif',
                          color: '#280F0B',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontWeight: 600,
                            fontStyle: 'normal',
                            fontSize: 18,
                            lineHeight: '18px', // 100% of 18px
                            letterSpacing: '0%',
                          }}
                        >
                          {title}
                        </span>

                        <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 700,
                          fontSize: 20,
                          lineHeight: '100%',
                          letterSpacing: '0px',
                          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      >
                        +
                      </span>
                      </button>

                      <div
                        style={{
                          maxHeight: isOpen ? 220 : 0,
                          opacity: isOpen ? 1 : 0,
                          overflow: 'hidden',
                          transition:
                            'max-height 0.45s ease, opacity 0.35s ease',
                          marginTop: isOpen ? 12 : 0,
                        }}
                      >
                        <p
                          style={{
                            fontFamily: 'Manrope, sans-serif',
                            fontWeight: 400,
                            fontSize: 14,
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            color: '#280F0B',
                            opacity: 0.8,
                          }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat.
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div style={{ height: 100 }} />
        {/* SECTION 2 – SEPRATOR BOX */}
        <div
          style={{
            width: '100%',
            height: 35,
            backgroundColor: '#C38154',
          }}
        />
        {/* SECTION 2 – EMBRACE SPIRITUALITY */}
        <section
          style={{
            background: 'linear-gradient(180deg, #2A0F0A 0%, #1A0705 100%)',
            width: '100%',
            height: 560,
            position: 'relative',
          }}
        >
          {/* LEFT TITLE */}
          <h2
            style={{
              position: 'absolute',
              top: 128,
              left: 70,
              width: 503,
              height: 192,
              fontFamily: 'Lora, serif',
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: 96,
              lineHeight: '100%',
              letterSpacing: '-1px',
              color: '#F6D8AB',
              margin: 0,
            }}
          >
            Embrace
            <br />
            Spirituality.
          </h2>

          {/* RIGHT DESCRIPTION */}
          <p
            style={{
              position: 'absolute',
              top: 415,
              left: 1024,
              width: 343,
              height: 126,
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: 14,
              lineHeight: '150%',
              letterSpacing: '-0.5%',
              color: '#F6D8AB',
              margin: 0,
              paddingBottom: 72
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
            ipsum in libero facilisis interdum. Integer sit amet sapien non
            nulla luctus elementum. Praesent vitae semper arcu, non tincidunt
            purus. Curabitur nec nunc a nisi convallis placerat. Suspendisse
            potenti. Nam lacinia, erat at
          </p>
        </section>

        {/* SECTION 3 – CUSTOMER REVIEWS */}
        <section
          id = "reviews-section"
          className="px-[72px] py-20"
          style={{ backgroundColor: '#F6D8AB', color: '#280F0B' }}
        >
          <div className="grid grid-cols-2 gap-20">
            {/* LEFT – RATINGS */}
            <div>
              {/* Customer Reviews Header */}
              <h2
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: 40,
                  lineHeight: '100%',
                  letterSpacing: '-1px',
                  marginBottom: 24,
                }}
              >
                Customer Reviews
              </h2>

              {/* Rating summary */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                {/* 4.8 */}
                <div
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 700,
                    fontSize: 64,
                    lineHeight: '100%',
                    letterSpacing: '-1px',
                  }}
                >
                  4.8
                </div>

                <div>
                  <div
                    style={{
                      color: '#F5B301',
                      fontSize: 20,
                      marginBottom: 4,
                    }}
                  >
                    ★ ★ ★ ★ ★
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      opacity: 0.7,
                    }}
                  >
                    Based on 7 Ratings
                  </p>
                </div>
              </div>

              {/* Rating bars */}
              <div style={{ marginTop: 32 }}>
                {[
                  { star: 5, percent: 90 },
                  { star: 4, percent: 10 },
                  { star: 3, percent: 0 },
                  { star: 2, percent: 0 },
                  { star: 1, percent: 0 },
                ].map((item) => (
                  <div
                    key={item.star}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      marginBottom: 8, // exact spacing
                    }}
                  >
                    {/* STAR + NUMBER */}
                    <span
                    style={{
                      width: 36,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                      fontSize: 14,
                      fontWeight: 400,
                      color: '#464646',
                    }}
                  >
                    <span style={{ color: '#F5B301' }}>★</span>
                    {item.star}
                  </span>

                    {/* BAR */}
                    <div
                      style={{
                        flex: 1,
                        height: 8,
                        backgroundColor: '#5A4A1A',
                        borderRadius: 4,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          width: `${item.percent}%`,
                          height: '100%',
                          backgroundColor: '#F5B301',
                        }}
                      />
                    </div>

                    {/* PERCENT */}
                    <span style={{ width: 40 }}>{item.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT – WRITE REVIEW */}
            <div
              style={{
                width: 624,
                height: 301,
                border: '1px dashed #280F0B',
                borderImage: '1px dashed #280F0B',
                padding: 48,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontSize: 24,
                  fontWeight: 600,
                  marginBottom: 8,
                }}
              >
                Review this product
              </h3>
              <p
                style={{
                  fontSize: 14,
                  opacity: 0.8,
                  marginBottom: 24,
                }}
              >
                Share your feedback with other customers
              </p>

              <button
                style={{
                  width: 349,
                  height: 51,
                  backgroundColor: '#7A3E2E',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <img
                  src="/assets/images/write.svg"
                  alt="write"
                />
                <span
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: 14,
                    lineHeight: '150%',
                    letterSpacing: '0.08em', // 8%
                    textTransform: 'uppercase',
                    color: '#FFFFFF',
                  }}
                >
                  Write a review
                </span>

              </button>
            </div>
          </div>

          {/* TOP REVIEWS */}
          <div style={{ marginTop: 64 }}>
            <h3
              style={{
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 16,
                textDecoration: 'underline',
                textUnderlineOffset: 6,
              }}
            >
              Top reviews
            </h3>

            {/* Filters */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  borderRadius: 999,
                  backgroundColor: '#E7C69A',
                }}
              >
                <img src="/assets/images/search-icon.png" alt="search" />
                <span style={{ fontSize: 14 }}>Search reviews</span>
              </div>

              {['Most relevant', 'All ratings', 'With media'].map((label) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '10px 16px',
                    borderRadius: 999,
                    backgroundColor: '#E7C69A',
                    fontSize: 14,
                  }}
                >
                  {label}
                  <img src="/assets/images/dropdown.svg" alt="dropdown" />
                </div>
              ))}
            </div>

            {/* REVIEW CARDS */}
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FDC77B',
                  padding: 24,
                  marginBottom: 24,
                }}
              >
                <p style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                Raman S.
                <img
                  src="/assets/images/verified.png"
                  alt="Verified Buyer"
                  style={{ width: 16, height: 16 }}
                />
                <span style={{ fontWeight: 400 }}>Verified Buyer</span>
              </p>

                <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
                  18 days ago
                </p>
                <p style={{ fontSize: 14, lineHeight: '22px' }}>
                  I bought the black Ball Crystal Pendulum for my wife and she says it
                  has a steady, smooth swing and feels very responsive during her
                  readings. It’s become one of her favourite tools... She loves it!
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}





