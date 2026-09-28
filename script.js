const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const scrollTop = document.getElementById('scrollTop');

hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
});

mobileNavClose.addEventListener('click', closeMobileNav);

mobileNav.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
});

function closeMobileNav() {
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
}

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle('scrolled', scrolled);
    scrollTop.classList.toggle('show', window.scrollY > 500);
});

scrollTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');

    btn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        faqItems.forEach(other => {
            other.classList.remove('open');
            other.querySelector('.faq-a').style.maxHeight = '0px';
            other.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
        });

        if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
        }
    });
});

function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    });
}

function initReveal() {
    const targets = document.querySelectorAll(
        '.point, .product-card, .herb-card, .process-step, .value-item, .faq-item, .about-frame'
    );

    targets.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, i) => {
            if (!entry.isIntersecting) return;
            setTimeout(() => entry.target.classList.add('in'), i * 70);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => observer.observe(el));
}

const enquiryForm = document.getElementById('enquiryForm');
const formSuccess = document.getElementById('formSuccess');

enquiryForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn = this.querySelector('button[type="submit"]');
    btn.textContent = 'Sending';
    btn.disabled = true;

    setTimeout(() => {
        this.reset();
        btn.textContent = 'Send Enquiry';
        btn.disabled = false;
        formSuccess.style.display = 'block';
        setTimeout(() => {
            formSuccess.style.display = 'none';
        }, 6000);
    }, 900);
});

document.addEventListener('DOMContentLoaded', () => {
    initReveal();
    animateCounters();
});
