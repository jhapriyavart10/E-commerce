'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import { useCart } from '@/app/context/CartContext'
import { useRouter } from 'next/navigation'

export default function ProductPage() {
  const { addToCart } = useCart();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedMaterial, setSelectedMaterial] = useState('Obsidian')
  const [quantity, setQuantity] = useState(1)
  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({})

  const productImages = [
    '/assets/images/f1931560e8f947b5b51be3ba5535c1d4313d27f6.png',
    '/assets/images/62b4f24e242d65d25cdb5d6bf7252a117eef90a7.png',
    '/assets/images/70bc5bc1708629069ae799b4cb3dc173859c6998.png',
    '/assets/images/7d485a0962c49cc6d71b620cc210d1bb377bb5ce.png',
    '/assets/images/9de9340a9fbf42bbcdbcaf2e505f27a407b1de11.png',
    '/assets/images/b05a93b56a86e1eb862f5abd622d101215f4368f.png',
  ]

  const materials = [
    { name: 'Obsidian', image: '/assets/images/obsidian.png' },
    { name: 'Tiger Eye', image: '/assets/images/tiger eye.png' },
    { 
      name: 'Lapis Lazuli', 
      image: '/assets/images/Lapis lazuli-1.png',
      layeredImages: [
        '/assets/images/Lapis lazuli-1.png',
        '/assets/images/lapis lazuli-2.png',
        '/assets/images/lapis lazuli-3.png'
      ]
    },
    { name: 'Rose Quartz', image: '/assets/images/rose quartz.png' },
    { name: 'Clear Quartz', image: '/assets/images/clear quartz.png' },
    { name: 'Green Adventurine', image: '/assets/images/green adventurine.png' },
  ]

  const scrollToDescription = () => {
    const descriptionElement = document.getElementById('description-section')
    if (descriptionElement) {
      // Open the description section first
      setExpandedSections(prev => ({
        ...prev,
        description: true
      }))
      // Then scroll to it
      setTimeout(() => {
        descriptionElement.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change))
  }

  return (
    <div style={{ fontFamily: 'var(--font-manrope)', backgroundColor: '#F6D8AB', minHeight: '100vh' }}>
      <Header />
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          /* GLOBAL OVERRIDES - Force mobile layout */
          * {
            box-sizing: border-box !important;
          }
          
          body, html {
            overflow-x: hidden !important;
            width: 100% !important;
          }
          
          /* CONTAINER - Single column layout */
          .container {
            padding: 0 16px !important;
            max-width: 100% !important;
          }
          
          .product-container {
            flex-direction: column !important;
            gap: 0 !important;
            padding: 0 !important;
          }
          
          /* LEFT COLUMN - Product Images */
          .product-left-column {
            width: 100% !important;
            flex-shrink: 1 !important;
            padding: 0 !important;
            margin-bottom: 24px !important;
          }
          
          /* RIGHT COLUMN - Product Details */
          .product-right-column {
            width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          
          /* BREADCRUMB */
          .breadcrumb {
            width: 100% !important;
            height: auto !important;
            font-size: 12px !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
            margin-bottom: 16px !important;
          }
          
          /* PRODUCT IMAGE */
          .main-image {
            width: 100% !important;
            height: auto !important;
            max-width: 100% !important;
            object-fit: contain !important;
          }
          
          /* THUMBNAIL STRIP - Horizontal scroll */
          .thumbnail-strip {
            width: 100% !important;
            height: auto !important;
            overflow-x: auto !important;
            overflow-y: hidden !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: thin !important;
            display: flex !important;
            gap: 8px !important;
          }
          
          /* MATERIAL SELECTION BOX */
          .material-box {
            width: 100% !important;
            max-width: 100% !important;
            min-height: auto !important;
            padding: 16px !important;
            margin-bottom: 24px !important;
          }
          
          /* Material buttons - one per line */
          .material-box > div:last-child {
            flex-direction: column !important;
            gap: 8px !important;
          }
          
          .material-box > div:last-child > button {
            width: 100% !important;
            max-width: 100% !important;
            justify-content: flex-start !important;
          }
          
          /* BUTTONS - Full width, touch-friendly */
          .add-to-cart-btn,
          .buy-shop-btn {
            width: 100% !important;
            max-width: 100% !important;
            height: 48px !important;
            min-height: 48px !important;
            margin-bottom: 16px !important;
          }
          
          /* QUANTITY SELECTOR */
          .quantity-selector {
            width: 50% !important;
            margin-bottom: 0 !important;
          }
          
          .quantity-selector > div:last-child {
            width: 100% !important;
            justify-content: center !important;
          }
          
          /* DELIVERY INFO - Horizontal layout with icon and text side by side */
          .delivery-info {
            flex-direction: row !important;
            align-items: center !important;
            gap: 12px !important;
            margin-bottom: 24px !important;
          }
          
          /* EMBRACE SPIRITUALITY SECTION */
          .embrace-section {
            padding: 0 !important;
            min-height: auto !important;
            margin-top: 40px !important;
          }
          
          .embrace-section > div:first-of-type {
            width: 100vw !important;
            margin-left: 0 !important;
            padding: 0 !important;
          }
          
          .embrace-container {
            padding: 24px 8px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 237px !important;
          }
          
          .embrace-text {
            font-size: 40px !important;
            max-width: 100% !important;
            line-height: 1.1 !important;
            margin-bottom: 0 !important;
          }
          
          .embrace-description {
            position: static !important;
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            margin-top: 0 !important;
            padding: 0 !important;
            bottom: auto !important;
            right: auto !important;
          }
          
          /* REVIEWS SECTION */
          .reviews-outer-container {
            padding: 0 8px !important;
          }
          
          .reviews-container {
            flex-direction: column !important;
            gap: 24px !important;
          }
          
          /* Customer Reviews title - full width on mobile */
          .reviews-container h2 {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .review-box {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            padding: 24px 16px !important;
            margin-bottom: 24px !important;
            box-sizing: border-box !important;
          }
          
          /* Fix Write a Review button width on mobile */
          .review-box > button {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          .review-card {
            width: 100% !important;
            max-width: 100% !important;
            height: auto !important;
            min-height: auto !important;
          }
          
          /* FILTER OPTIONS - Two rows layout with 8px row gap */
          .filter-options {
            flex-wrap: wrap !important;
            row-gap: 8px !important;
            column-gap: 8px !important;
            overflow-x: visible !important;
          }
          
          /* First row: Search and Most relevant */
          .filter-options > *:nth-child(1),
          .filter-options > *:nth-child(2) {
            flex: 1 1 calc(50% - 4px) !important;
            min-width: 0 !important;
            max-width: calc(50% - 4px) !important;
          }
          
          /* Second row: All ratings and With media */
          .filter-options > *:nth-child(3),
          .filter-options > *:nth-child(4) {
            flex: 1 1 calc(50% - 4px) !important;
            min-width: 0 !important;
            max-width: calc(50% - 4px) !important;
          }
          
          /* Ensure input and select fit within their containers */
          .filter-options input,
          .filter-options select,
          .filter-options button {
            width: 100% !important;
            max-width: 100% !important;
          }
          
          /* RATING BREAKDOWN */
          .rating-breakdown {
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
          }
          
          .rating-breakdown > div {
            width: 100% !important;
          }
          
          /* Progress bar container */
          .rating-breakdown > div > div:nth-child(3) {
            flex: 1 !important;
            min-width: 0 !important;
            max-width: none !important;
          }
          
          /* Percentage text */
          .rating-breakdown > div > span:last-child {
            flex-shrink: 0 !important;
            min-width: 45px !important;
          }
          
          /* Reviews content padding - match product details */
          .reviews-container {
            padding: 0 16px !important;
          }
          
          /* TYPOGRAPHY - Mobile optimized */
          h1 {
            font-size: 24px !important;
            line-height: 32px !important;
          }
          
          h2 {
            font-size: 28px !important;
            line-height: 1.2 !important;
          }
          
          h3 {
            font-size: 18px !important;
          }
          
          /* SECTION PADDING */
          .space-y-4 > * {
            padding-bottom: 16px !important;
          }
        }
      `}} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8 product-container">
          {/* Left Column - Image Gallery */}
          <div className="flex-shrink-0 product-left-column">
            {/* Breadcrumb Navigation */}
            <div 
              className="breadcrumb"
              style={{
                width: '235px',
                height: '18px',
                fontFamily: 'var(--font-manrope)',
                fontWeight: 600,
                fontSize: '13px',
                lineHeight: '100%',
                letterSpacing: '0%',
                marginBottom: '8px'
              }}
            >
              <span style={{ fontWeight: 700 }}>Shop</span>
              <span style={{ fontWeight: 600 }}> / </span>
              <span style={{ fontWeight: 600 }}>Pendants</span>
              <span style={{ fontWeight: 600 }}> / </span>
              <span style={{ fontWeight: 600 }}>Tiger Eye Pendant</span>
            </div>
            
            {/* Main Image */}
            <div className="mb-2">
              <img 
                src={productImages[selectedImage]} 
                alt="Product"
                className="w-[640px] h-[640px] object-cover rounded-lg main-image"
              />
            </div>
            
            {/* Thumbnail Strip */}
            <div className="flex gap-[8px] w-[640px] h-[100px] thumbnail-strip">
              {productImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-[100px] h-[100px] object-cover rounded cursor-pointer ${
                    selectedImage === index ? 'ring-2 ring-[#6B5FE8]' : ''
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="flex-1 pl-[91px] product-right-column">
            {/* Title */}
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: 'bold', 
              lineHeight: '44px',
              marginBottom: '16px'
            }}>
              Sphere Crystal Pendulums
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current text-yellow-500" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm">(7 reviews)</span>
            </div>

            {/* Description */}
            <p className="mb-4 text-gray-700 leading-relaxed">
              Harness Universal Energy with a Sphere Crystal Pendulum. The sphere represents wholeness, unity, and the infinite flow of universal energy. 
            </p>

            {/* Learn More Link */}
            <button 
              onClick={scrollToDescription}
              style={{ color: '#B8764A' }}
              className="mb-6 font-semibold hover:underline"
            >
              LEARN MORE
            </button>

            {/* Price */}
            <div className="mb-6">
              <p className="text-2xl font-bold">$35.00 AUD incl. tax</p>
            </div>

            {/* Material Selection */}
            <div 
              className="material-box"
              style={{
                width: '565px',
                minHeight: '146px',
                backgroundColor: '#E8D5B7',
                border: '1.25px solid #C5A572',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '24px',
                position: 'relative'
              }}
            >
              <h3 
                style={{
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 700,
                  fontSize: '12px',
                  lineHeight: '100%',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#280F0B',
                  width: 'auto',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  whiteSpace: 'nowrap'
                }}
              >
                Jewellery Material
              </h3>
              <div style={{ marginTop: '28px' }} />
              <div className="flex flex-wrap gap-2">
                {materials.map((material) => (
                  <button
                    key={material.name}
                    onClick={() => setSelectedMaterial(material.name)}
                    style={{
                      height: '38px',
                      borderRadius: '27px',
                      backgroundColor: selectedMaterial === material.name ? '#6B5FE8' : '#FFFFFF',
                      color: selectedMaterial === material.name ? '#FFFFFF' : '#000000',
                      border: '1px solid #D0D0D0',
                      padding: '0 16px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    className="hover:shadow-md"
                  >
                    {material.layeredImages ? (
                      <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                        <Image
                          src={material.layeredImages[0]}
                          alt={`${material.name} border`}
                          width={20}
                          height={20}
                          className="rounded-full object-cover"
                          style={{ position: 'absolute', top: 0, left: 0 }}
                        />
                        <Image
                          src={material.layeredImages[1]}
                          alt={`${material.name} layer 2`}
                          width={14}
                          height={14}
                          className="rounded-full object-cover"
                          style={{ position: 'absolute', top: '3px', left: '3px' }}
                        />
                        <Image
                          src={material.layeredImages[2]}
                          alt={`${material.name} layer 3`}
                          width={10}
                          height={10}
                          className="rounded-full object-cover"
                          style={{ position: 'absolute', top: '5px', left: '5px' }}
                        />
                      </div>
                    ) : (
                      <Image
                        src={material.image}
                        alt={material.name}
                        width={20}
                        height={20}
                        className="rounded-full object-cover"
                      />
                    )}
                    {material.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-selector">
              <h3 className="font-semibold mb-3">Quantity</h3>
              <div className="flex items-center gap-4" style={{ border: '1px solid #280F0B', padding: '8px', borderRadius: '8px', display: 'inline-flex', width: '282px', justifyContent: 'center' }}>
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  -
                </button>
                <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-lg hover:bg-gray-100"
                  style={{ minHeight: '44px', minWidth: '44px' }}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                addToCart({
                  id: 'angel-wing-crystal-pendants',
                  name: 'Angel Wing Crystal Pendants',
                  variant: 'Rose Quartz Standard',
                  price: 35.00,
                  image: '/assets/images/necklace-img.png'
                });
                // Optionally navigate to cart
                // router.push('/cart');
              }}
              className="add-to-cart-btn hover:opacity-90 transition-opacity"
              style={{ 
                width: '565px',
                height: '51px',
                backgroundColor: '#794936',
                padding: '15px 40px',
                gap: '12px',
                borderRadius: '8px',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '16px',
                cursor: 'pointer',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              ADD TO CART
            </button>

            {/* Buy with Shop Button */}
            <button
              className="buy-shop-btn hover:opacity-90 transition-opacity"
              style={{ 
                width: '565px',
                height: '51px',
                backgroundColor: '#3D1CEA',
                padding: '15px 40px',
                gap: '2px',
                borderRadius: '8px',
                border: 'none',
                color: '#FFFFFF',
                fontWeight: 400,
                fontSize: '16px',
                cursor: 'pointer',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Buy with <span style={{ fontWeight: 700, marginLeft: '4px' }}>shop</span>
            </button>

            {/* Delivery Info */}
            <div className="flex items-center gap-3 mb-8 delivery-info" style={{ maxWidth: '100%' }}>
              {/* Delivery Truck Icon - Layered Images */}
              <div style={{ display: 'flex', flexDirection: 'column', width: '40px', height: '40px', flexShrink: 0, position: 'relative' }}>
                {/* Top section: delivery-2 on left, delivery-4 and delivery-3 on right */}
                <div style={{ display: 'flex', position: 'relative' }}>
                  {/* Left: delivery-2 */}
                  <Image
                    src="/assets/images/delivery-2.png"
                    alt="Delivery line 2"
                    width={20}
                    height={20}
                  />
                  
                  {/* Right: delivery-4 (wheel) below delivery-3 (truck body) */}
                  <div style={{ position: 'relative', width: '20px', height: '20px' }}>
                    <Image
                      src="/assets/images/delivery-3.png"
                      alt="Truck body"
                      width={20}
                      height={20}
                      style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
                    />
                    <Image
                      src="/assets/images/delivery-4.png"
                      alt="Truck wheel"
                      width={20}
                      height={20}
                      style={{ position: 'absolute', bottom: 0, left: 0, zIndex: 1 }}
                    />
                  </div>
                </div>
                
                {/* Bottom section: delivery-1 */}
                <div style={{ position: 'relative' }}>
                  <Image
                    src="/assets/images/delivery-1.png"
                    alt="Delivery line 1"
                    width={40}
                    height={20}
                  />
                </div>
              </div>
              
              <p 
                style={{
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '150%',
                  letterSpacing: '-0.005em',
                  color: '#280F0B'
                }}
              >
                Orders are fulfilled within 24 hours. 3-5 business days delivery average.
              </p>
            </div>

            {/* Expandable Sections */}
            <div className="space-y-4" id="description-section">
              {/* Description Section */}
              <div className="pb-4" style={{ borderBottom: '1px solid #626262' }}>
                <button
                  onClick={() => toggleSection('description')}
                  className="w-full flex justify-between items-center font-semibold text-left"
                >
                  <span>Description</span>
                  <span className="text-2xl">{expandedSections['description'] ? '−' : '+'}</span>
                </button>
                {expandedSections['description'] && (
                  <div className="mt-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)', fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.005em' }}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                )}
              </div>

              {/* How to Use Section */}
              <div className="pb-4" style={{ borderBottom: '1px solid #626262' }}>
                <button
                  onClick={() => toggleSection('howto')}
                  className="w-full flex justify-between items-center font-semibold text-left"
                >
                  <span>How to use</span>
                  <span className="text-2xl">{expandedSections['howto'] ? '−' : '+'}</span>
                </button>
                {expandedSections['howto'] && (
                  <div className="mt-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)', fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.005em' }}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper.
                    </p>
                  </div>
                )}
              </div>

              {/* Product Details Section */}
              <div className="pb-4" style={{ borderBottom: '1px solid #626262' }}>
                <button
                  onClick={() => toggleSection('details')}
                  className="w-full flex justify-between items-center font-semibold text-left"
                >
                  <span>Product Details</span>
                  <span className="text-2xl">{expandedSections['details'] ? '−' : '+'}</span>
                </button>
                {expandedSections['details'] && (
                  <div className="mt-4 text-gray-700 leading-relaxed" style={{ fontFamily: 'var(--font-manrope)', fontSize: '16px', lineHeight: '24px', letterSpacing: '-0.005em' }}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                    </p>
                  </div>
                )}
              </div>

              {/* Ideal For Section */}
              <div className="pb-4" style={{ borderBottom: '1px solid #626262' }}>
                <button
                  onClick={() => toggleSection('idealfor')}
                  className="w-full flex justify-between items-center font-semibold text-left"
                >
                  <span>Ideal for</span>
                  <span className="text-2xl">{expandedSections['idealfor'] ? '−' : '+'}</span>
                </button>
                {expandedSections['idealfor'] && (
                  <div className="mt-4 text-gray-700 leading-relaxed">
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Divination and dowsing practices</li>
                      <li>Energy healing and chakra balancing</li>
                      <li>Making decisions and gaining clarity</li>
                      <li>Spiritual guidance and intuition development</li>
                      <li>Reiki and other energy work modalities</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Embrace Spirituality Section */}
      <div 
        className="embrace-section"
        style={{
          width: '100%',
          minHeight: '611px',
          background: '#4A221C',
          position: 'relative',
          marginTop: '100px'
        }}
      >
        {/* Top Separator Bar */}
        <div 
          style={{
            width: '100%',
            height: '35px',
            background: '#C38154'
          }}
        />

        {/* Content Container */}
        <div
          className="embrace-container"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingLeft: '70px',
            paddingRight: '70px',
            paddingTop: '128px',
            maxWidth: '1440px',
            margin: '0 auto'
          }}
        >
          {/* Left Side Text */}
          <h2 
            className="embrace-text"
            style={{
              maxWidth: '503px',
              fontFamily: 'Lora, serif',
              fontWeight: 700,
              fontStyle: 'italic',
              fontSize: '96px',
              lineHeight: '100%',
              letterSpacing: '-1px',
              color: '#F6D8AB',
              margin: 0
            }}
          >
            Embrace Spirituality.
          </h2>

          {/* Right Side Text */}
          <div 
            className="embrace-description"
            style={{
              position: 'absolute',
              width: '343px',
              height: '126px',
              bottom: '70px',
              right: '73px',
              fontFamily: 'var(--font-manrope)',
              fontWeight: 500,
              fontSize: '14px',
              lineHeight: '150%',
              letterSpacing: '-0.005em',
              color: '#F6D8AB'
            }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae ipsum in libero facilisis interdum. Integer sit amet sapien non nulla luctus elementum. Praesent vitae semper arcu, non tincidunt purus. Curabitur nec nunc a nisl convallis placerat. Suspendisse potenti. Nam iaculis, erat at.
            </p>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div style={{ width: '100%', background: '#F6D8AB', padding: '80px 0' }}>
        <div className="reviews-outer-container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 70px' }}>
          {/* Main Container with Reviews on Left and Box on Right */}
          <div style={{ display: 'flex', gap: '40px', position: 'relative' }} className="reviews-container">
            {/* Left Side - Reviews */}
            <div style={{ flex: 1 }}>
              {/* Customer Reviews Title */}
              <h2 style={{ 
                    width: '346px',
                    height: '55px',
                    fontFamily: 'var(--font-manrope)', 
                    fontSize: '40px', 
                    fontWeight: 700,
                    lineHeight: '100%',
                    letterSpacing: '-1px',
                    color: '#280F0B',
                    marginBottom: '16px'
                  }}>
                    Customer Reviews
                  </h2>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '24px', 
                    width: '276px',
                    height: '77px',
                    marginBottom: '16px'
                  }}>
                    <span style={{ 
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '64px', 
                      fontWeight: 700, 
                      lineHeight: '100%',
                      letterSpacing: '-1px',
                      color: '#280F0B' 
                    }}>4.8</span>
                    <div>
                      <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span key={star} style={{ color: '#FFC107', fontSize: '24px' }}>★</span>
                        ))}
                      </div>
                      <p style={{ fontSize: '14px', color: '#280F0B', margin: 0 }}>Based on 2 reviews</p>
                    </div>
                  </div>

                  {/* Star Rating Breakdown */}
                  <div className="rating-breakdown" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '8px',
                    width: '528px',
                    maxWidth: '100%',
                    height: 'auto',
                    marginBottom: '32px'
                  }}>
                    {[
                      { rating: 5, percentage: 90 },
                      { rating: 4, percentage: 10 },
                      { rating: 3, percentage: 0 },
                      { rating: 2, percentage: 0 },
                      { rating: 1, percentage: 0 }
                    ].map(({ rating, percentage }) => (
                      <div key={rating} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '14px', color: '#280F0B', width: '20px' }}>{rating}</span>
                        <span style={{ color: '#FFC107', fontSize: '16px' }}>★</span>
                        <div style={{ 
                          width: '396.5px', 
                          height: '8px', 
                          background: '#604A0A', 
                          borderRadius: '42px',
                          overflow: 'hidden'
                        }}>
                          <div style={{ 
                            width: `${percentage}%`, 
                            height: '100%', 
                            background: '#FBBC05',
                            borderRadius: '42px'
                          }} />
                        </div>
                        <span style={{ 
                          fontSize: '14px', 
                          color: '#280F0B',
                          minWidth: '40px',
                          fontFamily: 'var(--font-manrope)'
                        }}>
                          {percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

            {/* Right Side - Dashed Box */}
            <div className="review-box" style={{
              width: '624px',
              height: '301px',
              border: '1px dashed #280F0B',
              borderRadius: '8px',
              strokeDasharray: '9 9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px'
            }}>
              {/* Review this product */}
              <h3 style={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 700,
                fontSize: '24px',
                lineHeight: '100%',
                letterSpacing: '-1px',
                color: '#280F0B',
                textAlign: 'center',
                marginBottom: '12px'
              }}>
                Review this product
              </h3>

              {/* Share your feedback */}
              <p style={{
                fontFamily: 'var(--font-manrope)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                letterSpacing: '-0.005em',
                color: '#280F0B',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                Share your feedback with other customers
              </p>

              {/* Write a Review Button */}
              <button style={{
                width: '349px',
                height: '51px',
                paddingTop: '15px',
                paddingRight: '40px',
                paddingBottom: '15px',
                paddingLeft: '40px',
                background: '#7F3E2F',
                borderRadius: '8px',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}>
                <Image
                  src="/assets/images/pencil.png"
                  alt="Edit"
                  width={18}
                  height={18}
                />
                <span style={{
                  fontFamily: 'var(--font-manrope)',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '150%',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'white'
                }}>
                  Write a Review
                </span>
              </button>
            </div>
          </div>

          {/* Top Reviews Header */}
          <h3 style={{ 
                fontFamily: 'var(--font-manrope)', 
                fontSize: '24px', 
                fontWeight: 600,
                color: '#280F0B',
                marginBottom: '20px',
                textDecoration: 'underline'
              }}>
                Top reviews
              </h3>

              {/* Filter Options */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '30px' }} className="filter-options">
                {/* Search Review */}
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <input
                    type="text"
                    placeholder="Search reviews"
                    style={{ 
                      width: '240px',
                      height: '42px',
                      paddingTop: '8px',
                      paddingRight: '16px',
                      paddingBottom: '8px',
                      paddingLeft: '40px',
                      borderRadius: '47px', 
                      border: 'none',
                      background: '#7F3E2F33',
                      fontFamily: 'var(--font-manrope)',
                      fontSize: '14px',
                      color: '#280F0B',
                      outline: 'none'
                    }}
                    className="search-placeholder"
                  />
                  <style jsx>{`
                    .search-placeholder::placeholder {
                      color: #280F0B;
                    }
                  `}</style>
                  <Image
                    src="/assets/images/search-icon.png"
                    alt="Search"
                    width={16}
                    height={16}
                    style={{
                      position: 'absolute',
                      left: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)'
                    }}
                  />
                </div>
                
                <select style={{ 
                  width: 'auto',
                  minWidth: '150px',
                  height: '42px',
                  paddingTop: '8px',
                  paddingRight: '24px',
                  paddingBottom: '8px',
                  paddingLeft: '20px',
                  borderRadius: '47px', 
                  border: 'none',
                  background: '#7F3E2F33',
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '14px',
                  color: '#280F0B',
                  cursor: 'pointer',
                  outline: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundPosition: 'calc(100% - 8px) center'
                }}>
                  <option>Most relevant</option>
                </select>
                
                <select style={{ 
                  width: 'auto',
                  minWidth: '130px',
                  height: '42px',
                  paddingTop: '8px',
                  paddingRight: '24px',
                  paddingBottom: '8px',
                  paddingLeft: '20px',
                  borderRadius: '47px', 
                  border: 'none',
                  background: '#7F3E2F33',
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '14px',
                  color: '#280F0B',
                  cursor: 'pointer',
                  outline: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundPosition: 'calc(100% - 8px) center'
                }}>
                  <option>All ratings</option>
                </select>

                <button style={{ 
                  width: 'auto',
                  minWidth: '130px',
                  height: '42px',
                  paddingTop: '8px',
                  paddingRight: '20px',
                  paddingBottom: '8px',
                  paddingLeft: '20px',
                  borderRadius: '47px', 
                  border: 'none',
                  background: '#7F3E2F33',
                  fontFamily: 'var(--font-manrope)',
                  fontSize: '14px',
                  color: '#280F0B',
                  cursor: 'pointer',
                  outline: 'none',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  With media
                </button>
              </div>

          {/* Review Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Review 1 */}
            <div className="review-card" style={{ 
              width: '1296px',
              height: '150px',
              background: '#FFC26F', 
              padding: '24px', 
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: '#280F0B' }}>Raman S</span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '12px',
                  color: '#280F0B'
                }}>
                  <Image
                    src="/assets/images/verified.png"
                    alt="Verified"
                    width={12}
                    height={12}
                  />
                  <span style={{ fontWeight: 500 }}>Verified Buyer</span>
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>18 days ago</p>
              <p style={{ 
                fontFamily: 'var(--font-manrope)',
                fontSize: '14px',
                lineHeight: '150%',
                color: '#280F0B',
                margin: 0
              }}>
                I bought the black Ball Crystal Pendulum for my wife and she says it has a steady, smooth swing and feels very responsive during her readings. It's become one of her favourite tools... She loves it!
              </p>
            </div>

            {/* Review 2 */}
            <div className="review-card" style={{ 
              width: '1296px',
              height: '150px',
              background: '#FFC26F', 
              padding: '24px', 
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ fontWeight: 600, color: '#280F0B' }}>Raman S</span>
                <span style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '4px',
                  fontSize: '12px',
                  color: '#280F0B'
                }}>
                  <Image
                    src="/assets/images/verified.png"
                    alt="Verified"
                    width={12}
                    height={12}
                  />
                  <span style={{ fontWeight: 500 }}>Verified Buyer</span>
                </span>
              </div>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '12px' }}>18 days ago</p>
              <p style={{ 
                fontFamily: 'var(--font-manrope)',
                fontSize: '14px',
                lineHeight: '150%',
                color: '#280F0B',
                margin: 0
              }}>
                I bought the black Ball Crystal Pendulum for my wife and she says it has a steady, smooth swing and feels very responsive during her readings. It's become one of her favourite tools... She loves it!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



