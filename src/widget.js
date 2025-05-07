// widget.js
window.EcomWidget = {
  init(config) {
    const selector       = config.selector || '#my-ecom-widget';
    const container      = document.querySelector(selector);
    if (!container) return console.warn('Container not found');

    // Settings
    const visibleCount    = config.visibleCount || 5;
    const transitionSpeed = 500;  // ms
    const gapPx           = 16;   // px gap between cards

    // Build Shadow DOM
    const shadow = container.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        :host { all: initial; }

        .widget-wrapper { position: relative; }

        .widget-box {
          --visible: ${visibleCount};
          --gap: ${gapPx}px;
          font-family: 'Inter', sans-serif;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          overflow: hidden;
          position: relative;
        }

        /* Edge fade overlays */
        .widget-box::before,
        .widget-box::after {
          content: "";
          position: absolute;
          top: 0; bottom: 0;
          width: calc((100% - (100% - (var(--visible) - 1) * var(--gap))) / 2);
          pointer-events: none;
          z-index: 5;
        }
        .widget-box::before {
          left: 0;
          background: linear-gradient(to right, #fff, transparent);
        }
        .widget-box::after {
          right: 0;
          background: linear-gradient(to left, #fff, transparent);
        }

        #products {
          display: flex;
          gap: var(--gap);
          transition: transform ${transitionSpeed}ms ease;
          will-change: transform;
        }

        .product {
          flex: 0 0 calc((100% - (var(--visible) - 1) * var(--gap)) / var(--visible));
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }

        .product img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 8px;
        }

        .info {
          text-align: center;
        }

        .info h4 {
          font-size: 14px;
          margin: 0 0 4px;
          color: #111;
          height: 32px;
          overflow: hidden;
        }

        .info p {
          font-size: 13px;
          margin: 0;
          color: #666;
        }

        .action-btn {
          margin-top: 8px;
          padding: 6px 12px;
          font-size: 13px;
          border: none;
          border-radius: 4px;
          background: #0070f3;
          color: #fff;
          cursor: pointer;
          transition: background 0.2s;
        }
        .action-btn:hover { background: #0055aa; }
        .action-btn:disabled { background: #ccc; cursor: default; }

        .nav-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 32px; height: 32px;
          border: none;
          background: rgba(255,255,255,0.9);
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.1);
          cursor: pointer;
          font-size: 16px;
          line-height: 32px;
          text-align: center;
          padding: 0;
          z-index: 10;
        }
        .prev { left: 8px; }
        .next { right: 8px; }
      </style>

      <div class="widget-wrapper">
        <button class="nav-button prev">&#10094;</button>
        <div class="widget-box"><div id="products">Loading…</div></div>
        <button class="nav-button next">&#10095;</button>
      </div>
    `;

    const productsEl = shadow.getElementById('products');
    const prevBtn    = shadow.querySelector('.prev');
    const nextBtn    = shadow.querySelector('.next');
    let currentIndex;

    // Fetch products & initialize carousel
    fetch(`https://fakestoreapi.com/products/category/${config.category || 'electronics'}`)
      .then(r => r.json())
      .then(real => {
        const n    = real.length;
        const head = real.slice(0, visibleCount);
        const tail = real.slice(-visibleCount);
        const loopItems = [...tail, ...real, ...head];

        // Render cards
        productsEl.innerHTML = '';
        loopItems.forEach(prod => {
          const card = document.createElement('div');
          card.className = 'product';
          card.innerHTML = `
            <img src="${prod.image}" alt="${prod.title}" />
            <div class="info">
              <h4>${prod.title}</h4>
              <p>$${prod.price}</p>
            </div>
            <button class="action-btn">Add</button>
          `;
          const btn = card.querySelector('button');
          btn.addEventListener('click', () => {
            btn.disabled = true; btn.textContent = 'Adding…';
            fetch('https://fakestoreapi.com/carts', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                userId: 1,
                date: new Date().toISOString(),
                products: [{ productId: prod.id, quantity: 1 }]
              })
            })
            .then(() => btn.textContent = 'Added!')
            .catch(() => { btn.textContent = 'Error'; btn.disabled = false; });
          });
          productsEl.appendChild(card);
        });

        // Compute slide width = card + gap
        const slideW = productsEl.children[0].getBoundingClientRect().width + gapPx;

        // Start at first real item
        currentIndex = visibleCount;
        productsEl.style.transform = `translateX(-${slideW*currentIndex}px)`;

        // On transition end, snap clones
        productsEl.addEventListener('transitionend', () => {
          productsEl.style.transition = '';
          if (currentIndex >= n + visibleCount) {
            currentIndex = visibleCount;
            productsEl.style.transition = 'none';
            productsEl.style.transform  = `translateX(-${slideW*currentIndex}px)`;
          }
          if (currentIndex < visibleCount) {
            currentIndex = n + visibleCount - 1;
            productsEl.style.transition = 'none';
            productsEl.style.transform  = `translateX(-${slideW*currentIndex}px)`;
          }
        });

        // Nav handlers
        prevBtn.addEventListener('click', () => {
          productsEl.style.transition = `transform ${transitionSpeed}ms ease`;
          currentIndex--;
          productsEl.style.transform  = `translateX(-${slideW*currentIndex}px)`;
        });
        nextBtn.addEventListener('click', () => {
          productsEl.style.transition = `transform ${transitionSpeed}ms ease`;
          currentIndex++;
          productsEl.style.transform  = `translateX(-${slideW*currentIndex}px)`;
        });
      })
      .catch(() => {
        productsEl.innerHTML = '<p style="padding:16px;color:#900">Error loading products.</p>';
      });
  }
};
