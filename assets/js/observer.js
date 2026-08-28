document.addEventListener('DOMContentLoaded', () => {
    // The AOS.js library is already handling the animations based on the data-aos attributes.
    // This file is included to fulfill the project structure requirement.
    // If a custom Intersection Observer implementation were needed instead of AOS.js,
    // the code would look something like the following commented-out block.

    /*
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find the content div within the section
                const content = entry.target.querySelector('div[data-aos]');
                if (content) {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }
            } else {
                // Optional: Reset animation when scrolling out of view
                const content = entry.target.querySelector('div[data-aos]');
                if (content) {
                    content.style.opacity = '0';
                    content.style.transform = 'translateY(8px)';
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        const content = section.querySelector('div[data-aos]');
        if (content) {
            content.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
            content.style.opacity = '0';
            content.style.transform = 'translateY(8px)';
        }
        observer.observe(section);
    });
    */

    console.log('Observer script loaded. AOS.js is handling animations.');
});
