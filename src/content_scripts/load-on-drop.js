import './load-on-drop.scss';
import App from './modules/app';
import { Gene } from './modules/utils';

export function applyPatch() {
  const target = document.body; // dom to listen drag-drop events at
  console.log(target);

  /* create drop area */
  const drop_area = document.createElement('div');
  drop_area.innerHTML = `
    <div style="height:32vh" data-target="waifu">Load Waifu</div>
    <div style="height:18vh" data-target="color">Load Color</div>
    <div style="height:18vh" data-target="details">Load Details</div>
    <div style="height:18vh" data-target="pose">Load Pose</div>
  `;
  target.appendChild(drop_area);
  drop_area.classList.add('drop-area');
  drop_area.style.display = 'none';

  /* add event listeners */
  let counter = 0;

  target.ondragover = (e) => {
    e.preventDefault(); // prevent page navigation on drop
  };

  target.ondragenter = (e) => {
    counter++;
    const in_drop_area = e.path.indexOf(drop_area);

    if (in_drop_area == 1) {
      e.target.style.color = '#1890ff';
    } else if (in_drop_area < 0) {
      const step = new App().getStep();
      if (1 <= step && step <= 4) {
        drop_area.style.display = ''; // show drop_area
      }
    }
  };

  target.ondragleave = (e) => {
    if (--counter === 0) {
      drop_area.style.display = 'none';
    }
    if (e.path[1] == drop_area) {
      e.target.style.color = '';
    }
  };

  target.ondrop = (e) => {
    e.preventDefault(); // prevent page navigation on drop
    counter = 0;
    drop_area.style.display = 'none';

    if (e.path[1] == drop_area) {
      e.target.style.color = '';

      if (e.dataTransfer.files.length > 0) {
        const app = new App();
        const target = e.target.attributes['data-target'].value;

        const seeds = app.getState().girl.seeds;
        const gene = Gene.fromSeeds(seeds);
        const newGene = Gene.fromString(e.dataTransfer.files[0].name);

        if (target == 'waifu' || target == 'color') {
          gene.color = newGene.color || gene.color;
        }
        if (target == 'waifu' || target == 'details') {
          gene.details = newGene.details || gene.details;
        }
        if (target == 'waifu' || target == 'pose') {
          gene.pose = newGene.pose || gene.pose;
        }

        app.loadWaifu(gene.toSeeds(seeds[16], seeds[17]));
      }
    }
  };
}
