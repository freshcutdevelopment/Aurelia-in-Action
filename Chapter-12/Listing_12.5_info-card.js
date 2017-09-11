let infoCard         = document.querySelector('#info-card');
let bodyElement      = document.querySelector('body');
let infoCardInstance = document.importNode(infoCard.content, true);
 
bodyElement.appendChild(infoCardInstance);
