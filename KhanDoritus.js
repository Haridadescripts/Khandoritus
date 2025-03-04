const ver = "V3.0.2";

let device = {
    mobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone|Mobile|Tablet|Kindle|Silk|PlayBook|BB10/i.test(navigator.userAgent),
    apple: /iPhone|iPad|iPod|Macintosh|Mac OS X/i.test(navigator.userAgent)
};

/* User */
// Discaimer: user parameters were managed by the main injector.
// This will not change automatically.
let user = {
    username: "Username",
    nickname: "Nickname",
    UID: 0
}

let loadedPlugins = [];

/* Elements */
const unloader = document.createElement('unloader');
const dropdownMenu = document.createElement('dropDownMenu');
const watermark = document.createElement('watermark');
const statsPanel = document.createElement('statsPanel');
const splashScreen = document.createElement('splashScreen');

/* Globals */
window.features = {
    questionSpoof: true,
    videoSpoof: true,
    showAnswers: false,
    autoAnswer: false,
    customBanner: false,
    nextRecomendation: false,
    repeatQuestion: false,
    minuteFarmer: false,
    rgbLogo: false,
    showActivities: false
};
window.featureConfigs = {
    autoAnswerDelay: 3,
    customUsername: "",
    customPfp: ""
};

/* Security */
document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
document.addEventListener('keydown', function (e) { if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J'))) e.preventDefault(); });
console.log(Object.defineProperties(new Error, { toString: {value() {(new Error).stack.includes('toString@') && location.reload();}}, message: {get() {location.reload();}}, }));

/* Misc Styles */
// Most of these will eventually stop working, as my proxy will become inactive.
document.head.appendChild(Object.assign(document.createElement("style"),{innerHTML:"@font-face{font-family:'MuseoSans';src:url('https://proxy.khanware.space/r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ynddewua.ttf')format('truetype')}" }));
document.head.appendChild(Object.assign(document.createElement('style'),{innerHTML:"::-webkit-scrollbar { width: 8px; } ::-webkit-scrollbar-track { background: #f1f1f1; } ::-webkit-scrollbar-thumb { background: #888; border-radius: 10px; } ::-webkit-scrollbar-thumb:hover { background: #555; }"}));
document.querySelector("link[rel~='icon']").href = 'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/ukh0rq22.png';

/* Emmiter */
class EventEmitter{constructor(){this.events={}}on(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]||(this.events[t]=[]),this.events[t].push(e)})}off(t,e){"string"==typeof t&&(t=[t]),t.forEach(t=>{this.events[t]&&(this.events[t]=this.events[t].filter(t=>t!==e))})}emit(t,...e){this.events[t]&&this.events[t].forEach(t=>{t(...e)})}once(t,e){"string"==typeof t&&(t=[t]);let s=(...i)=>{e(...i),this.off(t,s)};this.on(t,s)}};
const plppdo = new EventEmitter();

new MutationObserver((mutationsList) => { for (let mutation of mutationsList) if (mutation.type === 'childList') plppdo.emit('domChanged'); }).observe(document.body, { childList: true, subtree: true });

/* Misc Functions */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const playAudio = url => { const audio = new Audio(url); audio.play(); };
const checkCollision = (obj1, obj2) => !( obj1.right < obj2.left || obj1.left > obj2.right || obj1.bottom < obj2.top || obj1.top > obj2.bottom );
const findAndClickByClass = className => { const element = document.querySelector(`.${className}`); if (element) { element.click(); sendToast(`⭕ Pressionando ${className}...`, 1000); } }

function sendToast(text, duration=5000, gravity='bottom') { 
    Toastify({ 
        text: text, 
        duration: duration, 
        gravity: gravity, 
        position: "center", 
        stopOnFocus: true, 
        style: { 
            background: "#FF4500",
            boxShadow: '0 2px 8px rgba(255, 69, 0, 0.4)'
        } 
    }).showToast(); 
}

async function showSplashScreen() { 
    splashScreen.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background-color:#FF4500;display:flex;align-items:center;justify-content:center;z-index:9999;opacity:0;transition:opacity 0.5s ease;user-select:none;color:white;font-family:MuseoSans,sans-serif;font-size:30px;text-align:center;"; 
    splashScreen.innerHTML = '<span style="color:white;">KHAN</span><span style="color:#FFA500;">DORITUS</span>'; 
    document.body.appendChild(splashScreen); 
    setTimeout(() => splashScreen.style.opacity = '1', 10);
}
async function hideSplashScreen() { splashScreen.style.opacity = '0'; setTimeout(() => splashScreen.remove(), 1000); };

async function loadScript(url, label) { return fetch(url).then(response => response.text()).then(script => { loadedPlugins.push(label); eval(script); }); }
async function loadCss(url) { return new Promise((resolve) => { const link = document.createElement('link'); link.rel = 'stylesheet'; link.type = 'text/css'; link.href = url; link.onload = () => resolve(); document.head.appendChild(link); }); }

/* Visual Functions */
function setupMenu() {
    const setFeatureByPath = (path, value) => { let obj = window; const parts = path.split('.'); while (parts.length > 1) obj = obj[parts.shift()]; obj[parts[0]] = value; }
    function addFeature(features) {
        features.forEach(elements => {
            const feature = document.createElement('feature');
            elements.forEach(attribute => {
                let element = attribute.type === 'nonInput' ? document.createElement('label') : document.createElement('input');
                if (attribute.type === 'nonInput') element.innerHTML = attribute.name;
                else { element.type = attribute.type; element.id = attribute.name; }

                if (attribute.attributes) {
                    attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                        value = value ? value.replace(/"/g, '') : '';
                        key === 'style' ? element.style.cssText = value : element.setAttribute(key, value);
                    });
                }

                if (attribute.variable) element.setAttribute('setting-data', attribute.variable);
                if (attribute.dependent) element.setAttribute('dependent', attribute.dependent);
                if (attribute.className) element.classList.add(attribute.className);

                if (attribute.labeled) {
                    const label = document.createElement('label');
                    if (attribute.className) label.classList.add(attribute.className);
                    if (attribute.attributes) {
                        attribute.attributes.split(' ').map(attr => attr.split('=')).forEach(([key, value]) => {
                            value = value ? value.replace(/"/g, '') : '';
                            key === 'style' ? label.style.cssText = value : label.setAttribute(key, value);
                        });
                    }
                    label.innerHTML = `${element.outerHTML} ${attribute.label}`;
                    feature.appendChild(label);
                } else {
                    feature.appendChild(element);
                }
            });
            dropdownMenu.innerHTML += feature.outerHTML;
        });
    }
    function handleInput(ids, callback = null) {
        (Array.isArray(ids) ? ids.map(id => document.getElementById(id)) : [document.getElementById(ids)])
        .forEach(element => {
            if (!element) return;
            const setting = element.getAttribute('setting-data'),
                dependent = element.getAttribute('dependent'),
                handleEvent = (e, value) => {
                    setFeatureByPath(setting, value);
                    if (callback) callback(value, e);
                };

            if (element.type === 'checkbox') {
                element.addEventListener('change', (e) => {
                    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/5os0bypi.wav');
                    handleEvent(e, e.target.checked);
                    if (dependent) dependent.split(',').forEach(dep => 
                        document.querySelectorAll(`.${dep}`).forEach(depEl => 
                            depEl.style.display = e.target.checked ? null : "none"));
                });
            } else {
                element.addEventListener('input', (e) => handleEvent(e, e.target.value));
            }
        });
    }
    function setupWatermark() {
        // Create the menu button
        const menuButton = document.createElement('menuButton');
        Object.assign(menuButton.style, {
            position: 'fixed',
            top: '20px',
            left: '20px',
            width: '50px',
            height: '50px',
            backgroundImage: 'url("data:image/png;base64,YOUR_DORITOS_LOGO_BASE64")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: '#FF4500',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(255, 69, 0, 0.4)',
            zIndex: '1002',
            transition: 'all 0.3s ease'
        });

        // Create the Discord button
        const discordButton = document.createElement('discordButton');
        Object.assign(discordButton.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundImage: 'url("https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png")',
            backgroundSize: '60%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: '#5865F2',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(88, 101, 242, 0.4)',
            zIndex: '1002',
            transition: 'all 0.3s ease'
        });

        document.body.appendChild(menuButton);
        document.body.appendChild(discordButton);

        // Configure the dropdown menu
        Object.assign(dropdownMenu.style, {
            position: 'fixed',
            top: '80px',
            left: '20px',
            width: '250px',
            backgroundColor: 'rgba(255, 69, 0, 0.95)',
            borderRadius: '10px',
            padding: '15px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            display: 'none',
            flexDirection: 'column',
            gap: '10px',
            zIndex: '1001',
            transition: 'all 0.3s ease',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto'
        });

        // Add custom scrollbar styles for the dropdown menu
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            dropDownMenu::-webkit-scrollbar {
                width: 8px;
            }
            dropDownMenu::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            }
            dropDownMenu::-webkit-scrollbar-thumb {
                background: #FF5722;
                border-radius: 4px;
            }
            dropDownMenu::-webkit-scrollbar-thumb:hover {
                background: #FF7043;
            }
        `;
        document.head.appendChild(styleElement);

        document.body.appendChild(dropdownMenu);

        // Menu button events
        let menuOpen = false;
        menuButton.addEventListener('click', () => {
            menuOpen = !menuOpen;
            dropdownMenu.style.display = menuOpen ? 'flex' : 'none';
            menuButton.style.transform = menuOpen ? 'rotate(180deg)' : 'rotate(0deg)';
            playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
        });

        // Discord button events
        discordButton.addEventListener('click', () => {
            window.open('https://discord.gg/your-discord-invite', '_blank');
            playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav');
        });

        // Hover effects
        menuButton.addEventListener('mouseenter', () => {
            menuButton.style.transform = menuOpen ? 'rotate(180deg) scale(1.1)' : 'scale(1.1)';
            menuButton.style.backgroundColor = '#FF5722';
        });

        menuButton.addEventListener('mouseleave', () => {
            menuButton.style.transform = menuOpen ? 'rotate(180deg)' : 'scale(1)';
            menuButton.style.backgroundColor = '#FF4500';
        });

        discordButton.addEventListener('mouseenter', () => {
            discordButton.style.transform = 'scale(1.1)';
            discordButton.style.backgroundColor = '#4752C4';
        });

        discordButton.addEventListener('mouseleave', () => {
            discordButton.style.transform = 'scale(1)';
            discordButton.style.backgroundColor = '#5865F2';
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !dropdownMenu.contains(e.target) && menuOpen) {
                menuOpen = false;
                dropdownMenu.style.display = 'none';
                menuButton.style.transform = 'rotate(0deg)';
                playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav');
            }
        });

        // Make both buttons draggable
        function makeDraggable(element, companion = null) {
        let isDragging = false, offsetX, offsetY;
            
            element.addEventListener('mousedown', e => {
                if (e.button === 0) {
                isDragging = true;
                    offsetX = e.clientX - element.offsetLeft;
                    offsetY = e.clientY - element.offsetTop;
                    element.style.transition = 'none';
                    if (companion) companion.style.transition = 'none';
            }
        });

        document.addEventListener('mousemove', e => {
            if (isDragging) {
                    const newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - element.offsetWidth));
                    const newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - element.offsetHeight));
                    
                    element.style.left = `${newX}px`;
                    element.style.top = `${newY}px`;
                    
                    if (companion) {
                        companion.style.left = `${newX - 70}px`;
                        companion.style.top = `${newY}px`;
                    }
                    
                    if (menuOpen && element === menuButton) {
                    dropdownMenu.style.left = `${newX}px`;
                        dropdownMenu.style.top = `${newY - dropdownMenu.offsetHeight - 10}px`;
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                    element.style.transition = 'all 0.3s ease';
                    if (companion) companion.style.transition = 'all 0.3s ease';
            }
        });
        }

        makeDraggable(menuButton, discordButton);
    }
    function setupDropdown() {
        Object.assign(dropdownMenu.style, {
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '160px',
            backgroundColor: 'rgba(255, 69, 0, 0.95)', // Fundo laranja Doritos
            borderRadius: '10px',
            color: 'white',
            fontSize: '13px',
            fontFamily: 'MuseoSans, sans-serif',
            display: 'none',
            flexDirection: 'column',
            zIndex: '1000',
            padding: '10px',
            cursor: 'default',
            userSelect: 'none',
            transition: 'transform 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 69, 0, 0.3)',
            border: '2px solid #FF5722'
        });

        dropdownMenu.innerHTML = `
            <style>
                input[type="checkbox"] {
                    appearance: none;
                    width: 15px;
                    height: 15px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border: 2px solid #FFA500;
                    border-radius: 3px;
                    margin-right: 5px;
                    cursor: pointer;
                }
                input[type="checkbox"]:checked {
                    background-color: #FFA500;
                    border-color: #FF8C00;
                }
                input[type="text"], input[type="number"], input[type="range"] {
                    width: calc(100% - 10px);
                    border: 1px solid #FF8C00;
                    color: white;
                    accent-color: #FFA500;
                    background: rgba(255, 255, 255, 0.1);
                    padding: 5px;
                    border-radius: 3px;
                }
                label {
                    display: flex;
                    align-items: center;
                    color: white;
                    padding: 5px 0;
                    transition: all 0.2s ease;
                }
                label:hover {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 5px;
                    padding-left: 5px;
                }
            </style>
        `;
        watermark.appendChild(dropdownMenu);
        let featuresList = [
            [{ name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Question Spoof' },
            { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Video Spoof' },
            { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Answer Revealer' }],
            [{ name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Answer' },
            { name: 'repeatQuestion', className: 'repeatQuestion', type: 'checkbox', variable: 'features.repeatQuestion', attributes: 'style="display:none;"', labeled: true, label: 'Repeat Question' },
            { name: 'nextRecomendation', className: 'nextRecomendation', type: 'checkbox', variable: 'features.nextRecomendation', attributes: 'style="display:none;"', labeled: true, label: 'Recomendations' },
            { name: 'autoAnswerDelay', className: 'autoAnswerDelay', type: 'range', variable: 'features.autoAnswerDelay', attributes: 'style="display:none;" min="1" max="3" value="1"', labeled: false }],
            [{ name: 'minuteFarm', type: 'checkbox', variable: 'features.minuteFarmer', labeled: true, label: 'Minute Farmer' },
            { name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Custom Banner' },
            { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'RGB Logo' }],
            [{ name: 'darkMode', type: 'checkbox', variable: 'features.darkMode', attributes: 'checked', labeled: true, label: 'Dark Mode' },
            { name: 'onekoJs', type: 'checkbox', variable: 'features.onekoJs', labeled: true, label: 'onekoJs' }],
            [{ name: 'showActivities', type: 'checkbox', variable: 'features.showActivities', labeled: true, label: 'Mostrar Atividades' }]
        ]
        if (!device.apple) {
            featuresList.push(
                [{ name: 'Custom Username', type: 'nonInput' }, { name: 'customName', type: 'text', variable: 'featureConfigs.customUsername', attributes: 'autocomplete="off"' }],
                [{ name: 'Custom pfp', type: 'nonInput' }, { name: 'customPfp', type: 'text', variable: 'featureConfigs.customPfp', attributes: 'autocomplete="off"' }]
            );
        }
        featuresList.push([{ name: `${user.username} - UID: ${user.UID}`, type: 'nonInput', attributes: 'style="font-size:10px;"padding-left:5px;' }]);

        addFeature(featuresList);
        handleInput(['questionSpoof', 'videoSpoof', 'showAnswers', 'nextRecomendation', 'repeatQuestion', 'minuteFarm', 'customBanner', 'rgbLogo']);
        if (!device.apple){
            handleInput(['customName', 'customPfp'])
        }
        handleInput('autoAnswer', checked => checked && !features.questionSpoof && (document.querySelector('[setting-data="features.questionSpoof"]').checked = features.questionSpoof = true));
        handleInput('autoAnswerDelay', value => value && (featureConfigs.autoAnswerDelay = 4 - value));
        handleInput('darkMode', checked => {
            if (checked) {
                setupDoritosBackground();
            } else {
                const existingStyle = document.querySelector('style');
                if (existingStyle) existingStyle.remove();
            }
        });
        handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });
        handleInput('showActivities', checked => {
            if (checked) {
                showCompletedActivities();
            }
        });
        watermark.addEventListener('mouseenter', () => { dropdownMenu.style.display = 'flex'; playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'); } );
        watermark.addEventListener('mouseleave', e => { !watermark.contains(e.relatedTarget) && (dropdownMenu.style.display = 'none'); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav'); });
    }
    function setupStatusPanel() {
        Object.assign(statsPanel.style, {
            position: 'fixed', top: '95%', left: '20px', width: '250px', height: '30px',
            backgroundColor: 'rgb(0,0,0,0.2)', color: 'white', fontSize: '13px', fontFamily: 'Arial, sans-serif',
            display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'default', borderRadius: '10px',
            userSelect: 'none', zIndex: '1000', transition: 'transform 0.3s', backdropFilter: 'blur(1.5px)', WebkitBackdropFilter: 'blur(1.5px)'
        });
        const getPing = async () => { try { const t = performance.now(); await fetch('https://pt.khanacademy.org/', { method: 'HEAD' }); return Math.round(performance.now() - t); } catch { return 'Error'; } };
        let lastFrameTime = performance.now(), frameCount = 0, fps = 0;
        (function calcFPS() { if (++frameCount && performance.now() - lastFrameTime >= 1000) { fps = Math.round(frameCount * 1000 / (performance.now() - lastFrameTime)); frameCount = 0; lastFrameTime = performance.now(); } requestAnimationFrame(calcFPS); })();
        const getTime = () => new Date().toLocaleTimeString();
        const update = async () => statsPanel.innerHTML = `
            <span style="text-shadow: -1px 0.5px 0 #p, -2px 0px 0 #2f672e;">KW</span>
            <span style="margin: 0 8px;">|</span><span>${fps}fps</span>
            <span style="margin: 0 8px;">|</span><span>${await getPing()}ms</span>
            <span style="margin: 0 8px;">|</span><span>${getTime()}</span>
        `;
        update(); document.body.appendChild(statsPanel); setInterval(update, 1000);
        let isDragging = false, offsetX, offsetY;
        statsPanel.onmousedown = e => { isDragging = true; offsetX = e.clientX - statsPanel.offsetLeft; offsetY = e.clientY - statsPanel.offsetTop; statsPanel.style.transform = 'scale(0.9)'; };
        statsPanel.onmouseup = () => { isDragging = false; statsPanel.style.transform = 'scale(1)'; };
        document.onmousemove = e => { if (isDragging) { Object.assign(statsPanel.style, { left: `${Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - statsPanel.offsetWidth))}px`, top: `${Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - statsPanel.offsetHeight))}px` }); }};
        if(device.mobile) plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? statsPanel.style.display = 'flex' : statsPanel.style.display = 'none' );
    }
    function loadWidgetBot() {
        if(device.mobile)  return;
        const script = Object.assign(document.createElement('script'), {
            src: 'https://cdn.jsdelivr.net/npm/@widgetbot/crate@3',
            async: true,
            onload: () => {
                const discEmbed = new Crate({ server: '1286573512831533056', channel: '1286573601687867433',
                    location: ['bottom', 'right'], notifications: true, indicator: true, allChannelNotifications: true,
                    defer: false, color: '#000000'
                });
                plppdo.on('domChanged', () => window.location.href.includes("khanacademy.org/profile") ? discEmbed.show() : discEmbed.hide() );
            }
        });
        document.body.appendChild(script);
    }
    setupWatermark(); setupDropdown(); setupStatusPanel(); loadWidgetBot();
}

/* Main Functions */ 
function setupMain(){
    function spoofQuestion() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;
            const originalResponse = await originalFetch.apply(this, arguments);
            const clonedResponse = originalResponse.clone();
            try {
                const responseBody = await clonedResponse.text();
                let responseObj = JSON.parse(responseBody);
                if (features.questionSpoof && responseObj?.data?.assessmentItem?.item?.itemData) {
                    let itemData = JSON.parse(responseObj.data.assessmentItem.item.itemData);
                    if(itemData.question.content[0] === itemData.question.content[0].toUpperCase()){
                        itemData.answerArea = { "calculator": false, "chi2Table": false, "periodicTable": false, "tTable": false, "zTable": false }
                        itemData.question.content = "🔥 Pegue um Doritos! [[☃ radio 1]]";
                        itemData.question.widgets = { "radio 1": { options: { choices: [ { content: "Pegar Doritos", correct: true }, { content: "Não pegar Doritos", correct: false } ] } } };
                        responseObj.data.assessmentItem.item.itemData = JSON.stringify(itemData);
                        sendToast("🔓 Doritos liberado!", 1000);
                        return new Response(JSON.stringify(responseObj), { status: originalResponse.status, statusText: originalResponse.statusText, headers: originalResponse.headers });
                    }
                }
            } catch (e) { }
            return originalResponse;
        };
    }
    function spoofVideo() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init && init.body) body = init.body;
            if (features.videoSpoof && body && body.includes('"operationName":"updateUserVideoProgress"')) {
                try {
                    let bodyObj = JSON.parse(body);
                    if (bodyObj.variables && bodyObj.variables.input) {
                        const durationSeconds = bodyObj.variables.input.durationSeconds;
                        bodyObj.variables.input.secondsWatched = durationSeconds;
                        bodyObj.variables.input.lastSecondWatched = durationSeconds;
                        body = JSON.stringify(bodyObj);
                        if (input instanceof Request) { input = new Request(input, { body: body }); } 
                        else init.body = body; 
                        sendToast("🔓 Vídeo exploitado.", 1000)
                    }
                } catch (e) { }
            }
            return originalFetch.apply(this, arguments);
        };    
    }
    function minuteFarm() {
        const originalFetch = window.fetch;
        window.fetch = async function (input, init = {}) {
            let body;
            if (input instanceof Request) body = await input.clone().text();
            else if (init.body) body = init.body;
            if (features.minuteFarmer && body && input.url.includes("mark_conversions")) {
                try {
                    if (body.includes("termination_event")) { sendToast("🚫 Limitador de tempo bloqueado.", 1000); return; }
                } catch (e) { }
            }
            return originalFetch.apply(this, arguments);
        };
    };
    function spoofUser() {
        plppdo.on('domChanged', () => {
            if(!device.apple){
                const pfpElement = document.querySelector('.avatar-pic');
                const nicknameElement = document.querySelector('.user-deets.editable h2');
                if (nicknameElement) nicknameElement.textContent = featureConfigs.customUsername || user.nickname; 
                if (featureConfigs.customPfp && pfpElement) { Object.assign(pfpElement, { src: featureConfigs.customPfp, alt: "Not an image URL"} );pfpElement.style.borderRadius="50%"}
            }
        });
    }
    function answerRevealer() {
        const originalParse = JSON.parse;
        JSON.parse = function (e, t) {
            let body = originalParse(e, t);
            try {
                if (body?.data) {
                    Object.keys(body.data).forEach(key => {
                        const data = body.data[key];
                        if (features.showAnswers && key === "assessmentItem" && data?.item) {
                            const itemData = JSON.parse(data.item.itemData);
                            if (itemData.question && itemData.question.widgets && itemData.question.content[0] === itemData.question.content[0].toUpperCase()) {
                                Object.keys(itemData.question.widgets).forEach(widgetKey => {
                                    const widget = itemData.question.widgets[widgetKey];
                                    if (widget.options && widget.options.choices) {
                                        widget.options.choices.forEach(choice => {
                                            if (choice.correct) {
                                                choice.content = "✅ " + choice.content;
                                                sendToast("🔓 Respostas reveladas.", 1000);                
                                            }
                                        });
                                    }
                                });
                                data.item.itemData = JSON.stringify(itemData);
                            }
                        }
                    });
                }
            } catch (e) { }
            return body;
        };
    }
    function rgbLogo() {
        plppdo.on('domChanged', () => {
            const khanLogo = document.querySelector('svg._1rt6g9t').querySelector('path:nth-last-of-type(2)');
            const styleElement = document.createElement('style');
            styleElement.className = "RGBLogo"
            styleElement.textContent = `
                @keyframes colorShift {
                    0% { fill: rgb(255, 0, 0); }
                    33% { fill: rgb(0, 255, 0); }
                    66% { fill: rgb(0, 0, 255); }
                    100% { fill: rgb(255, 0, 0); }
                }   
            `;
            if(features.rgbLogo&&khanLogo){
                if(!document.getElementsByClassName('RGBLogo')[0]) document.head.appendChild(styleElement);
                if(khanLogo.getAttribute('data-darkreader-inline-fill')!=null) khanLogo.removeAttribute('data-darkreader-inline-fill');
                khanLogo.style.animation = 'colorShift 5s infinite';
            }
        })
    }
    function changeBannerText() {
        const phrases = [ "[🌿] Non Skeetless dude.", "[🌿] Khanware on top.", "[🌿] Nix said hello!", "[🌿] God i wish i had Khanware.", "[🌿] Get good get Khanware!", "[🌿] the old khanware.space" ];
        setInterval(() => { 
            const greeting = document.querySelector('.stp-animated-banner h2');
            if (greeting&&features.customBanner) greeting.textContent = phrases[Math.floor(Math.random() * phrases.length)];
        }, 3000);
    }
    async function autoAnswer() {
        const baseClasses = ["_1tuo6xk", "_ssxvf9l", "_1f0fvyce", "_rz7ls7u", "_1yok8f4", "_1e5cuk2a"];
        while (true) {
            if(features.autoAnswer&&features.questionSpoof){
                const classToCheck = [...baseClasses];
                if (features.nextRecomendation) { device.mobile ? classToCheck.push("_ixuggsz") : classToCheck.push("_1kkrg8oi"); }
                if (features.repeatQuestion) classToCheck.push("_1abyu0ga");
                classToCheck.forEach(async (q) => {
                    findAndClickByClass(q);
                    const element = document.getElementsByClassName(q)[0];
                    if(element&&element.textContent=='Mostrar resumo') { sendToast("🎉 Exercício concluido!", 3000); playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/4x5g14gj.wav'); }
                });
            }
            await delay(featureConfigs.autoAnswerDelay*750);
        }
    }
    async function showCompletedActivities() {
        const activityPanel = document.createElement('div');
        Object.assign(activityPanel.style, {
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '600px',
            maxHeight: '80vh',
            backgroundColor: 'rgba(255, 69, 0, 0.95)',
            borderRadius: '10px',
            padding: '20px',
            color: 'white',
            fontFamily: 'MuseoSans, sans-serif',
            zIndex: '9999',
            overflowY: 'auto',
            boxShadow: '0 4px 15px rgba(255, 69, 0, 0.3)',
            border: '2px solid #FF5722'
        });

        // Adicionar botão de fechar
        const closeButton = document.createElement('button');
        Object.assign(closeButton.style, {
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer'
        });
        closeButton.innerHTML = '✕';
        closeButton.onclick = () => activityPanel.remove();

        // Adicionar título
        const title = document.createElement('h2');
        title.textContent = 'Atividades Concluídas';
        title.style.marginBottom = '20px';
        title.style.textAlign = 'center';

        activityPanel.appendChild(closeButton);
        activityPanel.appendChild(title);

        try {
            // Mostrar loading
            const loading = document.createElement('div');
            loading.textContent = 'Carregando atividades...';
            loading.style.textAlign = 'center';
            activityPanel.appendChild(loading);
            document.body.appendChild(activityPanel);

            // Fazer requisição para a API do Khan Academy
            const response = await fetch('https://www.khanacademy.org/api/v1/user/exercises/progress');
            const activities = await response.json();

            // Remover loading
            loading.remove();

            // Criar container para as atividades
            const activitiesContainer = document.createElement('div');
            Object.assign(activitiesContainer.style, {
                display: 'grid',
                gap: '10px'
            });

            // Ordenar atividades por data
            activities.sort((a, b) => new Date(b.lastAttemptDate) - new Date(a.lastAttemptDate));

            // Mostrar cada atividade
            activities.forEach(activity => {
                if (activity.totalDone > 0) {
                    const activityItem = document.createElement('div');
                    Object.assign(activityItem.style, {
                        padding: '10px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '5px',
                        transition: 'all 0.2s ease'
                    });

                    const date = new Date(activity.lastAttemptDate).toLocaleDateString();
                    activityItem.innerHTML = `
                        <div style="font-weight: bold;">${activity.exerciseName}</div>
                        <div style="font-size: 0.9em; color: #FFA500;">
                            Concluído em: ${date}<br>
                            Questões respondidas: ${activity.totalDone}<br>
                            Pontuação: ${activity.points || 0} pontos
                        </div>
                    `;

                    activityItem.onmouseover = () => {
                        activityItem.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                    };
                    activityItem.onmouseout = () => {
                        activityItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                    };

                    activitiesContainer.appendChild(activityItem);
                }
            });

            activityPanel.appendChild(activitiesContainer);

        } catch (error) {
            activityPanel.innerHTML = `
                <div style="text-align: center; color: #FFA500;">
                    Erro ao carregar atividades.<br>
                    Certifique-se de estar logado no Khan Academy.
                </div>
            `;
        }
    }
    spoofQuestion(); spoofVideo(); answerRevealer(); minuteFarm(); spoofUser(); rgbLogo(); changeBannerText(); autoAnswer();
}

/* Inject */
if (!/^https?:\/\/pt\.khanacademy\.org/.test(window.location.href)) { alert("❌ Khanware Failed to Injected!\n\nVocê precisa executar o Khanware no site do Khan Academy! (https://pt.khanacademy.org/)"); window.location.href = "https://pt.khanacademy.org/";};

showSplashScreen();

loadScript('https://raw.githubusercontent.com/adryd325/oneko.js/refs/heads/main/oneko.js', 'onekoJs')
.then(() => {
    onekoEl = document.getElementById('oneko'); 
    onekoEl.style.backgroundImage = "url('https://raw.githubusercontent.com/adryd325/oneko.js/main/oneko.gif')";
    onekoEl.style.display = "none";
});
loadScript('https://cdn.jsdelivr.net/npm/darkreader@4.9.92/darkreader.min.js', 'darkReaderPlugin')
.then(()=>{
    DarkReader.setFetchMethod(window.fetch)
    DarkReader.enable();
})
loadCss('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
loadScript('https://cdn.jsdelivr.net/npm/toastify-js', 'toastifyPlugin')
.then(async () => {
    sendToast("🌿 Khanware injetado com sucesso!");
    playAudio('https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/gcelzszy.wav');
    await delay(500);
    sendToast(`⭐ Bem vindo(a) de volta: ${user.nickname}`);
    loadedPlugins.forEach(plugin => sendToast(`🪝 ${plugin} Loaded!`, 2000, 'top') );
    hideSplashScreen();
    setupMenu();
    setupMain();
    console.clear();
})

// Thank you to everyone who has purchased access to my cheat as of 10/28/24.
/*
@Thomaz015
@grazynabazio
@meyssaxavier
@WESLEY.SPREDEMANN
@carine.rech.alves
@nazare.de.maria
@jowsanth
@bielzy
@rafaeldeagostino
@AMFDS
@Jv010107
@Mattheusfreitas01
@Guilhermeoliveira2623
@Matt010101
@voncallis
@Thamiris0001
@Holmes1212
@Martinss0000
@zRoque
@LaryCouto.com.br
@IanyckFerreira
@sales7
@AleSobral
@wbzz2121
@Umunizzz
@ViniciusMancini
@ricardaosantista
@marcos10pc
@bzinxxx
@ryanmzmartins
@Kaleb1577
@brunopereirabarros
@RodrigoMartins1236751
@guixzf
@Leandrohenrq
@damnntiago
@WhoisMe777
@Gustavopc21
@matheus.hx2
@WSZL
@LeozinB2
@Davas123
@joaoviturino
@orickmaxx
@l55nar5
@nextbyhawk
@Bruninda019
@GabrielRibeiroP
@Shinjoia
@hy7pee
@arthurmondequedutra
@PedrooVsp
@zBlucker
@vitiintavares
@Holmes1212
@Anthony06927
@refinado
@ErickMarinelli
@pedroomelhor
@gabrielmonteiro0053
@Felipealexandre10
@saantzx7
@alvarosouzaribeiro
@gabrielejte
@Kevinzada
@antonio77xs
@marcus.floriano.oliveira
*/
