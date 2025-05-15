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
                document.body.removeChild(loadingOverlay);
            }, 300);
        }, 500);
    });

    // Initialize EmailJS
    emailjs.init('LqINu1w9FBXSD97VA');

    // Mobile menu toggle
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

    // Feedback form handling
    const form = document.getElementById('form');
    const submitBtn = document.getElementById('submit');
    const errorMessage = document.getElementById('error-message');
    const ratingValue = document.getElementById('rating-value');
    const ratingInputs = document.querySelectorAll('input[name="rating"]');

    ratingInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.checked) {
                const ratingMap = {
                    '1': 'Very Poor (1/5)',
                    '2': 'Poor (2/5)',
                    '3': 'Neutral (3/5)',
                    '4': 'Good (4/5)',
                    '5': 'Excellent (5/5)'
                };
                ratingValue.textContent = ratingMap[this.value];
            }
        });
    });

    submitBtn.addEventListener('click', function(e) {
        e.preventDefault();
        errorMessage.style.display = 'none';
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderBottom = '1px solid #e74c3c';
                isValid = false;
            } else {
                input.style.borderBottom = '1px solid #ccc';
            }
        });

        const ratingSelected = document.querySelector('input[name="rating"]:checked');
        if (!ratingSelected) {
            errorMessage.textContent = 'Please select a rating';
            errorMessage.style.display = 'block';
            isValid = false;
        }

        const emailInput = document.getElementById('email');
        if (emailInput) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.style.borderBottom = '1px solid #e74c3c';
                errorMessage.textContent = 'Please enter a valid email address';
                errorMessage.style.display = 'block';
                isValid = false;
            }
        }

        if (isValid) {
            const sendingOverlay = document.createElement('div');
            sendingOverlay.id = 'sending-overlay';
            sendingOverlay.style.position = 'fixed';
            sendingOverlay.style.top = '0';
            sendingOverlay.style.left = '0';
            sendingOverlay.style.width = '100%';
            sendingOverlay.style.height = '100%';
            sendingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            sendingOverlay.style.display = 'flex';
            sendingOverlay.style.justifyContent = 'center';
            sendingOverlay.style.alignItems = 'center';
            sendingOverlay.style.zIndex = '9999';
            
            const sendingContainer = document.createElement('div');
            sendingContainer.style.textAlign = 'center';
            
            const sendingGif = document.createElement('img');
            sendingGif.src = 'images/sending.gif';
            sendingGif.alt = 'Sending...';
            sendingGif.style.width = '130px';
            sendingGif.style.borderRadius = '50px';
            sendingGif.style.height = '130px';
            
            const sendingText = document.createElement('p');
            sendingText.textContent = 'Sending your message...';
            sendingText.style.marginTop = '15px';
            sendingText.style.fontSize = '16px';
            sendingText.style.color = '#333';
            
            sendingContainer.appendChild(sendingGif);
            sendingContainer.appendChild(sendingText);
            sendingOverlay.appendChild(sendingContainer);
            document.body.appendChild(sendingOverlay);
            
            submitBtn.disabled = true;
            
            emailjs.send('service_ybtzz94', 'template_fmptq3f', {
                name: document.getElementById('name').value.trim(),
                occasion: document.getElementById('occassion').value.trim(),
                rating: document.querySelector('input[name="rating"]:checked').value,
                email: document.getElementById('email').value.trim(),
                message: document.getElementById('message').value.trim()
            }).then(() => {
                document.body.removeChild(sendingOverlay);
                
                // Clear form fields
                document.getElementById('name').value = '';
                document.getElementById('occassion').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';
                
                // Uncheck any selected rating
                const checkedRating = document.querySelector('input[name="rating"]:checked');
                if (checkedRating) {
                    checkedRating.checked = false;
                }
                ratingValue.textContent = 'Not rated yet';
                
                console.log('Thank you! Your feedback has been submitted successfully.');
                submitBtn.disabled = false;
            }, (error) => {
                document.body.removeChild(sendingOverlay);
                
                alert('Oops! Failed to submit feedback. Please try again later.');
                console.error('EmailJS Error:', error);
                submitBtn.disabled = false;
            });
        }
    });

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', function() {
            this.style.borderBottom = '1px solid #ccc';
            errorMessage.style.display = 'none';
        });
    });

    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const gallery = document.getElementById(targetId);
            
            // Toggle the gallery display
            if (gallery.style.display === 'none' || gallery.style.display === '') {
                gallery.style.display = 'block';
                this.textContent = 'Hide Images';
            } else {
                gallery.style.display = 'none';
                this.textContent = 'View Images';
            }
        });
    });

    // Location popup handling
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

    // Load Google Translate after DOM is loaded
    loadGoogleTranslate();
});
