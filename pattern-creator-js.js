const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');
const generateBtn = document.getElementById('generateBtn');
const exportPNGBtn = document.getElementById('exportPNG');
const exportSVGBtn = document.getElementById('exportSVG');
const colorPicker = document.getElementById('colorPicker');
const patternType = document.getElementById('patternType');

canvas.width = 300;
canvas.height = 300;

function generatePattern() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colorPicker.value;
    ctx.strokeStyle = colorPicker.value;

    switch (patternType.value) {
        case 'dots':
            for (let i = 0; i < 100; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 5, 0, 2 * Math.PI);
                ctx.fill();
            }
            break;
        case 'lines':
            for (let i = 0; i < 20; i++) {
                ctx.beginPath();
                ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
                ctx.stroke();
            }
            break;
        case 'circles':
            for (let i = 0; i < 10; i++) {
                ctx.beginPath();
                ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 
                        Math.random() * 30 + 10, 0, 2 * Math.PI);
                ctx.stroke();
            }
            break;
    }
}

function exportPNG() {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'pattern.png';
    link.href = dataURL;
    link.click();
}

function exportSVG() {
    const svgNamespace = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNamespace, "svg");
    svg.setAttribute("width", canvas.width);
    svg.setAttribute("height", canvas.height);

    const patternGroup = document.createElementNS(svgNamespace, "g");
    patternGroup.setAttribute("fill", "none");
    patternGroup.setAttribute("stroke", colorPicker.value);

    switch (patternType.value) {
        case 'dots':
            for (let i = 0; i < 100; i++) {
                const circle = document.createElementNS(svgNamespace, "circle");
                circle.setAttribute("cx", Math.random() * canvas.width);
                circle.setAttribute("cy", Math.random() * canvas.height);
                circle.setAttribute("r", 5);
                circle.setAttribute("fill", colorPicker.value);
                patternGroup.appendChild(circle);
            }
            break;
        case 'lines':
            for (let i = 0; i < 20; i++) {
                const line = document.createElementNS(svgNamespace, "line");
                line.setAttribute("x1", Math.random() * canvas.width);
                line.setAttribute("y1", Math.random() * canvas.height);
                line.setAttribute("x2", Math.random() * canvas.width);
                line.setAttribute("y2", Math.random() * canvas.height);
                patternGroup.appendChild(line);
            }
            break;
        case 'circles':
            for (let i = 0; i < 10; i++) {
                const circle = document.createElementNS(svgNamespace, "circle");
                circle.setAttribute("cx", Math.random() * canvas.width);
                circle.setAttribute("cy", Math.random() * canvas.height);
                circle.setAttribute("r", Math.random() * 30 + 10);
                patternGroup.appendChild(circle);
            }
            break;
    }

    svg.appendChild(patternGroup);

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
    const svgUrl = URL.createObjectURL(svgBlob);
    const downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "pattern.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

generateBtn.addEventListener('click', generatePattern);
exportPNGBtn.addEventListener('click', exportPNG);
exportSVGBtn.addEventListener('click', exportSVG);

generatePattern();
