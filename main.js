document.addEventListener('DOMContentLoaded', function() {
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
    loadingGif.src = '/images/loading.gif';
    loadingGif.alt = 'Loading';
    loadingGif.style.width = '160px';
    loadingGif.style.height = '160px';
    
    const loadingText = document.createElement('p');
    loadingText.textContent = 'You scroll memes for hours but can’t wait 5 secs? Chill';
    loadingText.style.marginTop = '15px';
    loadingText.style.fontSize = '16px';
    loadingText.style.color = '#333';
    
    loadingContainer.appendChild(loadingGif);
    loadingContainer.appendChild(loadingText);
    loadingOverlay.appendChild(loadingContainer);
    document.body.appendChild(loadingOverlay);
    
    window.addEventListener('load', function() {
        setTimeout(function() {
            loadingOverlay.style.opacity = '0';
            setTimeout(function() {
                document.body.removeChild(loadingOverlay);
            }, 300);
        }, 500);
    });

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const navContainer = document.getElementById('navigation');
    const navLinksContainers = document.querySelectorAll('.nav-links');
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

    document.getElementById('Location').addEventListener('click', function() {
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

    const database = firebase.database();
    const contactForm = document.getElementById("submit");
    const nameInput = document.getElementById("name");
    const numberInput = document.getElementById("number");
    const messageInput = document.getElementById("message");

    const nameError = document.createElement('div');
    nameError.className = 'error-message';
    nameInput.parentNode.insertBefore(nameError, nameInput.nextSibling);

    const numberError = document.createElement('div');
    numberError.className = 'error-message';
    numberInput.parentNode.insertBefore(numberError, numberInput.nextSibling);

    const messageError = document.createElement('div');
    messageError.className = 'error-message';
    messageInput.parentNode.insertBefore(messageError, messageInput.nextSibling);

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            nameError.style.display = 'block';
            return false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            nameError.style.display = 'block';
            return false;
        } else {
            nameError.style.display = 'none';
            return true;
        }
    }

    function validateNumber() {
        const phoneRegex = /^[0-9]{10,15}$/;
        if (numberInput.value.trim() === '') {
            numberError.textContent = 'Phone number is required';
            numberError.style.display = 'block';
            return false;
        } else if (!phoneRegex.test(numberInput.value.trim())) {
            numberError.textContent = 'Please enter a valid phone number';
            numberError.style.display = 'block';
            return false;
        } else {
            numberError.style.display = 'none';
            return true;
        }
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            messageError.style.display = 'block';
            return false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            messageError.style.display = 'block';
            return false;
        } else {
            messageError.style.display = 'none';
            return true;
        }
    }

    nameInput.addEventListener('input', validateName);
    numberInput.addEventListener('input', validateNumber);
    messageInput.addEventListener('input', validateMessage);

    contactForm.addEventListener("click", function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isNumberValid = validateNumber();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isNumberValid && isMessageValid) {
            // Show sending overlay
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
            sendingGif.src = '/images/sending.gif';
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
            
            const name = nameInput.value.trim();
            const number = numberInput.value.trim();
            const message = messageInput.value.trim();

            database.ref("contacts").push({
                name: name,
                number: number,
                message: message,
                timestamp: firebase.database.ServerValue.TIMESTAMP
            }).then(() => {
                document.body.removeChild(sendingOverlay);
                
                nameInput.value = "";
                numberInput.value = "";
                messageInput.value = "";
                
                showSuccessPopup();
            }).catch((error) => {
                document.body.removeChild(sendingOverlay);
                
                console.error("Error: " + error.message);
                alert("There was an error sending your message. Please try again.");
            });
        }
    });

    function showSuccessPopup() {
        const popup = document.getElementById("successPopup");
        popup.style.display = "flex";
        setTimeout(() => {
            popup.style.opacity = "1";
        }, 10);
        
        document.body.style.overflow = 'hidden';
    }

    document.getElementById("popupClose").addEventListener("click", function() {
        closeSuccessPopup();
    });

    document.getElementById("successPopup").addEventListener("click", function(e) {
        if (e.target === this) {
            closeSuccessPopup();
        }
    });

    function closeSuccessPopup() {
        const popup = document.getElementById("successPopup");
        popup.style.opacity = "0";
        setTimeout(() => {
            popup.style.display = "none";
            document.body.style.overflow = 'auto';
        }, 300);
    }
    const bookBtn = document.querySelector('#book button');
    const bookingPopup = document.getElementById('bookingPopup');
    const bookingClose = document.getElementById('bookingClose');
    const bookingForm = document.getElementById('bookingForm');
    const bookingOccasion = document.getElementById('bookingOccasion');
    const otherOccasionGroup = document.getElementById('otherOccasionGroup');
    
    // Show booking popup
    if(bookBtn) {
        bookBtn.addEventListener('click', function(e) {
            e.preventDefault();
            bookingPopup.style.display = 'flex';
        });
    }
    
    // Close booking popup
    bookingClose.addEventListener('click', function() {
        bookingPopup.style.display = 'none';
    });
    
    // Show/hide other occasion field
    bookingOccasion.addEventListener('change', function() {
        if(this.value === 'Other') {
            otherOccasionGroup.style.display = 'block';
            document.getElementById('otherOccasion').required = true;
        } else {
            otherOccasionGroup.style.display = 'none';
            document.getElementById('otherOccasion').required = false;
        }
    });
    
    // Form submission
    if(bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('bookingName').value;
            const email = document.getElementById('bookingEmail').value;
            const phone = document.getElementById('bookingPhone').value;
            const occasion = document.getElementById('bookingOccasion').value;
            const otherOccasion = document.getElementById('otherOccasion').value;
            const date = document.getElementById('bookingDate').value;
            const message = document.getElementById('bookingMessage').value;
            
            // Determine final occasion
            const finalOccasion = occasion === 'Other' ? otherOccasion : occasion;
            
            // Here you would typically send this data to your server or Firebase
            console.log('Booking Details:', {
                name,
                email,
                phone,
                occasion: finalOccasion,
                date,
                message
            });
            
            // For demo purposes, we'll just show a success message
            bookingPopup.style.display = 'none';
            
            // Show success popup (you can reuse your existing one or create a new one)
            const successPopup = document.getElementById('successPopup');
            if(successPopup) {
                successPopup.style.display = 'flex';
                
                // Close success popup after 3 seconds
                setTimeout(function() {
                    successPopup.style.display = 'none';
                }, 3000);
            }
            
            // Reset form
            bookingForm.reset();
            otherOccasionGroup.style.display = 'none';
        });
    }
    
    // Close popup when clicking outside
    window.addEventListener('click', function(e) {
        if(e.target === bookingPopup) {
            bookingPopup.style.display = 'none';
        }
    });

});
