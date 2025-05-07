<p align="center">
  <img src="https://app.imgforce.com/images/user/s6Y_1746579947_Widget%20Test%20-%20Google%20Chrome%205_7_2025%203_03_11%20AM.png" alt="Widget Logo" width="380" />
</p>

<h1 align="center">Embeddable E-commerce Widget</h1>

<p align="center">
  🚀 Lightweight, Fast, and Modern JavaScript Widget for Embedding Products into Any Website
</p>

---

# 📦 Project Overview

This project is a fully embeddable **e-commerce widget** that allows you to:

- ✅ Show 5 products per viewport
- ✅ Scroll left/right with Prev/Next buttons
- ✅ Infinite looping behavior
- ✅ Fully responsive (desktop, tablet, mobile)
- ✅ Pure **Vanilla JavaScript** (no frameworks)
- ✅ Easily integrate into **any** website with one line of code
- ✅ Host the widget yourself or through a CDN

---

# 🎯 Features

| Feature                        | Status |
|---------------------------------|:------:|
| Responsive Design              | ✅ |
| Horizontal Carousel with Scroll | ✅ |
| 5 Items Per Viewport            | ✅ |
| Infinite Looping                | ✅ |
| Lightweight & Fast              | ✅ |
| Shadow DOM Isolation            | ✅ |
| No External Dependencies        | ✅ |

---

# 🚀 Quick Start

## 1. Install

Clone or download this repo:

```bash
git clone https://github.com/your-username/your-widget-repo.git
cd your-widget-repo
```

Or simply grab the `widget.js` file and serve it yourself!

---

## 2. Serve Locally (Development)

If you have Node.js installed:

```bash
npm install -g serve
serve .
```

Access your local server at: [http://localhost:3000](http://localhost:3000)

Or if you have Python:

```bash
python3 -m http.server 8080
```

Access it at: [http://localhost:8080](http://localhost:8080)

---

# 🛠 Usage Example

### HTML Integration:

```html
<div id="my-ecom-widget"></div>

<script src="https://your-cdn.com/widget.js"></script>
<script>
  window.EcomWidget.init({
    selector: '#my-ecom-widget',
    category: 'electronics'
  });
</script>
```

✅ That's it! Your widget is now live and running inside any webpage.

---

# ✨ Widget Preview

![Preview](https://app.imgforce.com/images/user/s6Y_1746579947_Widget%20Test%20-%20Google%20Chrome%205_7_2025%203_03_11%20AM.png)

---

# ⚙️ Configuration Options

| Property  | Type    | Default    | Description |
|-----------|---------|------------|-------------|
| selector  | string  | `#my-ecom-widget` | HTML selector where the widget will be injected |
| category  | string  | `'electronics'`   | Product category from API to fetch |

Example:

```javascript
window.EcomWidget.init({
  selector: '#your-div-id',
  category: 'jewelery'
});
```

---

# 📡 API Endpoints Used

- **GET Products:**  
  [https://fakestoreapi.com/products/category/electronics](https://fakestoreapi.com/products/category/electronics)

- **POST Add to Cart:**  
  [https://fakestoreapi.com/carts](https://fakestoreapi.com/carts)

_(These are free public test APIs — no API keys required.)_

---

# 🧩 Technology Stack

- Pure **Vanilla JavaScript** (ES6+)
- **HTML + CSS** inside **Shadow DOM** for isolation
- No external libraries
- No framework dependencies
- No build step required (ready to use)

---

# 📜 License

**MIT License**

You are free to use, modify, distribute, and contribute!

---

# 🤝 Contributing

Pull requests are very welcome!  
For major changes, please open an issue first to discuss what you would like to change.

---

# 📬 Contact

If you like this project, feel free to connect:

- 🌐 [LinkedIn](https://www.linkedin.com/in/oliver-t-8a28b070/)
- 🐦 [Github](https://github.com/SchnapsterDog)
- 📩 Email: oliver@akrinum.com

---

# ❤️ Credits

- [FakeStoreAPI](https://fakestoreapi.com/) for sample product data.
- Special thanks to the open-source community.

---

<p align="center">
  Made with ❤️ and JavaScript
</p>
