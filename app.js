(() => {
  const { PDFDocument, rgb } = PDFLib;
  const form = document.getElementById('recruitmentForm');
  const message = document.getElementById('message');
  const generateBtn = document.getElementById('generateBtn');
  const clearBtn = document.getElementById('clearBtn');
  const needsDetails = document.getElementById('needsDetails');

  const fields = {
    imie:[1,291.65095,576.8504,544.29507,591.2417], nazwisko:[1,291.65095,561.2599,544.29507,575.6511],
    obywatelstwo:[1,291.65095,546.2689,544.29507,560.06057], wiek:[1,291.65095,515.6875,544.29507,530.07876],
    pesel:[1,291.65095,495.29985,544.29507,515.0878], data_urodzenia:[1,291.65095,474.31254,544.29507,494.10057],
    wojewodztwo:[1,291.65095,372.97398,544.29507,386.7656], powiat:[1,291.65095,357.98304,544.29507,372.37434],
    gmina:[1,291.65095,342.3925,544.29507,357.3834], miejscowosc:[1,291.65095,327.40156,544.29507,341.79286],
    kod_pocztowy:[1,291.65095,312.41065,544.29507,326.80195], ulica:[1,291.65095,297.41975,544.29507,311.81105],
    nr_domu:[1,291.65095,281.82923,368.46437,296.22047], nr_lokalu:[1,453.67924,281.82923,544.29507,296.22047],
    telefon:[1,291.65095,266.23866,544.29507,280.62995], email:[1,291.65095,251.24774,544.29507,265.63905],
    zatrudniony_w:[1,291.65095,235.05756,544.29507,250.04846], typ_umowy:[1,291.65095,207.47425,544.29507,233.85828],
    data_rozp_zatr:[1,291.65095,163.10114,544.29507,206.27497], data_zakonczenia_zatr:[2,291.65095,696.1781,544.29507,765.1363],
    stanowisko_pracy:[2,291.65095,666.7959,544.29507,694.37918], opis_szczegolnych_potrzeb:[2,70.81236,163.10114,482.48426,214.66992],
    obszar_wsparcia_1:[3,94.81656,344.1914,381.66667,371.17506], obszar_wsparcia_2:[3,94.81656,310.01216,381.66667,336.99577],
    obszar_wsparcia_3:[3,94.81656,275.23323,381.66667,302.21687], imie_nazwisko_oswiadczenie:[4,70.81236,696.7777,481.88417,714.1672],
    miejscowosc_data:[5,90.61582,456.32347,221.43868,475.5118]
  };

  const checks = {
    plec_kobieta:[1,296.45179,533.6766,306.05345,543.87039], plec_mezczyzna:[1,420.67347,533.6766,430.27516,543.87039],
    wykszt_podstawowe:[1,312.6546,461.72019,322.2563,471.31437], wykszt_gimnazjalne:[1,312.6546,446.1296,322.2563,455.72383],
    wykszt_ponadgimnazjalne:[1,312.6546,430.53907,322.2563,440.13328], wykszt_policealne:[1,312.6546,414.94853,322.2563,424.5427],
    wykszt_wyzsze:[1,312.6546,399.35798,322.2563,408.95216], niepelnosprawnosc_tak:[2,351.6614,603.2344,363.0634,614.6275],
    niepelnosprawnosc_nie:[2,470.48216,603.2344,481.88417,614.6275], kraje_trzecie_tak:[2,351.6614,559.46096,363.0634,570.854],
    kraje_trzecie_nie:[2,470.48216,559.46096,481.88417,570.854], obce_pochodzenie_tak:[2,351.6614,529.4791,363.0634,540.8722],
    obce_pochodzenie_nie:[2,470.48216,529.4791,481.88417,540.8722], mniejszosc_tak:[2,351.6614,500.09693,363.0634,511.49003],
    mniejszosc_nie:[2,470.48216,500.09693,481.88417,511.49003], bezdomnosc_tak:[2,351.6614,426.3416,363.0634,437.7347],
    bezdomnosc_nie:[2,470.48216,426.3416,481.88417,437.7347], szczegolne_potrzeby_nie:[2,70.21226,235.65717,80.41404,245.85102],
    szczegolne_potrzeby_tak:[2,70.21226,220.06665,80.41404,230.26044], kadra_zarzadzajaca:[3,70.81236,736.95339,81.61425,747.7468],
    wyzszy_szczebel:[3,70.81236,719.5639,81.61425,730.35739], sredni_szczebel:[3,70.81236,689.5821,81.61425,700.37557],
    nizszy_szczebel:[3,70.81236,660.1999,81.61425,670.99337], prace_proste:[3,70.81236,630.218,81.61425,641.01156],
    obszar_1_poziom_1:[3,396.06916,353.18595,406.87107,363.9794], obszar_1_poziom_2:[3,445.27778,353.18595,456.07966,363.9794], obszar_1_poziom_3:[3,494.48637,353.18595,505.28825,363.9794],
    obszar_2_poziom_1:[3,396.06916,319.00666,406.87107,329.8001], obszar_2_poziom_2:[3,445.27778,319.00666,456.07966,329.8001], obszar_2_poziom_3:[3,494.48637,319.00666,505.28825,329.8001],
    obszar_3_poziom_1:[3,396.06916,284.22773,406.87107,295.02119], obszar_3_poziom_2:[3,445.27778,284.22773,456.07966,295.02119], obszar_3_poziom_3:[3,494.48637,284.22773,505.28825,295.02119]
  };

  const get = name => form.elements[name]?.value?.trim?.() ?? '';
  const selected = name => form.querySelector(`[name="${name}"]:checked`)?.value || '';
  const formatDate = value => value ? value.split('-').reverse().join('.') : '';

  document.querySelectorAll('[name="szczegolne_potrzeby"]').forEach(el => el.addEventListener('change', () => {
    const yes = selected('szczegolne_potrzeby') === 'tak';
    needsDetails.classList.toggle('hidden', !yes);
    form.elements.opis_szczegolnych_potrzeb.required = yes;
    if (!yes) form.elements.opis_szczegolnych_potrzeb.value = '';
  }));

  function wrapLines(ctx, text, maxWidth) {
    const paragraphs = String(text).split(/\n/);
    const lines = [];
    for (const paragraph of paragraphs) {
      const words = paragraph.trim().split(/\s+/).filter(Boolean);
      if (!words.length) { lines.push(''); continue; }
      let line = '';
      for (const word of words) {
        const test = line ? `${line} ${word}` : word;
        if (ctx.measureText(test).width <= maxWidth) line = test;
        else { if (line) lines.push(line); line = word; }
      }
      if (line) lines.push(line);
    }
    return lines;
  }

  async function drawTextAsImage(pdfDoc, page, rect, text, multiline = false) {
    if (!text) return;
    const [, x1, y1, x2, y2] = rect;
    const width = x2 - x1;
    const height = y2 - y1;
    const scale = 4;
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(8, Math.round(width * scale));
    canvas.height = Math.max(8, Math.round(height * scale));
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#111';
    ctx.textBaseline = 'top';

    const padX = 4 * scale;
    const padY = 2 * scale;
    const availableWidth = canvas.width - 2 * padX;
    const availableHeight = canvas.height - 2 * padY;
    let fontPt = multiline ? 8.8 : 9.4;
    const minPt = 6.2;
    let lines = [];

    while (fontPt >= minPt) {
      ctx.font = `${fontPt * scale}px Arial, Helvetica, sans-serif`;
      lines = multiline ? wrapLines(ctx, text, availableWidth) : [String(text)];
      const lineHeight = fontPt * scale * 1.12;
      if (lines.length * lineHeight <= availableHeight && lines.every(line => ctx.measureText(line).width <= availableWidth)) break;
      fontPt -= 0.25;
    }

    const lineHeight = fontPt * scale * 1.12;
    const maxLines = Math.max(1, Math.floor(availableHeight / lineHeight));
    lines.slice(0, maxLines).forEach((line, i) => ctx.fillText(line, padX, padY + i * lineHeight));

    const png = await pdfDoc.embedPng(canvas.toDataURL('image/png'));
    page.drawImage(png, { x: x1, y: y1, width, height });
  }

  function drawX(page, rect) {
    const [, x1, y1, x2, y2] = rect;
    const pad = 2.2;
    page.drawLine({ start: {x:x1+pad,y:y1+pad}, end: {x:x2-pad,y:y2-pad}, thickness: 1.2, color: rgb(0.05,0.05,0.05) });
    page.drawLine({ start: {x:x1+pad,y:y2-pad}, end: {x:x2-pad,y:y1+pad}, thickness: 1.2, color: rgb(0.05,0.05,0.05) });
  }

  function download(bytes, filename) {
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    message.textContent = '';
    message.className = '';
    if (!form.checkValidity()) {
      form.reportValidity();
      message.textContent = 'Uzupełnij wszystkie wymagane pola.';
      message.className = 'error';
      return;
    }

    generateBtn.disabled = true;
    generateBtn.querySelector('span').textContent = 'Generowanie PDF…';
    try {
      const templateResponse = await fetch('assets/formularz-wzor.pdf', { cache: 'no-store' });
      if (!templateResponse.ok) throw new Error('Nie udało się wczytać wzoru PDF.');
      const templateBytes = await templateResponse.arrayBuffer();
      const pdfDoc = await PDFDocument.load(templateBytes);
      const pages = pdfDoc.getPages();

      const values = {
        imie:get('imie'), nazwisko:get('nazwisko'), obywatelstwo:get('obywatelstwo'), wiek:get('wiek'), pesel:get('pesel'), data_urodzenia:formatDate(get('data_urodzenia')),
        wojewodztwo:get('wojewodztwo'), powiat:get('powiat'), gmina:get('gmina'), miejscowosc:get('miejscowosc'), kod_pocztowy:get('kod_pocztowy'), ulica:get('ulica'), nr_domu:get('nr_domu'), nr_lokalu:get('nr_lokalu'),
        telefon:get('telefon'), email:get('email'), zatrudniony_w:get('zatrudniony_w'), typ_umowy:get('typ_umowy'), data_rozp_zatr:formatDate(get('data_rozp_zatr')), data_zakonczenia_zatr:get('data_zakonczenia_zatr') || 'nadal', stanowisko_pracy:get('stanowisko_pracy'),
        opis_szczegolnych_potrzeb:get('opis_szczegolnych_potrzeb'), obszar_wsparcia_1:get('obszar_wsparcia_1'), obszar_wsparcia_2:get('obszar_wsparcia_2'), obszar_wsparcia_3:get('obszar_wsparcia_3'),
        imie_nazwisko_oswiadczenie:`${get('imie')} ${get('nazwisko')}`, miejscowosc_data:`${get('miejscowosc_podpisu')}, ${formatDate(get('data_podpisu'))}`
      };

      const multilineFields = new Set(['typ_umowy','data_rozp_zatr','data_zakonczenia_zatr','stanowisko_pracy','opis_szczegolnych_potrzeb','obszar_wsparcia_1','obszar_wsparcia_2','obszar_wsparcia_3']);
      for (const [name, value] of Object.entries(values)) {
        const rect = fields[name];
        if (rect && value) await drawTextAsImage(pdfDoc, pages[rect[0]-1], rect, value, multilineFields.has(name));
      }

      const marks = [
        `plec_${selected('plec')}`,
        `wykszt_${selected('wyksztalcenie')}`,
        ...['niepelnosprawnosc','kraje_trzecie','obce_pochodzenie','mniejszosc','bezdomnosc','szczegolne_potrzeby'].map(n => `${n}_${selected(n)}`),
        selected('szczebel'),
        ...[1,2,3].map(n => `obszar_${n}_poziom_${get(`obszar_${n}_poziom`)}`)
      ];
      for (const name of marks) {
        const rect = checks[name];
        if (rect) drawX(pages[rect[0]-1], rect);
      }

      const output = await pdfDoc.save({ useObjectStreams: false });
      const safeName = `${get('nazwisko')}_${get('imie')}`.replace(/[^a-zA-Z0-9ąćęłńóśźżĄĆĘŁŃÓŚŹŻ_-]+/g, '_');
      download(output, `Formularz_rekrutacyjny_${safeName}.pdf`);
      message.textContent = 'Gotowy PDF został pobrany. Zachowuje oryginalne 5 stron, logotypy, tabele i układ dokumentu.';
      message.className = 'success';
    } catch (err) {
      console.error(err);
      message.textContent = 'Nie udało się wygenerować PDF. Po publikacji na GitHub Pages strona będzie działać prawidłowo. Lokalnie uruchom ją przez prosty serwer HTTP.';
      message.className = 'error';
    } finally {
      generateBtn.disabled = false;
      generateBtn.querySelector('span').textContent = 'Generuj wypełniony PDF';
    }
  });

  clearBtn.addEventListener('click', () => {
    if (confirm('Wyczyścić wszystkie wpisane dane?')) {
      form.reset();
      needsDetails.classList.add('hidden');
      message.textContent = '';
      form.elements.data_podpisu.value = new Date().toISOString().slice(0,10);
    }
  });

  form.elements.data_podpisu.value = new Date().toISOString().slice(0,10);
})();
