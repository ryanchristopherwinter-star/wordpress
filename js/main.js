/* =============================================
   Interest Media - Interactive Elements
   ============================================= */

// ---------- GEOMETRIC NETWORK CANVAS (HERO) ----------
(function() {
    const canvas = document.getElementById('geometricCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];
    let animationId;

    function resize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        initNodes();
    }

    function initNodes() {
        nodes = [];
        const nodeCount = Math.floor((width * height) / 12000);
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const opacity = (1 - dist / 150) * 0.25;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(45, 109, 246, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw nodes
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(45, 109, 246, ${node.opacity})`;
            ctx.fill();

            // Glow effect
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(45, 109, 246, ${node.opacity * 0.1})`;
            ctx.fill();
        }
    }

    function update() {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
        }
    }

    function animate() {
        update();
        draw();
        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
})();

// ---------- GEOMETRIC NETWORK CANVAS (PERFORMANCE SECTION) ----------
(function() {
    const canvas = document.getElementById('performanceCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let nodes = [];

    function resize() {
        width = canvas.parentElement.offsetWidth;
        height = canvas.parentElement.offsetHeight;
        canvas.width = width;
        canvas.height = height;
        initNodes();
    }

    function initNodes() {
        nodes = [];
        const nodeCount = Math.floor((width * height) / 18000);
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.4 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    const opacity = (1 - dist / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.strokeStyle = `rgba(45, 109, 246, ${opacity})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(45, 109, 246, ${node.opacity})`;
            ctx.fill();
        }
    }

    function update() {
        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > width) node.vx *= -1;
            if (node.y < 0 || node.y > height) node.vy *= -1;
        }
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();
})();

// ---------- HEADER SCROLL EFFECT ----------
(function() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = 0;

    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;

        if (scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            header.style.boxShadow = 'none';
        }

        lastScrollY = scrollY;
    });
})();

// ---------- HAMBURGER TOGGLE ----------
(function() {
    const hamburger = document.querySelector('.hamburger');
    const mainNav = document.querySelector('.main-nav');
    if (!hamburger || !mainNav) return;

    hamburger.addEventListener('click', function() {
        mainNav.classList.toggle('nav-open');
        hamburger.classList.toggle('is-active');
    });
})();

// ---------- SMOOTH SCROLL ----------
(function() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
