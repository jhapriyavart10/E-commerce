// Predefined Q&A data for the chatbot
export interface Question {
  id: string;
  text: string;
  category: string;
  keywords: string[];
  answer: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { id: 'order', name: 'Order Status', icon: '📦' },
  { id: 'delivery', name: 'Delivery', icon: '🚚' },
  { id: 'returns', name: 'Returns & Refunds', icon: '↩️' },
  { id: 'payment', name: 'Payment', icon: '💳' },
  { id: 'product', name: 'Product Info', icon: '💎' },
];

export const questions: Question[] = [
  // Order Status
  {
    id: 'track-order',
    text: 'How can I track my order?',
    category: 'order',
    keywords: ['track', 'order', 'status', 'where', 'location'],
    answer: 'You can track your order by going to "My Orders" section in your account. Click on the order you want to track and you\'ll see real-time updates on your shipment status.',
  },
  {
    id: 'order-confirmation',
    text: 'I haven\'t received my order confirmation',
    category: 'order',
    keywords: ['confirmation', 'email', 'not received', 'order placed'],
    answer: 'Order confirmation emails are sent within 5 minutes of placing an order. Please check your spam folder. If you still haven\'t received it, contact us at support@crystalshop.com with your order details.',
  },
  {
    id: 'cancel-order',
    text: 'How do I cancel my order?',
    category: 'order',
    keywords: ['cancel', 'order', 'stop', 'remove'],
    answer: 'You can cancel your order within 24 hours of placing it. Go to "My Orders", select the order, and click "Cancel Order". If the option is not available, the order has already been shipped.',
  },
  {
    id: 'modify-order',
    text: 'Can I modify my order after placing it?',
    category: 'order',
    keywords: ['modify', 'change', 'edit', 'update', 'order'],
    answer: 'Unfortunately, orders cannot be modified once placed. You can cancel the order (if within 24 hours) and place a new one with the correct items.',
  },

  // Delivery
  {
    id: 'delivery-time',
    text: 'How long does delivery take?',
    category: 'delivery',
    keywords: ['delivery', 'shipping', 'time', 'how long', 'days'],
    answer: 'Standard delivery takes 5-7 business days. Express delivery (if selected) takes 2-3 business days. International orders may take 10-15 business days.',
  },
  {
    id: 'delivery-charges',
    text: 'What are the delivery charges?',
    category: 'delivery',
    keywords: ['delivery', 'charges', 'shipping', 'cost', 'free'],
    answer: 'We offer FREE delivery on orders above $50. For orders below $50, standard delivery costs $5. Express delivery is available for $15.',
  },
  {
    id: 'international-delivery',
    text: 'Do you deliver internationally?',
    category: 'delivery',
    keywords: ['international', 'worldwide', 'global', 'country', 'abroad'],
    answer: 'Yes, we deliver to most countries worldwide. International shipping costs vary by location. You can check the exact cost at checkout by entering your shipping address.',
  },
  {
    id: 'change-address',
    text: 'Can I change my delivery address?',
    category: 'delivery',
    keywords: ['change', 'address', 'delivery', 'shipping', 'location'],
    answer: 'You can change your delivery address within 24 hours of placing the order. Contact our support team immediately at support@crystalshop.com with your order number and new address.',
  },

  // Returns & Refunds
  {
    id: 'return-policy',
    text: 'What is your return policy?',
    category: 'returns',
    keywords: ['return', 'policy', 'exchange', 'days'],
    answer: 'We offer a 30-day return policy. Items must be unused, in original packaging with all tags attached. Crystals and pendants must be in pristine condition. Return shipping is free for defective items.',
  },
  {
    id: 'how-to-return',
    text: 'How do I return an item?',
    category: 'returns',
    keywords: ['how', 'return', 'process', 'steps'],
    answer: 'To return an item: 1) Go to "My Orders" 2) Select the order 3) Click "Return Item" 4) Choose reason for return 5) We\'ll send you a prepaid return label via email. Drop the package at any courier location.',
  },
  {
    id: 'refund-time',
    text: 'When will I receive my refund?',
    category: 'returns',
    keywords: ['refund', 'money', 'when', 'receive', 'time'],
    answer: 'Refunds are processed within 5-7 business days after we receive the returned item. The amount will be credited to your original payment method. Bank processing may take an additional 3-5 days.',
  },
  {
    id: 'exchange-product',
    text: 'Can I exchange a product?',
    category: 'returns',
    keywords: ['exchange', 'swap', 'replace', 'different'],
    answer: 'Yes, you can exchange products within 30 days. Follow the return process and place a new order for the desired item. We\'ll process your refund once we receive the returned product.',
  },

  // Payment
  {
    id: 'payment-methods',
    text: 'What payment methods do you accept?',
    category: 'payment',
    keywords: ['payment', 'method', 'card', 'accept', 'pay'],
    answer: 'We accept Visa, Mastercard, American Express, PayPal, Shop Pay, and Apple Pay. All payments are processed securely through encrypted connections.',
  },
  {
    id: 'payment-failed',
    text: 'My payment failed, what should I do?',
    category: 'payment',
    keywords: ['payment', 'failed', 'declined', 'error', 'not working'],
    answer: 'Payment failures can occur due to: insufficient funds, incorrect card details, or bank security blocks. Please verify your card details and try again. If the issue persists, contact your bank or try a different payment method.',
  },
  {
    id: 'payment-security',
    text: 'Is my payment information secure?',
    category: 'payment',
    keywords: ['secure', 'safe', 'security', 'ssl', 'encrypted'],
    answer: 'Yes, all payment information is encrypted using SSL technology. We comply with PCI-DSS standards. We never store your complete card details on our servers.',
  },
  {
    id: 'invoice',
    text: 'How can I get an invoice?',
    category: 'payment',
    keywords: ['invoice', 'receipt', 'bill', 'payment proof'],
    answer: 'An invoice is automatically sent to your email after order confirmation. You can also download it from "My Orders" section by clicking on the specific order.',
  },

  // Product Info
  {
    id: 'crystal-authenticity',
    text: 'Are your crystals authentic?',
    category: 'product',
    keywords: ['authentic', 'real', 'genuine', 'fake', 'original'],
    answer: 'Yes, all our crystals are 100% authentic and natural. Each crystal comes with a certificate of authenticity. We source directly from trusted suppliers and verify quality before listing.',
  },
  {
    id: 'product-care',
    text: 'How should I care for my crystal products?',
    category: 'product',
    keywords: ['care', 'clean', 'maintain', 'wash', 'cleansing'],
    answer: 'Clean crystals with a soft, dry cloth. Avoid harsh chemicals and ultrasonic cleaners. For energetic cleansing, you can use moonlight, sage smoke, or sound vibrations. Store in a soft pouch away from direct sunlight.',
  },
  {
    id: 'product-size',
    text: 'What are the product dimensions?',
    category: 'product',
    keywords: ['size', 'dimension', 'measurements', 'how big'],
    answer: 'Product dimensions are mentioned in the product description section. Most pendants are standard size (approx. 25-35mm). For specific measurements, check the "Specifications" tab on the product page.',
  },
  {
    id: 'customization',
    text: 'Do you offer customization?',
    category: 'product',
    keywords: ['custom', 'personalize', 'customize', 'engrave'],
    answer: 'Currently, we don\'t offer customization or engraving services. All products are sold as shown in the product images and descriptions.',
  },
  {
    id: 'stock-availability',
    text: 'When will out-of-stock items be available?',
    category: 'product',
    keywords: ['stock', 'available', 'restock', 'out of stock', 'back in stock'],
    answer: 'Restocking times vary by product. You can click "Notify Me" on out-of-stock items to receive an email when they\'re back in stock. Typically, popular items are restocked within 2-3 weeks.',
  },
];

export const FALLBACK_MESSAGE = "I'm sorry, I can only help with the available questions. Please select from the options below or rephrase your question.";

export const GREETING_MESSAGE = "Hello! 👋 Welcome to Crystal Shop Customer Care. How can I help you today? Please select a category or choose a question below.";

// Function to find matching question based on user input
export function findMatchingQuestion(userInput: string): Question | null {
  const input = userInput.toLowerCase().trim();
  
  // First, try exact match
  const exactMatch = questions.find(
    q => q.text.toLowerCase() === input
  );
  if (exactMatch) return exactMatch;

  // Then try keyword matching
  const keywordMatch = questions.find(q =>
    q.keywords.some(keyword => input.includes(keyword.toLowerCase()))
  );
  
  return keywordMatch || null;
}

// Get questions by category
export function getQuestionsByCategory(categoryId: string): Question[] {
  return questions.filter(q => q.category === categoryId);
}
