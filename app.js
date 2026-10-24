'use strict';
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');menuButton.querySelector('span').textContent='+';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);menuButton.querySelector('span').textContent=open?'−':'+';});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});

let modalTrigger=null;
document.querySelectorAll('[data-dialog]').forEach(button=>button.addEventListener('click',()=>{
 const dialog=document.getElementById(button.dataset.dialog);
 const previous=document.querySelector('dialog[open]');
 if(previous)previous.close();
 modalTrigger=button.closest('dialog')?document.querySelector(`[data-dialog="${button.closest('dialog').id}"]`):button;
 if(dialog.id==='board-dialog'){const frame=document.getElementById('board-iframe');if(!frame.getAttribute('src'))frame.src=frame.dataset.src;}
 document.getElementById('demo-video').pause();
 dialog.showModal();document.body.classList.add('modal-open');
 dialog.querySelector('.close-dialog').focus({preventScroll:true});
}));
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();}});
 dialog.addEventListener('close',()=>{if(!document.querySelector('dialog[open]')){document.body.classList.remove('modal-open');modalTrigger?.focus({preventScroll:true});}});
});

const demos={desktop:{label:'TAGlink Desktop · Live RFID inventory',duration:'12 SEC / SILENT',alt:'TAGlink Desktop live inventory demonstration'},mobile:{label:'TAGlink Mobile · Inventory and reader info',duration:'18 SEC / SILENT',alt:'TAGlink Android inventory and reader info demonstration'},bench:{label:'On the bench · Development-board prototype',duration:'5 SEC / SILENT',alt:'Physical STM32 and ESP32 development-board prototype'}};
const tabs=[...document.querySelectorAll('[data-demo]')],video=document.getElementById('demo-video');
function selectDemo(button){
 tabs.forEach(tab=>{const selected=tab===button;tab.setAttribute('aria-selected',String(selected));tab.tabIndex=selected?0:-1;});
 const key=button.dataset.demo,demo=demos[key];video.pause();video.poster=`assets/${key}.webp`;video.querySelector('source').src=`assets/${key}-demo.webm`;video.querySelector('a').href=`assets/${key}-demo.webm`;video.setAttribute('aria-label',demo.alt);video.load();
 document.getElementById('demo-caption').textContent=demo.label;document.getElementById('demo-duration').textContent=demo.duration;document.getElementById('demo-panel').setAttribute('aria-labelledby',button.id);
}
tabs.forEach((tab,index)=>{tab.addEventListener('click',()=>selectDemo(tab));tab.addEventListener('keydown',event=>{let next;if(['ArrowDown','ArrowRight'].includes(event.key))next=(index+1)%tabs.length;if(['ArrowUp','ArrowLeft'].includes(event.key))next=(index+tabs.length-1)%tabs.length;if(event.key==='Home')next=0;if(event.key==='End')next=tabs.length-1;if(next!==undefined){event.preventDefault();tabs[next].focus();selectDemo(tabs[next]);}});});
const tablist=document.querySelector('[role="tablist"]'),mobileTabs=matchMedia('(max-width:800px)');
function setTabOrientation(){tablist.setAttribute('aria-orientation',mobileTabs.matches?'horizontal':'vertical');}setTabOrientation();mobileTabs.addEventListener('change',setTabOrientation);
document.getElementById('copy-email').addEventListener('click',async()=>{const status=document.getElementById('copy-status');try{await navigator.clipboard.writeText('namesanass@gmail.com');status.textContent='Email copied.';}catch{status.textContent='Select and copy: namesanass@gmail.com';}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
