'use client';

import { useState } from 'react';
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

export default function MobileProductPage() {
  const [selectedImage, setSelectedImage] = useState(jewelleryImages[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0].name);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  return (
    <>
      <Header />

      <main
        style={{
          backgroundColor: '#F6D8AB',
          color: '#280F0B',
          fontFamily: 'Manrope, sans-serif',
        }}
      >
        {/* SECTION 1 – PRODUCT (MOBILE) */}
        <section style={{ padding: '24px' }}>
          {/* Breadcrumb */}
          <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
            <strong>Shop</strong> / Pendants / Tiger Eye Pendant
          </p>

          {/* Main Image */}
          <div
            style={{
              width: '100%',
              aspectRatio: '1 / 1',
              backgroundColor: '#F2EFEA',
              marginBottom: 12,
            }}
          >
            <Image
              src={selectedImage}
              alt="Product"
              width={600}
              height={600}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              priority
            />
          </div>

          {/* Thumbnails */}
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: 8,
                width: '100%',
                marginBottom: 24,
            }}
         >

            {jewelleryImages.map((img) => (
              <div
                key={img}
                onClick={() => setSelectedImage(img)}
                style={{
                width: '100%',
                aspectRatio: '1 / 1',
                border:
                    selectedImage === img
                    ? '2px solid #280F0B'
                    : '1px solid rgba(40,15,11,0.3)',
                cursor: 'pointer',
                }}

              >
                <Image
                  src={img}
                  alt="Thumbnail"
                  width={72}
                  height={72}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 24,
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Sphere Crystal Pendulums
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ color: '#F5B301' }}>★ ★ ★ ★ ★</span>
            <button
            onClick={() =>
                document
                .getElementById('reviews-section')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
                fontSize: 12,
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
              fontSize: 14,
              lineHeight: '22px',
              marginBottom: 12,
            }}
          >
            Harness Universal Energy with a Sphere Crystal Pendulum. The sphere
            represents wholeness, unity, and the infinite flow of universal energy.
          </p>

          {/* Learn more */}
          <button
            onClick={() => {
                setOpenAccordion('Description');
                setTimeout(() => {
                document
                    .getElementById('description-section')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }, 50);
            }}
            style={{
                fontSize: 12,
                fontWeight: 700,
                textTransform: 'uppercase',
                textDecoration: 'underline',
                color: '#7F3E2F',
                marginBottom: 16,
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
            }}
            >
            Learn more
            </button>


          {/* Price */}
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              marginBottom: 16,
            }}
          >
            $35.00 AUD{' '}
            <span style={{ fontSize: 12, fontWeight: 400 }}>incl. tax</span>
          </div>

          {/* Jewellery Material */}
          <div
            style={{
              border: '1px solid #280F0B',
              padding: 12,
              marginBottom: 16,
            }}
          >
            <p style={{ fontSize: 14, fontWeight: 500, marginBottom: 8 }}>
              Jewellery Material
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {materialOptions.map((option) => (
                <button
                onClick={() => setSelectedMaterial(option.name)}
                style={{
                    width: '100%',
                    height: 44,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 8,
                    borderRadius: 999,
                    border:
                    selectedMaterial === option.name
                        ? '1px solid #6C6AE4'
                        : '1px solid #280F0B',
                    background:
                    selectedMaterial === option.name ? '#6C6AE4' : '#F6D8AB',
                    color:
                    selectedMaterial === option.name ? '#FFFFFF' : '#280F0B',
                    fontSize: 14,
                    fontWeight: 400,
                }}
                >

                  <Image
                    src={option.img}
                    alt={option.name}
                    width={20}
                    height={20}
                  />
                  {option.name}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div
            style={{
                display: 'flex',
                alignItems: 'center',
                height: 35,
                width: 120,
                borderTop: '1px solid rgba(40,15,11,0.4)',
                borderLeft: '1px solid rgba(40,15,11,0.4)',
                borderRight: '1px solid rgba(40,15,11,0.4)',
                borderBottom: 'none',
                marginBottom: 0, // IMPORTANT: no spacing
            }}
            >

            <button
              style={{ flex: 1 }}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </button>
            <span style={{ flex: 1, textAlign: 'center' }}>{quantity}</span>
            <button style={{ flex: 1 }} onClick={() => setQuantity((q) => q + 1)}>
              +
            </button>
          </div>

          {/* Add to cart */}
          <button
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#7A3E2E',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'uppercase',
              marginBottom: 12,
            }}
          >
            Add to cart
          </button>

          {/* Buy with shop */}
          <button
            style={{
              width: '100%',
              height: 48,
              backgroundColor: '#4A2CF0',
              color: '#fff',
              marginBottom: 16,
            }}
          >
            Buy with <strong>Shop</strong>
          </button>

          {/* Delivery Info */}
          <div style={{ display: 'flex', gap: 8, fontSize: 14 }}>
            <Image
              src="/assets/images/truck.jpeg"
              alt="Truck"
              width={40}
              height={40}
            />
            <span>
              Orders are fulfilled within 24 hours. 3–5 business days delivery
              average.
            </span>
          </div>

          {/* MOBILE ACCORDION – DESCRIPTION / DETAILS */}
            <div style={{ marginTop: 24 }}>
            {['Description', 'How to use', 'Product Details', 'Ideal for'].map(
                (title) => {
                const isOpen = openAccordion === title;

                return (
                    <div
                    key={title}
                    id={title === 'Description' ? 'description-section' : undefined}
                    style={{
                        borderBottom: '1px solid rgba(40,15,11,0.4)',
                        padding: '14px 0',
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
                        fontSize: 16,
                        fontWeight: 500,
                        color: '#280F0B',
                        }}
                    >
                        <span>{title}</span>
                        <span
                        style={{
                            fontSize: 20,
                            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease',
                        }}
                        >
                        +
                        </span>
                    </button>

                    {isOpen && (
                        <p
                        style={{
                            marginTop: 12,
                            fontSize: 14,
                            lineHeight: '22px',
                            color: '#280F0B',
                            opacity: 0.8,
                        }}
                        >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                        </p>
                    )}
                    </div>
                );
                }
            )}
            </div>

        </section>
        <div style={{ height: 50 }} />

        {/* SECTION 2 – EMBRACE SPIRITUALITY (MOBILE) */}
        <section
        style={{
            width: '100%',
            background: 'linear-gradient(180deg, #2A0F0A 0%, #1A0705 100%)',
        }}
        >
        {/* TOP SEPARATOR BAR */}
        <div
            style={{
            width: '100%',
            height: 35,
            backgroundColor: '#C38154',
            }}
        />

        {/* CONTENT */}
        <div
            style={{
            padding: '32px 24px 48px 24px',
            }}
        >
            {/* TITLE */}
            <h2
            style={{
                fontFamily: 'Lora, serif',
                fontWeight: 700,
                fontStyle: 'italic',
                fontSize: 48,
                lineHeight: '100%',
                letterSpacing: '-1px',
                color: '#F6D8AB',
                marginBottom: 237,
            }}
            >
            Embrace
            <br />
            Spirituality.
            </h2>

            {/* DESCRIPTION */}
            <p
            style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                lineHeight: '150%',
                letterSpacing: '-0.5%',
                color: '#F6D8AB',
                opacity: 0.95,
            }}
            >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
            ipsum in libero facilisis interdum. Integer sit amet sapien non
            nulla luctus elementum. Praesent vitae semper arcu, non tincidunt
            purus. Curabitur nec nunc a nisi convallis placerat. Suspendisse
            potenti. Nam lacinia, erat at
            </p>
        </div>
        </section>

        {/* SECTION 3 – CUSTOMER REVIEWS (MOBILE) */}
        <section
        id="reviews-section"
        style={{
            padding: '48px 24px',
            backgroundColor: '#F6D8AB',
            color: '#280F0B',
        }}
        >
        {/* HEADER */}
        <h2
            style={{
            fontFamily: 'Manrope, sans-serif',
            fontWeight: 700,
            fontSize: 28,
            lineHeight: '100%',
            letterSpacing: '-1px',
            marginBottom: 16,
            }}
        >
            Customer Reviews
        </h2>

        {/* RATING SUMMARY */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
            style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 700,
                fontSize: 48,
                lineHeight: '100%',
            }}
            >
            4.8
            </div>

            <div>
            <div style={{ color: '#F5B301', fontSize: 18 }}>
                ★ ★ ★ ★ ★
            </div>
            <p style={{ fontSize: 12, opacity: 0.7 }}>
                Based on 7 Ratings
            </p>
            </div>
        </div>

        {/* RATING BARS */}
        <div style={{ marginTop: 24 }}>
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
                gap: 10,
                marginBottom: 8,
                }}
            >
                {/* STAR + NUMBER */}
                <span
                style={{
                    width: 32,
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
                <span style={{ width: 36, fontSize: 12 }}>
                {item.percent}%
                </span>
            </div>
            ))}
        </div>

        {/* WRITE REVIEW BUTTON */}
        <button
            style={{
            width: '100%',
            height: 51,
            backgroundColor: '#7A3E2E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 12,
            marginTop: 24,
            border: 'none',
            }}
        >
            <img src="/assets/images/write.svg" alt="write" />
            <span
            style={{
                fontFamily: 'Manrope, sans-serif',
                fontWeight: 600,
                fontSize: 14,
                lineHeight: '150%',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
            }}
            >
            Write a review
            </span>
        </button>

        {/* TOP REVIEWS */}
        <div style={{ marginTop: 40 }}>
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

            {/* FILTER PILLS */}
            <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginBottom: 24,
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
                fontSize: 14,
                }}
            >
                <img src="/assets/images/search-icon.png" alt="search" />
                Search reviews
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

            {/* REVIEW CARD */}
            <div
            style={{
                backgroundColor: '#FDC77B',
                padding: 20,
            }}
            >
            <div
                style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 4,
                }}
            >
                <span style={{ fontWeight: 600 }}>Raman S.</span>
                <img
                src="/assets/images/verified.png"
                alt="verified"
                style={{ width: 16, height: 16 }}
                />
                <span style={{ fontSize: 14 }}>Verified Buyer</span>
            </div>

            <p style={{ fontSize: 12, opacity: 0.7, marginBottom: 12 }}>
                18 days ago
            </p>

            <p style={{ fontSize: 14, lineHeight: '22px' }}>
                I bought the black Ball Crystal Pendulum for my wife and she
                says it has a steady, smooth swing and feels very responsive
                during her readings. It’s become one of her favourite tools...
                She loves it!
            </p>
            </div>
        </div>
        </section>


      </main>
    </>
  );
}
