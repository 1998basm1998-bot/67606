const banners = [
  { id: 1, badge: 'عرض حصري', title: 'جديدنا: أزياء الصيف\n2024 - تسوق الآن!', buttonText: 'تسوق الآن', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80', bg: 'from-[#448b94] to-[#1a4e55]' },
  { id: 2, badge: 'وصل حديثاً', title: 'أجهزة ذكية متطورة\nاستكشف الجديد', buttonText: 'اكتشف المزيد', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80', bg: 'from-[#1a4e55] to-[#0f2e33]' },
  { id: 3, badge: 'تخفيضات', title: 'خصم يصل إلى 50%\nعلى العطور الفاخرة', buttonText: 'اشتري الآن', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80', bg: 'from-[#448b94] to-[#37828c]' },
  { id: 4, badge: 'الأكثر مبيعاً', title: 'نظارات شمسية\nتواكب الموضة', buttonText: 'تسوق الآن', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80', bg: 'from-[#1a4e55] to-[#448b94]' }
];

const productsData = [
  { id: 1, name: 'نظارات شمسية ميمية', category: 'جمال', price: '10,000 د.ع', priceValue: 10000, rating: 5, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'ساعة ذكية برو', category: 'إلكترونيات', price: '78,000 د.ع', priceValue: 78000, rating: 5, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'خلاط كهربائي ذكي', category: 'منزلية', price: '25,000 د.ع', priceValue: 25000, rating: 4, image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=200&q=80' },
  { id: 4, name: 'عطر فرنسي فاخر', category: 'جمال', price: '45,000 د.ع', priceValue: 45000, rating: 5, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80' },
  { id: 5, name: 'كتاب تعلم البرمجة', category: 'كتب', price: '15,000 د.ع', priceValue: 15000, rating: 5, image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&w=200&q=80' },
  { id: 6, name: 'قميص قطني أنيق', category: 'أزياء', price: '20,000 د.ع', priceValue: 20000, rating: 4, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=200&q=80' }
];

const categoriesList = [
  { id: 'كتب', name: 'كتب', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=200&q=80', color: 'text-[#1a4e55]', bg: 'bg-[#f4ece3]', border: 'border-[#1a4e55]/20' },
  { id: 'جمال', name: 'جمال', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=200&q=80', color: 'text-pink-500', bg: 'bg-[#fae8f0]', border: 'border-pink-500/20' },
  { id: 'منزلية', name: 'منزلية', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=200&q=80', color: 'text-green-600', bg: 'bg-[#eef5e6]', border: 'border-green-600/20' },
  { id: 'إلكترونيات', name: 'إلكترونيات', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=200&q=80', color: 'text-blue-500', bg: 'bg-[#e6f0f5]', border: 'border-blue-500/20' },
  { id: 'أزياء', name: 'أزياء', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=200&q=80', color: 'text-purple-500', bg: 'bg-[#f3e8fa]', border: 'border-purple-500/20' }
];

let state = {
  activeTab: 'home',
  currentBanner: 0,
  favorites: [],
  cart: [],
  isDarkMode: false,
  deliveryInfo: { name: '', phone: '', address: '' },
  tempDelivery: { name: '', phone: '', address: '' },
  isEditingDelivery: true,
  isSavingDelivery: false,
  showCheckout: false,
  selectedCategory: null
};

window.setActiveTab = (tab) => {
  state.activeTab = tab;
  if(tab === 'categories') state.selectedCategory = null;
  render();
};

window.setCurrentBanner = (idx) => {
  state.currentBanner = idx;
  const slider = document.getElementById('banner-slider');
  if (slider) slider.style.transform = `translateX(${state.currentBanner * 100}%)`;
  renderBannerDots();
};

window.toggleFavorite = (id) => {
  if (state.favorites.includes(id)) {
    state.favorites = state.favorites.filter(f => f !== id);
  } else {
    state.favorites.push(id);
  }
  render();
};

window.addToCart = (id) => {
  const existing = state.cart.find(item => item.id === id);
  if (existing) {
    existing.quantity++;
  } else {
    state.cart.push({ id, quantity: 1 });
  }
  render();
};

window.updateCartQuantity = (id, delta) => {
  const item = state.cart.find(i => i.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.id !== id);
    }
  }
  render();
};

window.toggleDarkMode = () => {
  state.isDarkMode = !state.isDarkMode;
  render();
};

window.setSelectedCategory = (category) => {
  state.selectedCategory = category;
  render();
};

window.startEditingDelivery = () => {
  state.tempDelivery = { ...state.deliveryInfo };
  state.isEditingDelivery = true;
  render();
};

window.updateTempDelivery = (field, value) => {
  state.tempDelivery[field] = value;
};

window.saveDelivery = () => {
  state.isSavingDelivery = true;
  render();
  setTimeout(() => {
    state.deliveryInfo = { ...state.tempDelivery };
    state.isSavingDelivery = false;
    state.isEditingDelivery = false;
    render();
  }, 600);
};

window.showCheckoutModal = () => {
  state.tempDelivery = { ...state.deliveryInfo };
  state.showCheckout = true;
  render();
};

window.closeCheckoutModal = () => {
  state.showCheckout = false;
  render();
};

window.confirmCheckout = () => {
  state.deliveryInfo = { ...state.tempDelivery };
  alert('تم تأكيد الطلب بنجاح!');
  state.cart = [];
  state.showCheckout = false;
  state.activeTab = 'home';
  render();
};

setInterval(() => {
  if(state.activeTab === 'home') {
    state.currentBanner = state.currentBanner === banners.length - 1 ? 0 : state.currentBanner + 1;
    const slider = document.getElementById('banner-slider');
    if (slider) slider.style.transform = `translateX(${state.currentBanner * 100}%)`;
    renderBannerDots();
  }
}, 5000);

function getCartTotalItemCount() {
  return state.cart.reduce((acc, item) => acc + item.quantity, 0);
}

function getCartTotalPrice() {
  return state.cart.reduce((acc, item) => {
    const product = productsData.find(p => p.id === item.id);
    return acc + (product?.priceValue || 0) * item.quantity;
  }, 0);
}

function renderBannerDots() {
  const dotsContainer = document.getElementById('banner-dots');
  if(!dotsContainer) return;
  dotsContainer.innerHTML = banners.map((_, idx) => `
    <div 
      class="w-2 h-2 rounded-full cursor-pointer transition-colors ${state.currentBanner === idx ? 'bg-tealPrimary' : 'bg-gray-300'}"
      onclick="setCurrentBanner(${idx})"
    ></div>
  `).join('');
}

function renderProductCard(product) {
  const isFav = state.favorites.includes(product.id);
  const isDark = state.isDarkMode;
  let starsHtml = '';
  for(let i=0; i<5; i++) {
    starsHtml += `<i data-lucide="star" class="w-3 h-3 ${i < product.rating ? 'fill-yellow-400 text-yellow-400' : (isDark ? 'fill-gray-600 text-gray-600' : 'fill-gray-300 text-gray-300')}"></i>`;
  }

  return `
    <div class="p-3 rounded-[24px] shadow-sm border relative flex flex-col items-center text-center group transition-colors ${isDark ? 'bg-gray-800 border-gray-700 hover:border-goldAccent' : 'bg-white border-teal-50 hover:border-goldAccent'}">
      <img src="${product.image}" alt="${product.name}" class="w-full h-32 object-cover rounded-2xl mb-[5px] group-hover:opacity-90 transition-opacity ${isDark ? 'bg-gray-700' : 'bg-gray-50'}" />
      <div 
        class="absolute top-5 right-5 z-10 backdrop-blur p-1 rounded-lg cursor-pointer transition-colors hover:scale-110 ${isDark ? 'bg-gray-900/80' : 'bg-white/80'}"
        onclick="toggleFavorite(${product.id})"
      >
        <i data-lucide="heart" class="w-3.5 h-3.5 ${isFav ? 'fill-red-500 text-red-500' : (isDark ? 'text-gray-300 hover:text-red-500' : 'text-gray-400 hover:text-red-500')}"></i>
      </div>
      <h4 class="font-bold text-sm w-full truncate ${isDark ? 'text-gray-100' : 'text-tealDark'}">${product.name}</h4>
      <div class="text-tealPrimary font-black text-[15px] mt-1 mb-1">${product.price}</div>
      <div class="flex text-yellow-400 text-[10px] mb-3 gap-0.5">
        ${starsHtml}
      </div>
      <button 
        onclick="addToCart(${product.id})"
        class="w-full bg-[#1a4e55] text-white py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-tealPrimary transition shadow-sm"
      >
        <i data-lucide="shopping-cart" class="w-4 h-4"></i> إضافة للسلة
      </button>
    </div>
  `;
}

function renderContent() {
  const isDark = state.isDarkMode;
  let html = '';

  if (state.activeTab === 'home') {
    let bannersHtml = banners.map(banner => `
      <div class="min-w-full h-full bg-gradient-to-l ${banner.bg} p-5 text-white relative flex items-center overflow-hidden">
        <div class="z-10 w-2/3">
          <span class="bg-[#d2b172] text-[#1a4e55] px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-wider mb-1 inline-block">${banner.badge}</span>
          <h2 class="text-lg font-bold mb-2 leading-tight whitespace-pre-line">${banner.title}</h2>
          <button class="mt-1 bg-white text-[#37828c] font-bold py-1 px-4 rounded-xl text-xs shadow-md hover:bg-gray-100 transition">${banner.buttonText}</button>
        </div>
        <div class="absolute left-[-20px] bottom-0 h-full w-1/2 opacity-90 flex justify-end items-end">
          <img src="${banner.image}" alt="Banner" class="h-[120%] object-cover [mask-image:linear-gradient(to_left,transparent,black)]" />
        </div>
      </div>
    `).join('');

    let categoriesHtml = categoriesList.map(category => `
      <div 
        class="flex flex-col items-center gap-2 min-w-[65px] cursor-pointer group"
        onclick="setSelectedCategory('${category.name}'); setActiveTab('categories');"
      >
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm overflow-hidden border transition-transform group-hover:scale-110 ${isDark ? 'border-gray-700' : 'border-teal-50'}">
          <img src="${category.image}" alt="${category.name}" class="w-full h-full object-cover" />
        </div>
        <span class="font-bold text-sm transition-colors ${isDark ? 'text-gray-300 group-hover:text-white' : 'text-gray-800 group-hover:text-tealPrimary'}">${category.name}</span>
      </div>
    `).join('');

    let productsHtml = productsData.map(renderProductCard).join('');

    html = `
      <div class="flex items-center gap-3 px-6 mb-6">
        <div class="flex-1 rounded-2xl flex items-center px-4 py-3 shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-100/50'}">
          <i data-lucide="search" class="ml-3 w-5 h-5 text-gray-400"></i>
          <input type="text" placeholder="بحث عن مبتغاك..." class="bg-transparent w-full outline-none text-sm font-semibold ${isDark ? 'text-white placeholder-gray-500' : 'text-gray-600 placeholder-gray-400'}" />
        </div>
        <div 
          class="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm border cursor-pointer transition relative ${isDark ? 'bg-gray-800 border-gray-700 text-tealPrimary hover:bg-gray-700' : 'bg-white border-teal-100/50 text-tealPrimary hover:bg-gray-50'}"
          onclick="setActiveTab('cart')"
        >
          <i data-lucide="shopping-cart" class="w-5 h-5"></i>
          ${getCartTotalItemCount() > 0 ? `<span class="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">${getCartTotalItemCount()}</span>` : ''}
        </div>
      </div>

      <div class="px-6 mb-6">
        <div class="rounded-[32px] shadow-xl shadow-teal-900/10 overflow-hidden relative aspect-[2.35/1]">
          <div 
            id="banner-slider"
            class="flex h-full transition-transform duration-[800ms] ease-in-out"
            style="transform: translateX(${state.currentBanner * 100}%)"
          >
            ${bannersHtml}
          </div>
        </div>
        <div id="banner-dots" class="flex justify-center gap-1.5 mt-4">
        </div>
      </div>

      <div class="flex overflow-x-auto hide-scrollbar px-6 gap-5 mb-8">
        ${categoriesHtml}
      </div>

      <div class="flex justify-between items-center px-6 mb-4">
        <h3 class="font-bold text-[1.1rem] ${isDark ? 'text-white' : 'text-tealDark'}">المنتجات الأكثر مبيعاً</h3>
        <a href="#" class="text-xs text-tealPrimary font-bold">المزيد &gt;</a>
      </div>

      <div class="grid grid-cols-2 gap-4 px-6 mb-6">
        ${productsHtml}
      </div>
    `;
  } else if (state.activeTab === 'favorites') {
    let emptyHtml = `
      <div class="flex flex-col items-center justify-center py-20 opacity-60">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <i data-lucide="heart" class="w-8 h-8 text-gray-400"></i>
        </div>
        <h4 class="font-bold text-gray-600 mb-2">لا توجد منتجات مفضلة</h4>
        <p class="text-xs text-gray-400 text-center">قم بإضافة المنتجات التي تعجبك لتجدها هنا</p>
        <button 
          onclick="setActiveTab('home')"
          class="mt-6 bg-[#1a4e55] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-tealPrimary transition shadow-md"
        >
          تصفح المنتجات
        </button>
      </div>
    `;

    let productsHtml = productsData.filter(p => state.favorites.includes(p.id)).map(renderProductCard).join('');

    html = `
      <div class="px-6 mb-6 fade-in slide-in-from-bottom">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-[1.2rem] flex items-center gap-2 ${isDark ? 'text-white' : 'text-tealDark'}">
            <i data-lucide="heart" class="w-5 h-5 text-red-500 fill-red-500"></i>
            المنتجات المفضلة
          </h3>
        </div>
        ${state.favorites.length === 0 ? emptyHtml : `<div class="grid grid-cols-2 gap-4">${productsHtml}</div>`}
      </div>
    `;
  } else if (state.activeTab === 'cart') {
    let emptyHtml = `
      <div class="flex flex-col items-center justify-center py-20 opacity-60">
        <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <i data-lucide="shopping-cart" class="w-8 h-8 text-gray-400"></i>
        </div>
        <h4 class="font-bold text-gray-600 mb-2">سلة المشتريات فارغة</h4>
        <p class="text-xs text-gray-400 text-center">تصفح المنتجات وأضف ما يعجبك إلى السلة</p>
        <button 
          onclick="setActiveTab('home')"
          class="mt-6 bg-[#1a4e55] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-tealPrimary transition shadow-md"
        >
          تصفح المنتجات
        </button>
      </div>
    `;

    let cartListHtml = state.cart.map(item => {
      const product = productsData.find(p => p.id === item.id);
      if (!product) return '';
      return `
        <div class="p-3 rounded-2xl shadow-sm border flex items-center gap-4 transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-50'}">
          <img src="${product.image}" alt="${product.name}" class="w-20 h-20 object-cover rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}" />
          <div class="flex-1">
            <h4 class="font-bold text-sm mb-1 w-full line-clamp-2 ${isDark ? 'text-gray-100' : 'text-tealDark'}">${product.name}</h4>
            <div class="text-tealPrimary font-black text-sm">${product.price}</div>
          </div>
          <div class="flex flex-col items-center gap-2">
            <button onclick="updateCartQuantity(${item.id}, 1)" class="w-7 h-7 rounded-lg flex items-center justify-center font-bold transition ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-teal-50 text-tealDark hover:bg-teal-100'}"><i data-lucide="plus" class="w-4 h-4"></i></button>
            <span class="font-bold text-sm w-4 text-center ${isDark ? 'text-white' : 'text-tealDark'}">${item.quantity}</span>
            <button onclick="updateCartQuantity(${item.id}, -1)" class="w-7 h-7 rounded-lg flex items-center justify-center text-red-500 font-bold transition ${isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-50 hover:bg-red-100'}">
              <i data-lucide="${item.quantity === 1 ? 'trash-2' : 'minus'}" class="w-4 h-4"></i>
            </button>
          </div>
        </div>
      `;
    }).join('');

    let cartTotalHtml = `
      <div class="p-5 rounded-3xl shadow-sm border mt-4 transition-colors ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-50'}">
        <div class="flex justify-between items-center mb-2">
          <span class="font-semibold text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}">المجموع الفرعي</span>
          <span class="font-bold ${isDark ? 'text-gray-300' : 'text-tealDark'}">${getCartTotalPrice().toLocaleString('ar-IQ')} د.ع</span>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="font-semibold text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}">رسوم التوصيل</span>
          <span class="font-bold ${isDark ? 'text-gray-300' : 'text-tealDark'}">5,000 د.ع</span>
        </div>
        <div class="h-px w-full mb-4 ${isDark ? 'bg-gray-700' : 'bg-gray-100'}"></div>
        <div class="flex justify-between items-center mb-6">
          <span class="font-bold text-lg ${isDark ? 'text-white' : 'text-tealDark'}">الإجمالي</span>
          <span class="font-black text-xl text-tealPrimary">${(getCartTotalPrice() + 5000).toLocaleString('ar-IQ')} د.ع</span>
        </div>
        <button 
          onclick="showCheckoutModal()"
          class="w-full bg-[#1a4e55] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-tealPrimary transition flex items-center justify-center gap-2">
            إتمام الشراء
        </button>
      </div>
    `;

    html = `
      <div class="px-6 mb-6 fade-in slide-in-from-bottom">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-[1.2rem] flex items-center gap-2 ${isDark ? 'text-white' : 'text-tealDark'}">
            <i data-lucide="shopping-cart" class="w-5 h-5 text-tealPrimary"></i>
            سلة المشتريات
          </h3>
        </div>
        ${state.cart.length === 0 ? emptyHtml : `<div class="flex flex-col gap-4">${cartListHtml}${cartTotalHtml}</div>`}
      </div>
    `;
  } else if (state.activeTab === 'account') {
    let editDeliveryHtml = `
      <div class="flex flex-col gap-4 fade-in zoom-in-95 relative z-10">
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}">الاسم الكامل</label>
          <input 
            type="text" 
            value="${state.tempDelivery.name}"
            oninput="updateTempDelivery('name', this.value)"
            placeholder="أدخل اسمك"
            class="w-full p-3 rounded-xl outline-none text-sm font-semibold border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400'} focus:border-tealPrimary transition"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}">رقم الهاتف</label>
          <input 
            type="tel" 
            value="${state.tempDelivery.phone}"
            oninput="updateTempDelivery('phone', this.value)"
            placeholder="07XX XXX XXXX"
            class="w-full p-3 rounded-xl outline-none text-sm font-semibold border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400'} focus:border-tealPrimary transition"
          />
        </div>
        <div class="flex flex-col gap-1.5">
          <label class="text-xs font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}">العنوان</label>
          <input 
            type="text" 
            value="${state.tempDelivery.address}"
            oninput="updateTempDelivery('address', this.value)"
            placeholder="المدينة، المنطقة، التفاصيل"
            class="w-full p-3 rounded-xl outline-none text-sm font-semibold border ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-500' : 'bg-gray-50 border-gray-100 text-gray-700 placeholder-gray-400'} focus:border-tealPrimary transition"
          />
        </div>
        <button 
          onclick="saveDelivery()"
          class="w-full mt-2 text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 duration-700 ${state.isSavingDelivery ? 'bg-sky-400/90 backdrop-blur-md shadow-sky-400/50 [transform:rotateY(360deg)] scale-95' : 'bg-[#1a4e55] hover:bg-tealPrimary'}"
          style="transform-style: preserve-3d; perspective: 1000px;"
        >
          <i data-lucide="check-circle" class="w-5 h-5 transition-transform ${state.isSavingDelivery ? 'scale-125' : ''}"></i> 
          ${state.isSavingDelivery ? 'يتم الحفظ...' : 'حفظ المعلومات'}
        </button>
      </div>
    `;

    let viewDeliveryHtml = `
      <div class="flex flex-col gap-3 fade-in">
        <div class="p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}">
          <div class="text-[10px] font-bold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}">الاسم الكامل</div>
          <div class="font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}">${state.deliveryInfo.name || '-'}</div>
        </div>
        <div class="p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}">
          <div class="text-[10px] font-bold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}">رقم الهاتف</div>
          <div class="font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}">${state.deliveryInfo.phone || '-'}</div>
        </div>
        <div class="p-3 rounded-xl ${isDark ? 'bg-gray-700' : 'bg-gray-50'}">
          <div class="text-[10px] font-bold mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}">العنوان</div>
          <div class="font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-800'}">${state.deliveryInfo.address || '-'}</div>
        </div>
      </div>
    `;

    html = `
      <div class="px-6 mb-6 fade-in slide-in-from-bottom">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-[1.2rem] flex items-center gap-2 ${isDark ? 'text-white' : 'text-tealDark'}">
            <i data-lucide="user" class="w-5 h-5 text-tealPrimary"></i>
            حسابي
          </h3>
        </div>
        
        <div class="flex flex-col gap-6">
          <div class="p-4 rounded-3xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-50'} flex justify-between items-center transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-[#f4ece3] text-tealDark'}">
                <i data-lucide="${isDark ? 'moon' : 'sun'}" class="w-5 h-5 fill-current"></i>
              </div>
              <span class="font-bold ${isDark ? 'text-white' : 'text-gray-800'}">
                المظهر ${isDark ? 'الليلي' : 'النهاري'}
              </span>
            </div>
            <button 
              onclick="toggleDarkMode()"
              class="w-12 h-6 rounded-full flex items-center p-1 transition-colors ${isDark ? 'bg-tealPrimary' : 'bg-gray-300'}"
            >
              <div class="w-4 h-4 bg-white rounded-full transition-transform ${isDark ? '-translate-x-6' : 'translate-x-0'}"></div>
            </button>
          </div>

          <div class="p-5 rounded-3xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-teal-50'} transition-colors">
            <div class="flex justify-between items-center mb-4">
              <h4 class="font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-tealDark'}">
                <i data-lucide="map-pin" class="w-5 h-5 text-tealPrimary"></i>
                معلومات التوصيل
              </h4>
              ${!state.isEditingDelivery ? `
                <button 
                  onclick="startEditingDelivery()"
                  class="p-1.5 rounded-lg transition-colors ${isDark ? 'bg-gray-700 text-tealPrimary hover:bg-gray-600' : 'bg-teal-50 text-tealPrimary hover:bg-teal-100'}"
                >
                  <i data-lucide="edit-2" class="w-4 h-4"></i>
                </button>
              ` : ''}
            </div>
            ${state.isEditingDelivery ? editDeliveryHtml : viewDeliveryHtml}
          </div>
        </div>
      </div>
    `;
  } else if (state.activeTab === 'categories') {
    let catsHtml = categoriesList.map(category => {
      const count = productsData.filter(p => p.category === category.name).length;
      return `
        <div 
          onclick="setSelectedCategory('${category.name}')"
          class="relative rounded-[28px] overflow-hidden cursor-pointer group shadow-sm border ${isDark ? 'border-gray-700' : 'border-teal-50'} shadow-teal-900/10 aspect-square"
        >
          <img src="${category.image}" alt="${category.name}" class="w-full h-full object-cover transition-transform duration-[800ms] group-hover:scale-110" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white">
            <h4 class="font-bold text-lg leading-tight mb-1">${category.name}</h4>
            <span class="text-[11px] font-bold opacity-80 bg-white/20 w-fit px-2 py-0.5 rounded-lg backdrop-blur-sm">${count} منتجات</span>
          </div>
        </div>
      `;
    }).join('');

    let prodsHtml = productsData.filter(p => p.category === state.selectedCategory).map(renderProductCard).join('');
    
    html = `
      <div class="px-6 mb-6 fade-in slide-in-from-bottom">
        <div class="flex items-center gap-3 mb-6">
          ${state.selectedCategory ? `
             <button 
               onclick="setSelectedCategory(null)" 
               class="p-2 rounded-xl border shadow-sm transition-colors hover:scale-105 ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300 hover:text-white hover:bg-gray-700' : 'bg-white border-teal-50 text-tealDark hover:bg-gray-50'}"
             >
               <i data-lucide="x" class="w-5 h-5"></i>
             </button>
          ` : `<i data-lucide="layout-grid" class="w-6 h-6 text-tealPrimary"></i>`}
          <h3 class="font-bold text-[1.2rem] flex items-center gap-2 ${isDark ? 'text-white' : 'text-tealDark'}">
            ${state.selectedCategory ? categoriesList.find(c => c.name === state.selectedCategory)?.name : 'التصنيفات'}
          </h3>
        </div>
        
        ${!state.selectedCategory ? `
          <div class="grid grid-cols-2 gap-4">
            ${catsHtml}
          </div>
        ` : `
          <div class="grid grid-cols-2 gap-4 fade-in zoom-in-95">
            ${prodsHtml}
            ${productsData.filter(p => p.category === state.selectedCategory).length === 0 ? `
              <div class="col-span-2 text-center py-10 opacity-60 font-bold">لا توجد منتجات في هذا التصنيف</div>
            ` : ''}
          </div>
        `}
      </div>
    `;
  }

  return html;
}

function renderCheckout() {
  const isDark = state.isDarkMode;
  if (!state.showCheckout) return '';

  return `
    <div class="absolute inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-end justify-center">
      <div class="w-full ${isDark ? 'bg-gray-900 border-t border-gray-800' : 'bg-white'} rounded-t-[35px] p-6 pb-10 slide-in-from-bottom-full transition-colors">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-lg ${isDark ? 'text-white' : 'text-tealDark'}">إتمام الطلب</h3>
          <button onclick="closeCheckoutModal()" class="p-2 rounded-full transition ${isDark ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-500 hover:text-gray-800'}">
            <i data-lucide="x" class="w-5 h-5"></i>
          </button>
        </div>

        <div class="flex flex-col gap-4">
          <div class="p-4 rounded-2xl border shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
            <h4 class="text-sm font-bold mb-3 ${isDark ? 'text-white' : 'text-tealDark'}">معلومات التوصيل</h4>
            
            <div class="flex flex-col gap-3">
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}">الاسم الكامل</label>
                <input 
                  value="${state.tempDelivery.name}" 
                  oninput="updateTempDelivery('name', this.value)"
                  class="w-full p-2.5 rounded-lg border text-sm font-semibold outline-none focus:border-tealPrimary ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}" 
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}">رقم الهاتف</label>
                <input 
                  value="${state.tempDelivery.phone}" 
                  oninput="updateTempDelivery('phone', this.value)"
                  class="w-full p-2.5 rounded-lg border text-sm font-semibold outline-none focus:border-tealPrimary ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}" 
                />
              </div>
              <div class="flex flex-col gap-1">
                <label class="text-[11px] font-bold ${isDark ? 'text-gray-400' : 'text-gray-500'}">العنوان</label>
                <input 
                  value="${state.tempDelivery.address}" 
                  oninput="updateTempDelivery('address', this.value)"
                  class="w-full p-2.5 rounded-lg border text-sm font-semibold outline-none focus:border-tealPrimary ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}" 
                />
              </div>
            </div>
          </div>

          <div class="p-4 rounded-2xl border shadow-sm flex justify-between items-center ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}">
            <span class="font-bold text-sm ${isDark ? 'text-gray-300' : 'text-tealDark'}">المبلغ المطلوب</span>
            <span class="font-black text-lg text-tealPrimary">${(getCartTotalPrice() + 5000).toLocaleString('ar-IQ')} د.ع</span>
          </div>

          <button 
            onclick="confirmCheckout()"
            class="w-full bg-[#1a4e55] text-white py-3.5 rounded-xl text-sm font-bold shadow-md hover:bg-tealPrimary transition mt-2"
          >
            تأكيد الطلب
          </button>
        </div>
      </div>
    </div>
  `;
}

function render() {
  const root = document.getElementById('root');
  const isDark = state.isDarkMode;

  if(!document.getElementById('app-wrapper')) {
    root.innerHTML = `
      <div id="app-wrapper" dir="rtl">
        <div id="app-container">
          
          <div id="scroll-container" class="flex-1 overflow-y-auto hide-scrollbar pb-24 relative">
             <div id="header-container"></div>
             <div id="content-container"></div>
          </div>
          
          <div id="checkout-container"></div>
          <div id="navbar-container"></div>
        </div>
      </div>
    `;
  }

  const appWrapper = document.getElementById('app-wrapper');
  appWrapper.className = `bg-gray-100 flex justify-center items-center h-screen m-0 overflow-hidden ${isDark ? 'dark' : ''}`;
  
  const appContainer = document.getElementById('app-container');
  appContainer.className = `w-full max-w-[400px] h-full max-h-[850px] relative rounded-[40px] shadow-2xl border-8 overflow-hidden flex flex-col font-sans transition-colors duration-300 ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-appbg border-gray-800'}`;

  const headerContainer = document.getElementById('header-container');
  headerContainer.innerHTML = `
    <div class="flex justify-between items-center p-6 pt-10">
      <div class="relative w-10 h-10 flex items-center justify-center rounded-xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700 text-gray-300' : 'bg-white border-teal-100/50 text-gray-400'}">
        <i data-lucide="bell" class="w-5 h-5"></i>
        <span class="absolute top-2 left-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
      </div>
      
      <div class="flex flex-col items-center">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-goldAccent rounded-lg flex items-center justify-center text-white shadow-xl">
              <i data-lucide="shopping-bag" class="w-4 h-4 fill-current" style="transform: scaleX(-1)"></i>
          </div>
          <span class="font-bold text-xl tracking-wide ${isDark ? 'text-white' : 'text-tealDark'}">سُوق ميسان</span>
        </div>
        <span class="text-[10px] text-goldAccent font-bold tracking-widest uppercase mt-0.5">Souq Maysan</span>
      </div>
      
      <img src="https://i.pravatar.cc/100?img=11" alt="Profile" class="w-10 h-10 rounded-xl border shadow-sm object-cover ${isDark ? 'border-gray-700' : 'border-teal-100/50'}" />
    </div>
  `;

  const scrollContainer = document.getElementById('scroll-container');
  const savedScroll = scrollContainer ? scrollContainer.scrollTop : 0;

  const contentContainer = document.getElementById('content-container');
  contentContainer.innerHTML = renderContent();

  const checkoutContainer = document.getElementById('checkout-container');
  checkoutContainer.innerHTML = renderCheckout();

  const navbarContainer = document.getElementById('navbar-container');
  navbarContainer.innerHTML = `
    <div class="absolute bottom-0 left-0 w-full rounded-t-[35px] shadow-[0_-5px_20px_rgba(0,0,0,0.06)] px-7 py-4 flex justify-between items-center z-50 transition-colors ${isDark ? 'bg-gray-800 border-t border-gray-700' : 'bg-white'}">
      <div 
        class="flex flex-col items-center cursor-pointer transition ${state.activeTab === 'home' ? 'text-tealPrimary' : 'text-gray-400 hover:text-tealPrimary'}" 
        onclick="setActiveTab('home')"
      >
        <i data-lucide="home" class="w-6 h-6 mb-1"></i>
        <span class="text-[10px] font-bold pb-0.5 border-b-[3px] ${state.activeTab === 'home' ? 'border-tealPrimary' : 'border-transparent'}">الرئيسية</span>
      </div>
      <div 
         class="flex flex-col items-center cursor-pointer transition ${state.activeTab === 'categories' ? 'text-tealPrimary' : 'text-gray-400 hover:text-tealPrimary'}"  
        onclick="setActiveTab('categories'); setSelectedCategory(null);"
      >
        <i data-lucide="layout-grid" class="w-6 h-6 mb-1"></i>
        <span class="text-[10px] font-bold pb-0.5 border-b-[3px] ${state.activeTab === 'categories' ? 'border-tealPrimary' : 'border-transparent'}">التصنيفات</span>
      </div>
      <div 
         class="flex flex-col items-center cursor-pointer transition relative ${state.activeTab === 'cart' ? 'text-tealPrimary' : 'text-gray-400 hover:text-tealPrimary'}"  
        onclick="setActiveTab('cart')"
      >
        <i data-lucide="shopping-cart" class="w-6 h-6 mb-1"></i>
        ${getCartTotalItemCount() > 0 ? `<span class="absolute -top-1 -right-2 bg-tealPrimary text-white text-[9px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm">${getCartTotalItemCount()}</span>` : ''}
        <span class="text-[10px] font-bold pb-0.5 border-b-[3px] ${state.activeTab === 'cart' ? 'border-tealPrimary' : 'border-transparent'}">السلة</span>
      </div>
      <div 
         class="flex flex-col items-center cursor-pointer transition ${state.activeTab === 'favorites' ? 'text-tealPrimary' : 'text-gray-400 hover:text-tealPrimary'}"  
        onclick="setActiveTab('favorites')"
      >
        <i data-lucide="heart" class="w-6 h-6 mb-1"></i>
        <span class="text-[10px] font-bold pb-0.5 border-b-[3px] ${state.activeTab === 'favorites' ? 'border-tealPrimary' : 'border-transparent'}">المفضلة</span>
      </div>
      <div 
         class="flex flex-col items-center cursor-pointer transition ${state.activeTab === 'account' ? 'text-tealPrimary' : 'text-gray-400 hover:text-tealPrimary'}" 
        onclick="setActiveTab('account')"
      >
        <i data-lucide="user" class="w-6 h-6 mb-1"></i>
        <span class="text-[10px] font-bold pb-0.5 border-b-[3px] ${state.activeTab === 'account' ? 'border-tealPrimary' : 'border-transparent'}">حسابي</span>
      </div>
    </div>
  `;

  if(scrollContainer) {
    scrollContainer.scrollTop = savedScroll;
  }

  renderBannerDots();
  lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', render);
