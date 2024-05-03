
document.addEventListener("DOMContentLoaded", function() {
    const trabajosContainer = document.getElementById("contenedorTrabajos");

    // Poner trabajos
    const trabajos = [
        { titulo: "Observatorio Mercado Inmobiliario", subtitulo: "Extracción y análisis de publicaciones de alquiler de CABA", link: "https://observatoriovivienda.shinyapps.io/Tablero-OMI/", descripcion: "Programación de WebScrapping y el posterior procesamiento de la información para analizar el mercado inmobiliario de CABA" },
        { titulo: "Deficit Habitacional", subtitulo: "Construcción metodológica para medición a partir de la EPH", link: "https://rpubs.com/sebiro/DeficitHabitacional", descripcion: "Procesamiento preeliminar propio para la construcción de un indicador del déficit habitacional a partir de la información provista por la EPH (Encuesta Permanente de Hogares)" },
        { titulo: "Integración Urbana", subtitulo: "Análisis de la cartera de la gestión de la SISU 2020-2023", link: "https://rpubs.com/sebiro/CarteraSISU", descripcion: "Procesamiento de la información disponible en datos abiertos sobre los proyectos de integración urbana realizados por la SISU (Secretaría de Integración Socio Urbana) en la gestión 2020-2023" },
        { titulo: "Economia Popular", subtitulo: "Tablero para el seguimiento del mercado laboral", link: "https://equilab-data.shinyapps.io/tablero_mercado_laboral/", descripcion: "Trabajo realizado en conjunto con OCEPP y el Taller de Datos Populares (UBA) para la identificación y el seguimiento de los trabajadores que se desarrollan en la Economia Popular" },
        { titulo: "Viviendas Vacías", subtitulo: "Definición y cálculo de la vacancia en vivendas de CABA", link: "https://cdn.buenosaires.gob.ar/datosabiertos/datasets/instituto-de-vivienda/informes-coyuntura-habitacional/informe_mesa_de_estudio_de_viviendas_vacias.pdf", descripcion: "Estudio realizado en el marco del trabajo del Observatorio de Vivienda de la Ciudad y en conjunto con otras organizaciones de la sociedad civil para dimensionar la cantidad de viviendas vacías en la ciudad" },
        { titulo: "Monitor SISU", subtitulo: "Monitor de integración Socio Urbana", link: "https://lookerstudio.google.com/u/0/reporting/3b5376df-428e-4cb6-bdf7-a20026dfa23a/page/muTcD", descripcion: "Monitor abierto para difusión y seguimiento de las obras de integración realizadas por la Secretaría de integración Socio Urbana. Trabajo realizado en conjunto con el equipo de la Secretaria" },
        { titulo: "Monitor vivienda GCBA", subtitulo: "Matriz de indicadores de vivienda", link: "https://app.powerbi.com/view?r=eyJrIjoiZGJkNzY5MmYtMjI3ZC00ZjhiLWJiYTgtODk5ZWUzOTI2ZDVkIiwidCI6IjIzNzc0NzJlLTgwMDQtNDY0OC04NDU2LWJkOTY4N2FmYTE1MCIsImMiOjR9", descripcion: "Monitor abierto para el seguimiento de variables escogidas de la situación habitacional en la Ciudad de Buenos Aires. Trabajo realizado en conjunto con el equipo del Observatorio IVC y la DG de Calidad Institucional y Gobierno Abierto" },

    ];
    
    // Mostrar los trabajos en la página
    trabajos.forEach(trabajo => {
        const trabajosContainer = document.getElementById("contenedorTrabajos");
        trabajosContainer.innerinnerHTML="" 
        const trabajoElement = document.createElement("div");
        trabajoElement.classList.add("trabajo");
        trabajoElement.innerHTML = `
            <img src="./${trabajo.titulo}.png" class="card-img-top" alt="${trabajo.titulo}">  
            <h2><a href="${trabajo.link}" target="_blank">${trabajo.titulo}</a></h2>
            <h4><a target="_blank">${trabajo.subtitulo}</a></h4>
            <p>${trabajo.descripcion}</p>
        `;
        trabajosContainer.appendChild(trabajoElement);
    });


    DatosContacto = {
    mail: "sebastianrohr3@gmail.com", 
    linkedin: "https://www.linkedin.com/in/sebastian-rohr-b4b878112/"},



    ContainerContacto = document.getElementById("contactoCV")
    trabajosContainer.innerinnerHTML="" 

// Crea un div para el ícono de LinkedIn y mail
const linkedinIcon = document.createElement("a");
linkedinIcon.href = "https://www.linkedin.com/in/sebastian-rohr-b4b878112/";
linkedinIcon.target = "_blank"; 
const linkedinImg = document.createElement("img");
linkedinImg.src = "Linkedin-Free-Download-PNG.png"; 
linkedinIcon.appendChild(linkedinImg); 
ContainerContacto.appendChild(linkedinIcon); 

const emailIcon = document.createElement("a");
emailIcon.href = "mailto:sebastianrohr3@gmail.com";
emailIcon.target = "_blank"; 
const emailImg = document.createElement("img");
emailImg.src = "descarga-removebg-preview.png"; 
emailIcon.appendChild(emailImg); 
ContainerContacto.appendChild(emailIcon); 

const cvIcon = document.createElement("a");
cvIcon.href = "https://drive.google.com/file/d/1o-jlvmwLoqkfn7Y0q98tlEJehVzYhsRF/view?usp=sharing";
cvIcon.download = "CV Sebastian Rohr (esp).pdf"; 
const cvImg = document.createElement("img");
cvImg.src = "cv español.png"; 
cvIcon.appendChild(cvImg); 
ContainerContacto.appendChild(cvIcon); 

const cvIconeng = document.createElement("a");
cvIconeng.href = "https://drive.google.com/file/d/1fs1NdQp6r_CBHDzd5cBERd0O-p-13dWC/view?usp=sharing";
cvIconeng.download = "CV Sebastian Rohr (eng).pdf"; 
const cvImgeng = document.createElement("img");
cvImgeng.src = "cv ingles.png"; 
cvIconeng.appendChild(cvImgeng); 
ContainerContacto.appendChild(cvIconeng); 






});

