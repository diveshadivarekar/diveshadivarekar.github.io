(function(){
'use strict';
var mods=[
{id:'M1',n:'Ingestion & Preprocessing',o:'Rohan Gorde',ph:'Phase 1',
 d:'Streams terabyte-scale CT volumes from disk in chunks, so the whole scan never has to sit in memory, and cleans the two classic CT defects.',
 how:'Out-of-core Zarr / HDF5 streaming; iterative polynomial correction for beam-hardening ("cupping"); polar-coordinate filtering for ring artifacts.',
 tech:'Zarr, HDF5, NumPy, scikit-image, ASTRA',req:['FR-1.1 Import OME-Zarr, HDF5 or 16-bit TIFF out-of-core','FR-1.2 Correct beam-hardening','FR-1.3 Suppress ring artifacts','FR-1.4 Output a clean voxel grid and readable error logs'],io:'In: raw volume  →  Out: corrected voxel grid'},
{id:'M2',n:'3D Volumetric Segmentation',o:'Divesh Adivarekar',ph:'Phase 2',
 d:'Finds every individual page or scroll wrap inside the solid block of voxels, even when neighbouring sheets are practically touching.',
 how:'Point clouds at each sheet centre are grouped into surfaces by a zero/few-shot FastSAM3D-style model and a 3D U-Net; surface-normal tracking stops the model jumping between layers.',
 tech:'FastSAM3D, 3D U-Net, Open3D, PyTorch',req:['FR-2.1 Centre-of-sheet point clouds','FR-2.2 Zero/few-shot 3D instance segmentation','FR-2.3 Surface-normal tracking, no layer-jumping','FR-2.4 Dice above 0.90','FR-2.5 Output one mesh per page'],io:'In: voxel grid  →  Out: per-page 3D surfaces'},
{id:'M3',n:'ARAP Flattening',o:'Pranav Gugale',ph:'Phase 2',
 d:'Digitally unfolds each curved 3D page into a flat 2D image while keeping letters undistorted, the "virtual unwrapping" step.',
 how:'Converts surfaces to meshes and minimises the As-Rigid-As-Possible energy with mass-spring relaxation. A map back to 3D coordinates is kept for traceability.',
 tech:'ARAP parameterisation, Bullet Physics, Open3D',req:['FR-3.1 Mesh conversion','FR-3.2 ARAP unfolding to 2D','FR-3.3 Minimal distortion for OCR','FR-3.4 Keep 2D-to-3D mapping'],io:'In: 3D surfaces  →  Out: flattened 2D pages'},
{id:'M4',n:'AI Ink Detection',o:'Samarth Sangolgi',ph:'Phase 3',
 d:'Decides, pixel by pixel, whether there is ink. Carbon ink is nearly invisible to X-rays, so the network learns faint density patterns instead of brightness.',
 how:'For each pixel a 64×64×26 voxel window is passed to a 3D CNN / TimeSformer ensemble that outputs an ink probability. Both metallic and carbon inks are supported.',
 tech:'3D CNN, TimeSformer, PyTorch + CUDA',req:['FR-4.1 Local 3D windows per pixel','FR-4.2 Ensemble inference','FR-4.3 Ink-confidence map','FR-4.4 Metallic and carbon ink'],io:'In: flattened pages  →  Out: ink-confidence map'},
{id:'M5',n:'OCR, Correction & Translation',o:'Pranav Gugale, Samarth Sangolgi',ph:'Phase 3',
 d:'Turns the ink map into text, fills small gaps from context, translates it, and tells the reader how sure it is about each character.',
 how:'CRNN with CTC decoding gives characters and log-likelihoods. Characters below a configurable threshold are flagged. An Ithaca-style masked language model proposes gap fills; neural translation produces modern-language output.',
 tech:'CRNN + CTC, masked LM, neural machine translation',req:['FR-5.1 Per-character log-likelihood','FR-5.2 Flag low-confidence characters','FR-5.3 Lacuna infilling','FR-5.4 Modern-language translation','FR-5.5 CER / WER evaluation'],io:'In: ink map  →  Out: translated, confidence-scored text'},
{id:'M6',n:'Researcher GUI',o:'Rohan Gorde, Divesh Adivarekar',ph:'Phase 4',
 d:'The only screen an archivist needs. It spans every stage, so a non-technical researcher can run the pipeline end to end.',
 how:'Loads a scan, shows phase-by-phase progress, previews before/after for each stage, highlights uncertain characters and exports the annotated text.',
 tech:'Desktop GUI framework, local IPC / REST',req:['FR-6.1 Load scan files','FR-6.2 Live phase progress','FR-6.3 Before / after previews','FR-6.4 Export confidence-annotated text'],io:'Cross-cutting layer over M1 to M5'}];
var flow=document.querySelector('.flow'),panel=document.getElementById('panel');
function show(i){
 var m=mods[i];
 [].forEach.call(flow.children,function(b,j){b.setAttribute('aria-selected',j===i)});
 var li=m.req.map(function(r){return '<li>'+r+'</li>'}).join('');
 panel.innerHTML='<div><h3>'+m.n+'</h3><p>'+m.d+'</p><dl><dt>How</dt><dd>'+m.how+'</dd><dt>Technology</dt><dd>'+m.tech+'</dd><dt>Owner</dt><dd>'+m.o+' · '+m.ph+'</dd></dl></div>'+
 '<div class="reqs"><h4>Requirements covered</h4><ul>'+li+'</ul><p class="io">'+m.io+'</p></div>';
}
mods.forEach(function(m,i){
 var b=document.createElement('button');b.className='step';b.setAttribute('role','tab');
 b.innerHTML='<b>'+m.id+'</b><span>'+m.n+'</span>';
 b.addEventListener('click',function(){show(i)});
 b.addEventListener('keydown',function(e){var k=e.key,n=k==='ArrowRight'?i+1:k==='ArrowLeft'?i-1:null;if(n!==null&&flow.children[n]){flow.children[n].focus();show(n)}});
 flow.appendChild(b);
});
show(0);
/* tests */
var tests=[['T1','FR-1.1','Load OME-Zarr / HDF5 / TIFF out-of-core','Synthetic 50 GB Zarr','Loads without exceeding host RAM','done','Passed'],
['T2','FR-1.2, 1.3','Beam-hardening and ring-artifact correction','ASTRA phantom with known artifacts','Cupping flattened; ring residual reduced','prog','In progress'],
['T3','FR-2.2, 2.4','Page segmentation on fused layers','ASTRA book phantom + EduceLab-Scrolls','Dice > 0.90','prog','In progress'],
['T4','FR-2.3','Layer-jump detection','Phantom with 40 µm gap','Zero cross-layer merges','plan','Planned'],
['T5','FR-3.2, 3.3','ARAP distortion measurement','Synthetic page with glyph grid','Edge-length distortion within tolerance','plan','Planned'],
['T6','FR-4.2, 4.4','Ink detection (carbon and metallic)','EduceLab-Scrolls sub-volumes','Ink separated from substrate','plan','Planned'],
['T7','FR-5.1, 5.5','OCR accuracy and confidence','Benchmark transcriptions','CER / WER recorded; score per token','plan','Planned'],
['T8','FR-5.2, NFR-6','Low-confidence characters are flagged','Injected low-confidence samples','100% flagged in GUI','plan','Planned']];
document.getElementById('tests').innerHTML=tests.map(function(t){
 return '<tr><td><b>'+t[0]+'</b></td><td>'+t[1]+'</td><td>'+t[2]+'</td><td>'+t[3]+'</td><td>'+t[4]+'</td><td><span class="tag '+t[5]+'">'+t[6]+'</span></td></tr>'}).join('');
/* timeline */
var ph=[['Phase 1','Months 1–3',3,'Cluster setup, ASTRA synthetic CT, ingestion and artifact correction (M1)'],
['Phase 2','Months 4–7',4,'FastSAM3D segmentation, layer tracking, ARAP flattening (M2, M3)'],
['Phase 3','Months 8–10',3,'Ink inference, CRNN OCR, log-likelihood scoring, translation (M4, M5)'],
['Phase 4','Months 11–12',2,'GUI, EduceLab validation, Docker packaging, paper (M6)']];
var tl=document.getElementById('timeline'),h='<div class="months">';
for(var i=1;i<=12;i++)h+='<span>M'+i+'</span>';h+='</div>';
ph.forEach(function(p){h+='<div class="ph" tabindex="0" style="grid-column:span '+p[2]+'"><small>'+p[1]+'</small><b>'+p[0]+'</b><p>'+p[3]+'</p></div>'});
h+='<div class="ms"><span><b>Month 3</b> corrected volume + phantoms</span><span><b>Month 5</b> segmentation Dice measured</span><span><b>Month 7</b> flattening validated</span><span><b>Month 9</b> ink map on benchmark</span><span><b>Month 11</b> end-to-end transcript</span><span><b>Month 12</b> GUI, report, paper</span></div>';
tl.innerHTML=h;
/* team */
var team=[['Divesh Adivarekar','4008','Volumetric segmentation (M2) and GUI (M6)'],['Pranav Gugale','3078','ARAP flattening (M3) and OCR / translation (M5)'],['Rohan Gorde','3022','Ingestion and preprocessing (M1) and GUI (M6)'],['Samarth Sangolgi','3085','Ink detection (M4) and OCR / translation (M5)']];
document.getElementById('teamgrid').innerHTML=team.map(function(t){
 return '<article class="card member"><div class="av">'+t[0].charAt(0)+'</div><h3>'+t[0]+'</h3><div class="roll">Roll No. '+t[1]+'</div><p>'+t[2]+'</p></article>'}).join('');
/* counters */
var cs=document.querySelectorAll('[data-n]');
function run(el){var n=+el.dataset.n,s=el.dataset.suf||'',t0=null;
 if(window.matchMedia('(prefers-reduced-motion:reduce)').matches){el.textContent=n.toLocaleString('en-IN')+s;return}
 (function f(t){if(!t0)t0=t;var p=Math.min((t-t0)/1100,1);el.textContent=Math.round(n*(1-Math.pow(1-p,3))).toLocaleString('en-IN')+s;if(p<1)requestAnimationFrame(f)})(performance.now())}
if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){run(e.target);io.unobserve(e.target)}})},{threshold:.6});cs.forEach(function(c){io.observe(c)})}
else cs.forEach(run);
/* nav */
var burger=document.querySelector('.burger'),nav=document.getElementById('nav');
burger.addEventListener('click',function(){var o=nav.classList.toggle('open');burger.setAttribute('aria-expanded',o)});
nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');burger.setAttribute('aria-expanded',false)}});
var links=[].slice.call(nav.querySelectorAll('a[href^="#"]'));
if('IntersectionObserver' in window){var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting)links.forEach(function(a){a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id)})})},{rootMargin:'-45% 0px -50% 0px'});
 links.forEach(function(a){var s=document.querySelector(a.getAttribute('href'));if(s)so.observe(s)})}
})();
