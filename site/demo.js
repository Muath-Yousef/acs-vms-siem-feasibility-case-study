'use strict';
const names=['Local product qualification','Mandatory event coverage','Supported collection path','Evaluation entitlement','Blocking dependencies cleared','SIEM compatibility'];
const defaults=['PASS','OPEN','PASS','OPEN','OPEN','OPEN'];
const host=document.getElementById('gates');
const controls=names.map((name,i)=>{const row=document.createElement('div');row.className='gate';const label=document.createElement('label');label.htmlFor='gate-'+i;label.textContent=name;const s=document.createElement('select');s.id=label.htmlFor;for(const value of ['PASS','OPEN','FAIL']){const o=document.createElement('option');o.value=value;o.textContent=value;s.append(o)}s.value=defaults[i];s.addEventListener('change',update);row.append(label,s);host.append(row);return s});
function update(){const v=controls.map(c=>c.value);const result=v.includes('FAIL')?'NO-GO':v.every(x=>x==='PASS')?'FEASIBILITY GO':'CONDITIONAL GO';const verdict=document.getElementById('verdict');verdict.textContent=result;verdict.dataset.state=result;document.getElementById('explanation').textContent=result==='NO-GO'?'A failed gate blocks the modeled route.':result==='FEASIBILITY GO'?'All illustrative feasibility gates are cleared. This does not establish production approval.':'One or more gates remain unresolved. Scope validation before implementation.';}
document.getElementById('reset').addEventListener('click',()=>{controls.forEach((c,i)=>c.value=defaults[i]);update()});update();

const evidenceFilter = document.getElementById('evidence-filter');
const evidenceCards = Array.from(document.querySelectorAll('[data-evidence]'));
function filterEvidence() {
  let count = 0;
  for (const card of evidenceCards) {
    card.hidden = evidenceFilter.value !== 'all' && card.dataset.evidence !== evidenceFilter.value;
    if (!card.hidden) count++;
  }
  document.getElementById('evidence-count').textContent = `${count} of ${evidenceCards.length} examples visible`;
}
evidenceFilter.addEventListener('change', filterEvidence);
filterEvidence();
