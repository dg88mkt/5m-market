/**
 * 1. SECURITY SYSTEM (ANTI-INSPECT)
 * Blocks Right-Click, F12, Ctrl+Shift+I, and Ctrl+U
 */

// Block Right-Click
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Block Keyboard Shortcuts
document.onkeydown = function(e) {
    // F12
    if (e.keyCode == 123) return false;
    // Ctrl+Shift+I (Inspect)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) return false;
    // Ctrl+Shift+C (Element Selector)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) return false;
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) return false;
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) return false;
};

// Console Anti-Tamper: Pauses script execution if Console is opened
setInterval(function() {
    const startTime = performance.now();
    debugger; 
    const endTime = performance.now();
    if (endTime - startTime > 100) {
        window.location.reload(); // Reloads page if they try to debug
    }
}, 1000);

/**
 * 2. ACCOUNT CONFIGURATION & LOGIC
 */
const ACCOUNTS_PER_PAGE = 20;
const TOTAL_ACCOUNTS = 105; 
const gtaImage = "https://imgs.search.brave.com/Nmn9V9e2s-Qj2NtLCIS3XT7GGz01r0tRS1bLzRc17-o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvZ3Rh/LTUtcGljdHVyZXMt/cGFuNmNhcHl0NWsz/Mm0zdi5qcGc";

let currentPage = 1;
let allAccounts = [];

// 3. Generate 105 Accounts Automatically
function generateAccounts() {
    allAccounts = []; // Clear current list
    for (let i = 1; i <= TOTAL_ACCOUNTS; i++) {
        let randomPrice = (Math.random() * (3.00 - 1.00) + 1.00).toFixed(2);
        
        allAccounts.push({
            id: i,
            name: i % 4 === 0 ? `Modded Lv. ${i+50}` : `Fresh Account #${i}`,
            price: randomPrice,
            tag: i % 8 === 0 ? "HOT" : ""
        });
    }
}

// 4. Render Store Items
function renderStore(page) {
    const grid = document.getElementById('product-grid');
    const stockCount = document.getElementById('stock-count');
    
    const start = (page - 1) * ACCOUNTS_PER_PAGE;
    const end = start + ACCOUNTS_PER_PAGE;
    const pageItems = allAccounts.slice(start, end);

    if(stockCount) stockCount.innerText = `${allAccounts.length} accounts verified in stock`;

    if(grid) {
        grid.innerHTML = pageItems.map(acc => `
            <div class="account-card">
                <div class="img-wrapper">
                    <img src="${gtaImage}" alt="GTA Account">
                    ${acc.tag ? `<div class="account-tag">${acc.tag}</div>` : ''}
                </div>
                <div class="card-details">
                    <h3>${acc.name}</h3>
                    <p>Full Email Access • Instant Delivery • 5M Ready</p>
                    <div class="price-row">
                        <span class="price">$${acc.price}</span>
                        <button class="btn-buy" onclick="handlePurchase('${acc.name}', '${acc.price}')">Purchase</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderPagination();
}

// 5. Render Page Numbers
function renderPagination() {
    const container = document.getElementById('pagination');
    if(!container) return;

    const totalPages = Math.ceil(allAccounts.length / ACCOUNTS_PER_PAGE);
    let html = "";

    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    container.innerHTML = html;
}

function goToPage(pageNum) {
    currentPage = pageNum;
    renderStore(currentPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handlePurchase(name, price) {
    alert(`Thank you for choosing 5M Market!\nRedirecting to checkout for ${name}.\nPrice: $${price}`);
}

// 6. Navigation
function showPage(pageId) {
    const home = document.getElementById('home-page');
    const store = document.getElementById('store-page');
    
    if(home) home.classList.add('hidden');
    if(store) store.classList.add('hidden');
    
    const target = document.getElementById(pageId + '-page');
    if(target) target.classList.remove('hidden');
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Boot up
generateAccounts();
document.addEventListener('DOMContentLoaded', () => renderStore(1));
