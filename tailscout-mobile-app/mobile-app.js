// TailScout Mobile App JavaScript

// App State
let userLocation = null;
let selectedPetId = null;
let selectedAmount = 50;

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    getUserLocation();
});

// Initialize Application
function initializeApp() {
    // Setup navigation
    setupNavigation();
    
    // Initialize forms
    initializeForms();
    
    // Setup media uploads
    setupMediaUploads();
    
    // Initialize donation system
    initializeDonationSystem();
    
    // Setup alert filters
    setupAlertFilters();
    
    // Initialize location services
    initializeLocationServices();
    
    console.log('TailScout Mobile App initialized successfully');
}

// Navigation System
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // Update active nav item
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Load section-specific content
        loadSectionContent(sectionId);
    }
}

function loadSectionContent(sectionId) {
    switch(sectionId) {
        case 'alerts':
            loadLocalAlerts();
            break;
        case 'spot':
            loadAvailablePets();
            break;
        case 'donate':
            updateDonationStats();
            break;
    }
}

// Event Listeners Setup
function setupEventListeners() {
    // Menu toggle
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Emergency call
    const emergencyCall = document.querySelector('.emergency-call');
    if (emergencyCall) {
        emergencyCall.addEventListener('click', function(e) {
            // Track emergency call
            trackEvent('emergency_call_clicked');
        });
    }
    
    // Modal close
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    // Click outside modal to close
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
}

// Location Services
function initializeLocationServices() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            handleLocationSuccess,
            handleLocationError,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }
        );
    } else {
        handleLocationError({ code: 0, message: 'Geolocation not supported' });
    }
}

function getUserLocation() {
    const locationText = document.getElementById('userLocation');
    
    if (locationText) {
        locationText.textContent = 'Getting your location...';
    }
    
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy
                };
                
                // Reverse geocode to get readable address
                reverseGeocode(userLocation.latitude, userLocation.longitude)
                    .then(address => {
                        if (locationText) {
                            locationText.textContent = address;
                        }
                    })
                    .catch(() => {
                        if (locationText) {
                            locationText.textContent = `${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`;
                        }
                    });
            },
            function(error) {
                console.error('Location error:', error);
                if (locationText) {
                    locationText.textContent = 'Location unavailable';
                }
            }
        );
    }
}

function handleLocationSuccess(position) {
    userLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
    };
    
    console.log('Location obtained:', userLocation);
    updateLocationDisplay();
    loadLocalAlerts();
}

function handleLocationError(error) {
    console.error('Location error:', error);
    const locationText = document.getElementById('userLocation');
    if (locationText) {
        locationText.textContent = 'Location access denied';
    }
}

function updateLocationDisplay() {
    if (!userLocation) return;
    
    reverseGeocode(userLocation.latitude, userLocation.longitude)
        .then(address => {
            const locationText = document.getElementById('userLocation');
            if (locationText) {
                locationText.textContent = address;
            }
        })
        .catch(() => {
            const locationText = document.getElementById('userLocation');
            if (locationText) {
                locationText.textContent = `${userLocation.latitude.toFixed(4)}, ${userLocation.longitude.toFixed(4)}`;
            }
        });
}

// Reverse Geocoding (Mock implementation)
async function reverseGeocode(lat, lng) {
    // In a real app, you'd use a geocoding API like Google Maps or OpenStreetMap
    // This is a mock implementation
    return new Promise((resolve) => {
        setTimeout(() => {
            const mockAddresses = [
                'Manchester City Centre',
                'Edinburgh Old Town',
                'Cardiff Bay',
                'Birmingham Jewellery Quarter',
                'London Borough of Camden'
            ];
            const randomAddress = mockAddresses[Math.floor(Math.random() * mockAddresses.length)];
            resolve(randomAddress);
        }, 1000);
    });
}

// Forms Management
function initializeForms() {
    // Report form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }
    
    // Spot form
    const spotForm = document.getElementById('spotForm');
    if (spotForm) {
        spotForm.addEventListener('submit', handleSpotSubmit);
    }
    
    // Donation form
    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', handleDonationSubmit);
    }
    
    // Pet type change handler
    const petType = document.getElementById('petType');
    if (petType) {
        petType.addEventListener('change', updateBreedOptions);
    }
}

function handleReportSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const reportData = {
        petName: formData.get('petName'),
        petType: formData.get('petType'),
        petBreed: formData.get('petBreed'),
        petAge: formData.get('petAge'),
        petDescription: formData.get('petDescription'),
        lostDate: formData.get('lostDate'),
        lostTime: formData.get('lostTime'),
        lostLocation: formData.get('lostLocation'),
        lastSpotted: formData.get('lastSpotted'),
        ownerName: formData.get('ownerName'),
        ownerPhone: formData.get('ownerPhone'),
        ownerEmail: formData.get('ownerEmail'),
        emergencyCase: formData.get('emergencyCase') === 'on',
        allowAlerts: formData.get('allowAlerts') === 'on',
        location: userLocation,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    showLoadingState(submitBtn, 'Submitting Report...');
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState(submitBtn, '🚨 Submit Missing Pet Report');
        
        // Show success modal
        showModal(
            'Report Submitted Successfully!',
            `Your missing pet report for ${reportData.petName} has been submitted. Our drone teams and community volunteers in your area have been notified. You'll receive updates via phone and email.`
        );
        
        // Reset form
        e.target.reset();
        
        // Clear uploaded files
        clearUploadPreviews();
        
        // Track event
        trackEvent('pet_report_submitted', { petType: reportData.petType });
        
    }, 2000);
}

function handleSpotSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const spottingData = {
        petId: selectedPetId,
        spottingAddress: formData.get('spottingAddress'),
        spottingTime: formData.get('spottingTime'),
        petBehavior: formData.get('petBehavior'),
        petDirection: formData.get('petDirection'),
        spotterName: formData.get('spotterName'),
        spotterPhone: formData.get('spotterPhone'),
        followUp: formData.get('followUp') === 'on',
        location: userLocation,
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('.submit-btn');
    showLoadingState(submitBtn, 'Submitting Spotting...');
    
    // Simulate API call
    setTimeout(() => {
        hideLoadingState(submitBtn, '📍 Submit Pet Spotting Report');
        
        // Show success modal
        showModal(
            'Spotting Reported Successfully!',
            'Thank you for reporting this pet sighting! The pet owner and drone teams have been immediately notified of the exact location. Emergency response is being coordinated.'
        );
        
        // Reset form
        e.target.reset();
        selectedPetId = null;
        
        // Clear uploaded files
        clearUploadPreviews();
        
        // Track event
        trackEvent('pet_spotting_reported');
        
    }, 2000);
}

function handleDonationSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const donationData = {
        amount: selectedAmount,
        donorName: formData.get('donorName'),
        donorEmail: formData.get('donorEmail'),
        monthlyDonation: formData.get('monthlyDonation') === 'on',
        anonymous: formData.get('anonymous') === 'on',
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    const submitBtn = e.target.querySelector('.donate-btn');
    showLoadingState(submitBtn, 'Processing...');
    
    // Simulate payment processing
    setTimeout(() => {
        hideLoadingState(submitBtn, `💝 Contribute £${selectedAmount}`);
        
        // Show success modal
        const message = donationData.monthlyDonation ? 
            `Thank you for your monthly £${selectedAmount} contribution! Your ongoing support helps keep our community drone project operational.` :
            `Thank you for your £${selectedAmount} contribution! Your support helps expand our drone coverage and keeps the community alert system running.`;
        
        showModal('Contribution Successful!', message);
        
        // Reset form
        e.target.reset();
        
        // Track event
        trackEvent('donation_completed', { 
            amount: selectedAmount,
            recurring: donationData.monthlyDonation 
        });
        
    }, 3000);
}

// Media Upload Handling
function setupMediaUploads() {
    // Pet photos upload
    const petPhotos = document.getElementById('petPhotos');
    if (petPhotos) {
        petPhotos.addEventListener('change', function(e) {
            handleFileUpload(e, 'uploadPreview');
        });
    }
    
    // Spotting media upload
    const spottingMedia = document.getElementById('spottingMedia');
    if (spottingMedia) {
        spottingMedia.addEventListener('change', function(e) {
            handleFileUpload(e, 'spottingPreview');
        });
    }
}

function handleFileUpload(event, previewContainerId) {
    const files = Array.from(event.target.files);
    const previewContainer = document.getElementById(previewContainerId);
    
    if (!previewContainer) return;
    
    // Clear existing previews
    previewContainer.innerHTML = '';
    
    files.forEach((file, index) => {
        if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            const previewItem = createMediaPreview(file, index);
            previewContainer.appendChild(previewItem);
        }
    });
}

function createMediaPreview(file, index) {
    const previewItem = document.createElement('div');
    previewItem.className = 'preview-item';
    
    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.alt = `Preview ${index + 1}`;
        previewItem.appendChild(img);
    } else if (file.type.startsWith('video/')) {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(file);
        video.controls = false;
        video.muted = true;
        previewItem.appendChild(video);
        
        // Add video indicator
        const videoIcon = document.createElement('div');
        videoIcon.style.cssText = `
            position: absolute;
            top: 4px;
            left: 4px;
            background: rgba(0,0,0,0.7);
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 10px;
        `;
        videoIcon.textContent = '📹';
        previewItem.appendChild(videoIcon);
    }
    
    // Add remove button
    const removeBtn = document.createElement('button');
    removeBtn.className = 'preview-remove';
    removeBtn.textContent = '×';
    removeBtn.onclick = function() {
        previewItem.remove();
        updateFileInput();
    };
    previewItem.appendChild(removeBtn);
    
    return previewItem;
}

function clearUploadPreviews() {
    const previews = document.querySelectorAll('.upload-preview');
    previews.forEach(preview => {
        preview.innerHTML = '';
    });
}

// Location Functions
function getCurrentLocation() {
    const locationInput = document.getElementById('lostLocation');
    if (!locationInput) return;
    
    if (!userLocation) {
        alert('Location not available. Please enable location services.');
        return;
    }
    
    // Show loading state
    locationInput.value = 'Getting current location...';
    locationInput.disabled = true;
    
    // Reverse geocode current location
    reverseGeocode(userLocation.latitude, userLocation.longitude)
        .then(address => {
            locationInput.value = address;
            locationInput.disabled = false;
        })
        .catch(() => {
            locationInput.value = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
            locationInput.disabled = false;
        });
}

function getSpottingLocation() {
    const addressInput = document.getElementById('spottingAddress');
    const gpsDiv = document.getElementById('gpsCoordinates');
    const coordinatesSpan = document.getElementById('coordinates');
    
    if (!addressInput || !userLocation) return;
    
    // Show loading state
    addressInput.value = 'Getting current location...';
    addressInput.disabled = true;
    
    // Get current location
    reverseGeocode(userLocation.latitude, userLocation.longitude)
        .then(address => {
            addressInput.value = address;
            addressInput.disabled = false;
            
            // Show GPS coordinates
            if (gpsDiv && coordinatesSpan) {
                coordinatesSpan.textContent = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
                gpsDiv.style.display = 'block';
            }
        })
        .catch(() => {
            addressInput.value = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
            addressInput.disabled = false;
            
            if (gpsDiv && coordinatesSpan) {
                coordinatesSpan.textContent = `${userLocation.latitude.toFixed(6)}, ${userLocation.longitude.toFixed(6)}`;
                gpsDiv.style.display = 'block';
            }
        });
}

// Alert System
function setupAlertFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter alerts
            const filter = this.getAttribute('data-filter');
            filterAlerts(filter);
        });
    });
}

function filterAlerts(filter) {
    const alertCards = document.querySelectorAll('.alert-card');
    
    alertCards.forEach(card => {
        const cardType = card.getAttribute('data-type');
        const isEmergency = card.classList.contains('emergency');
        
        let show = false;
        
        switch(filter) {
            case 'all':
                show = true;
                break;
            case 'emergency':
                show = isEmergency;
                break;
            case 'dogs':
                show = cardType === 'dogs';
                break;
            case 'cats':
                show = cardType === 'cats';
                break;
        }
        
        card.style.display = show ? 'block' : 'none';
    });
}

function loadLocalAlerts() {
    // In a real app, this would fetch alerts from the server based on user location
    // For now, we'll just ensure the existing alerts are visible
    console.log('Loading local alerts for location:', userLocation);
    
    // Mock: Show all alerts by default
    filterAlerts('all');
}

// Pet Selection for Spotting
function loadAvailablePets() {
    const petSelector = document.getElementById('petSelector');
    if (!petSelector) return;
    
    // Setup pet option selection
    const petOptions = petSelector.querySelectorAll('.pet-option');
    
    petOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove previous selection
            petOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selection to clicked option
            this.classList.add('selected');
            
            // Store selected pet ID
            selectedPetId = this.getAttribute('data-pet');
        });
    });
}

// Donation System
function initializeDonationSystem() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmount = document.getElementById('customAmount');
    const donateBtn = document.querySelector('.donate-btn');
    
    // Amount button selection
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update selected amount
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            
            // Clear custom amount
            if (customAmount) {
                customAmount.value = '';
            }
            
            // Update donate button text
            updateDonateButtonText();
        });
    });
    
    // Custom amount input
    if (customAmount) {
        customAmount.addEventListener('input', function() {
            const value = parseInt(this.value);
            if (value && value > 0) {
                // Remove active class from amount buttons
                amountBtns.forEach(btn => btn.classList.remove('active'));
                
                // Update selected amount
                selectedAmount = value;
                updateDonateButtonText();
            }
        });
    }
    
    // Initialize button text
    updateDonateButtonText();
}

function updateDonateButtonText() {
    const donateBtn = document.querySelector('.donate-btn');
    if (donateBtn) {
        donateBtn.textContent = `💝 Contribute £${selectedAmount}`;
    }
}

function updateDonationStats() {
    // Mock function to update donation impact stats
    // In a real app, this would fetch current stats from the server
    console.log('Updating donation statistics');
}

// Pet Actions
function reportSpotting(petId) {
    selectedPetId = petId;
    showSection('spot');
    
    // Pre-select the pet in the spotting form
    const petOptions = document.querySelectorAll('.pet-option');
    petOptions.forEach(option => {
        option.classList.remove('selected');
        if (option.getAttribute('data-pet') === petId) {
            option.classList.add('selected');
        }
    });
}

function viewDetails(petId) {
    // Mock function to show pet details
    // In a real app, this would open a detailed view
    showModal(
        'Pet Details',
        'This would show detailed information about the missing pet, including additional photos, behavioral notes, and contact information for the owner.'
    );
}

// UI Helper Functions
function showLoadingState(button, text = 'Loading...') {
    if (!button) return;
    
    button.disabled = true;
    button.classList.add('btn-loading');
    button.setAttribute('data-original-text', button.textContent);
    button.textContent = text;
}

function hideLoadingState(button, originalText = null) {
    if (!button) return;
    
    button.disabled = false;
    button.classList.remove('btn-loading');
    
    const text = originalText || button.getAttribute('data-original-text') || 'Submit';
    button.textContent = text;
    button.removeAttribute('data-original-text');
}

function showModal(title, message) {
    const modal = document.getElementById('successModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modal && modalTitle && modalMessage) {
        modalTitle.textContent = title;
        modalMessage.textContent = message;
        modal.classList.add('show');
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            closeModal();
        }, 5000);
    }
}

function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function toggleMobileMenu() {
    // This could implement a slide-out menu in the future
    console.log('Mobile menu toggle');
}

function updateBreedOptions() {
    const petType = document.getElementById('petType');
    const petBreed = document.getElementById('petBreed');
    
    if (!petType || !petBreed) return;
    
    // Mock breed suggestions based on pet type
    const breedSuggestions = {
        dog: ['Golden Retriever', 'Labrador', 'German Shepherd', 'Border Collie', 'Mixed Breed'],
        cat: ['British Shorthair', 'Persian', 'Siamese', 'Maine Coon', 'Mixed Breed'],
        rabbit: ['Holland Lop', 'Netherland Dwarf', 'Mini Rex', 'Lionhead', 'Mixed Breed'],
        bird: ['Budgie', 'Cockatiel', 'Canary', 'Parrot', 'Other'],
        other: ['Please specify in description']
    };
    
    const selectedType = petType.value;
    if (selectedType && breedSuggestions[selectedType]) {
        petBreed.placeholder = `e.g. ${breedSuggestions[selectedType][0]}`;
    }
}

// Analytics and Tracking
function trackEvent(eventName, data = {}) {
    // Mock analytics tracking
    console.log('Event tracked:', eventName, data);
    
    // In a real app, this would send data to analytics service
    // Example: Google Analytics, Mixpanel, etc.
}

// Service Worker Registration (for PWA functionality)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}

// Push Notification Setup
function setupPushNotifications() {
    if ('Notification' in window && 'serviceWorker' in navigator) {
        Notification.requestPermission().then(function(permission) {
            if (permission === 'granted') {
                console.log('Notification permission granted');
                // In a real app, register for push notifications here
            }
        });
    }
}

// App Installation Prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', function(e) {
    e.preventDefault();
    deferredPrompt = e;
    
    // Show install button or banner
    console.log('App can be installed');
});

function installApp() {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function(choiceResult) {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            deferredPrompt = null;
        });
    }
}

// Offline Detection
window.addEventListener('online', function() {
    console.log('App is online');
    // Sync any pending data
});

window.addEventListener('offline', function() {
    console.log('App is offline');
    // Show offline message
});

// Error Handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    // In a real app, send error reports to monitoring service
});

// Export functions for global access
window.TailScoutApp = {
    showSection,
    reportSpotting,
    viewDetails,
    getCurrentLocation,
    getSpottingLocation,
    closeModal,
    installApp
};