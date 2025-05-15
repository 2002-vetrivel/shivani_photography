document.addEventListener("DOMContentLoaded", function() {
    // Loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    loadingOverlay.style.transition = 'opacity 0.3s ease';

    const loadingContainer = document.createElement('div');
    loadingContainer.style.textAlign = 'center';

    const loadingGif = document.createElement('img');
    loadingGif.src = 'images/loading.gif';
    loadingGif.alt = 'Loading';
    loadingGif.style.width = '130px';
    loadingGif.style.height = '130px';

    const loadingText = document.createElement('p');
    loadingText.textContent = 'Yes, I Know It’s Slow. My Coding Teacher Was YouTube 🤡';
    loadingText.style.marginTop = '15px';
    loadingText.style.fontSize = '16px';
    loadingText.style.color = '#333';

    loadingContainer.appendChild(loadingGif);
    loadingContainer.appendChild(loadingText);
    loadingOverlay.appendChild(loadingContainer);
    document.body.appendChild(loadingOverlay);

    // Hide loading indicator when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingOverlay.style.opacity = '0';
            setTimeout(function() {
                if (loadingOverlay.parentNode) {
                    document.body.removeChild(loadingOverlay);
                }
            }, 300);
        }, 500);
    });

    const locationBtn = document.getElementById('Location');
    if (locationBtn) {
        locationBtn.addEventListener('click', function() {
            document.getElementById('locationPopup').style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });

        document.querySelector('.close-popup').addEventListener('click', function() {
            document.getElementById('locationPopup').style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        document.getElementById('locationPopup').addEventListener('click', function(e) {
            if (e.target === this) {
                document.getElementById('locationPopup').style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }


    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navContainer = document.getElementById('navigation');
    const icon = mobileMenuButton.querySelector('i');

    mobileMenuButton.addEventListener('click', function() {
        navContainer.classList.toggle('mobile-active');
        icon.classList.toggle('fa-times');
        icon.classList.toggle('fa-bars');
    });
        
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navContainer.classList.remove('mobile-active');
            icon.classList.replace('fa-times', 'fa-bars');
        });
    });
    loadGoogleTranslate();
});
