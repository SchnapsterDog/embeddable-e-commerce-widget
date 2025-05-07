window.EcomWidget = {
  init(config) {
    const selector = config.selector || '#my-ecom-widget';
    const container = document.querySelector(selector);
    if (!container) return console.warn('Container not found');

    const shadow = container.attachShadow({ mode: 'open' });

    shadow.innerHTML = `
  <style>
    :host {
      all: initial;
    }

    .widget-wrapper {
      position: relative;
    }

    .widget-box {
      font-family: 'Inter', 'Segoe UI', sans-serif;
      border-radius: 16px;
      background: linear-gradient(to right, #e0f2fe, #ecfdf5);
      border: 1px solid #bae6fd;
      padding: 20px;
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
      overflow: hidden;
      position: relative;
    }

    #products {
      display: flex;
      flex-direction: row;
      gap: 20px;
      transition: transform 0.5s ease;
      will-change: transform;
    }

    .product {
      flex: 0 0 calc(20% - 16px); /* 5 items - 20% minus small gap */
      background: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
    }

    .product:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }

    .product img {
      width: 100px;
      height: 100px;
      object-fit: contain;
      border-radius: 10px;
      background: #f1f5f9;
      margin-bottom: 12px;
    }

    .info {
      text-align: center;
      flex-grow: 1;
    }

    .info h4 {
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
      margin: 0 0 6px;
      height: 36px;
      overflow: hidden;
    }

    .info p {
      font-size: 13px;
      color: #475569;
      margin: 0 0 10px;
    }

    button {
      background: #10b981;
      color: white;
      border: none;
      padding: 8px 14px;
      font-size: 13px;
      border-radius: 6px;
      cursor: pointer;
      transition: background 0.2s ease;
      margin-top: 8px;
    }

    button:hover {
      background: #059669;
    }

    button:disabled {
      background-color: #cbd5e1;
      cursor: not-allowed;
    }

    .nav-button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background: rgba(255, 255, 255, 0.9);
      border: 1px solid #bae6fd;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      padding: 8px 12px;
      border-radius: 50%;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
      color: #0f172a;
      transition: background 0.2s ease;
      z-index: 10;
    }

    .nav-button:hover {
      background: #bae6fd;
    }

    .prev {
      left: -10px;
    }

    .next {
      right: -10px;
    }

    @media (max-width: 768px) {
      .product {
        flex: 0 0 calc(50% - 16px);
      }
    }

    @media (max-width: 500px) {
      .product {
        flex: 0 0 calc(100% - 16px);
      }
    }
  </style>

  <div class="widget-wrapper">
    <button class="nav-button prev">&#8592;</button>
    <button class="nav-button next">&#8594;</button>

    <div class="widget-box">
      <div id="products">Loading products...</div>
    </div>
  </div>
`;

    const productsContainer = shadow.querySelector('#products');
    const prevBtn = shadow.querySelector('.prev');
    const nextBtn = shadow.querySelector('.next');
    let currentIndex = 0;

    const moveTo = (index, productsLength) => {
      const productWidth = productsContainer.children[0].offsetWidth + 20; // card width + gap
      productsContainer.style.transform = `translateX(-${index * productWidth}px)`;
      currentIndex = index;

      // Loop around
      if (index >= productsLength) {
        setTimeout(() => {
          productsContainer.style.transition = 'none';
          productsContainer.style.transform = `translateX(0px)`;
          currentIndex = 0;
          setTimeout(() => {
            productsContainer.style.transition = 'transform 0.5s ease';
          }, 50);
        }, 500);
      }
      if (index < 0) {
        setTimeout(() => {
          const lastPos = (productsLength - 1) * productWidth;
          productsContainer.style.transition = 'none';
          productsContainer.style.transform = `translateX(-${lastPos}px)`;
          currentIndex = productsLength - 1;
          setTimeout(() => {
            productsContainer.style.transition = 'transform 0.5s ease';
          }, 50);
        }, 500);
      }
    };

    prevBtn.addEventListener('click', () => {
      moveTo(currentIndex - 1, productsContainer.children.length);
    });

    nextBtn.addEventListener('click', () => {
      moveTo(currentIndex + 1, productsContainer.children.length);
    });

    // Fetch products
    fetch(`https://fakestoreapi.com/products/category/${config.category || 'electronics'}`)
      .then(res => res.json())
      .then(products => {
        productsContainer.innerHTML = '';
        products.forEach(product => {
          const div = document.createElement('div');
          div.className = 'product';
          div.innerHTML = `
            <img src="${product.image}" alt="${product.title}" />
            <div class="info">
              <h4>${product.title}</h4>
              <p>$${product.price}</p>
              <button>Add to Cart</button>
            </div>
          `;

          const button = div.querySelector('button');
          button.addEventListener('click', () => {
            button.disabled = true;
            button.textContent = 'Adding...';

            fetch('https://fakestoreapi.com/carts', {
              method: 'POST',
              body: JSON.stringify({
                userId: 1,
                date: new Date().toISOString(),
                products: [{ productId: product.id, quantity: 1 }]
              }),
              headers: { 'Content-Type': 'application/json' }
            })
              .then(res => res.json())
              .then(() => {
                button.textContent = 'Added!';
              })
              .catch(() => {
                button.textContent = 'Error';
                button.disabled = false;
              });
          });

          productsContainer.appendChild(div);
        });
      })
      .catch(err => {
        productsContainer.innerHTML = `<p>Error loading products.</p>`;
        console.error(err);
      });
  }
};
