import React, { useMemo, useState } from "react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Studio Headphones",
    category: "Tech",
    price: 189,
    oldPrice: 229,
    label: "BESTSELLER",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    color: "Sand / Graphite",
  },
  {
    id: 2,
    name: "Everyday Camera",
    category: "Tech",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85",
    color: "Silver / Black",
  },
  {
    id: 3,
    name: "Form Leather Tote",
    category: "Accessories",
    price: 145,
    label: "NEW",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85",
    color: "Chestnut",
  },
  {
    id: 4,
    name: "Arc Minimal Watch",
    category: "Accessories",
    price: 220,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85",
    color: "Brushed steel",
  },
  {
    id: 5,
    name: "Cloud Knit Runner",
    category: "Clothing",
    price: 128,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    color: "Soft clay",
  },
  {
    id: 6,
    name: "Sculptural Table Light",
    category: "Home",
    price: 164,
    label: "LOW STOCK",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    color: "Warm white",
  },
  {
    id: 7,
    name: "Daybreak Eau de Parfum",
    category: "Home",
    price: 96,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85",
    color: "50 ml",
  },
  {
    id: 8,
    name: "Weekend Carryall",
    category: "Accessories",
    price: 198,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    color: "Olive canvas",
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    category: "Tech",
    price: 129,
    label: "NEW",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    color: "Slate",
  },
  {
    id: 10,
    name: "Contour Ceramic Vase",
    category: "Home",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85",
    color: "Chalk",
  },
  {
    id: 11,
    name: "Field Day Backpack",
    category: "Accessories",
    price: 156,
    image:
      "https://images.unsplash.com/photo-1622560480654-d96214fdc887?auto=format&fit=crop&w=900&q=85",
    color: "Moss canvas",
  },
  {
    id: 12,
    name: "Solis Sunglasses",
    category: "Accessories",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    color: "Warm tortoise",
  },
  {
    id: 13,
    name: "Linen Lounge Throw",
    category: "Home",
    price: 118,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",
    color: "Natural flax",
  },
  {
    id: 14,
    name: "Ribbed Stoneware Cup Set",
    category: "Home",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85",
    color: "Set of two",
  },
  {
    id: 15,
    name: "Everyday Crossbody",
    category: "Accessories",
    price: 156,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85",
    color: "Espresso",
  },
  {
    id: 16,
    name: "Studio Wireless Earbuds",
    category: "Tech",
    price: 119,
    label: "NEW",
    image:
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=900&q=85",
    color: "Cloud white",
  },
];

const categories = ["All objects", "Tech", "Accessories", "Clothing", "Home"];
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function App() {
  const [activeCategory, setActiveCategory] = useState("All objects");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sortBy, setSortBy] = useState("featured");

  const visibleProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All objects" || product.category === activeCategory;
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(query);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low")
      return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-high")
      return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [activeCategory, search, sortBy]);

  const cartItems = products.filter((product) => cart[product.id]);
  const cartCount = Object.values(cart).reduce(
    (sum, quantity) => sum + quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (sum, product) => sum + product.price * cart[product.id],
    0,
  );

  function showToast(message) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }

  function updateQuantity(productId, amount) {
    setCart((current) => {
      const nextQuantity = (current[productId] || 0) + amount;
      const next = { ...current };
      if (nextQuantity <= 0) delete next[productId];
      else next[productId] = nextQuantity;
      return next;
    });
  }

  function toggleWishlist(productId) {
    const saved = wishlist.includes(productId);
    setWishlist((current) =>
      saved
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
    showToast(saved ? "Removed from your saved objects" : "Saved for later");
  }

  function chooseCategory(category) {
    setActiveCategory(category);
    setMobileMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <div className="announcement">
        <span>Complimentary shipping on orders over $150</span>
        <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" />
        <a href="#collection">Explore the collection</a>
      </div>

      <header className="site-header">
        <button
          className="icon-button mobile-menu-button"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <a className="wordmark" href="#" aria-label="Atelier home">
          atelier<span>.</span>
        </a>

        <nav
          className={`main-nav ${mobileMenuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#collection" onClick={() => chooseCategory("All objects")}>
            Shop all
          </a>
          <a href="#collection" onClick={() => chooseCategory("Home")}>
            Home & living
          </a>
          <a href="#collection" onClick={() => chooseCategory("Accessories")}>
            Accessories
          </a>
          <a href="#story">Our story</a>
        </nav>

        <div className="header-actions">
          <label className="search-box">
            <Search size={17} strokeWidth={1.7} aria-hidden="true" />
            <input
              type="search"
              aria-label="Search objects"
              placeholder="Search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <kbd>/</kbd>
          </label>
          <button className="bag-button" onClick={() => setCartOpen(true)}>
            <ShoppingBag size={19} strokeWidth={1.7} aria-hidden="true" />
            <span>Bag</span>
            <span className="bag-count">{cartCount}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <p className="eyebrow">
              <span className="eyebrow-dot" /> CONSIDERED GOODS, MADE TO LAST
            </p>
            <h1 id="hero-title">
              A little more
              <br />
              meaning in the
              <br />
              <em>everyday.</em>
            </h1>
            <p className="hero-copy">
              Thoughtful objects for slower mornings, longer weekends, and
              everything in between.
            </p>
            <a className="button button-dark" href="#collection">
              Shop the collection <ArrowRight size={16} aria-hidden="true" />
            </a>
            <div className="hero-note">
              <span className="hero-note-line" />
              <span>DESIGNED WITH INTENTION · MADE FOR REAL LIFE</span>
            </div>
          </div>
          <div className="hero-image-wrap">
            <img
              className="hero-image"
              src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1800&q=90"
              alt="Sunlit, minimal living room with a sculptural chair and warm natural textures"
            />
            <div className="hero-stamp">
              <span>LESS,</span>
              <span>BUT</span>
              <span className="stamp-italic">better.</span>
            </div>
            <div className="hero-caption">
              <span>01 / THE SLOW LIVING EDIT</span>
              <ArrowDown size={14} aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Our values">
          <p>GOOD THINGS, THOUGHTFULLY MADE</p>
          <span className="trust-separator" />
          <p>01 — SMALL-BATCH DESIGN</p>
          <span className="trust-separator" />
          <p>02 — RESPONSIBLY SOURCED</p>
          <span className="trust-separator" />
          <p>03 — MADE TO BE KEPT</p>
        </section>

        <section className="collection section-wrap" id="collection">
          <div className="collection-heading">
            <div>
              <p className="eyebrow">A FEW VERY GOOD THINGS</p>
              <h2>
                Objects with <em>purpose.</em>
              </h2>
            </div>
            <a href="#story" className="text-link">
              A little about us <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="collection-controls">
            <div
              className="category-list"
              role="group"
              aria-label="Filter by category"
            >
              {categories.map((category) => (
                <button
                  className={`category-chip ${activeCategory === category ? "is-active" : ""}`}
                  key={category}
                  onClick={() => chooseCategory(category)}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </div>
            <label className="sort-control">
              <span>Sort</span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
              </select>
            </label>
          </div>

          <div className="results-note" aria-live="polite">
            <span>{search ? `Results for “${search}”` : activeCategory}</span>
            <span>
              {visibleProducts.length.toString().padStart(2, "0")} OBJECTS
            </span>
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product, index) => (
                <article className="product-card" key={product.id}>
                  <div
                    className={`product-image-frame image-tone-${(index % 4) + 1}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                    />
                    {product.label && (
                      <span className="product-label">{product.label}</span>
                    )}
                    <button
                      className={`wishlist-button ${wishlist.includes(product.id) ? "is-saved" : ""}`}
                      aria-label={`${wishlist.includes(product.id) ? "Remove" : "Add"} ${product.name} ${wishlist.includes(product.id) ? "from" : "to"} wishlist`}
                      aria-pressed={wishlist.includes(product.id)}
                      onClick={() => toggleWishlist(product.id)}
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.7}
                        fill={
                          wishlist.includes(product.id)
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                    <button
                      className="quick-add"
                      onClick={() => {
                        updateQuantity(product.id, 1);
                        showToast(`${product.name} added to your bag`);
                      }}
                    >
                      <Plus size={15} aria-hidden="true" /> Add to bag
                    </button>
                  </div>
                  <div className="product-info">
                    <div>
                      <h3>{product.name}</h3>
                      <p>{product.color}</p>
                    </div>
                    <div className="product-price">
                      {product.oldPrice && (
                        <span>{currency.format(product.oldPrice)}</span>
                      )}
                      <strong>{currency.format(product.price)}</strong>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <p>No objects found just yet.</p>
              <button
                onClick={() => {
                  setSearch("");
                  chooseCategory("All objects");
                }}
              >
                See all objects
              </button>
            </div>
          )}
          <div className="collection-footer">
            <span>THE GOOD THINGS ARE ALWAYS WORTH TAKING YOUR TIME WITH.</span>
            <a href="#collection">
              BACK TO TOP <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </section>

        <div className="cover">
          <section className="story-band" id="story">
            <div className="story-image">
              <img
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1400&q=85"
                alt="A calm, sunlit design studio"
                loading="lazy"
              />
            </div>
            <div className="story-copy">
              <p className="eyebrow">A NOTE FROM THE STUDIO</p>
              <h2>
                Buy less.
                <br />
                <em>Choose well.</em>
                <br />
                Keep it forever.
              </h2>
              <p>
                We believe the things we live with should earn their place. So
                we look for honest materials, thoughtful details, and makers who
                care as much as we do.
              </p>
              <a href="#collection" className="text-link">
                Get to know Atelier{" "}
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <span className="story-signature">The Atelier team</span>
            </div>
          </section>
        </div>

        <section className="newsletter">
          <p className="eyebrow">A GOOD LETTER, EVERY NOW AND THEN</p>
          <h2>
            Something worth <em>opening.</em>
          </h2>
          <p>New objects, thoughtful notes, and 10% off your first order.</p>
          <NewsletterForm onSuccess={showToast} />
        </section>
      </main>

      <footer className="site-footer">
        <a className="wordmark footer-wordmark" href="#">
          atelier<span>.</span>
        </a>
        <p>Considered goods for everyday living.</p>
        <div className="footer-links">
          <a href="#collection">Shop</a>
          <a href="#story">Our story</a>
          <a href="mailto:hello@atelier.example">Get in touch</a>
        </div>
        <span className="copyright">© 2025 ATELIER STUDIO</span>
      </footer>

      {cartOpen && (
        <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="drawer-header">
              <div>
                <p className="eyebrow">THE GOOD THINGS</p>
                <h2 id="cart-title">
                  Your bag <span>({cartCount})</span>
                </h2>
              </div>
              <button
                className="icon-button"
                aria-label="Close cart"
                onClick={() => setCartOpen(false)}
              >
                <X size={20} />
              </button>
            </div>
            {cartItems.length ? (
              <>
                <div className="cart-items">
                  {cartItems.map((product) => (
                    <div className="cart-item" key={product.id}>
                      <img src={product.image} alt="" />
                      <div className="cart-item-copy">
                        <h3>{product.name}</h3>
                        <p>{product.color}</p>
                        <div
                          className="quantity-control"
                          aria-label={`Quantity of ${product.name}`}
                        >
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => updateQuantity(product.id, -1)}
                          >
                            <Minus size={13} />
                          </button>
                          <span>{cart[product.id]}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => updateQuantity(product.id, 1)}
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      </div>
                      <strong>
                        {currency.format(product.price * cart[product.id])}
                      </strong>
                    </div>
                  ))}
                </div>
                <div className="cart-bottom">
                  <div className="shipping-progress">
                    <p>
                      {subtotal >= 150
                        ? "You've unlocked complimentary shipping."
                        : `You're ${currency.format(150 - subtotal)} away from complimentary shipping.`}
                    </p>
                    <div>
                      <span
                        style={{
                          width: `${Math.min((subtotal / 150) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <div className="subtotal-row">
                    <span>Subtotal</span>
                    <strong>{currency.format(subtotal)}</strong>
                  </div>
                  <p className="tax-note">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <button
                    className="button button-dark checkout-button"
                    onClick={() =>
                      showToast("Checkout is coming soon — your bag is saved.")
                    }
                  >
                    Continue to checkout <ArrowRight size={16} />
                  </button>
                  <button
                    className="continue-shopping"
                    onClick={() => setCartOpen(false)}
                  >
                    <ArrowLeft size={14} /> Continue shopping
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-cart">
                <ShoppingBag size={30} strokeWidth={1.3} />
                <h3>Your bag is taking a little break.</h3>
                <p>Find something lovely to bring home.</p>
                <button
                  className="button button-dark"
                  onClick={() => setCartOpen(false)}
                >
                  Explore the collection
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {toast && (
        <div className="toast" role="status">
          <Check size={16} aria-hidden="true" /> {toast}
        </div>
      )}
    </div>
  );
}

function NewsletterForm({ onSuccess }) {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!email.trim()) return;
    onSuccess("You're on the list. Keep an eye on your inbox.");
    setEmail("");
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="newsletter-email">
        Your email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <button aria-label="Subscribe to newsletter" type="submit">
        <ArrowRight size={19} />
      </button>
    </form>
  );
}

export default App;
