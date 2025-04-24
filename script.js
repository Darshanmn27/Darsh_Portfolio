document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    const texts = [
        'Full Stack Developer',
        'Problem Solver',
        'Creative Engineer'
    ];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    function type() {
        if (count === texts.length) {
            count = 0;
        }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);

        document.getElementById('typed-text').textContent = letter;
        if (letter.length === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
                setTimeout(type, 500);
            }, 2000);
        } else {
            setTimeout(type, 100);
        }
    }

    // Start typing animation after the heading animation
    setTimeout(type, 1000);

    // Project Card Hover Effect
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    const mainContent = document.querySelector('.main-content');
    
    if (navToggle && sideNav) {
        navToggle.addEventListener('click', () => {
            sideNav.classList.toggle('active');
            if (mainContent) {
                mainContent.classList.toggle('blurred');
            }
        });
    }

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (sideNav && sideNav.classList.contains('active') && 
            !sideNav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            sideNav.classList.remove('active');
            if (mainContent) {
                mainContent.classList.remove('blurred');
            }
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile nav if open
                if (sideNav && sideNav.classList.contains('active')) {
                    sideNav.classList.remove('active');
                    if (mainContent) {
                        mainContent.classList.remove('blurred');
                    }
                }
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation Link
    const allSections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    const handleScroll = debounce(() => {
        let current = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', handleScroll);

    // Form handling and section visibility
    document.addEventListener('DOMContentLoaded', () => {
        // Section visibility function
        function showSection(sectionId) {
            // Hide all sections with fade effect
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                section.style.opacity = '0';
                setTimeout(() => {
                    section.style.display = 'none';
                }, 300);
            });

            // Show selected section with fade effect
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.style.display = 'block';
                    // Force reflow
                    targetSection.offsetHeight;
                    targetSection.style.opacity = '1';
                }, 300);
            }

            // Handle contact section elements
            const contactInfo = document.getElementById('contact-info');
            const footerThankYou = document.getElementById('footer-thank-you');

            if (sectionId === 'contact' && contactInfo && footerThankYou) {
                setTimeout(() => {
                    contactInfo.style.display = 'block';
                    footerThankYou.style.display = 'block';
                    contactInfo.style.opacity = '1';
                    footerThankYou.style.opacity = '1';
                }, 400);
            } else if (contactInfo && footerThankYou) {
                contactInfo.style.opacity = '0';
                footerThankYou.style.opacity = '0';
                setTimeout(() => {
                    contactInfo.style.display = 'none';
                    footerThankYou.style.display = 'none';
                }, 300);
            }
        }

        // Show About Me section by default
        showSection('about-me');

        // Form submission handler
        const form = document.forms['submit-to-google-sheet'];
        const apiURL = 'http://localhost:5000/api/contact'; // Your backend API endpoint
        
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Show loading state
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

                try {
                    // Get form data
                    const formData = new FormData(form);
                    
                    // Create data object
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        message: formData.get('message')
                    };

                    console.log('Sending data:', data); // Debug log

                    // Send data to backend
                    const response = await fetch(apiURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    console.log('Response:', response); // Debug log

                    const result = await response.json();
                    console.log('Result:', result); // Debug log

                    if (!response.ok) {
                        throw new Error(result.message || 'Error sending message');
                    }

                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'success-message';
                    successMsg.innerHTML = `
                        <div class="alert alert-success">
                            <i class="fas fa-check-circle"></i>
                            Message sent successfully! Your message ID is: ${result.id}
                        </div>
                    `;
                    form.insertAdjacentElement('beforebegin', successMsg);

                    // Clear form
                    form.reset();

                    // Remove success message after 5 seconds
                    setTimeout(() => {
                        successMsg.remove();
                    }, 5000);

                } catch (error) {
                    console.error('Error!', error);
                    // Show error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.innerHTML = `
                        <div class="alert alert-danger">
                            <i class="fas fa-exclamation-circle"></i>
                            ${error.message || 'Error sending message. Please try again.'}
                        </div>
                    `;
                    form.insertAdjacentElement('beforebegin', errorMsg);

                    // Remove error message after 5 seconds
                    setTimeout(() => {
                        errorMsg.remove();
                    }, 5000);
                } finally {
                    // Reset submit button
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });

            // Add real-time validation
            form.querySelectorAll('input, textarea').forEach(input => {
                input.addEventListener('input', function() {
                    validateInput(this);
                    updateCharCount(this);
                });

                input.addEventListener('blur', function() {
                    validateInput(this);
                });
            });

            // Helper Functions
            function validateForm() {
                let isValid = true;
                form.querySelectorAll('input, textarea').forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });
                return isValid;
            }

            function validateInput(input) {
                const errorElement = input.nextElementSibling;
                let isValid = true;
                let errorMessage = '';

                // Remove existing error states
                input.classList.remove('error');
                if (errorElement && errorElement.classList.contains('error-message')) {
                    errorElement.textContent = '';
                }

                // Validation rules
                if (!input.value.trim()) {
                    isValid = false;
                    errorMessage = 'This field is required';
                } else {
                    switch (input.name) {
                        case 'name':
                            if (!/^[A-Za-z\s]{2,50}$/.test(input.value)) {
                                isValid = false;
                                errorMessage = 'Please enter a valid name (2-50 characters)';
                            }
                            break;
                        case 'email':
                            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
                                isValid = false;
                                errorMessage = 'Please enter a valid email address';
                            }
                            break;
                        case 'message':
                            if (input.value.length < 10) {
                                isValid = false;
                                errorMessage = 'Message must be at least 10 characters';
                            }
                            break;
                    }
                }

                // Show error if any
                if (!isValid) {
                    input.classList.add('error');
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = errorMessage;
                    }
                }

                return isValid;
            }

            function updateCharCount(input) {
                if (input.name === 'message') {
                    const maxLength = 500;
                    const charCount = input.parentElement.querySelector('.char-count');
                    if (charCount) {
                        charCount.textContent = `${input.value.length}/${maxLength}`;
                    }
                }
            }

            function setLoadingState(isLoading) {
                const btnText = submitBtn.querySelector('.btn-text');
                const spinner = submitBtn.querySelector('.loading-spinner');
                
                submitBtn.disabled = isLoading;
                btnText.style.opacity = isLoading ? '0' : '1';
                spinner.style.display = isLoading ? 'block' : 'none';
            }

            function showMessage(message, type) {
                const messageElement = document.createElement('div');
                messageElement.className = `alert alert-${type}`;
                messageElement.innerHTML = `
                    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
                    <span>${message}</span>
                `;
                
                messageContainer.innerHTML = '';
                messageContainer.appendChild(messageElement);

                // Auto-hide message after 5 seconds
                setTimeout(() => {
                    messageElement.remove();
                }, 5000);
            }

            function resetFormState() {
                form.querySelectorAll('input, textarea').forEach(input => {
                    input.classList.remove('error');
                    const errorElement = input.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('error-message')) {
                        errorElement.textContent = '';
                    }
                });

                const charCount = form.querySelector('.char-count');
                if (charCount) {
                    charCount.textContent = '0/500';
                }
            }
        }
    });

    // Skill Progress Animation - Using unique variable names
    const skillSectionElements = document.querySelectorAll('.skill-category');
    
    const skillObserverOptions = {
        threshold: 0.5
    };

    const skillObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.progress').forEach(progress => {
                    progress.style.width = progress.parentElement.getAttribute('data-progress') + '%';
                });
            }
        });
    }, skillObserverOptions);

    skillSectionElements.forEach(section => {
        skillObserver.observe(section);
    });

    // Navbar Scroll Effect
    const nav = document.querySelector('.main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Initialize Typewriter Effect
    const typewriter = new Typewriter('#typed-text', {
        words: ['Full Stack Developer', 'Software Engineer', 'Problem Solver'],
        loop: true,
        typeSpeed: 100,
        deleteSpeed: 50,
        delay: 2000
    });

    // Lazy Loading Images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Show Notification
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Debounce Function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Typewriter Class
    class Typewriter {
        constructor(element, options) {
            this.element = document.querySelector(element);
            this.words = options.words;
            this.loop = options.loop || false;
            this.typeSpeed = options.typeSpeed || 100;
            this.deleteSpeed = options.deleteSpeed || 50;
            this.delay = options.delay || 2000;
            this.txt = '';
            this.wordIndex = 0;
            this.isDeleting = false;
            this.type();
        }

        type() {
            const current = this.wordIndex % this.words.length;
            const fullTxt = this.words[current];

            if (this.isDeleting) {
                this.txt = fullTxt.substring(0, this.txt.length - 1);
            } else {
                this.txt = fullTxt.substring(0, this.txt.length + 1);
            }

            this.element.innerHTML = `<span class="txt">${this.txt}</span>`;

            let typeSpeed = this.isDeleting ? this.deleteSpeed : this.typeSpeed;

            if (!this.isDeleting && this.txt === fullTxt) {
                typeSpeed = this.delay;
                this.isDeleting = true;
            } else if (this.isDeleting && this.txt === '') {
                this.isDeleting = false;
                this.wordIndex++;
                if (!this.loop && this.wordIndex === this.words.length) {
                    return;
                }
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }
    }

    // Ensure all sections are visible
    allSections.forEach(section => {
        section.style.opacity = '1';
        section.style.visibility = 'visible';
    });
});
