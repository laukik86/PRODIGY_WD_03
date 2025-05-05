import { useState, useEffect } from 'react';
import { ShoppingCart, MinusCircle, PlusCircle, Search, Menu, X } from 'lucide-react';

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: "The Midnight Library",
    price: 16.99,
    description: "Between life and death there is a library. When Nora finds herself in the Midnight Library, she has a chance to make things right.",
    image: "https://th.bing.com/th/id/OIP.B-cjHWTHFKufMWy6LH_E8AHaE8?w=258&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: "Fiction"
  },
  {
    id: 2,
    name: "Atomic Habits",
    price: 14.99,
    description: "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    image: "https://th.bing.com/th/id/OIP.Iyg6ec_U-eSQm2De5jXvEAHaFj?w=231&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: "Self-Help"
  },
  {
    id: 3,
    name: "The Silent Patient",
    price: 12.99,
    description: "A psychological thriller about a woman's act of violence against her husband—and the therapist obsessed with uncovering her motive.",
    image: "https://th.bing.com/th/id/OIP.nJJQOX7xZ7XwY5Tmp2kKiwAAAA?w=153&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    category: "Thriller"
  },
  {
    id: 4,
    name: "Where the Crawdads Sing",
    price: 15.99,
    description: "A novel about a young woman who raised herself in the marshes of the deep South, and what happens when the town hotshot is found dead.",
    image: "/api/placeholder/200/300",
    category: "Fiction"
  },
  {
    id: 5,
    name: "Educated",
    price: 13.99,
    description: "A memoir about a young girl who leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    image: "/api/placeholder/200/300",
    category: "Non-Fiction"
  },
  {
    id: 6,
    name: "Circe",
    price: 11.99,
    description: "The story of the mythological witch Circe, who transforms from an awkward nymph to a formidable witch.",
    image: "/api/placeholder/200/300",
    category: "Fantasy"
  }
];

// Categories for filtering
const categories = ["All", "Fiction", "Non-Fiction", "Self-Help", "Thriller", "Fantasy"];

export default function LocalBookstore() {
  const [products, setProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Filter products based on search term and category
  useEffect(() => {
    let filtered = initialProducts;
    
    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setProducts(filtered);
  }, [searchTerm, selectedCategory]);
  
  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
  
  // Update cart item quantity
  const updateQuantity = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCart(updatedCart);
  };
  
  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Calculate cart item count
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button 
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <h1 className="text-2xl font-bold">Local Bookstore</h1>
            </div>
            
            {/* Desktop navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-blue-200">Home</a>
              <a href="#" className="hover:text-blue-200">About</a>
              <a href="#" className="hover:text-blue-200">Contact</a>
            </nav>
            
            {/* Search and cart */}
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-4 py-1 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search size={18} className="absolute left-2 top-1.5 text-gray-500" />
              </div>
              
              <button 
                className="relative"
                onClick={() => setIsCartOpen(!isCartOpen)}
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <nav className="mt-4 md:hidden flex flex-col space-y-2">
              <a href="#" className="hover:text-blue-200">Home</a>
              <a href="#" className="hover:text-blue-200">About</a>
              <a href="#" className="hover:text-blue-200">Contact</a>
              <div className="relative mt-2">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-4 py-1 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <Search size={18} className="absolute left-2 top-1.5 text-gray-500" />
              </div>
            </nav>
          )}
        </div>
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Category filter */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Categories</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-1 rounded ${
                  selectedCategory === category 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{product.category}</p>
                  <p className="text-gray-700 mt-2">{product.description}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">No products found. Try a different search term or category.</p>
            </div>
          )}
        </div>
      </main>
      
      {/* Shopping Cart */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
          <div className="bg-white w-full md:w-96 h-full shadow-lg overflow-y-auto">
            <div className="p-4 bg-blue-600 text-white flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={24} />
              </button>
            </div>
            
            {cart.length > 0 ? (
              <div className="p-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center py-4 border-b">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="ml-4 flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <MinusCircle size={18} />
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="text-gray-500 hover:text-green-500"
                        >
                          <PlusCircle size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                
                <div className="mt-6 pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Local Bookstore</h3>
              <p className="text-gray-400">Your neighborhood bookstore, now online. Find your next favorite read with us.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <address className="text-gray-400 not-italic">
                123 Book Street<br />
                Reading, CA 90210<br />
                contact@localbookstore.com<br />
                (555) 123-4567
              </address>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Local Bookstore. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}