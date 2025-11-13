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
        { id: 'tlborderRadiusWidth', unit: 'px' },
        { id: 'trborderRadiusWidth', unit: 'px' },
        { id: 'blborderRadiusWidth', unit: 'px' },
        { id: 'brborderRadiusWidth', unit: 'px' },
        { id: 'outlineWidth', unit: 'px' },
        { id: 'outlineOffset', unit: 'px' },
        { id: 'textShOffsetX', unit: 'px' },
        { id: 'textShOffsetY', unit: 'px' },
        { id: 'textShBlur', unit: 'px' },
        { id: 'textShOpacity', unit: '' },
        { id: 'outlineTextWidth', unit: 'px' },
        { id: 'typographyFontSize', unit: 'px' },
        { id: 'typographyLetterSpacing', unit: 'px' },
        { id: 'typographyLineHeight', unit: '' },

    ];
    ranges.forEach(({ id, unit }) => {
        const input = document.getElementById(id);
        const valueSpan = document.getElementById(`${id}Value`);

        // if (!input || !valueSpan) return;

        input.addEventListener('input', () => {
            valueSpan.textContent = input.value + unit;
        });
    });


}


// Copy function

function copyFunction() {
    const copyButtons = document.querySelectorAll('#copyBtn');
    const borderOutputs = document.getElementById('borderOutput');
    copyButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const outputPanel = btn.closest('.output-panel')
            const outputDiv = outputPanel.querySelector('.output')
            const textToCopy = outputDiv.textContent.trim();
            navigator.clipboard.writeText(textToCopy)
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

    let isCustom = false;

    function updateBorderRadius() {
        const borderRadiusSelectorType = document.getElementById('borderRadiusSelectorType').value;
        const borderRadiusSelectorName = document.getElementById('borderRadiusSelectorName').value.trim();

        const all = document.getElementById('allBorderRadiusWidth').value;
        const tl = document.getElementById('tlborderRadiusWidth').value;
        const tr = document.getElementById('trborderRadiusWidth').value;
        const br = document.getElementById('brborderRadiusWidth').value;
        const bl = document.getElementById('blborderRadiusWidth').value;

        let css = "";

        if (!isCustom) {
            css = `${all}px`;
            preview.style.borderRadius = css;

        } else {
            css = `${tl}px ${tr}px ${br}px ${bl}px`;
            preview.style.borderRadius = css;
        }

        let borderRadiusSelector = '';
        if (borderRadiusSelectorType === 'id') borderRadiusSelector = `#${borderRadiusSelectorName}`;
        else if (borderRadiusSelectorType === 'class') borderRadiusSelector = `.${borderRadiusSelectorName}`;
        else borderRadiusSelector = borderRadiusSelectorName || 'div';

        output.textContent = `${borderRadiusSelector} {\n    border-radius: ${css};\n}`;
    }

    document.getElementById('allBorderRadiusWidth').addEventListener('input', () => {
        isCustom = false;
        updateBorderRadius();
    });

    ['tl', 'tr', 'br', 'bl'].forEach(corner => {
        document.getElementById(`${corner}borderRadiusWidth`).addEventListener('input', () => {
            isCustom = true;
            updateBorderRadius();
        });
    });

    document.querySelectorAll('.border-radius-sec select, #borderRadiusSelectorName').forEach(el => {
        el.addEventListener('input', updateBorderRadius);
    });

    updateBorderRadius();
}

//outline generator function 

function genOutlineCode() {
    const outlinePreviewBox = document.querySelector('.outline-preview-box');
    const outlineOutput = document.getElementById('outlineOutput');

    function updateOutline() {

        const outlineSelectorType = document.getElementById('outlineSelectorType').value;
        const outlineSelectorName = document.getElementById('outlineSelectorName').value.trim();

        const outlineWidth = document.getElementById('outlineWidth').value;
        const outlineOffset = document.getElementById('outlineOffset').value;
        const outlineStyle = document.getElementById('outlineStyleType').value;
        const outlineColor = document.getElementById('outlineColor').value;

        const outlineCSS = `${outlineWidth}px ${outlineStyle} ${outlineColor}`;

        outlinePreviewBox.style.outline = outlineCSS;
        outlinePreviewBox.style.outlineOffset = `${outlineOffset}px`;

        let outlineSelector = '';
        if (outlineSelectorType === 'id') outlineSelector = `#${outlineSelectorName}`;
        else if (outlineSelectorType === 'class') outlineSelector = `.${outlineSelectorName}`;
        else outlineSelector = outlineSelectorName || 'div';

        outlineOutput.textContent = `${outlineSelector} {
    outline: ${outlineCSS};
    outline-offset: ${outlineOffset}px;
}`;
    }

    document.querySelectorAll('.outline-sec input, .outline-sec select').forEach(el => {
        el.addEventListener('input', updateOutline);
    });

    updateOutline();
}


// Text Shadow Generator function

function genTextShadowCode() {
    const textShadowPreview = document.querySelector('.text-shadow-preview-text');
    const textShadowOutput = document.getElementById('textShadowOutput');

    function updateTextShadow() {
        const textShadowSelectorType = document.getElementById('textShadowSelectorType').value;
        const textShadowSelectorName = document.getElementById('textShadowSelectorName').value.trim();

        const offsetX = document.getElementById('textShOffsetX').value;
        const offsetY = document.getElementById('textShOffsetY').value;
        const blur = document.getElementById('textShBlur').value;
        const opacity = document.getElementById('textShOpacity').value;
        const color = document.getElementById('textShadowColor').value;

        const rgbaColor = hexToRgba(color, opacity);

        const textShadowCSS = `${offsetX}px ${offsetY}px ${blur}px ${rgbaColor}`;

        textShadowPreview.style.textShadow = textShadowCSS;

        let textShadowSelector = '';
        if (textShadowSelectorType === 'id') textShadowSelector = `#${textShadowSelectorName}`;
        else if (textShadowSelectorType === 'class') textShadowSelector = `.${textShadowSelectorName}`;
        else textShadowSelector = textShadowSelectorName || 'p';

        textShadowOutput.textContent = `${textShadowSelector} {
    text-shadow: ${textShadowCSS};
}`;
    }

    function hexToRgba(hex, opacity) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }

    document.querySelectorAll('.text-shadow-sec input, .text-shadow-sec select').forEach(el => {
        el.addEventListener('input', updateTextShadow);
    });

    updateTextShadow();
}

// Text Gradient generaor function

function genGradientTextCode() {
    const gradientTextPreview = document.querySelector('.gradient-text-preview-text');
    const gradientTextOutput = document.getElementById('gradientTextOutput');

    function updateGradientText() {
        const gradientTextSelectorType = document.getElementById('gradientTextSelectorType').value;
        const gradientTextSelectorName = document.getElementById('gradientTextSelectorName').value.trim();

        const gradientDirection = document.getElementById('gradientTextDirection').value;
        const gradientColor1 = document.getElementById('gradientTextColor1').value;
        const gradientColor2 = document.getElementById('gradientTextColor2').value;

        const gradientBackground = `linear-gradient(${gradientDirection}, ${gradientColor1}, ${gradientColor2})`;

        gradientTextPreview.style.background = gradientBackground;
        gradientTextPreview.style.webkitBackgroundClip = 'text';
        gradientTextPreview.style.webkitTextFillColor = 'transparent';

        let gradientTextSelector = '';
        if (gradientTextSelectorType === 'id') gradientTextSelector = `#${gradientTextSelectorName}`;
        else if (gradientTextSelectorType === 'class') gradientTextSelector = `.${gradientTextSelectorName}`;
        else gradientTextSelector = gradientTextSelectorName || 'p';

        gradientTextOutput.textContent = `${gradientTextSelector} {
    background: ${gradientBackground};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}`;
    }

    document.querySelectorAll('.gradient-text-sec input, .gradient-text-sec select').forEach(el => {
        el.addEventListener('input', updateGradientText);
    });

    updateGradientText();
}

// outline for text generator function 

function genOutlineTextCode() {
    const outlineTextPreviewText = document.querySelector('.outline-text-preview-text');
    const outlineTextOutputBox = document.getElementById('outlineTextOutput');

    function updateOutlineTextPreview() {
        const outlineTextSelectorType = document.getElementById('outlineTextSelectorType').value;
        const outlineTextSelectorName = document.getElementById('outlineTextSelectorName').value.trim();
        const outlineTextWidth = document.getElementById('outlineTextWidth').value;
        const outlineTextColor = document.getElementById('outlineTextColor').value;
        const outlineTextFillColor = document.getElementById('outlineTextFillColor').value;

        outlineTextPreviewText.style.webkitTextStroke = `${outlineTextWidth}px ${outlineTextColor}`;
        outlineTextPreviewText.style.color = outlineTextFillColor;
        outlineTextPreviewText.style.webkitTextFillColor = outlineTextFillColor;

        let outlineTextSelector = '';
        if (outlineTextSelectorType === 'id') outlineTextSelector = `#${outlineTextSelectorName}`;
        else if (outlineTextSelectorType === 'class') outlineTextSelector = `.${outlineTextSelectorName}`;
        else outlineTextSelector = outlineTextSelectorName || 'p';

        outlineTextOutputBox.textContent = `${outlineTextSelector} {
    -webkit-text-stroke: ${outlineTextWidth}px ${outlineTextColor};
    -webkit-text-fill-color: ${outlineTextFillColor};
    color: ${outlineTextFillColor};
}`;
    }

    document.querySelectorAll('.outline-text-sec input, .outline-text-sec select').forEach(element => {
        element.addEventListener('input', updateOutlineTextPreview);
    });

    updateOutlineTextPreview();
}

// Typography tool generator function

function geneTypographyCode() {
    const typographyPreviewText = document.querySelector('.typography-preview-text');
    const typographyOutputBox = document.getElementById('typographyOutput');

    function updateTypographyPreview() {
        const typographySelectorType = document.getElementById('typographySelectorType').value;
        const typographySelectorName = document.getElementById('typographySelectorName').value.trim();
        const typographyFontFamily = document.getElementById('typographyFontFamily').value;
        const typographyFontSize = document.getElementById('typographyFontSize').value;
        const typographyFontWeight = document.getElementById('typographyFontWeight').value;
        const typographyLetterSpacing = document.getElementById('typographyLetterSpacing').value;
        const typographyLineHeight = document.getElementById('typographyLineHeight').value;
        const typographyTextAlign = document.getElementById('typographyTextAlign').value;
        const typographyTextTransform = document.getElementById('typographyTextTransform').value;
        const typographyTextDecoration = document.getElementById('typographyTextDecoration').value;
        const typographyTextColor = document.getElementById('typographyTextColor').value;


        typographyPreviewText.style.fontFamily = typographyFontFamily;
        typographyPreviewText.style.fontSize = typographyFontSize + 'px';
        typographyPreviewText.style.fontWeight = typographyFontWeight;
        typographyPreviewText.style.letterSpacing = typographyLetterSpacing + 'px';
        typographyPreviewText.style.lineHeight = typographyLineHeight;
        typographyPreviewText.style.textAlign = typographyTextAlign;
        typographyPreviewText.style.textTransform = typographyTextTransform;
        typographyPreviewText.style.textDecoration = typographyTextDecoration;
        typographyPreviewText.style.color = typographyTextColor;

        let typographySelector = '';
        if (typographySelectorType === 'id') typographySelector = `#${typographySelectorName}`;
        else if (typographySelectorType === 'class') typographySelector = `.${typographySelectorName}`;
        else typographySelector = typographySelectorName || 'p';

        typographyOutputBox.textContent = `${typographySelector} {
    font-family: ${typographyFontFamily};
    font-size: ${typographyFontSize}px;
    font-weight: ${typographyFontWeight};
    letter-spacing: ${typographyLetterSpacing}px;
    line-height: ${typographyLineHeight};
    text-align: ${typographyTextAlign};
    text-transform: ${typographyTextTransform};
    text-decoration: ${typographyTextDecoration};
    color: ${typographyTextColor};
}`;
    }

    document.querySelectorAll('.typography-sec input, .typography-sec select').forEach(element => {
        element.addEventListener('input', updateTypographyPreview);
    });

    updateTypographyPreview();
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
    sectionSwitcher();
    genBoxShadowCode();
    genBorderCode();
    genBorderRadiusCode();
    genOutlineCode();
    genTextShadowCode();
    genGradientTextCode();
    genOutlineTextCode();
    geneTypographyCode();
    copyFunction();
});


