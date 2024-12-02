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
    rgbLogo: false
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

function sendToast(text, duration=5000, gravity='bottom') { Toastify({ text: text, duration: duration, gravity: gravity, position: "center", stopOnFocus: true, style: { background: "#000000" } }).showToast(); };

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
        Object.assign(watermark.style, {
            position: 'fixed', 
            top: '0', 
            left: '85%', 
            width: '100px', 
            height: '40px', 
            backgroundColor: 'transparent',
            cursor: 'default', 
            userSelect: 'none', 
            zIndex: '1001', 
            transition: 'transform 0.3s ease'
        });
        if (device.mobile) watermark.style.left = '55%'
        
        // Logo oficial do Doritos
        watermark.innerHTML = `
            <svg viewBox="0 0 1200 400" style="width:100%;height:100%;">
                <defs>
                    <linearGradient id="doritos-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#FF4500"/>
                        <stop offset="100%" style="stop-color:#FF8C00"/>
                    </linearGradient>
                </defs>
                <path fill="black" stroke="#FF0000" stroke-width="2" d="M50,50 L1150,50 L600,350 Z"/>
                <path fill="url(#doritos-gradient)" d="M200,100 L1000,100 L600,300 Z"/>
                <text x="600" y="200" fill="white" font-family="Arial Black" font-size="120" text-anchor="middle" style="text-transform:uppercase;font-weight:900;">Doritos</text>
            </svg>
        `;
        
        document.body.appendChild(watermark);
        
        // Remover completamente os eventos de hover do watermark
        watermark.addEventListener('click', (e) => {
            e.stopPropagation(); // Previne que o click se propague para o document
            if (!dropdownMenu.contains(e.target)) {
                const isVisible = dropdownMenu.style.display === 'flex';
                dropdownMenu.style.display = isVisible ? 'none' : 'flex';
                
                // Efeito visual ao clicar
                watermark.style.filter = isVisible ? 'none' : 'brightness(1.2) drop-shadow(0 0 5px #FF4500)';
                watermark.style.transform = isVisible ? 'scale(1)' : 'scale(1.1)';
                
                // Som ao abrir/fechar o menu
                playAudio(isVisible ? 
                    'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/rqizlm03.wav' : 
                    'https://r2.e-z.host/4d0a0bea-60f8-44d6-9e74-3032a64a9f32/3kd01iyj.wav'
                );
            }
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
            if (!watermark.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.style.display = 'none';
                watermark.style.filter = 'none';
                watermark.style.transform = 'scale(1)';
            }
        });

        // Modificar o código de arrastar para manter o menu fechado
        let isDragging = false, offsetX, offsetY;
        watermark.addEventListener('mousedown', e => { 
            if (!dropdownMenu.contains(e.target)) { 
                isDragging = true; 
                offsetX = e.clientX - watermark.offsetLeft; 
                offsetY = e.clientY - watermark.offsetTop; 
                watermark.style.transform = 'scale(0.9)'; 
                unloader.style.transform = 'scale(1)';
                dropdownMenu.style.display = 'none'; // Fechar menu ao começar a arrastar
            } 
        });
        watermark.addEventListener('mouseup', () => { isDragging = false; watermark.style.transform = 'scale(1)'; unloader.style.transform = 'scale(0)'; if (checkCollision(watermark.getBoundingClientRect(), unloader.getBoundingClientRect())) unload(); });
        document.addEventListener('mousemove', e => { if (isDragging) { let newX = Math.max(0, Math.min(e.clientX - offsetX, window.innerWidth - watermark.offsetWidth)); let newY = Math.max(0, Math.min(e.clientY - offsetY, window.innerHeight - watermark.offsetHeight)); Object.assign(watermark.style, { left: `${newX}px`, top: `${newY}px` }); dropdownMenu.style.display = 'none'; } });
    }
    function setupDropdown() {
        Object.assign(dropdownMenu.style, {
            position: 'absolute',
            top: '100%',
            left: '0',
            width: '180px',
            backgroundColor: 'rgba(20, 20, 20, 0.95)',
            borderRadius: '12px',
            color: 'white',
            fontSize: '13px',
            fontFamily: 'Arial, sans-serif',
            display: 'none',
            flexDirection: 'column',
            zIndex: '1000',
            padding: '10px',
            cursor: 'default',
            userSelect: 'none',
            transition: 'none',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 69, 0, 0.2)',
            pointerEvents: 'auto',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)'
        });

        dropdownMenu.innerHTML = `
            <style>
                /* Estilo dos grupos de opções */
                .option-group {
                    margin-bottom: 8px;
                    padding: 8px;
                    border-radius: 8px;
                    background: rgba(255, 69, 0, 0.05);
                }

                /* Estilo dos checkboxes */
                input[type="checkbox"] {
                    appearance: none;
                    width: 40px;
                    height: 20px;
                    background-color: rgba(255, 255, 255, 0.1);
                    border-radius: 20px;
                    position: relative;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    border: none;
                    margin-right: 8px;
                }

                input[type="checkbox"]::before {
                    content: '';
                    position: absolute;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    top: 2px;
                    left: 2px;
                    background: white;
                    transition: all 0.3s ease;
                }

                input[type="checkbox"]:checked {
                    background-color: #FF4500;
                }

                input[type="checkbox"]:checked::before {
                    transform: translateX(20px);
                }

                /* Estilo dos inputs de texto */
                input[type="text"], input[type="number"] {
                    width: calc(100% - 16px);
                    padding: 8px;
                    border: 1px solid rgba(255, 69, 0, 0.3);
                    border-radius: 6px;
                    background: rgba(30, 30, 30, 0.9);
                    color: white;
                    font-size: 12px;
                    transition: all 0.3s ease;
                    margin-top: 4px;
                }

                input[type="text"]:focus, input[type="number"]:focus {
                    border-color: #FF4500;
                    outline: none;
                    box-shadow: 0 0 0 2px rgba(255, 69, 0, 0.2);
                }

                /* Estilo do slider */
                input[type="range"] {
                    -webkit-appearance: none;
                    width: 100%;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 2px;
                    margin: 10px 0;
                }

                input[type="range"]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    width: 16px;
                    height: 16px;
                    background: #FF4500;
                    border-radius: 50%;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                input[type="range"]::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                }

                /* Estilo das labels */
                label {
                    display: flex;
                    align-items: center;
                    color: rgba(255, 255, 255, 0.9);
                    padding: 6px 0;
                    font-size: 12px;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                label:hover {
                    color: #FF4500;
                }

                /* Estilo dos títulos das seções */
                .section-title {
                    color: #FF4500;
                    font-size: 11px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-bottom: 6px;
                    font-weight: bold;
                }

                /* Divisor entre seções */
                .divider {
                    height: 1px;
                    background: rgba(255, 69, 0, 0.2);
                    margin: 8px 0;
                }
            </style>
        `;

        // Adicione classes para agrupar opções relacionadas
        let featuresList = [
            [{ type: 'title', text: 'QUESTÕES' }],
            [{ name: 'questionSpoof', type: 'checkbox', variable: 'features.questionSpoof', attributes: 'checked', labeled: true, label: 'Pular Questões' },
            { name: 'showAnswers', type: 'checkbox', variable: 'features.showAnswers', labeled: true, label: 'Mostrar Respostas' }],
            [{ type: 'divider' }],
            [{ type: 'title', text: 'AUTOMAÇÃO' }],
            [{ name: 'autoAnswer', type: 'checkbox', variable: 'features.autoAnswer', dependent: 'autoAnswerDelay,nextRecomendation,repeatQuestion', labeled: true, label: 'Auto Responder' },
            { name: 'videoSpoof', type: 'checkbox', variable: 'features.videoSpoof', attributes: 'checked', labeled: true, label: 'Pular Vídeos' }],
            [{ type: 'divider' }],
            [{ type: 'title', text: 'VISUAL' }],
            [{ name: 'customBanner', type: 'checkbox', variable: 'features.customBanner', labeled: true, label: 'Banner Personalizado' },
            { name: 'rgbLogo', type: 'checkbox', variable: 'features.rgbLogo', labeled: true, label: 'Logo RGB' }]
        ];

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
        handleInput('darkMode', checked => checked ? (DarkReader.setFetchMethod(window.fetch), DarkReader.enable()) : DarkReader.disable());
        handleInput('onekoJs', checked => { onekoEl = document.getElementById('oneko'); if (onekoEl) {onekoEl.style.display = checked ? null : "none"} });
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
    setupBackground();
    spoofQuestion();
    spoofVideo();
    answerRevealer();
    minuteFarm();
    spoofUser();
    rgbLogo();
    changeBannerText();
    autoAnswer();
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
loadScript('https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css', 'toastifyCss');
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
