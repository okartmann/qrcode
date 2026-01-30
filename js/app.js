/**
 * QR-Code.de - QR-Code Generator
 * Hauptapplikation für die QR-Code-Generierung
 */

(function() {
    'use strict';

    // DOM Elements
    const elements = {
        typeButtons: document.querySelectorAll('.type-btn'),
        formGroups: document.querySelectorAll('.form-group'),
        generateBtn: document.getElementById('generate-btn'),
        qrPreview: document.getElementById('qr-preview'),
        downloadOptions: document.getElementById('download-options'),
        downloadPng: document.getElementById('download-png'),
        downloadSvg: document.getElementById('download-svg'),
        qrColor: document.getElementById('qr-color'),
        bgColor: document.getElementById('bg-color'),
        qrSize: document.getElementById('qr-size'),
        sizeValue: document.getElementById('size-value'),
        // URL form
        urlInput: document.getElementById('url-input'),
        // Text form
        textInput: document.getElementById('text-input'),
        // WiFi form
        wifiSsid: document.getElementById('wifi-ssid'),
        wifiPassword: document.getElementById('wifi-password'),
        wifiEncryption: document.getElementById('wifi-encryption'),
        // vCard form
        vcardName: document.getElementById('vcard-name'),
        vcardPhone: document.getElementById('vcard-phone'),
        vcardEmail: document.getElementById('vcard-email'),
        vcardCompany: document.getElementById('vcard-company'),
        vcardWebsite: document.getElementById('vcard-website'),
        // Email form
        emailAddress: document.getElementById('email-address'),
        emailSubject: document.getElementById('email-subject'),
        emailBody: document.getElementById('email-body'),
        // Phone form
        phoneNumber: document.getElementById('phone-number')
    };

    // Current state
    let currentType = 'url';
    let currentQRCanvas = null;

    /**
     * Initialize the application
     */
    function init() {
        setupEventListeners();
        updateSizeDisplay();
    }

    /**
     * Set up all event listeners
     */
    function setupEventListeners() {
        // Type selection buttons
        elements.typeButtons.forEach(btn => {
            btn.addEventListener('click', () => switchType(btn.dataset.type));
        });

        // Generate button
        elements.generateBtn.addEventListener('click', generateQRCode);

        // Size slider
        elements.qrSize.addEventListener('input', updateSizeDisplay);

        // Download buttons
        elements.downloadPng.addEventListener('click', downloadPNG);
        elements.downloadSvg.addEventListener('click', downloadSVG);

        // Real-time preview on input changes
        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('input', debounce(autoGenerate, 500));
        });

        // Color changes
        elements.qrColor.addEventListener('change', autoGenerate);
        elements.bgColor.addEventListener('change', autoGenerate);
        elements.qrSize.addEventListener('change', autoGenerate);

        // Enter key to generate
        document.querySelectorAll('.input-field').forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && input.tagName !== 'TEXTAREA') {
                    generateQRCode();
                }
            });
        });
    }

    /**
     * Switch between QR code types
     */
    function switchType(type) {
        currentType = type;

        // Update button states
        elements.typeButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });

        // Show/hide form groups
        elements.formGroups.forEach(group => {
            group.classList.toggle('active', group.id === `form-${type}`);
        });

        // Clear preview when switching types
        resetPreview();
    }

    /**
     * Update size display value
     */
    function updateSizeDisplay() {
        elements.sizeValue.textContent = elements.qrSize.value;
    }

    /**
     * Generate QR code based on current type and inputs
     */
    function generateQRCode() {
        const data = getQRData();

        if (!data) {
            showError('Bitte füllen Sie die erforderlichen Felder aus.');
            return;
        }

        const options = {
            width: parseInt(elements.qrSize.value),
            margin: 2,
            color: {
                dark: elements.qrColor.value,
                light: elements.bgColor.value
            },
            errorCorrectionLevel: 'M'
        };

        // Clear previous QR code
        elements.qrPreview.innerHTML = '';

        // Create canvas element
        const canvas = document.createElement('canvas');
        elements.qrPreview.appendChild(canvas);

        // Generate QR code
        QRCode.toCanvas(canvas, data, options, function(error) {
            if (error) {
                console.error(error);
                showError('Fehler beim Generieren des QR-Codes.');
                return;
            }

            currentQRCanvas = canvas;
            elements.downloadOptions.style.display = 'flex';
        });
    }

    /**
     * Auto-generate QR code if there's valid data
     */
    function autoGenerate() {
        const data = getQRData();
        if (data && data.length > 0) {
            generateQRCode();
        }
    }

    /**
     * Get QR code data based on current type
     */
    function getQRData() {
        switch (currentType) {
            case 'url':
                return getURLData();
            case 'text':
                return getTextData();
            case 'wifi':
                return getWiFiData();
            case 'vcard':
                return getVCardData();
            case 'email':
                return getEmailData();
            case 'phone':
                return getPhoneData();
            default:
                return null;
        }
    }

    /**
     * Get URL data
     */
    function getURLData() {
        const url = elements.urlInput.value.trim();
        if (!url) return null;

        // Add https:// if no protocol specified
        if (url && !url.match(/^https?:\/\//i)) {
            return 'https://' + url;
        }
        return url;
    }

    /**
     * Get text data
     */
    function getTextData() {
        return elements.textInput.value.trim() || null;
    }

    /**
     * Get WiFi data in standard format
     */
    function getWiFiData() {
        const ssid = elements.wifiSsid.value.trim();
        const password = elements.wifiPassword.value;
        const encryption = elements.wifiEncryption.value;

        if (!ssid) return null;

        // Escape special characters
        const escapedSsid = escapeWiFiString(ssid);
        const escapedPassword = escapeWiFiString(password);

        if (encryption === 'nopass') {
            return `WIFI:T:nopass;S:${escapedSsid};;`;
        }

        return `WIFI:T:${encryption};S:${escapedSsid};P:${escapedPassword};;`;
    }

    /**
     * Escape special characters for WiFi QR code
     */
    function escapeWiFiString(str) {
        return str.replace(/([\\;,:"'])/g, '\\$1');
    }

    /**
     * Get vCard data
     */
    function getVCardData() {
        const name = elements.vcardName.value.trim();
        const phone = elements.vcardPhone.value.trim();
        const email = elements.vcardEmail.value.trim();
        const company = elements.vcardCompany.value.trim();
        const website = elements.vcardWebsite.value.trim();

        if (!name) return null;

        // Parse name into first and last name
        const nameParts = name.split(' ');
        const lastName = nameParts.length > 1 ? nameParts.pop() : '';
        const firstName = nameParts.join(' ');

        let vcard = 'BEGIN:VCARD\n';
        vcard += 'VERSION:3.0\n';
        vcard += `N:${lastName};${firstName};;;\n`;
        vcard += `FN:${name}\n`;

        if (company) {
            vcard += `ORG:${company}\n`;
        }
        if (phone) {
            vcard += `TEL;TYPE=CELL:${phone}\n`;
        }
        if (email) {
            vcard += `EMAIL:${email}\n`;
        }
        if (website) {
            vcard += `URL:${website}\n`;
        }

        vcard += 'END:VCARD';

        return vcard;
    }

    /**
     * Get email data (mailto: format)
     */
    function getEmailData() {
        const address = elements.emailAddress.value.trim();
        const subject = elements.emailSubject.value.trim();
        const body = elements.emailBody.value.trim();

        if (!address) return null;

        let mailto = `mailto:${address}`;
        const params = [];

        if (subject) {
            params.push(`subject=${encodeURIComponent(subject)}`);
        }
        if (body) {
            params.push(`body=${encodeURIComponent(body)}`);
        }

        if (params.length > 0) {
            mailto += '?' + params.join('&');
        }

        return mailto;
    }

    /**
     * Get phone data (tel: format)
     */
    function getPhoneData() {
        const phone = elements.phoneNumber.value.trim();
        if (!phone) return null;

        // Remove spaces and special characters except + and numbers
        const cleanPhone = phone.replace(/[^\d+]/g, '');
        return `tel:${cleanPhone}`;
    }

    /**
     * Download QR code as PNG
     */
    function downloadPNG() {
        if (!currentQRCanvas) return;

        const link = document.createElement('a');
        link.download = `qrcode-${currentType}-${Date.now()}.png`;
        link.href = currentQRCanvas.toDataURL('image/png');
        link.click();
    }

    /**
     * Download QR code as SVG
     */
    function downloadSVG() {
        const data = getQRData();
        if (!data) return;

        const options = {
            width: parseInt(elements.qrSize.value),
            margin: 2,
            color: {
                dark: elements.qrColor.value,
                light: elements.bgColor.value
            },
            errorCorrectionLevel: 'M',
            type: 'svg'
        };

        QRCode.toString(data, options, function(error, svg) {
            if (error) {
                console.error(error);
                return;
            }

            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.download = `qrcode-${currentType}-${Date.now()}.svg`;
            link.href = url;
            link.click();
            URL.revokeObjectURL(url);
        });
    }

    /**
     * Reset the preview area
     */
    function resetPreview() {
        elements.qrPreview.innerHTML = `
            <div class="placeholder">
                <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h1v1h-1v-1zm-3 0h1v1h-1v-1zm1 1h1v1h-1v-1zm-1 1h1v1h-1v-1zm1 1h1v1h-1v-1zm1-1h1v1h-1v-1zm1 1h1v1h-1v-1zm0-2h1v1h-1v-1zm1 1h1v1h-1v-1z"/>
                </svg>
                <p>Ihr QR-Code erscheint hier</p>
            </div>
        `;
        elements.downloadOptions.style.display = 'none';
        currentQRCanvas = null;
    }

    /**
     * Show error message in preview
     */
    function showError(message) {
        elements.qrPreview.innerHTML = `
            <div class="placeholder" style="color: #ef4444;">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px;">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p>${message}</p>
            </div>
        `;
        elements.downloadOptions.style.display = 'none';
    }

    /**
     * Debounce function for performance
     */
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

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
