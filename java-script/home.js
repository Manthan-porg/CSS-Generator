//basic functionality of the page

function basiFunctionality() {
    let sidebar = document.getElementById("sidebar");
    let navMenuBtn = document.getElementById("nav-menuBtn");
    let profileBtn = document.getElementById("profile-btn");
    let profileDropdown = document.getElementById("profileDropdown");


    let toggleTrigger = (e) => {
        e.preventDefault();
        sidebar.classList.toggle("activate");
    }

    let togglePd = (e) => {
        e.preventDefault();
        profileDropdown.classList.toggle("hidden");

    }
    navMenuBtn.addEventListener("click", toggleTrigger);
    profileBtn.addEventListener("click", togglePd);

}

// live numbers 

function liveNumber() {
    const ranges = [
        { id: 'offsetX', unit: 'px' },
        { id: 'offsetY', unit: 'px' },
        { id: 'blur', unit: 'px' },
        { id: 'spread', unit: 'px' },
        { id: 'opacity', unit: '' },
        { id: 'borderWidth', unit: 'px' },
        { id: 'allBorderRadiusWidth', unit: 'px' },
    ];

    ranges.forEach(({ id, unit }) => {
        const input = document.getElementById(id);
        const valueSpan = document.getElementById(`${id}Value`);

        input.addEventListener('input', () => {
            valueSpan.textContent = input.value + unit;
        });
    });

}
// Box Shadow Generator function

function genBoxShadowCode() {
    const boxShadowPreviewBox = document.querySelector('.box-shadow-preview-box');
    const BoxshadowOutput = document.getElementById('BoxshadowOutput');

    function updateBoxShadow() {
        const boxShadowSelectorType = document.getElementById('boxShadowSelectorType').value;
        const boxShadowSelectorName = document.getElementById('boxShadowSelectorName').value.trim();
        const offsetX = document.getElementById('offsetX').value;
        const offsetY = document.getElementById('offsetY').value;
        const blur = document.getElementById('blur').value;
        const spread = document.getElementById('spread').value;
        const opacity = document.getElementById('opacity').value;
        const shadowColor = document.getElementById('shadowColor').value;
        const inset = document.getElementById('inset').checked ? 'inset ' : '';

        function hexToRgba(hex, opacity) {
            const r = parseInt(hex.substr(1, 2), 16);
            const g = parseInt(hex.substr(3, 2), 16);
            const b = parseInt(hex.substr(5, 2), 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }

        const rgbaColor = hexToRgba(shadowColor, opacity);

        const boxShadow = `${inset}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaColor}`;
        boxShadowPreviewBox.style.boxShadow = boxShadow;

        let boxShadowSelector = '';
        if (boxShadowSelectorType === 'id') boxShadowSelector = `#${boxShadowSelectorName}`;
        else if (boxShadowSelectorType === 'class') boxShadowSelector = `.${boxShadowSelectorName}`;
        else boxShadowSelector = boxShadowSelectorName || 'div';

        BoxshadowOutput.textContent = `${boxShadowSelector} {
        box-shadow: ${boxShadow};
      }`;

    }

    document.querySelectorAll('.box-shadow-sec input, .box-shadow-sec select').forEach(element => {
        element.addEventListener('input', updateBoxShadow);

    });

    updateBoxShadow();
}

// Copy function

function copyFunction() {
    const copyButtons = document.querySelectorAll('#copyBtn');
    const borderOutputs = document.getElementById('borderOutput');

    copyButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();

            navigator.clipboard.writeText(borderOutputs.textContent)
                .then(() => {
                    btn.textContent = "Copied";
                    setTimeout(() => {
                        btn.textContent = "Copy";
                    }, 1000);
                })
                .catch(err => {
                    console.error("Failed to copy: ", err);
                });
        });
    });
}

// Border Generator Function
function genBorderCode() {
    const borderPreviewBox = document.querySelector('.border-preview-box');
    const output = document.getElementById('borderOutput');

    function updateBorder() {
        const borderSelectorType = document.getElementById('borderSelectorType').value;
        const borderSelectorName = document.getElementById('borderSelectorName').value.trim();

        const borderWidth = document.getElementById('borderWidth').value;
        const borderStyle = document.getElementById('borderStyleType').value;
        const borderColor = document.getElementById('borderColor').value;

        const borderCSS = `${borderWidth}px ${borderStyle} ${borderColor}`;

        borderPreviewBox.style.border = borderCSS;

        let borderSelector = '';
        if (borderSelectorType === 'id') borderSelector = `#${borderSelectorName}`;
        else if (borderSelectorType === 'class') borderSelector = `.${borderSelectorName}`;
        else borderSelector = borderSelectorName || 'div';

        output.textContent = `${borderSelector} {
    border: ${borderCSS};
}`;
    }

    document.querySelectorAll('.border-sec input, .border-sec select').forEach(el => {
        el.addEventListener('input', updateBorder);
    });

    updateBorder();
}

//Border radius Generator function

function genBorderRadiusCode() {
    const preview = document.querySelector('.border-radius-preview-box');
    const output = document.getElementById('borderRadiusOutput');

    function updateBorderRadius() {
        const selectorType = document.getElementById('borderRadiusSelectorType').value;
        const selectorName = document.getElementById('borderRadiusSelectorName').value.trim();

        const all = document.getElementById('allBorderRadiusWidth').value;
        const tl = document.getElementById('tlborderRadiusWidth').value;
        const tr = document.getElementById('trborderRadiusWidth').value;
        const br = document.getElementById('brborderRadiusWidth').value;
        const bl = document.getElementById('blborderRadiusWidth').value;

        const css = (all != tl || all != tr || all != br || all != bl)
            ? `${tl}px ${tr}px ${br}px ${bl}px`
            : `${all}px`;

        preview.style.borderRadius = css;

        let selector = '';
        if (selectorType === 'id') selector = `#${selectorName}`;
        else if (selectorType === 'class') selector = `.${selectorName}`;
        else selector = selectorName || 'div';

        output.textContent = `${selector} {   border-radius: ${css};}`;
    }

    document.querySelectorAll('.border-radius-sec input, .border-radius-sec select').forEach(el => {
        el.addEventListener('input', updateBorderRadius);
    });

    updateBorderRadius();
}

//section switcher function

function sectionSwitcher() {
    const menuItems = document.querySelectorAll("#sidebar li[data-target]");
    const sections = document.querySelectorAll(".section");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");

            sections.forEach(sec => sec.style.display = "none");

            const target = item.getAttribute("data-target");
            const targetSection = document.querySelector(`.${target}`);
            if (targetSection) {
                targetSection.style.display = "block";
            }

            if (window.innerWidth <= 950) {
                sidebar.classList.remove("activate");
            }
        });
    });


    sections.forEach((sec, index) => {
        sec.style.display = index === 0 ? "block" : "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    basiFunctionality();
    liveNumber();
    genBoxShadowCode();
    genBorderCode();
    copyFunction();
    sectionSwitcher();
    genBorderRadiusCode()
});

