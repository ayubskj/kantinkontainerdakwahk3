
/* =========================================================
   KANTIN KONTAINER FAKDA - Vanilla JS
   Semua data lokal. Tidak membutuhkan backend/framework.
   ========================================================= */

const CONFIG = {
  nomorWAKantin: "6285641286778",
  lokasiKantin: "Kantin Kontainer FAKDA, Dekat Lapangan Voli, Depan FAKDA",
  googleMapsUrl: "https://maps.app.goo.gl/aJ2f7ZVZSTY5m1yw5",
  jamBuka: 8,
  jamTutup: 17,
  storageCart: "fakda_cart_v2",
  storageTheme: "fakda_theme_v1"
};

const menuData = [
  {id:1,nama:"Tusuk Jajanan (Sosis & Bakso)",harga:5000,kategori:"Cemilan",gambar:"Bakso.jpg",deskripsi:"Sosis dan bakso tusuk untuk camilan gurih",popular:true,tersedia:true},
  {id:2,nama:"Chiki (Pilus Garuda, Mix)",harga:500,kategori:"Cemilan",gambar:"Pilus.jpg",deskripsi:"Cemilan ringan untuk teman ngobrol dan belajar.",popular:true,tersedia:true},
  {id:3,nama:"Roti Home Made",harga:5000,kategori:"Makanan",gambar:"Roti.jpg",deskripsi:"Roti homemade lembut dan praktis untuk sarapan.",popular:true,tersedia:true},
  {id:4,nama:"Beng-beng, Kalpa",harga:2500,kategori:"Cemilan",gambar:"https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=700&auto=format&fit=crop&q=80",deskripsi:"Cokelat dan wafer manis untuk camilan santai.",popular:false,tersedia:true},
  {id:5,nama:"Popmie",harga:8000,kategori:"Makanan",gambar:"Pop.jpg",deskripsi:"Mie Instant cepat saji dengan kemasan yang menarik",popular:false,tersedia:true},
  {id:6,nama:"Mie Instant (Goreng/Kuah)",harga:7000,kategori:"Makanan",gambar:"Indomie.jpg",deskripsi:"Mie Instant cepat saji dengan porsi yang mengenyangkan.",popular:false,tersedia:true},
  {id:7,nama:"Geprek",harga:12000,kategori:"Makanan",gambar:"Geprek.jpg",deskripsi:"Makanan Ayam geprek dengan aneka sambal",popular:false,tersedia:true},
  {id:8,nama:"Dubai Chewy Cookie",harga:18000,kategori:"Cemilan",gambar:"Dubaicho.jpg",deskripsi:"Cookie berisi Dubai dengan tekstur yang chewy.",popular:false,tersedia:true},
  {id:9,nama:"Gorengan",harga:1000,kategori:"Cemilan",gambar:"Gorengan.jpg",deskripsi:"Aneka gorengan seperti tahu,bakwan dll.",popular:false,tersedia:true},
  {id:10,nama:"Es Rujak Serut",harga:2000,kategori:"Cemilan",gambar:"rujak.jpg",deskripsi:"Es Rujak Serut dengan rasa yang menyegarkan.",popular:false,tersedia:true},
  {id:11,nama:"Sosis Sonice",harga:1000,kategori:"Cemilan",gambar:"sonice.jpg",deskripsi:"Sosis Sapi dan Ayam cocok untuk teman cemilan mu.",popular:false,tersedia:true},
  {id:12,nama:"Keripik Usus",harga:2000,kategori:"Cemilan",gambar:"usus.jpg",deskripsi:"Keripik usus goreng dengan aneka rasa.",popular:false,tersedia:true},
  {id:13,nama:"Brownis",harga:2000,kategori:"Cemilan",gambar:"brow.jpg",deskripsi:"Roti lembut manis dengan berbagai rasa.",popular:false,tersedia:true},
  {id:14,nama:"Mie Lidi",harga:1000,kategori:"Cemilan",gambar:"lidi.jpg",deskripsi:"Mie tapi Berbentuk panjang-panjang mirip lidi.",popular:false,tersedia:true},
  {id:15,nama:"Basreng Pouch",harga:5000,kategori:"Cemilan",gambar:"Basreng.jpg",deskripsi:"Cemilan Basreng dengan bungkus yang mudah dibawa kemana-mana.",popular:false,tersedia:true},
  {id:16,nama:"Kopi Good Day ALL Varian",harga:5000,kategori:"Minuman",gambar:"Gud.jpg",deskripsi:"Aneka rasa kopi yang bikin harimu jadi Good Vibes.",popular:false,tersedia:true},
  {id:17,nama:"Nutrisari All Varian",harga:5000,kategori:"Minuman",gambar:"Nutrisari.jpg",deskripsi:"Minuman dengan aneka rasa buah yang menyegarkan.",popular:false,tersedia:true},
  {id:18,nama:"Chocolatos All Varian",harga:5000,kategori:"Minuman",gambar:"DrinkCho.jpg",deskripsi:"Chocolatos tapi diminum.",popular:false,tersedia:true},
  {id:19,nama:"Drink Beng-beng",harga:5000,kategori:"Minuman",gambar:"Drinkbeng.jpg",deskripsi:"Beng-Beng tapi diminum",popular:false,tersedia:true},
  {id:20,nama:"Max tea Teh Tarik",harga:5000,kategori:"Minuman",gambar:"Maxtarik.jpg",deskripsi:"Teh tarik khas Malaka.",popular:false,tersedia:true},
  {id:21,nama:"Susu All Varian",harga:5000,kategori:"Minuman",gambar:"Susu.jpg",deskripsi:"Susu sachet dengan susu sapi murni",popular:false,tersedia:true}
];

let keranjang = [];
let kategoriAktif = "Semua";
let metodeTerpilih = "";
let pesananTerakhir = null;

const $ = id => document.getElementById(id);
const formatRupiah = angka => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",minimumFractionDigits:0}).format(angka);

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
}

/* ---------- Status operasional ---------- */
function cekStatusBuka() {
  const sekarang = new Date();
  const jam = sekarang.getHours() + sekarang.getMinutes() / 60;
  return jam >= CONFIG.jamBuka && jam < CONFIG.jamTutup;
}

function updateStatusOperasional() {
  const buka = cekStatusBuka();
  const status = buka ? "Buka Sekarang" : "Tutup Sekarang";
  $("heroStatus").textContent = status;
  $("heroOpenLabel").textContent = buka ? "● Buka sekarang" : "● Tutup sekarang";
  $("heroOpenLabel").style.color = buka ? "var(--success)" : "var(--danger)";
  $("locationStatus").textContent = status;
  $("locationStatus").style.color = buka ? "var(--success)" : "var(--danger)";
}

/* ---------- Tema ---------- */
function applyTheme(theme) {
  document.body.classList.toggle("light", theme === "light");
  const icon = theme === "light" ? "🌙" : "☀️";
  $("themeToggle").textContent = icon;
  $("themeToggleMobile").textContent = icon;
  localStorage.setItem(CONFIG.storageTheme, theme);
}
function toggleTheme() {
  applyTheme(document.body.classList.contains("light") ? "dark" : "light");
}
function loadTheme() {
  applyTheme(localStorage.getItem(CONFIG.storageTheme) || "dark");
}

/* ---------- Sidebar / UI ---------- */
function openSidebar() { $("sidebar").classList.add("open"); showOverlay(); }
function closeSidebar() { $("sidebar").classList.remove("open"); maybeHideOverlay(); }
function showOverlay() { $("overlay").style.display = "block"; }
function maybeHideOverlay() {
  if (!$("sidebar").classList.contains("open") && !$("cartSection").classList.contains("open")) $("overlay").style.display = "none";
}
function openCart() {
  if (window.innerWidth <= 900) { $("cartSection").classList.add("open"); showOverlay(); }
  else $("cartSection").scrollIntoView({behavior:"smooth",block:"nearest"});
}
function closeCart() { $("cartSection").classList.remove("open"); maybeHideOverlay(); }
function closeAllUI() { closeSidebar(); closeCart(); }

/* ---------- Kategori & pencarian ---------- */
function setKategori(kategori) {
  kategoriAktif = kategori;
  document.querySelectorAll(".category-chip,.side-category").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.kategori === kategori);
  });
  filterMenu();
}
function filterMenu() {
  const kata = $("searchInput").value.trim().toLowerCase();
  const data = menuData.filter(item =>
    (kategoriAktif === "Semua" || item.kategori === kategoriAktif) &&
    `${item.nama} ${item.deskripsi} ${item.kategori}`.toLowerCase().includes(kata)
  );
  renderMenu(data);
  $("menuTitle").textContent = kategoriAktif === "Semua" ? "Semua Menu" : kategoriAktif;
  $("resultCount").textContent = `${data.length} menu`;
}
function renderCategoryCounts() {
  $("countSemua").textContent = menuData.length;
  ["Makanan","Minuman","Cemilan"].forEach(k => $(`count${k}`).textContent = menuData.filter(x => x.kategori === k).length);
}
function renderMenu(data) {
  const container = $("menuContainer");
  container.innerHTML = "";
  $("emptyState").hidden = data.length !== 0;
  if (!data.length) return;
  data.forEach(item => {
    const qty = keranjang.find(k => k.id === item.id)?.qty || 0;
    const action = qty
      ? `<div class="qty-control"><button type="button" aria-label="Kurangi ${escapeHTML(item.nama)}" onclick="ubahQty(${item.id},-1)">−</button><strong>${qty}</strong><button type="button" aria-label="Tambah ${escapeHTML(item.nama)}" onclick="ubahQty(${item.id},1)">+</button></div>`
      : `<button class="add-btn" type="button" onclick="tambahItem(${item.id})">+ Tambah</button>`;
    container.insertAdjacentHTML("beforeend", `
      <article class="menu-card reveal visible">
        <div class="menu-image-wrap">
          <img src="${escapeHTML(item.gambar)}" class="menu-img" alt="${escapeHTML(item.nama)}" loading="lazy">
          ${item.popular ? '<span class="popular-badge">🔥 TERLARIS</span>' : ''}
          <span class="stock-badge ${item.tersedia ? '' : 'off'}">${item.tersedia ? '● Tersedia' : '● Habis'}</span>
        </div>
        <div class="menu-content">
          <span class="category-badge">${escapeHTML(item.kategori)}</span>
          <h3 class="menu-name">${escapeHTML(item.nama)}</h3>
          <p class="menu-desc">${escapeHTML(item.deskripsi)}</p>
          <div class="menu-bottom"><strong class="menu-price">${formatRupiah(item.harga)}</strong>${item.tersedia ? action : '<span class="menu-price" style="color:var(--danger)">Habis</span>'}</div>
        </div>
      </article>
    `);
  });
}

function renderPopular() {
  $("popularContainer").innerHTML = menuData.filter(x => x.popular).map(item => `
    <div class="popular-card">
      <img src="${escapeHTML(item.gambar)}" alt="${escapeHTML(item.nama)}" loading="lazy">
      <div><strong>${escapeHTML(item.nama)}</strong><small>${formatRupiah(item.harga)}</small></div>
      <button type="button" aria-label="Tambah ${escapeHTML(item.nama)}" onclick="tambahItem(${item.id})">+</button>
    </div>
  `).join("");
}

/* ---------- Keranjang ---------- */
function hitungTotal() { return keranjang.reduce((sum,item) => sum + item.harga * item.qty,0); }
function hitungTotalItem() { return keranjang.reduce((sum,item) => sum + item.qty,0); }

function saveCart() {
  localStorage.setItem(CONFIG.storageCart, JSON.stringify(keranjang.map(({id,qty}) => ({id,qty}))));
}
function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG.storageCart) || "[]");
    keranjang = saved.map(savedItem => {
      const item = menuData.find(m => m.id === Number(savedItem.id));
      return item ? {...item,qty:Math.max(1,Number(savedItem.qty)||1)} : null;
    }).filter(Boolean);
  } catch { keranjang = []; }
}
function tambahItem(id) {
  const item = menuData.find(m => m.id === id);
  if (!item || !item.tersedia) return showToast("Menu sedang tidak tersedia","danger");
  const found = keranjang.find(k => k.id === id);
  if (found) found.qty++;
  else keranjang.push({...item,qty:1});
  saveCart(); updateKeranjangUI(); renderMenu(currentFilteredData());
  showToast(`✓ ${item.nama} ditambahkan ke keranjang`,"success");
  animateCartBadge();
}
function ubahQty(id,jumlah) {
  const item = keranjang.find(k => k.id === id);
  if (!item) return;
  item.qty += jumlah;
  if (item.qty <= 0) { hapusItem(id,false); return; }
  saveCart(); updateKeranjangUI(); renderMenu(currentFilteredData());
}
function hapusItem(id,notify=true) {
  const item = keranjang.find(k => k.id === id);
  keranjang = keranjang.filter(k => k.id !== id);
  saveCart(); updateKeranjangUI(); renderMenu(currentFilteredData());
  if (notify && item) showToast("Item dihapus dari keranjang");
}
function currentFilteredData() {
  const kata = $("searchInput").value.trim().toLowerCase();
  return menuData.filter(item => (kategoriAktif==="Semua" || item.kategori===kategoriAktif) && `${item.nama} ${item.deskripsi} ${item.kategori}`.toLowerCase().includes(kata));
}
function updateKeranjangUI() {
  const totalItem = hitungTotalItem(), total = hitungTotal();
  $("floatingCartCount").textContent = totalItem;
  $("navCartCount").textContent = totalItem;
  $("floatingCartTotal").textContent = formatRupiah(total);
  $("cartItemCount").textContent = `${totalItem} item`;
  $("totalPrice").textContent = formatRupiah(total);
  $("cartItems").innerHTML = "";
  $("cartEmpty").style.display = keranjang.length ? "none" : "block";
  $("cartSummary").style.display = keranjang.length ? "block" : "none";
  if (!keranjang.length) return;
  keranjang.forEach(item => {
    $("cartItems").insertAdjacentHTML("beforeend",`
      <div class="cart-item">
        <div><div class="cart-item-name">${escapeHTML(item.nama)}</div><div class="cart-item-sub">${formatRupiah(item.harga)} × ${item.qty}</div></div>
        <strong class="cart-item-price">${formatRupiah(item.harga*item.qty)}</strong>
        <div class="cart-controls"><button class="qty-btn" type="button" onclick="ubahQty(${item.id},-1)">−</button><span>${item.qty}</span><button class="qty-btn" type="button" onclick="ubahQty(${item.id},1)">+</button></div>
        <button class="del-btn" type="button" onclick="hapusItem(${item.id})" aria-label="Hapus ${escapeHTML(item.nama)}">Hapus</button>
      </div>
    `);
  });
}
function animateCartBadge() {
  [$("floatingCartBtn"),$("navCartBtn")].forEach(el => { el.animate([{transform:"scale(1)"},{transform:"scale(1.08)"},{transform:"scale(1)"}],{duration:350}); });
}

/* ---------- Checkout ---------- */
const checkoutPanels = ["checkoutSummarySection","methodSection","cashSection","qrisSection","confirmSection","receiptSection"];
function showCheckoutPanel(id) {
  checkoutPanels.forEach(panel => $(panel).hidden = panel !== id);
  const step = id==="checkoutSummarySection" ? 1 : ["methodSection","cashSection","qrisSection"].includes(id) ? 2 : id==="confirmSection" ? 3 : 4;
  document.querySelectorAll(".step").forEach((el,i) => el.classList.toggle("active",i+1===step));
  document.querySelectorAll(".step").forEach((el,i) => el.classList.toggle("done",i+1<step));
}
function openCheckout() {
  if (!keranjang.length) return showToast("Keranjang masih kosong","danger");
  closeCart();
  metodeTerpilih = "";
  pesananTerakhir = null;
  renderCheckoutSummary();
  $("paymentModal").hidden = false;
  document.body.style.overflow = "hidden";
  showCheckoutPanel("checkoutSummarySection");
}
function closeCheckout() {
  $("paymentModal").hidden = true;
  document.body.style.overflow = "";
}
function renderCheckoutSummary() {
  $("checkoutItems").innerHTML = keranjang.map(item => `<div class="checkout-line"><span>${escapeHTML(item.nama)} <small>${item.qty} × ${formatRupiah(item.harga)}</small></span><strong>${formatRupiah(item.qty*item.harga)}</strong></div>`).join("");
  $("modalTotalTagihan").textContent = formatRupiah(hitungTotal());
  $("paymentTotal").textContent = formatRupiah(hitungTotal());
}
function pilihMetode(metode) {
  metodeTerpilih = metode;
  document.querySelectorAll(".payment-card").forEach(card => card.classList.toggle("selected",card.dataset.method===metode));
  $("continuePaymentBtn").disabled = false;
}
function continuePayment() {
  if (!metodeTerpilih) return showToast("Pilih metode pembayaran terlebih dahulu","danger");
  if (metodeTerpilih === "Cash") {
    $("cashTotal").textContent = formatRupiah(hitungTotal());
    showCheckoutPanel("cashSection");
  } else {
    $("qrisTotal").textContent = formatRupiah(hitungTotal());
    showCheckoutPanel("qrisSection");
  }
}
function backToPayment() {
  $("paymentTotal").textContent = formatRupiah(hitungTotal());
  showCheckoutPanel("methodSection");
}
function tampilkanKonfirmasi() {
  $("confirmItems").innerHTML = keranjang.map(item => `<div class="checkout-line"><span>${escapeHTML(item.nama)} <small>${item.qty} × ${formatRupiah(item.harga)}</small></span><strong>${formatRupiah(item.qty*item.harga)}</strong></div>`).join("");
  $("confirmTotal").textContent = formatRupiah(hitungTotal());
  $("confirmMethod").textContent = metodeTerpilih;
  showCheckoutPanel("confirmSection");
}
function prosesCheckout() {
  if (!keranjang.length) return;
  const now = new Date();
  const orderNo = `KF-${String(now.getTime()).slice(-6)}`;
  pesananTerakhir = {nomor:orderNo,tanggal:now,items:keranjang.map(x=>({...x})),total:hitungTotal(),metode:metodeTerpilih};
  generateReceipt();
  showCheckoutPanel("receiptSection");
  showToast("✓ Pesanan berhasil dibuat","success");
}
function generateReceipt() {
  const p = pesananTerakhir;
  const tanggal = p.tanggal.toLocaleString("id-ID",{dateStyle:"medium",timeStyle:"short"});
  $("receiptContent").innerHTML = `
    <div class="receipt-head"><strong>KANTIN FAKDA</strong><br><span>Kantin Kontainer</span><br><small>No. Pesanan: ${escapeHTML(p.nomor)}<br>${escapeHTML(tanggal)}</small></div>
    ${p.items.map(item=>`<div class="receipt-row"><span>${escapeHTML(item.nama)}<br><small>${item.qty} × ${formatRupiah(item.harga)}</small></span><strong>${formatRupiah(item.qty*item.harga)}</strong></div>`).join("")}
    <div class="receipt-row receipt-total"><span>TOTAL</span><strong>${formatRupiah(p.total)}</strong></div>
    <div style="margin-top:10px">Pembayaran: <strong>${escapeHTML(p.metode)}</strong></div>
    <div class="receipt-success">✓ Pesanan berhasil<br><small>Terima kasih telah memesan!</small></div>`;
}
function buildWhatsAppMessage() {
  const p = pesananTerakhir;
  return [
    "Halo Kantin Fakda 👋","",
    "Saya ingin memesan:","",
    ...p.items.map((item,i)=>`${i+1}. ${item.nama} × ${item.qty}\n   ${formatRupiah(item.qty*item.harga)}`),
    "","---",`No. Pesanan: ${p.nomor}`,`Total: ${formatRupiah(p.total)}`,`Pembayaran: ${p.metode}`,"","Mohon disiapkan ya.","Terima kasih."
  ].join("\n");
}
function sendWhatsApp() {
  if (!pesananTerakhir) return;
  const url = `https://wa.me/${CONFIG.nomorWAKantin}?text=${encodeURIComponent(buildWhatsAppMessage())}`;
  window.open(url,"_blank","noopener,noreferrer");
  showToast("Detail pesanan siap dikirim ke WhatsApp","success");
}
function finishCheckout() {
  closeCheckout();
  keranjang = [];
  saveCart(); updateKeranjangUI(); renderMenu(currentFilteredData());
}

/* ---------- Feedback ---------- */
function sendComplaint() {
  const text = encodeURIComponent("Halo Kantin Fakda 👋\nSaya ingin memberikan kritik/saran:\n\n");
  window.open(`https://wa.me/${CONFIG.nomorWAKantin}?text=${text}`,"_blank","noopener,noreferrer");
}

/* ---------- Toast ---------- */
function showToast(message,type="") {
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.textContent = message;
  $("toastContainer").appendChild(el);
  setTimeout(()=>{el.style.opacity="0";el.style.transform="translateY(8px)";setTimeout(()=>el.remove(),250)},2600);
}

/* ---------- Scroll reveal ---------- */
function setupReveal() {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
  }),{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
}

/* ---------- Init ---------- */
function init() {
  loadTheme(); loadCart(); renderCategoryCounts(); renderPopular(); updateStatusOperasional();
  $("mapsLink").href = CONFIG.googleMapsUrl;
  filterMenu(); updateKeranjangUI(); setupReveal();

  $("hamburgerBtn").addEventListener("click",openSidebar);
  $("closeSidebar").addEventListener("click",closeSidebar);
  $("overlay").addEventListener("click",closeAllUI);
  $("floatingCartBtn").addEventListener("click",openCart);
  $("navCartBtn").addEventListener("click",openCart);
  $("closeCartBtn").addEventListener("click",closeCart);
  $("themeToggle").addEventListener("click",toggleTheme);
  $("themeToggleMobile").addEventListener("click",toggleTheme);
  $("heroOrderBtn").addEventListener("click",()=>{$("searchInput").focus();$("menu").scrollIntoView({behavior:"smooth"})});
  $("searchInput").addEventListener("input",filterMenu);
  $("resetFilterBtn").addEventListener("click",()=>{$("searchInput").value="";setKategori("Semua")});
  document.querySelectorAll(".category-chip,.side-category").forEach(btn => btn.addEventListener("click",()=>{setKategori(btn.dataset.kategori);if(btn.classList.contains("side-category"))closeSidebar();}));
  $("checkoutBtn").addEventListener("click",openCheckout);
  $("closeModal").addEventListener("click",closeCheckout);
  $("toPaymentBtn").addEventListener("click",()=>showCheckoutPanel("methodSection"));
  $("continuePaymentBtn").addEventListener("click",continuePayment);
  document.querySelectorAll(".payment-card").forEach(card=>card.addEventListener("click",()=>pilihMetode(card.dataset.method)));
  $("cashConfirmBtn").addEventListener("click",tampilkanKonfirmasi);
  $("qrisConfirmBtn").addEventListener("click",tampilkanKonfirmasi);
  $("finalConfirmBtn").addEventListener("click",prosesCheckout);
  $("sendWhatsAppBtn").addEventListener("click",sendWhatsApp);
  $("finishBtn").addEventListener("click",finishCheckout);
  document.querySelectorAll("[data-back='summary']").forEach(b=>b.addEventListener("click",()=>showCheckoutPanel("checkoutSummarySection")));
  document.querySelectorAll("[data-back='payment']").forEach(b=>b.addEventListener("click",backToPayment));
  $("complaintBtn").addEventListener("click",sendComplaint);
  $("complaintSideBtn").addEventListener("click",sendComplaint);

  document.addEventListener("keydown",e=>{
    if ((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k") {e.preventDefault();$("searchInput").focus();}
    if(e.key==="Escape"){closeAllUI();if(!$("paymentModal").hidden)closeCheckout();}
  });
  window.addEventListener("scroll",()=>{
    $("navbar").classList.toggle("scrolled",window.scrollY>20);
    $("backToTop").classList.toggle("show",window.scrollY>450);
  });
  $("backToTop").addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
  window.addEventListener("resize",()=>{if(window.innerWidth>900)closeCart();});
  setInterval(updateStatusOperasional,60000);
}
document.addEventListener("DOMContentLoaded",init);

/* Fungsi global untuk tombol inline pada card */
window.tambahItem=tambahItem;
window.ubahQty=ubahQty;
window.hapusItem=hapusItem;
